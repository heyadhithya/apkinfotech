import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
const dir = mkdtempSync(join(tmpdir(), 'apk-auth-'));
process.env.PORTAL_DB_PATH = join(dir, 'test.sqlite');
process.env.PORTAL_ORIGIN = 'http://localhost:3000';
const auth = await import('../src/lib/portal/auth.ts');
test.after(() => rmSync(dir, { recursive: true, force: true }));
test('passwords are salted, verified, and bounded', async () => {
 const a = await auth.hashPassword('A strong example password!');
 const b = await auth.hashPassword('A strong example password!');
 assert.notEqual(a,b); assert.equal(await auth.verifyPassword('A strong example password!',a),true);
 assert.equal(await auth.verifyPassword('wrong',a),false);
 await assert.rejects(auth.hashPassword('short'));
});
test('register creates student, persisted opaque session expires and revokes', async () => {
 const {user,token} = await auth.register({name:'Student One',email:'one@example.test',password:'A strong example password!',consent:true});
 assert.equal(user.role,'student'); assert.equal(auth.resolveSession(token)?.id,user.id);
 assert.equal(auth.resolveSession('not-a-session'),null);
 const {getDb} = await import('../src/lib/portal/store.ts');
 assert.equal(getDb().prepare('SELECT COUNT(*) AS n FROM sessions WHERE token_hash = ?').get(token).n,0);
 auth.revokeSession(token); assert.equal(auth.resolveSession(token),null);
 const login = await auth.login({email:'one@example.test',password:'A strong example password!'});
 getDb().prepare('UPDATE sessions SET expires_at = 0').run();
 assert.equal(auth.resolveSession(login.token),null);
});
test('public registration rejects privilege fields and bad credentials', async () => {
 await assert.rejects(auth.register({name:'Evil',email:'evil@example.test',password:'A strong example password!',role:'staff',consent:true}));
 await assert.rejects(auth.login({email:'one@example.test',password:'wrong'}),/Email or password/);
});
test('mutation origins use explicit trust and deny foreign or absent origins', () => {
 assert.doesNotThrow(()=>auth.checkOrigin(new Request('http://localhost:3000/api/portal',{headers:{origin:'http://localhost:3000'}})));
 assert.throws(()=>auth.checkOrigin(new Request('http://localhost:3000/api/portal',{headers:{origin:'https://evil.test'}})));
 assert.throws(()=>auth.checkOrigin(new Request('http://localhost:3000/api/portal')));
});
test('a throttled account cannot lock unrelated students out', async () => {
 for (let i=0;i<105;i++) await assert.rejects(auth.login({email:'blocked@example.test',password:'incorrect'}));
 const result=await auth.login({email:'one@example.test',password:'A strong example password!'});
 assert.equal(result.user.email,'one@example.test');
});
