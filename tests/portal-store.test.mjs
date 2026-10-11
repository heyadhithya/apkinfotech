import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
process.env.PORTAL_DB_PATH = join(mkdtempSync(join(tmpdir(), 'portal-store-')), 'test.sqlite');
const { createUser, getDb, getSnapshot, mutate, findUserByEmail } = await import('../src/lib/portal/store.ts');
const staff = {id:'staff',name:'Staff',email:'staff@example.test',role:'staff'};
const student = {id:'student',name:'Student',email:'student@example.test',role:'student'};
const other = {id:'other',name:'Other',email:'other@example.test',role:'student'};
for (const user of [staff,student,other]) createUser({...user,passwordHash:'test-hash'});
const denied = fn => assert.throws(fn, error => error.status >= 400);
test('persists users and creates private profiles', () => { assert.equal(findUserByEmail('STUDENT@example.test').id, student.id); assert.equal(getSnapshot(student).profile.userId,student.id); assert.equal(getDb().prepare('SELECT count(*) AS n FROM users').get().n,3); });
test('uses stored role and rejects forged staff',()=>denied(()=>mutate({...student,role:'staff'},'course.save',{title:'Forbidden',description:'No',status:'published'})));
test('application uniqueness, ownership and transitions',()=>{
 mutate(staff,'internship.save',{id:'intern',title:'Demo role',description:'Synthetic opportunity',location:'Online',mode:'Remote',duration:'2 weeks',deadline:'2099-01-01',status:'published',isDemo:true});
 mutate(student,'application.submit',{internshipId:'intern',motivation:'I want to learn.'});
 denied(()=>mutate(student,'application.submit',{internshipId:'intern',motivation:'Again'}));
 const app=getSnapshot(student).applications[0]; denied(()=>mutate(other,'application.withdraw',{id:app.id}));
 mutate(staff,'application.review',{id:app.id,status:'accepted'}); denied(()=>mutate(student,'application.withdraw',{id:app.id})); assert.equal(getSnapshot(other).applications.length,0);
});
test('enrollment gates content, ordered completion and private assignments',()=>{
 mutate(staff,'course.save',{id:'course',title:'Demo course',description:'Synthetic course',status:'published'});
 mutate(staff,'module.save',{id:'module',courseId:'course',title:'Basics',position:1});
 for (let i=1;i<=2;i++) mutate(staff,'lesson.save',{id:`lesson${i}`,moduleId:'module',title:`Lesson ${i}`,content:'Useful content',position:i,assignment:'Write a reflection'});
 assert.equal(getSnapshot(student).lessons.length,0); denied(()=>mutate(student,'lesson.complete',{lessonId:'lesson1'}));
 mutate(student,'enrollment.create',{courseId:'course'}); mutate(student,'enrollment.create',{courseId:'course'}); assert.equal(getSnapshot(student).enrollments.length,1);
 denied(()=>mutate(student,'lesson.complete',{lessonId:'lesson2'})); denied(()=>mutate(student,'submission.save',{lessonId:'lesson2',content:'Early'}));
 mutate(student,'lesson.complete',{lessonId:'lesson1'}); mutate(student,'submission.save',{lessonId:'lesson2',content:'My reflection'});
 const sub=getSnapshot(student).submissions[0]; denied(()=>mutate(other,'submission.review',{id:sub.id,feedback:'Forged'})); mutate(staff,'submission.review',{id:sub.id,feedback:'Good work'}); assert.equal(getSnapshot(student).submissions[0].status,'reviewed'); assert.equal(getSnapshot(other).submissions.length,0);
 mutate(staff,'course.save',{id:'course',title:'Demo course',description:'Synthetic course',status:'draft'}); assert.equal(getSnapshot(student).lessons.length,0); denied(()=>mutate(student,'lesson.complete',{lessonId:'lesson2'})); denied(()=>mutate(other,'enrollment.create',{courseId:'course'}));
});
test('rejects malformed fields and invalid calendar deadlines',()=>{ denied(()=>mutate(student,'profile.save',{college:42})); denied(()=>mutate(staff,'internship.save',{title:'Bad',description:'Bad',location:'X',mode:'X',duration:'X',deadline:'2026-02-30',status:'published'})); });
test('rejects unexpected identity fields and stale closed application forms',()=>{
 denied(()=>mutate(student,'profile.save',{role:'staff'})); denied(()=>mutate(student,'enrollment.create',{courseId:'course',userId:'other'}));
 mutate(staff,'internship.save',{id:'intern',title:'Demo role',description:'Synthetic opportunity',location:'Online',mode:'Remote',duration:'2 weeks',deadline:'2099-01-01',status:'closed'});
 denied(()=>mutate(other,'application.submit',{internshipId:'intern',motivation:'Stale form'}));
});
test('curriculum edits require newly preceding lessons and forbid moving lessons across modules',()=>{
 mutate(staff,'course.save',{id:'course',title:'Demo course',description:'Synthetic course',status:'published'});
 mutate(staff,'lesson.save',{id:'lesson0',moduleId:'module',title:'New prerequisite',content:'Foundation',position:0,assignment:''});
 denied(()=>mutate(student,'lesson.complete',{lessonId:'lesson2'}));
 mutate(student,'lesson.complete',{lessonId:'lesson0'}); mutate(student,'lesson.complete',{lessonId:'lesson2'});
 mutate(staff,'module.save',{id:'module2',courseId:'course',title:'Other module',position:2});
 denied(()=>mutate(staff,'lesson.save',{id:'lesson2',moduleId:'module2',title:'Moved',content:'Content',position:1,assignment:''}));
});
test('demo seed is opt-in, labelled, password-free and idempotent',async()=>{
 const {spawnSync}=await import('node:child_process');
 for(let i=0;i<2;i++){const result=spawnSync(process.execPath,['scripts/portal-seed.mjs'],{cwd:process.cwd(),env:process.env,encoding:'utf8'});assert.equal(result.status,0,result.stderr);}
 assert.equal(getDb().prepare('SELECT count(*) AS n FROM internships WHERE isDemo=1').get().n,3);
 assert.equal(getDb().prepare('SELECT count(*) AS n FROM courses WHERE isDemo=1').get().n,2);
 assert.equal(getDb().prepare('SELECT count(*) AS n FROM users').get().n,3);
});
test('database survives a fresh process and production storage fails closed',async()=>{
 const {spawnSync}=await import('node:child_process');
 const source="import {findUserById} from './src/lib/portal/store.ts'; console.log(findUserById('student').email)";
 const durable=spawnSync(process.execPath,['--input-type=module','-e',source],{env:process.env,encoding:'utf8'});
 assert.equal(durable.status,0,durable.stderr);assert.equal(durable.stdout.trim(),'student@example.test');
 for(const env of [{...process.env,VERCEL:'1'},{...process.env,NODE_ENV:'production',PORTAL_DB_PATH:''}]){
 const result=spawnSync(process.execPath,['--input-type=module','-e',"import {getDb} from './src/lib/portal/store.ts'; getDb()"],{env,encoding:'utf8'});
 assert.notEqual(result.status,0);assert.match(result.stderr,/persistent storage/);
 }
});
test('separate processes cannot create duplicate applications',async()=>{
 mutate(staff,'internship.save',{id:'intern',title:'Demo role',description:'Synthetic opportunity',location:'Online',mode:'Remote',duration:'2 weeks',deadline:'2099-01-01',status:'published'});
 const {spawn}=await import('node:child_process');
 const source="import {mutate,findUserById} from './src/lib/portal/store.ts'; try {mutate(findUserById('other'),'application.submit',{internshipId:'intern',motivation:'Concurrent application'}); console.log('created')} catch(e) {if(e.status!==409) throw e; console.log('duplicate')}";
 const submit=()=>new Promise((resolve,reject)=>{const child=spawn(process.execPath,['--input-type=module','-e',source],{env:process.env});let out='',err='';child.stdout.on('data',x=>out+=x);child.stderr.on('data',x=>err+=x);child.on('error',reject);child.on('close',code=>code===0?resolve(out.trim()):reject(new Error(err)));});
 assert.deepEqual((await Promise.all([submit(),submit()])).sort(),['created','duplicate']);
 assert.equal(getSnapshot(other).applications.length,1);
});
test('inherited object action names never succeed',()=>{
 for(const action of ['toString','constructor','__proto__']) denied(()=>mutate(student,action,{}));
});
test('demo flags can be changed explicitly and are preserved on omitted edits',()=>{
 mutate(staff,'course.save',{id:'flags',title:'Flags',description:'Flags',status:'draft',isDemo:true});
 mutate(staff,'course.save',{id:'flags',title:'Flags edit',description:'Flags',status:'draft'});
 assert.equal(getSnapshot(staff).courses.find(x=>x.id==='flags').isDemo,true);
 mutate(staff,'course.save',{id:'flags',title:'Flags edit',description:'Flags',status:'draft',isDemo:false});
 assert.equal(getSnapshot(staff).courses.find(x=>x.id==='flags').isDemo,false);
 mutate(staff,'internship.save',{id:'intern',title:'Role',description:'Opportunity',location:'Online',mode:'Remote',duration:'2 weeks',deadline:'2099-01-01',status:'draft',isDemo:false});
 assert.equal(getSnapshot(staff).internships.find(x=>x.id==='intern').isDemo,false);
});
test('students retain applied unpublished opportunities and staff see applicant profile',()=>{
 mutate(staff,'internship.save',{id:'intern',title:'Role',description:'Opportunity',location:'Online',mode:'Remote',duration:'2 weeks',deadline:'2099-01-01',status:'draft'});
 mutate(student,'profile.save',{college:'Test college',discipline:'Computing',graduationYear:'2027',phone:'',bio:'Profile context',portfolioUrl:'https://example.test'});
 assert.equal(getSnapshot(student).internships.find(x=>x.id==='intern').status,'draft');
 assert.equal(getSnapshot(other).internships.find(x=>x.id==='intern').status,'draft');
 assert.equal(getSnapshot(staff).applications.find(x=>x.userId==='student').studentProfile.college,'Test college');
 assert.equal(getSnapshot(student).applications[0].studentProfile,undefined);
});
