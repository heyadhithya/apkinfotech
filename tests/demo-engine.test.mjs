import test from 'node:test';

import assert from 'node:assert/strict';

import {seedDemo, applyAction} from '../src/lib/demo/engine.ts';

const act=(s,u,type,payload)=>applyAction(s,u,{type,payload});

test('seed contains complete fictional records and independent snapshots',()=>{
const s=seedDemo();
 assert.equal(s.users.length,9);
 assert.equal(s.courses.length,3);
 assert.equal(s.opportunities.length,2);
assert.equal(s.leads.length,5);
assert.equal(s.invoices.length,4);
assert.equal(s.projects.length,4);
s.users[0].name='Changed';
assert.notEqual(seedDemo().users[0].name,'Changed');
assert.ok(s.users.every(u=>u.email.endsWith('.example.test')));
});

test('roles come from active current identities and cannot be spoofed',()=>{
let s=seedDemo();
 assert.throws(()=>act(s,'demo-student','course.save',{title:'Spoof',role:'staff'}),/permission/i);
s.users.find(u=>u.id==='demo-staff').active=false;
assert.throws(()=>act(s,'demo-staff','course.save',{}),/inactive/i);
assert.throws(()=>act(s,'unknown','profile.save',{}),/identity/i);
assert.throws(()=>act(seedDemo(),'demo-admin','lead.save',{}),/permission/i);
});

test('enrollment is immutable and idempotent; learning must follow lesson order',()=>{
let s=seedDemo();
const c=s.courses.find(c=>c.published);
const lessons=s.modules.filter(m=>m.courseId===c.id).sort((a,b)=>a.position-b.position).flatMap(m=>s.lessons.filter(l=>l.moduleId===m.id).sort((a,b)=>a.position-b.position));
s.enrollments=[];
s.completions=[];
const original=structuredClone(s);
assert.throws(()=>act(s,'demo-student','complete',{lessonId:lessons[0].id}),/enroll/i);
let n=act(s,'demo-student','enroll',{courseId:c.id});
assert.deepEqual(s,original);
n=act(n,'demo-student','enroll',{courseId:c.id});
assert.equal(n.enrollments.length,1);
assert.throws(()=>act(n,'demo-student','complete',{lessonId:lessons[1].id}),/previous/i);
n=act(n,'demo-student','complete',{lessonId:lessons[0].id});
n=act(n,'demo-student','complete',{lessonId:lessons[0].id});
assert.equal(n.completions.length,1);
n=act(n,'demo-student','submit',{lessonId:lessons[0].id,content:'A fictional assignment response.'});
const submission=n.submissions.find(x=>x.userId==='demo-student'&&x.lessonId===lessons[0].id);
n=act(n,'demo-staff','submission.review',{id:submission.id,feedback:'Clear fictional response.'});
assert.equal(n.submissions.find(x=>x.id===submission.id).status,'reviewed');
assert.throws(()=>act(n,'demo-student','enroll',{courseId:s.courses.find(c=>!c.published).id}),/published/i);
});

test('student profile and applications remain owned and interviews require valid dates',()=>{
let s=seedDemo();
s=act(s,'demo-student','profile.save',{college:'Demo college',bio:'Fictional learner',id:'demo-staff'});
assert.equal(s.users.find(x=>x.id==='demo-student').college,'Demo college');
const o=s.opportunities[1];
s.applications=s.applications.filter(x=>x.studentId!=='demo-student');
s=act(s,'demo-student','apply',{opportunityId:o.id,motivation:'Practice application'});
assert.throws(()=>act(s,'demo-student','apply',{opportunityId:o.id,motivation:'Again'}),/already/i);
const a=s.applications.find(x=>x.studentId==='demo-student');
assert.throws(()=>act(s,'demo-student-2','application.withdraw',{id:a.id}),/own/i);
assert.throws(()=>act(s,'demo-hr','application.update',{id:a.id,status:'interview',interviewAt:'invalid',notes:'Demo'}),/date/i);
s=act(s,'demo-hr','application.update',{id:a.id,status:'screening',notes:'Demo shortlist'});
s=act(s,'demo-hr','application.update',{id:a.id,status:'interview',interviewAt:'2026-10-15T10:00:00Z',notes:'Demo interview'});
s=act(s,'demo-hr','application.update',{id:a.id,status:'offered',notes:'Fictional offer'});
s=act(s,'demo-hr','application.update',{id:a.id,status:'placed',notes:'Fictional placement'});
assert.equal(s.applications.find(x=>x.id===a.id).notes,'Fictional placement');
assert.throws(()=>act(s,'demo-student','application.withdraw',{id:a.id}),/withdraw/i);
});

test('academic managers maintain curriculum and cannot elevate student identities',()=>{
let s=seedDemo();
s=act(s,'demo-staff','course.save',{title:'Demo new course',category:'Practice',description:'Fictional curriculum',published:true});
const c=s.courses.at(-1);
s=act(s,'demo-staff','module.save',{courseId:c.id,title:'Demo module',position:1});
s=act(s,'demo-staff','lesson.save',{moduleId:s.modules.at(-1).id,title:'Demo lesson',content:'Practice content',position:1,assignment:'Practice task'});
assert.equal(s.lessons.at(-1).moduleId,s.modules.at(-1).id);
assert.throws(()=>act(s,'demo-staff','user.save',{...s.users[0],role:'admin'}),/student/i);
assert.throws(()=>act(s,'demo-staff','user.save',{...s.users.find(x=>x.id==='demo-cfo')}),/student/i);
s=act(s,'demo-staff','user.save',{...s.users[0],name:'Demo updated learner'});
assert.equal(s.users[0].name,'Demo updated learner');
});

test('finance validates integer amounts and final invoice transitions',()=>{
let s=seedDemo();
const draft=s.invoices.find(x=>x.status==='draft');
assert.throws(()=>act(s,'demo-cfo','invoice.save',{...draft,amount:1.5}),/whole/i);
assert.throws(()=>act(s,'demo-cfo','expense.save',{description:'Demo',category:'Ops',amount:-1,date:'2026-10-11'}),/positive/i);
assert.throws(()=>act(s,'demo-cfo','invoice.save',{...draft,status:'paid'}),/transition/i);
s=act(s,'demo-cfo','invoice.save',{...draft,status:'sent'});
s=act(s,'demo-cfo','invoice.save',{...draft,status:'paid'});
assert.throws(()=>act(s,'demo-cfo','invoice.save',{...draft,status:'draft'}),/transition/i);
s=act(s,'demo-cfo','expense.save',{description:'Demo room',category:'Facilities',amount:500,date:'2026-10-11'});
assert.equal(s.expenses.at(-1).amount,500);
});

test('business and technical workflows validate records and log each successful action',()=>{
let s=seedDemo();
const before=s.events.length;
s=act(s,'demo-cbo','lead.save',{name:'Demo lead',organization:'Demo employer Z',email:'contact@employer.example.test',stage:'qualified',value:1000,notes:'Fictional contact',kind:'employer'});
s=act(s,'demo-cto','project.save',{title:'Demo deliverable',ownerId:'demo-staff',status:'review',priority:'high',notes:'Practice review'});
assert.equal(s.events.length,before+2);
assert.equal(s.events.at(-1).actorId,'demo-cto');
assert.throws(()=>act(s,'demo-cto','project.save',{title:'Demo',ownerId:'missing',status:'complete',priority:'normal',notes:''}),/owner/i);
assert.throws(()=>act(s,'demo-cbo','lead.save',{...s.leads[0],stage:'garbage'}),/stage/i);
assert.throws(()=>act(s,'demo-student','profile.save',{college:'x'.repeat(201),bio:''}),/length/i);
});

test('administration preserves last active admin and only accepts synthetic unique emails',()=>{
let s=seedDemo();
const admin=s.users.find(x=>x.id==='demo-admin');
assert.throws(()=>act(s,'demo-admin','user.save',{...admin,active:false}),/last active/i);
assert.throws(()=>act(s,'demo-admin','user.save',{...admin,role:'student'}),/last active/i);
assert.throws(()=>act(s,'demo-admin','user.save',{name:'Demo user',email:'real@gmail.com',role:'student',active:true,college:'',bio:''}),/example.test/i);
s=act(s,'demo-admin','user.save',{name:'Demo second admin',email:'admin2@demo.example.test',role:'admin',active:true,college:'',bio:''});
s=act(s,'demo-admin','user.save',{...admin,active:false});
assert.equal(s.users.find(x=>x.id===admin.id).active,false);
});

test('permission boundary denies every unrelated role and inherited action names',()=>{
const s=seedDemo();
const allowed={'profile.save':['student'],enroll:['student'],complete:['student'],submit:['student'],'submission.review':['staff'],'course.save':['staff'],'module.save':['staff'],'lesson.save':['staff'],'opportunity.save':['hr'],apply:['student'],'application.update':['hr'],'application.withdraw':['student'],'lead.save':['cbo'],'invoice.save':['cfo'],'expense.save':['cfo'],'project.save':['cto'],'user.save':['admin','staff']};
for(const [type,roles] of Object.entries(allowed)) for(const role of ['student','staff','hr','admin','cto','cfo','cbo']) if(!roles.includes(role)) assert.throws(()=>act(s,`demo-${role}`,type,{}),/permission/i);
for(const type of ['toString','constructor','__proto__','bogus'])assert.throws(()=>act(s,'demo-admin',type,{}),/permission/i);
});

test('invalid dates cannot roll over and timezone-free interview input is stored in UTC',()=>{
let s=seedDemo();
assert.throws(()=>act(s,'demo-cfo','expense.save',{description:'Demo expense',category:'Practice',amount:1,date:'2026-02-30'}),/date/i);
const a=s.applications[0];
assert.throws(()=>act(s,'demo-hr','application.update',{id:a.id,status:'interview',interviewAt:'2026-10-15T24:00'}),/date/i);
s=act(s,'demo-hr','application.update',{id:a.id,status:'interview',interviewAt:'2026-10-15T10:30'});
assert.equal(s.applications[0].interviewAt,'2026-10-15T10:30:00.000Z');
});

test('HR saves closed fictional opportunity and rejected changes leave original untouched',()=>{
let s=seedDemo();
const original=structuredClone(s);
assert.throws(()=>act(s,'demo-hr','opportunity.save',{...s.opportunities[0],open:'yes'}),/true or false/i);
assert.deepEqual(s,original);
s=act(s,'demo-hr','opportunity.save',{...s.opportunities[1],open:false});
assert.throws(()=>act(s,'demo-student','apply',{opportunityId:s.opportunities[1].id,motivation:'Demo practice'}),/closed/i);
const a=s.applications[0];
s=act(s,'demo-student','application.withdraw',{id:a.id});
assert.equal(s.applications[0].status,'withdrawn');
assert.throws(()=>act(s,'demo-hr','application.update',{id:a.id,status:'screening'}),/transition/i);
});

test('curriculum cannot be moved across parents, and prerequisites span modules',()=>{
const s=seedDemo();
const first=s.lessons[0],third=s.lessons[2];
assert.throws(()=>act(s,'demo-student','complete',{lessonId:third.id}),/previous/i);
assert.throws(()=>act(s,'demo-staff','lesson.save',{...first,moduleId:s.modules[1].id}),/move/i);
assert.throws(()=>act(s,'demo-staff','module.save',{...s.modules[0],courseId:s.courses[1].id}),/move/i);
assert.throws(()=>act(s,'demo-staff','course.save',{...s.courses[0],image:'https://fake.test/photo.jpg'}),/archive/i);
});

