import { randomUUID } from 'node:crypto';
import { createInterface } from 'node:readline/promises';
import { Writable } from 'node:stream';
import { createUser, findUserByEmail } from '../src/lib/portal/store.ts';
import { hashPassword } from '../src/lib/portal/auth.ts';
// Local administrator bootstrap only. No shipped accounts or default passwords.
if (!process.stdin.isTTY) throw new Error('Run interactively in a trusted terminal; passwords are never accepted in command arguments.');
if (process.env.VERCEL || process.env.NODE_ENV === 'production') throw new Error('This bootstrap command is restricted to local setup.');
let muted = false;
const output = new Writable({write(chunk,encoding,callback){if (!muted) process.stdout.write(chunk,encoding); callback();}});
const rl = createInterface({input:process.stdin,output,terminal:true});
try {
 const name=(await rl.question('Staff name: ')).trim();
 const email=(await rl.question('Staff email: ')).trim().toLowerCase();
 process.stdout.write('Password (12–128 characters, hidden): ');muted=true;
 const password=await rl.question('');muted=false;process.stdout.write('\n');
 if(name.length<2||name.length>100||email.length>254||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))throw new Error('Enter a valid name and email.');
 if(findUserByEmail(email))throw new Error('An account with that email already exists; no role was changed.');
 createUser({id:randomUUID(),name,email,role:'staff',passwordHash:await hashPassword(password)});
 console.log('Staff account created in the configured local database.');
} finally {rl.close();}
