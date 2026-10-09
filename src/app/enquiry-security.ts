import { isIP } from "node:net";
export function validWebhook(value: string | undefined): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    if (
      url.protocol !== "https:" ||
      url.username ||
      url.password ||
      isIP(url.hostname.replace(/^\[|\]$/g, "")) ||
      url.hostname.replace(/\.$/, "") === "localhost" ||
      url.hostname.endsWith(".localhost") ||
      url.hostname.endsWith(".local") ||
      url.hostname.endsWith(".internal")
    )
      return null;
    return url.toString();
  } catch {
    return null;
  }
}
export class EnquiryRateLimit {
  private attempts = new Map<string, { count: number; expires: number }>();
  allow(key: string, now = Date.now()) {
    for (const [id, attempt] of this.attempts)
      if (attempt.expires <= now) this.attempts.delete(id);
    const current = this.attempts.get(key);
    if (current && current.count >= 5) return false;
    if (!current && this.attempts.size >= 2000) return false;
    this.attempts.set(
      key,
      current
        ? { ...current, count: current.count + 1 }
        : { count: 1, expires: now + 60000 },
    );
    return true;
  }
}
