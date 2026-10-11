import assert from 'node:assert/strict';
import {setTimeout as delay} from 'node:timers/promises';
const base=(process.argv[2]||'http://localhost:3001').replace(/\/$/,'');
for(let attempt=0;attempt<30;attempt++){try{if((await fetch(base)).ok)break;}catch{}await delay(300);}
for(const path of ['/','/demo']){const response=await fetch(base+path);assert.equal(response.status,200);const html=await response.text();assert.match(html,/PRE-PRODUCTION DEMO/);assert.match(html,/noindex/);assert.equal(response.headers.get('set-cookie'),null);}
assert.equal((await fetch(base+'/images/apk-platform-mark.svg')).status,200);
const realAuth=await fetch(base+'/api/portal/auth/register',{method:'POST',headers:{Origin:base,'Content-Type':'application/json'},body:JSON.stringify({name:'Must not create',email:'disabled@example.test',password:'not-a-real-credential',consent:true})});assert.equal(realAuth.status,503,'Real database-backed auth must remain disabled without persistent backend');
console.log('Demo smoke OK: home/demo render, noindex, new logo, no auth cookies, real registration fails closed.');
