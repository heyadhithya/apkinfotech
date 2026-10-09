import assert from "node:assert/strict";
import { setTimeout } from "node:timers/promises";

const url = process.argv[2] ?? "http://127.0.0.1:3000";
let response;
for (let attempt = 0; attempt < 30; attempt += 1) {
  try {
    response = await fetch(url, { signal: AbortSignal.timeout(5000) });
    break;
  } catch (error) {
    if (attempt === 29) throw error;
    await setTimeout(500);
  }
}
assert.equal(response.status, 200);
const html = await response.text();
assert.match(html, /<main>/);
assert.match(html, /<h1>APK Infotech<\/h1>/);
assert.match(html, /Website in development\./);
assert.match(html, /name="robots" content="noindex, nofollow"/);
console.log(`Smoke OK: ${url}, HTTP 200, starter content and noindex metadata.`);
