'use client';

import { useState } from 'react';
import type { DemoApplication, DemoLead, DemoOpportunity, DemoPanelProps } from '../../lib/demo/types';
import './careers.css';

const statuses: DemoApplication['status'][] = ['applied', 'screening', 'interview', 'offered', 'placed', 'rejected', 'withdrawn'];
const stages: DemoLead['stage'][] = ['new', 'qualified', 'proposal', 'won', 'lost'];
const transitions: Record<DemoApplication['status'], DemoApplication['status'][]> = {
  applied: ['applied', 'screening', 'rejected'], screening: ['screening', 'interview', 'rejected'],
  interview: ['interview', 'offered', 'rejected'], offered: ['offered', 'placed', 'rejected'],
  placed: ['placed'], rejected: ['rejected'], withdrawn: ['withdrawn'],
};
const money = (value: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);
const read = (data: FormData, key: string) => String(data.get(key) ?? '').trim();

function Field({ label, name, value = '', type = 'text', required = false, maxLength = 200 }: {label:string;name:string;value?:string;type?:string;required?:boolean;maxLength?:number}) {
  return <label className="demo-field">{label}<input className="demo-input" name={name} type={type} defaultValue={value} required={required} maxLength={maxLength} /></label>;
}
function Notes({ label, name, value = '', required = false }: {label:string;name:string;value?:string;required?:boolean}) {
  return <label className="demo-field">{label}<textarea className="demo-input" name={name} defaultValue={value} required={required} maxLength={4000} rows={4} /></label>;
}
function ApplicationEditor({ application, state, dispatch }: {application:DemoApplication} & Pick<DemoPanelProps, 'state'|'dispatch'>) {
  const student = state.users.find(item => item.id === application.studentId);
  const opportunity = state.opportunities.find(item => item.id === application.opportunityId);
  return <section className="careers-detail" aria-label="Candidate details">
    <h3>{student?.name ?? 'Unavailable demo profile'}</h3><p className="demo-muted">{student?.college || 'Demo learner'} · {student?.email}</p>
    <p>{student?.bio || 'No profile summary added.'}</p><h4>{opportunity?.title ?? 'Unavailable opportunity'}</h4><p className="demo-muted">{opportunity?.company}</p>
    <h4>Application statement</h4><p className="careers-prose">{application.motivation || 'No statement added.'}</p>
    <form className="demo-form" onSubmit={event => { event.preventDefault(); const data = new FormData(event.currentTarget); dispatch({type:'application.update', payload:{id:application.id,status:read(data,'status'),interviewAt:read(data,'interviewAt'),notes:read(data,'notes')}}); }}>
      <label className="demo-field">Application status<select className="demo-input" name="status" defaultValue={application.status}>{transitions[application.status].map(status => <option key={status}>{status}</option>)}</select></label>
      <Field label="Interview date and time (UTC)" name="interviewAt" type="datetime-local" value={application.interviewAt ? application.interviewAt.slice(0,16) : ''} />
      <Notes label="Placement team notes" name="notes" value={application.notes} />
      <button className="demo-button" type="submit">Save candidate update</button>
    </form>
  </section>;
}
function OpportunityEditor({ opportunity, dispatch, onSaved }: {opportunity?:DemoOpportunity;dispatch:DemoPanelProps['dispatch'];onSaved:()=>void}) {
  return <form className="demo-form careers-detail" onSubmit={event => {event.preventDefault(); const data = new FormData(event.currentTarget); if(dispatch({type:'opportunity.save',payload:{...(opportunity ? {id:opportunity.id} : {}),title:read(data,'title'),company:read(data,'company'),location:read(data,'location'),mode:read(data,'mode'),description:read(data,'description'),open:data.get('open') === 'on'}})) onSaved();}}>
    <h3>{opportunity ? 'Edit opportunity' : 'Create demo opportunity'}</h3>
    <Field label="Role title" name="title" value={opportunity?.title} required /><Field label="Demo company" name="company" value={opportunity?.company} required />
    <Field label="Location" name="location" value={opportunity?.location} required /><Field label="Working mode" name="mode" value={opportunity?.mode} required />
    <Notes label="Role description" name="description" value={opportunity?.description} required />
    <label className="careers-check"><input type="checkbox" name="open" defaultChecked={opportunity?.open ?? true} /> Open for demo applications</label>
    <button className="demo-button" type="submit">Save opportunity</button>
  </form>;
}

export function HRWorkspace({state, dispatch}: DemoPanelProps) {
  const [tab,setTab] = useState('pipeline'); const [filter,setFilter] = useState('all'); const [query,setQuery] = useState(''); const [selected,setSelected] = useState(''); const [opportunityId,setOpportunityId] = useState<string|null>(null);
  const applications = state.applications.filter(application => (tab !== 'placements' || application.status === 'placed') && (filter === 'all' || application.status === filter) && `${state.users.find(user=>user.id === application.studentId)?.name} ${state.opportunities.find(item=>item.id === application.opportunityId)?.title}`.toLowerCase().includes(query.toLowerCase()));
  const current = state.applications.find(item=>item.id === selected);
  return <div className="demo-panel"><div className="demo-heading"><h2>Placement office</h2><p className="demo-muted">Review candidates, coordinate interviews and record demo placements.</p></div>
    <div className="careers-summary"><span><strong>{state.applications.length}</strong> applications</span><span><strong>{state.applications.filter(item=>item.status === 'interview').length}</strong> at interview</span><span><strong>{state.applications.filter(item=>item.status === 'placed').length}</strong> recorded placements</span></div>
    <div className="demo-tabs" aria-label="Placement views">{[['pipeline','Candidate pipeline'],['opportunities','Opportunities'],['placements','Placement records']].map(([id,label])=><button className="demo-button secondary" key={id} aria-pressed={tab===id} onClick={()=>{setTab(id);setFilter('all');setSelected('');}}>{label}</button>)}</div>
    {tab === 'opportunities' ? <><div className="demo-toolbar"><h3>Demo opportunities</h3><button className="demo-button" onClick={()=>setOpportunityId('new')}>Create opportunity</button></div><div className="demo-split"><div className="demo-table-wrap"><table className="demo-table"><thead><tr><th>Role / company</th><th>Location / mode</th><th>Applications</th><th>Status</th><th>Action</th></tr></thead><tbody>{state.opportunities.map(item=><tr key={item.id}><td><strong>{item.title}</strong><br />{item.company}</td><td>{item.location}<br />{item.mode}</td><td>{state.applications.filter(application=>application.opportunityId===item.id).length}</td><td><span className="demo-badge">{item.open ? 'Open' : 'Closed'}</span></td><td><button className="demo-button secondary" onClick={()=>setOpportunityId(item.id)} aria-label={`Edit ${item.title}`}>Edit</button></td></tr>)}</tbody></table>{!state.opportunities.length && <p className="demo-empty">Create an opportunity to start the demo pipeline.</p>}</div>{opportunityId !== null && <OpportunityEditor key={opportunityId} opportunity={state.opportunities.find(item=>item.id===opportunityId)} dispatch={dispatch} onSaved={()=>setOpportunityId(null)} />}</div></> : <><div className="demo-toolbar"><label className="demo-field">Search candidates or roles<input className="demo-input" type="search" value={query} onChange={event=>setQuery(event.target.value)} /></label>{tab === 'pipeline' && <label className="demo-field">Status<select className="demo-input" value={filter} onChange={event=>setFilter(event.target.value)}><option value="all">All statuses</option>{statuses.map(status=><option key={status}>{status}</option>)}</select></label>}</div>
    {tab === 'placements' && <p className="demo-muted">Synthetic placement records derived from applications marked placed; these are not verified employment outcomes.</p>}
    <div className="demo-split"><div className="demo-table-wrap"><table className="demo-table"><thead><tr><th>Candidate</th><th>Opportunity</th><th>Status</th><th>Action</th></tr></thead><tbody>{applications.map(application=><tr key={application.id}><td>{state.users.find(item=>item.id===application.studentId)?.name ?? 'Unavailable profile'}</td><td>{state.opportunities.find(item=>item.id===application.opportunityId)?.title ?? 'Unavailable role'}</td><td><span className="demo-badge">{application.status}</span></td><td><button className="demo-button secondary" aria-label={`Review ${state.users.find(item=>item.id===application.studentId)?.name ?? 'candidate'}`} onClick={()=>setSelected(application.id)}>Review</button></td></tr>)}</tbody></table>{!applications.length && <p className="demo-empty">No candidates match this view.</p>}</div>{current ? <ApplicationEditor key={`${current.id}-${current.status}-${current.interviewAt}-${current.notes}`} application={current} state={state} dispatch={dispatch} /> : <p className="demo-empty">Select a candidate to review their profile and next step.</p>}</div></>}
  </div>;
}

function LeadEditor({lead, dispatch, onSaved}: {lead?:DemoLead;dispatch:DemoPanelProps['dispatch'];onSaved:()=>void}) {
  return <form className="demo-form careers-detail" onSubmit={event=>{event.preventDefault();const data=new FormData(event.currentTarget);if(dispatch({type:'lead.save',payload:{...(lead ? {id:lead.id} : {}),name:read(data,'name'),organization:read(data,'organization'),email:read(data,'email'),kind:read(data,'kind'),stage:read(data,'stage'),value:Number(data.get('value')),notes:read(data,'notes')}})) onSaved();}}>
    <h3>{lead ? 'Edit demo lead' : 'Create demo lead'}</h3><Field label="Demo contact name" name="name" value={lead?.name} required /><Field label="Demo organization" name="organization" value={lead?.organization} required /><Field label="Demo email (use example.test)" name="email" type="email" value={lead?.email} required />
    <label className="demo-field">Organization type<select className="demo-input" name="kind" defaultValue={lead?.kind ?? 'employer'}>{['employer','college','student'].map(kind=><option key={kind}>{kind}</option>)}</select></label>
    <label className="demo-field">Lead stage<select className="demo-input" name="stage" defaultValue={lead?.stage ?? 'new'}>{stages.map(stage=><option key={stage}>{stage}</option>)}</select></label>
    <label className="demo-field">Illustrative value (whole INR)<input className="demo-input" type="number" name="value" min={0} max={100000000} step="1" defaultValue={lead?.value ?? 0} required /></label><Notes label="Relationship notes" name="notes" value={lead?.notes} /><button className="demo-button" type="submit">Save lead</button>
  </form>;
}
export function BusinessWorkspace({state,dispatch}:DemoPanelProps) {
  const [query,setQuery]=useState('');const [stage,setStage]=useState('all');const [kind,setKind]=useState('all');const [selected,setSelected]=useState<string|null>(null);const [tab,setTab]=useState('leads');
  const leads=state.leads.filter(lead=>(tab !== 'partnerships' || lead.stage==='won') && (stage==='all'||lead.stage===stage) && (kind==='all'||lead.kind===kind) && `${lead.name} ${lead.organization} ${lead.email}`.toLowerCase().includes(query.toLowerCase()));
  const active=state.leads.filter(lead=>lead.stage!=='won' && lead.stage!=='lost');
  return <div className="demo-panel"><div className="demo-heading"><h2>Business relationships</h2><p className="demo-muted">Manage synthetic employer, college and student relationships in this browser demo.</p></div>
    <div className="careers-summary"><span><strong>{active.length}</strong> active leads</span><span><strong>{money(active.reduce((total,lead)=>total+lead.value,0))}</strong> illustrative pipeline</span><span><strong>{state.leads.filter(lead=>lead.stage==='won').length}</strong> demo partnerships</span></div>
    <div className="demo-tabs" aria-label="Business views"><button className="demo-button secondary" aria-pressed={tab==='leads'} onClick={()=>{setTab('leads');setStage('all');}}>Lead register</button><button className="demo-button secondary" aria-pressed={tab==='partnerships'} onClick={()=>{setTab('partnerships');setStage('all');}}>Demo partnerships</button></div>
    <div className="demo-toolbar"><label className="demo-field">Search relationships<input className="demo-input" type="search" value={query} onChange={event=>setQuery(event.target.value)} /></label>{tab==='leads' && <label className="demo-field">Stage<select className="demo-input" value={stage} onChange={event=>setStage(event.target.value)}><option value="all">All stages</option>{stages.map(value=><option key={value}>{value}</option>)}</select></label>}<label className="demo-field">Organization type<select className="demo-input" value={kind} onChange={event=>setKind(event.target.value)}><option value="all">All types</option>{['employer','college','student'].map(value=><option key={value}>{value}</option>)}</select></label><button className="demo-button" onClick={()=>setSelected('new')}>Create lead</button></div>
    {tab==='partnerships' && <p className="demo-muted">This sample register shows leads marked won. It does not represent real APK partnerships or agreements.</p>}
    <div className="demo-split"><div className="demo-table-wrap"><table className="demo-table"><thead><tr><th>Relationship</th><th>Type</th><th>Stage</th><th>Illustrative value</th><th>Action</th></tr></thead><tbody>{leads.map(lead=><tr key={lead.id}><td><strong>{lead.organization}</strong><br />{lead.name}<br /><span className="demo-muted">{lead.email}</span></td><td>{lead.kind}</td><td><span className="demo-badge">{lead.stage}</span></td><td>{money(lead.value)}</td><td><button className="demo-button secondary" onClick={()=>setSelected(lead.id)} aria-label={`Edit ${lead.organization}`}>Edit</button></td></tr>)}</tbody></table>{!leads.length && <p className="demo-empty">No relationships match this view. Create a demo lead or adjust the filters.</p>}</div>{selected !== null ? <LeadEditor key={selected} lead={state.leads.find(lead=>lead.id===selected)} dispatch={dispatch} onSaved={()=>setSelected(null)} /> : <p className="demo-empty">Select a relationship to edit its details and stage.</p>}</div>
  </div>;
}
