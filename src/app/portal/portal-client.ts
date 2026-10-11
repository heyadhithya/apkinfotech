import type { PortalAction, PortalPayload } from '../../lib/portal/types';
export async function request<T>(path: string, body?: unknown): Promise<T> {
  const response = await fetch(path,{method:body === undefined ? 'GET' : 'POST',credentials:'same-origin',cache:'no-store',headers:body === undefined ? {} : {'Content-Type':'application/json'},...(body === undefined ? {} : {body:JSON.stringify(body)})});
  const data = await response.json().catch(()=>({error:'The server returned an unreadable response. Please retry.'}));
  if (!response.ok) throw new Error(data.error || 'This request could not be completed.');
  return data as T;
}
export async function mutate(action: PortalAction, payload: PortalPayload): Promise<void> {
  await request('/api/portal',{action,payload});
}
