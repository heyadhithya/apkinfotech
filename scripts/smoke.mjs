import assert from "node:assert/strict";
import { setTimeout } from "node:timers/promises";
import { courses } from "../src/app/course-data.ts";
const url = (process.argv[2] ?? "http://127.0.0.1:3000").replace(/\/$/, "");
let response;
for (let attempt = 0; attempt < 30; attempt++) {
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
for (const value of [
  '<main id="main">',
  "Technical skills.",
  "From our activity archive",
  "Full Stack Web Development",
  "Agentic AI with Gen AI",
  "apk-official-logo",
  "Review WhatsApp draft",
  "No. 65",
  "official@apkinfotech.in",
  "Mannivakkam, Chennai",
  "DevOps &amp; Docker workshop",
  "maps.google.com",
])
  assert.ok(html.includes(value), value);
assert.match(html, /name="robots" content="index, follow"/);
assert.match(
  html,
  /rel="canonical" href="https:\/\/apkinfotech.vercel.app\/?"/,
);
assert.equal(response.headers.get("x-content-type-options"), "nosniff");
for (const course of courses) {
  const page = await fetch(`${url}/courses/${course.id}`);
  assert.equal(page.status, 200, course.id);
  const content = await page.text();
  assert.ok(content.includes(`/enquire?course=${course.id}`));
  assert.ok(content.includes("application/ld+json"));
  assert.ok(content.includes("Information to confirm"));
}
for (const path of [
  "/enquire",
  "/privacy",
  "/terms",
  "/robots.txt",
  "/sitemap.xml",
  "/favicon.ico",
  "/social-preview.png",
])
  assert.equal((await fetch(url + path)).status, 200, path);
assert.equal((await fetch(`${url}/courses/not-a-course`)).status, 404);
const robots = await (await fetch(`${url}/robots.txt`)).text();
assert.match(robots, /Allow: \//);
const sitemap = await (await fetch(`${url}/sitemap.xml`)).text();
assert.equal((sitemap.match(/<loc>/g) || []).length, 11);
console.log(
  "Smoke OK: homepage, 7 course routes, enquiry/legal/SEO/assets, unknown-course404, production indexing/canonical/security header, 11 sitemap URLs.",
);
