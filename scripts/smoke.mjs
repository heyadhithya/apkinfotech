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
assert.match(html, /<main id="main">/);
assert.match(html, /Learn the skills/);
assert.match(html, /From our activity archive/);
assert.match(html, /Full Stack Web Development/);
assert.match(html, /Agentic AI with Gen AI/);
assert.match(html, /apk-official-logo/);
assert.match(html, /No. 65/);
assert.match(html, /official@apkinfotech.in/);
assert.match(html, /Mannivakkam, Chennai/);
assert.match(html, /DevOps &amp; Docker workshop/);
assert.match(html, /These are highlights of past activities/);
assert.match(html, /maps.google.com/);
assert.match(html, /name="robots" content="noindex, nofollow"/);
console.log(
  `Smoke OK: ${url}, HTTP 200, landing page content and noindex metadata.`,
);
