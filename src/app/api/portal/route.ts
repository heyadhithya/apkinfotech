import { checkOrigin, rateLimit, readSessionCookie, resolveSession } from '../../../lib/portal/auth';
import { getSnapshot, mutate, PortalError } from '../../../lib/portal/store';
import { failure, json, readJson } from '../../../lib/portal/http';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
function requireUser(request: Request) {
  const user = resolveSession(readSessionCookie(request));
  if (!user) throw new PortalError(401,'Sign in to access the portal.');
  return user;
}
export async function GET(request: Request) {
  try { return json(getSnapshot(requireUser(request))); } catch(error) { return failure(error); }
}
export async function POST(request: Request) {
  try {
    checkOrigin(request); const user = requireUser(request);
    rateLimit(`mutation:${user.id}`,300,900);
    const body = await readJson(request);
    if (Object.keys(body).some(key=>!['action','payload'].includes(key)) || typeof body.action !== 'string' || !body.payload || typeof body.payload !== 'object' || Array.isArray(body.payload)) throw new PortalError(400,'Choose a valid portal action.');
    mutate(user,body.action,body.payload as Record<string,unknown>);
    return json({ok:true});
  } catch(error) { return failure(error); }
}
