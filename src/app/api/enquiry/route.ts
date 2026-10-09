import { createHash } from "node:crypto";
import { EnquiryRateLimit, validWebhook } from "../../enquiry-security.ts";
import { enquiryCourses, validateEnquiry } from "../../enquiry-validation.ts";

export const runtime = "nodejs";
const limiter = new EnquiryRateLimit();
const response = (status: number, body: object, headers?: HeadersInit) => Response.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });

export async function POST(request: Request) {
  // Next's internal request URL can use the bind address behind a proxy.
  // Browsers cannot forge Host; compare Origin with the actual requested host.
  const url = new URL(request.url);
  const protocol = process.env.VERCEL === "1" ? "https:" : url.protocol;
  const expectedOrigin = `${protocol}//${request.headers.get("host") || url.host}`;
  if (request.headers.get("origin") !== expectedOrigin) return response(403, { message: "Please use the enquiry form on this website." });
  if (request.headers.get("content-type")?.split(";")[0].trim() !== "application/json") return response(415, { message: "Send the enquiry using the website form." });
  // Vercel sets this header. Never trust arbitrary forwarded headers off Vercel.
  const address = process.env.VERCEL === "1" ? request.headers.get("x-vercel-forwarded-for")?.split(",")[0].trim() || "unknown" : "local";
  const key = createHash("sha256").update(address).digest("hex");
  if (!limiter.allow(key)) return response(429, { message: "Please wait a minute before trying again, or contact the team directly." }, { "Retry-After": "60" });
  const reader = request.body?.getReader();
  if (!reader) return response(400, { message: "Your enquiry was empty. Please try again." });
  const chunks: Uint8Array[] = [];
  let size = 0;
  let input: unknown;
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 16384) {
        await reader.cancel();
        return response(413, { message: "This enquiry is too large. Shorten your message and try again." });
      }
      chunks.push(value);
    }
    input = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch { return response(400, { message: "We could not read this enquiry. Please try again." }); }
  const { data, errors } = validateEnquiry(input);
  if (!data) return response(400, { message: "Please check the highlighted fields.", fieldErrors: errors });
  const destination = validWebhook(process.env.ENQUIRY_WEBHOOK_URL);
  if (!destination) return response(503, { code: "unconfigured", message: "Online submission is not configured. Review a WhatsApp draft or use the official registration form." });
  try {
    const upstream = await fetch(destination, {
      method: "POST", redirect: "error", signal: AbortSignal.timeout(8000),
      headers: { "Content-Type": "application/json", ...(process.env.ENQUIRY_WEBHOOK_TOKEN ? { Authorization: `Bearer ${process.env.ENQUIRY_WEBHOOK_TOKEN}` } : {}) },
      body: JSON.stringify({ name: data.name, email: data.email, phone: data.phone, course: data.course, courseTitle: enquiryCourses.find((course) => course.id === data.course)?.title, message: data.message, consent: true, source: "APK Infotech website", submittedAt: new Date().toISOString() }),
    });
    if (!upstream.ok) return response(502, { message: "The contact service could not accept your enquiry. Please try again or use WhatsApp." });
    await upstream.body?.cancel();
    return response(200, { message: "Your enquiry was accepted by APK Infotech’s contact service." });
  } catch { return response(502, { message: "The contact service is unavailable. Please try again or use WhatsApp." }); }
}
