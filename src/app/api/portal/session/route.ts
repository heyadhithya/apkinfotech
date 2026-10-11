import { readSessionCookie, resolveSession } from '../../../../lib/portal/auth';
import { failure, json } from '../../../../lib/portal/http';
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export async function GET(request: Request) {
  try { return json({user:resolveSession(readSessionCookie(request))}); } catch(error) { return failure(error); }
}
