'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Arrow from '../arrow';
import { seedDemo, applyAction } from '../../lib/demo/engine';
import { demoRoles, type DemoAction, type DemoState } from '../../lib/demo/types';
import { StudentWorkspace, AcademicWorkspace } from './academics';
import { HRWorkspace, BusinessWorkspace } from './careers';
import { TechnologyWorkspace, AdminWorkspace, FinanceWorkspace } from './operations';
import './demo.css';
const storageKey='apk-platform-demo-v1';
function Logo(){return <a className="demo-logo" href="/demo" aria-label="APK Infotech demo home"><Image src="/images/apk-platform-mark.svg" alt="" width={44} height={44}/><span><strong>APK INFOTECH</strong><small>Learning. Talent. Possibility.</small></span></a>}
export default function DemoApp(){
 const [state,setState]=useState<DemoState>(()=>seedDemo());
 const [userId,setUserId]=useState('');
 const [ready,setReady]=useState(false);
 const [notice,setNotice]=useState('');
 const [error,setError]=useState('');
 const [resetOpen,setResetOpen]=useState(false);
 const resetDialog=useRef<HTMLDialogElement>(null);
 useEffect(()=>{if(resetOpen)resetDialog.current?.showModal();},[resetOpen]);
 useEffect(()=>{
  const frame=requestAnimationFrame(()=>{
  try{const raw=sessionStorage.getItem(storageKey);if(raw){const saved=JSON.parse(raw);if(saved.state?.version===1&&['users','courses','modules','lessons','enrollments','completions','submissions','opportunities','applications','leads','invoices','expenses','projects','events'].every(key=>Array.isArray(saved.state[key]))){setState(saved.state);setUserId(typeof saved.userId==='string'?saved.userId:'');}}}catch{setError('Your previous demo session could not be restored. A fresh workspace is ready.');}
  setReady(true);
  });
  return ()=>cancelAnimationFrame(frame);
 },[]);
 const user=state.users.find(item=>item.id===userId&&item.active);
 function persist(next:DemoState,id:string){try{sessionStorage.setItem(storageKey,JSON.stringify({state:next,userId:id}));return true;}catch{setError('Browser storage is unavailable. Changes work here but will reset on reload.');return false;}}
 function enter(id:string){setUserId(id);setError('');persist(state,id);setNotice('');window.scrollTo({top:0});}
 function dispatch(action:DemoAction){
  if(!user)return false;
  try{const next=applyAction(state,user.id,action);setState(next);setError('');const saved=persist(next,user.id);setNotice(saved?'Saved to this demo session.':'Demo updated in memory.');return true;}catch(cause){setNotice('');setError(cause instanceof Error?cause.message:'This change could not be saved.');return false;}
 }
 function reset(){const next=seedDemo();setState(next);setUserId('');persist(next,'');setResetOpen(false);setNotice('Demo reset. All sample records are restored.');setError('');}
 const roles=demoRoles;
 const panelProps=user?{state,user,dispatch}:null;
 return <main id="main" className={`demo-root ${user?'demo-authenticated':''}`}>
   <div className="demo-evaluation"><span>PRE-PRODUCTION DEMO</span><p>Real company. Sample accounts and records. Changes stay in this browser tab.</p><button onClick={()=>setResetOpen(true)}>Reset demo</button></div>
   <header className="demo-header"><Logo/><nav aria-label="Platform navigation"><a href={user?'#workspace':'#explore'}>{user?'Your workspace':'Explore the platform'}</a><a href="https://apkinfotech.in/" target="_blank" rel="noreferrer">Company website <span aria-hidden="true"><Arrow diagonal/></span></a>{user&&<button className="demo-button secondary" onClick={()=>enter('')}>Switch role</button>}</nav></header>
   {resetOpen&&<dialog ref={resetDialog} className="demo-reset" onCancel={()=>setResetOpen(false)} aria-label="Reset demo confirmation"><div><h2>Start a fresh session?</h2><p>This removes your demo edits and restores the original sample records. No company or production data is affected.</p><div className="demo-toolbar"><button className="demo-button" onClick={reset}>Reset sample data</button><button className="demo-button secondary" autoFocus onClick={()=>setResetOpen(false)}>Keep my changes</button></div></div></dialog>}
   {error&&<p className="demo-notice demo-error" role="alert">{error}</p>}{notice&&<p className="demo-notice" role="status">{notice}</p>}
   {!ready?<p className="demo-loading" role="status">Preparing your workspace…</p>:!user?<>
    <section className="demo-hero"><div className="demo-hero-copy"><div className="demo-hero-rule"/><h1>Build skills.<br/>Find your place.<br/><em>Go further.</em></h1><p>A connected home for technical learning, career opportunities, and the people making them happen.</p><a className="demo-button" href="#explore">Choose your workspace <span aria-hidden="true"><Arrow diagonal/></span></a><div className="demo-hero-foot"><span>APK Infotech IT Solutions Pvt Ltd</span><span>Mannivakkam, Chennai</span></div></div><figure className="demo-hero-image"><Image src="/images/workshop-presentation.webp" alt="An instructor speaking at a past APK Infotech workshop" width={1080} height={1200} priority/><figcaption><span>Learning in practice</span>From the APK Infotech activity archive</figcaption></figure></section>
    <section className="demo-role-section" id="explore"><div className="demo-section-intro"><h2>One platform.<br/><em>Every perspective.</em></h2><p>Choose a sample role to explore its workspace. No password, signup or real credentials required.</p></div><div className="demo-role-list">{roles.map((role)=>{const person=state.users.find(item=>item.role===role.id&&item.active);return <button className="demo-role-entry" key={role.id} disabled={!person} onClick={()=>person&&enter(person.id)}><span><strong>{role.title}</strong><small>{role.description}</small></span><span className="demo-role-arrow" aria-hidden="true"><Arrow diagonal/></span></button>})}</div></section>
    <section className="demo-principle"><h2>From a first lesson<br/>to a <em>next opportunity.</em></h2><div><p>For learners, a clear path through courses and applications. For teams, a shared view of learning, placement and business operations.</p><p className="demo-muted">This evaluation connects synthetic records across seven roles. It does not send messages, process payments or modify company systems.</p></div></section>
   </>:<div className="demo-workspace" id="workspace"><aside className="demo-sidebar"><p className="demo-sidebar-title">Your workspace</p><div className="demo-user"><span className="demo-avatar">{user.name.split(' ').slice(0,2).map(word=>word[0]).join('')}</span><div><strong>{user.name}</strong><small>{roles.find(role=>role.id===user.role)?.title}</small></div></div><p className="demo-sidebar-caption">SAMPLE IDENTITY</p><nav aria-label="Demo role workspaces">{roles.map(role=>{const person=state.users.find(item=>item.role===role.id&&item.active);return <button key={role.id} aria-current={role.id===user.role?'page':undefined} disabled={!person} onClick={()=>person&&enter(person.id)}>{role.title}<span aria-hidden="true">{role.id===user.role?'•':<Arrow diagonal/>}</span></button>})}</nav><div className="demo-sidebar-note"><strong>Made for evaluation</strong><p>Edits persist on reload in this tab. Reset restores sample data. Do not enter real personal or financial information.</p></div></aside><section className="demo-content" aria-label="Role workspace">{panelProps&&(user.role==='student'?<StudentWorkspace {...panelProps}/>:user.role==='staff'?<AcademicWorkspace {...panelProps}/>:user.role==='hr'?<HRWorkspace {...panelProps}/>:user.role==='cbo'?<BusinessWorkspace {...panelProps}/>:user.role==='cto'?<TechnologyWorkspace {...panelProps}/>:user.role==='cfo'?<FinanceWorkspace {...panelProps}/>:<AdminWorkspace {...panelProps}/>)}</section></div>}
   <footer className="demo-footer"><Logo/><div><strong>APK Infotech IT Solutions Pvt Ltd</strong><p>No. 65, 5th Street, Ram Nagar, Mannivakkam, Chennai 600048</p><a href="mailto:official@apkinfotech.in">official@apkinfotech.in</a></div><p>Pre-production platform<br/>Synthetic operational data</p></footer>
 </main>;
}
