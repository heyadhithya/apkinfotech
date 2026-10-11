'use client';
import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import type { PortalSnapshot } from '../../lib/portal/types';
import { request } from './portal-client';
import StudentPanel from './student-panel';
import StaffPanel from './staff-panel';

export default function Portal() {
  const [data,setData] = useState<PortalSnapshot|null>(null);
  const [loading,setLoading] = useState(true);
  const [mode,setMode] = useState<'login'|'register'>('login');
  const [error,setError] = useState('');
  const [pending,setPending] = useState(false);
  async function refresh() { setData(await request<PortalSnapshot>('/api/portal')); }
  useEffect(()=>{
    let cancelled=false;
    request<{user:unknown}>('/api/portal/session').then(async session=>{
      if (session.user) { const snapshot = await request<PortalSnapshot>('/api/portal'); if (!cancelled) setData(snapshot); }
    }).catch(error=>{if (!cancelled) setError(error.message);}).finally(()=>{if(!cancelled) setLoading(false);});
    return ()=>{cancelled=true;};
  },[]);
  async function authenticate(event:FormEvent<HTMLFormElement>) {
    event.preventDefault();setPending(true);setError('');
    const fields = new FormData(event.currentTarget);
    try {
      await request(`/api/portal/auth/${mode}`,{email:fields.get('email'),password:fields.get('password'),...(mode==='register'?{name:fields.get('name'),consent:fields.get('consent')==='on'}:{})});
      await refresh();
    } catch(error) {setError(error instanceof Error?error.message:'Unable to sign in.');}
    finally {setPending(false);}
  }
  async function logout() {
    setPending(true);setError('');
    try {await request('/api/portal/auth/logout',{});setData(null);} catch(error) {setError(error instanceof Error?error.message:'Unable to sign out.');} finally {setPending(false);}
  }
  return <main id="main" className="portal-root">
    <div className="portal-banner"><div><a href="/portal" className="portal-wordmark">APK <span>Campus</span></a><span className="portal-banner-note">Internships & learning</span></div>{data && <div className="portal-account"><span>{data.user.name} <span className="portal-badge">{data.user.role}</span></span><button className="portal-button portal-button-light" onClick={logout} disabled={pending}>Sign out</button></div>}</div>
    {loading ? <div className="portal-loading" role="status">Opening your workspace…</div> : data ? <div className="portal-workspace">{error && <p className="portal-message portal-error" role="alert">{error}</p>}{data.user.role === 'staff' ? <StaffPanel data={data} onRefresh={refresh}/> : <StudentPanel data={data} onRefresh={refresh}/>}</div> : <div className="portal-entry">
      <section className="portal-welcome"><h1>Your next chapter starts with practice.</h1><p>One place to explore APK internship opportunities, keep track of applications, and work through your learning programme.</p><ol className="portal-journey"><li><strong>Build your profile</strong><span>Tell us what you are learning and where you want to go.</span></li><li><strong>Find your opportunity</strong><span>Apply to available internships and follow every update.</span></li><li><strong>Make steady progress</strong><span>Learn through modules, complete lessons, and submit your work.</span></li></ol><p className="portal-disclaimer">Sample opportunities and lessons are labelled Demo. They are for exploring this portal and do not represent live vacancies or certified programmes.</p></section>
      <section className="portal-auth" aria-labelledby="auth-title"><div className="portal-tabs"><button type="button" aria-pressed={mode==='login'} onClick={()=>{setMode('login');setError('');}}>Sign in</button><button type="button" aria-pressed={mode==='register'} onClick={()=>{setMode('register');setError('');}}>Create account</button></div><h2 id="auth-title">{mode==='login'?'Welcome back':'Make room for your future'}</h2><p className="portal-muted">{mode==='login'?'Sign in to your student or staff workspace.':'Create a student account to apply and start learning.'}</p>
      <form onSubmit={authenticate} className="portal-form">{mode==='register' && <label className="portal-field">Full name<input className="portal-input" name="name" autoComplete="name" minLength={2} maxLength={100} required /></label>}<label className="portal-field">Email address<input className="portal-input" name="email" type="email" autoComplete="email" maxLength={254} required /></label><label className="portal-field">Password<input className="portal-input" name="password" type="password" autoComplete={mode==='login'?'current-password':'new-password'} minLength={mode==='register'?12:1} maxLength={128} required/>{mode==='register' && <small>Use at least 12 characters. A longer passphrase works well.</small>}</label>{mode==='register' && <label className="portal-consent"><input name="consent" type="checkbox" required/><span>I agree to storing my account, profile, applications, and learning activity to operate this portal. <a href="/portal/privacy">Read portal privacy information</a>.</span></label>}{error && <p className="portal-message portal-error" role="alert">{error}</p>}<button type="submit" className="portal-button" disabled={pending}>{pending?'Please wait…':mode==='login'?'Sign in':'Create student account'}</button></form>
      <p className="portal-auth-help">Staff accounts are managed by the administrator. For account access help, contact <a href="mailto:official@apkinfotech.in">official@apkinfotech.in</a>.</p></section>
    </div>}
  </main>;
}
