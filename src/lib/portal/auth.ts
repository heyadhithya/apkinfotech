import { createHash, randomBytes, randomUUID, scrypt, timingSafeEqual } from 'node:crypto';
import { createUser, findUserByEmail, findUserById, getDb, PortalError } from './store.ts';
import type { User } from './types.ts';

let activeDerivations = 0;
function derive(password: string, salt: string): Promise<Buffer> {
  // Bound expensive work without allowing one rejected account to lock out everyone.
  if (activeDerivations >= 4) return Promise.reject(new PortalError(429, 'Sign-in is busy. Please retry shortly.'));
  activeDerivations++;
  return new Promise<Buffer>((resolve,reject)=>scrypt(password,salt,64,{N:32768,r:8,p:1,maxmem:64*1024*1024},(error,key)=>error?reject(error):resolve(key))).finally(()=>{activeDerivations--;});
}
export const sessionCookie = 'apk_portal_session';
const sessionSeconds = 60 * 60 * 24 * 7;
export function assertPortalConfig() {
  if (process.env.VERCEL) throw new PortalError(503, 'The portal needs persistent server storage. It is not enabled on this hosting environment.');
  if (process.env.NODE_ENV === 'production' && (!process.env.PORTAL_DB_PATH || !process.env.PORTAL_ORIGIN)) {
    throw new PortalError(503, 'The portal is not configured. Contact the administrator.');
  }
  if (process.env.PORTAL_ORIGIN) {
    let url: URL;
    try { url = new URL(process.env.PORTAL_ORIGIN); } catch { throw new PortalError(503, 'The portal origin is invalid.'); }
    const local = ['localhost','127.0.0.1','[::1]'].includes(url.hostname);
    if (url.origin !== process.env.PORTAL_ORIGIN || (url.protocol !== 'https:' && !(local && url.protocol === 'http:'))) throw new PortalError(503, 'Configure an HTTPS portal origin (HTTP is allowed only on loopback).');
  }
}
export function checkOrigin(request: Request) {
  assertPortalConfig();
  const origin = request.headers.get('origin');
  const expected = process.env.PORTAL_ORIGIN || 'http://localhost:3000';
  if (!origin || origin !== expected) throw new PortalError(403, 'This request must come from the portal. Reload the page and try again.');
}
function authDb() {
  assertPortalConfig();
  const db = getDb();
  db.exec(`CREATE TABLE IF NOT EXISTS sessions (token_hash TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE, expires_at INTEGER NOT NULL);
    CREATE TABLE IF NOT EXISTS auth_attempts (bucket TEXT PRIMARY KEY, attempts INTEGER NOT NULL, expires_at INTEGER NOT NULL);`);
  return db;
}
function tokenHash(token: string) { return createHash('sha256').update(token).digest('hex'); }
export function rateLimit(bucket: string, maximum = 15, seconds = 900) {
  const db = authDb(); const key = tokenHash(bucket); const now = Date.now();
  db.prepare('DELETE FROM auth_attempts WHERE expires_at < ?').run(now);
  db.prepare('INSERT INTO auth_attempts (bucket, attempts, expires_at) VALUES (?, 1, ?) ON CONFLICT(bucket) DO UPDATE SET attempts = attempts + 1').run(key, now + seconds * 1000);
  const row = db.prepare('SELECT attempts FROM auth_attempts WHERE bucket = ?').get(key) as {attempts:number};
  if (row.attempts > maximum) throw new PortalError(429, 'Too many attempts. Wait 15 minutes before trying again.');
}
export async function hashPassword(password: string) {
  if (typeof password !== 'string' || password.length < 12 || password.length > 128) throw new PortalError(400,'Use a password between 12 and 128 characters.');
  const salt = randomBytes(16).toString('hex');
  const key = await derive(password, salt);
  return `scrypt:${salt}:${key.toString('hex')}`;
}
export async function verifyPassword(password: string, encoded: string) {
  if (typeof password !== 'string' || password.length > 128) return false;
  const [algorithm,salt,hash] = encoded.split(':');
  if (algorithm !== 'scrypt' || !/^[a-f0-9]{32}$/.test(salt || '') || !/^[a-f0-9]{128}$/.test(hash || '')) return false;
  const key = await derive(password, salt);
  return timingSafeEqual(key,Buffer.from(hash,'hex'));
}
function publicUser(user: User): User { return {id:user.id,name:user.name,email:user.email,role:user.role}; }
function createSession(user: User) {
  const token = randomBytes(32).toString('hex'); const db = authDb();
  db.prepare('DELETE FROM sessions WHERE expires_at <= ?').run(Date.now());
  db.prepare('INSERT INTO sessions(token_hash,user_id,expires_at) VALUES (?,?,?)').run(tokenHash(token),user.id,Date.now()+sessionSeconds*1000);
  return {user:publicUser(user),token};
}
export function resolveSession(token: string | undefined): User | null {
  if (!token || !/^[a-f0-9]{64}$/.test(token)) return null;
  const row = authDb().prepare('SELECT user_id FROM sessions WHERE token_hash = ? AND expires_at > ?').get(tokenHash(token), Date.now()) as {user_id:string}|undefined;
  const user = row ? findUserById(row.user_id) : undefined;
  return user ? publicUser(user) : null;
}
export function revokeSession(token: string | undefined) { if (token) authDb().prepare('DELETE FROM sessions WHERE token_hash = ?').run(tokenHash(token)); }
function credentials(payload: Record<string,unknown>, allowed: string[]) {
  if (Object.keys(payload).some(key=>!allowed.includes(key))) throw new PortalError(400,'Unexpected account fields.');
  const email = typeof payload.email === 'string' ? payload.email.trim().toLowerCase() : '';
  const password = typeof payload.password === 'string' ? payload.password : '';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 || password.length > 128) throw new PortalError(400,'Enter a valid email and password.');
  return {email,password};
}
export async function register(payload: Record<string,unknown>) {
  const {email,password} = credentials(payload,['name','email','password','consent']);
  rateLimit(`register:${email}`,5);
  const name = typeof payload.name === 'string' ? payload.name.trim() : '';
  if (name.length < 2 || name.length > 100 || payload.consent !== true) throw new PortalError(400,'Enter your name and agree to portal data processing.');
  if (findUserByEmail(email)) throw new PortalError(409,'Unable to create this account. Try signing in instead.');
  const passwordHash = await hashPassword(password);
  const user: User = {id:randomUUID(),name,email,role:'student'};
  try { createUser({...user,passwordHash}); }
  catch { throw new PortalError(409,'Unable to create this account. Try signing in instead.'); }
  return createSession(user);
}
export async function login(payload: Record<string,unknown>) {
  const {email,password} = credentials(payload,['email','password']);
  rateLimit(`login:${email}`,10);
  const user = findUserByEmail(email);
  // Keep password derivation cost even when an address is not registered.
  const fallback = `scrypt:${'0'.repeat(32)}:${'0'.repeat(128)}`;
  const valid = await verifyPassword(password,user?.passwordHash || fallback);
  if (!user || !valid) throw new PortalError(401,'Email or password is incorrect.');
  return createSession(user);
}
export function readSessionCookie(request: Request) {
  return request.headers.get('cookie')?.split(';').map(part=>part.trim()).find(part=>part.startsWith(`${sessionCookie}=`))?.slice(sessionCookie.length+1);
}
export function cookieHeader(token: string, clear = false) {
  const secure = process.env.NODE_ENV === 'production' || process.env.PORTAL_ORIGIN?.startsWith('https:');
  return `${sessionCookie}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${clear ? 0 : sessionSeconds}${secure ? '; Secure' : ''}`;
}
