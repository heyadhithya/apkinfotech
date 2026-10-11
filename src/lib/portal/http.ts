import { PortalError } from './store.ts';
export async function readJson(request: Request): Promise<Record<string,unknown>> {
  if (request.headers.get('content-type')?.split(';')[0] !== 'application/json') throw new PortalError(415,'Send JSON using the portal form.');
  const reader = request.body?.getReader();
  if (!reader) throw new PortalError(400,'Request body is missing.');
  const chunks: Uint8Array[] = []; let length = 0;
  while (true) {
    const {done,value} = await reader.read(); if (done) break;
    length += value.length;
    if (length > 65536) { await reader.cancel(); throw new PortalError(413,'The request is too large. Shorten the content and retry.'); }
    chunks.push(value);
  }
  try {
    const value = JSON.parse(Buffer.concat(chunks).toString('utf8'));
    if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error();
    return value;
  } catch { throw new PortalError(400,'The request could not be read.'); }
}
export function json(body: unknown, status = 200, extra: Record<string,string> = {}) {
  return Response.json(body,{status,headers:{'Cache-Control':'no-store, private','Vary':'Cookie','X-Robots-Tag':'noindex, nofollow',...extra}});
}
export function failure(error: unknown) {
  if (error instanceof PortalError) return json({error:error.message},error.status);
  return json({error:'The portal could not save or load this request. Please retry.'},500);
}
