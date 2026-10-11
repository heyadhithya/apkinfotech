import { checkOrigin, cookieHeader, login, readSessionCookie, register, revokeSession } from '../../../../../lib/portal/auth';
import { failure, json, readJson } from '../../../../../lib/portal/http';
import { PortalError } from '../../../../../lib/portal/store';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export async function POST(request: Request, {params}:{params:Promise<{action:string}>}) {
  try {
    checkOrigin(request);
    const {action} = await params;
    if (action === 'logout') { revokeSession(readSessionCookie(request)); return json({ok:true},200,{'Set-Cookie':cookieHeader('',true)}); }
    if (action !== 'login' && action !== 'register') throw new PortalError(404,'Unknown account action.');
    const body = await readJson(request);
    const result = action === 'register' ? await register(body) : await login(body);
    // Rotate any previous session after a successful authentication.
    revokeSession(readSessionCookie(request));
    return json({user:result.user},200,{'Set-Cookie':cookieHeader(result.token)});
  } catch(error) { return failure(error); }
}
