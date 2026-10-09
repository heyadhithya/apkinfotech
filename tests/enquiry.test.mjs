import test from "node:test";
import assert from "node:assert/strict";
import {
  validateEnquiry,
  enquiryDraft,
} from "../src/app/enquiry-validation.ts";
import { validWebhook, EnquiryRateLimit } from "../src/app/enquiry-security.ts";
const valid = {
  name: "A Learner",
  email: "learner@example.com",
  phone: "+91 98765 43210",
  course: "get",
  message: "Please share the syllabus.",
  consent: true,
  website: "",
};
test("enquiries validate contact, course, consent, length and honeypot", () => {
  assert.ok(validateEnquiry(valid).data);
  for (const [key, value] of Object.entries({
    name: "a",
    email: "bad",
    phone: "abc",
    course: "made-up",
    message: "a".repeat(2001),
    consent: "true",
    website: "spam",
  }))
    assert.ok(validateEnquiry({ ...valid, [key]: value }).errors[key], key);
  assert.ok(validateEnquiry(null).errors.name);
  assert.ok(
    validateEnquiry({ ...valid, phone: "", course: "internships" }).data,
  );
});
test("draft retains the verified programme and user supplied content", () => {
  const draft = enquiryDraft(validateEnquiry(valid).data);
  assert.match(draft, /Graduate Engineering Training \(GET\)/);
  assert.match(draft, /learner@example.com/);
  assert.match(draft, /Please share the syllabus/);
});
test("webhook destinations require public HTTPS host names", () => {
  assert.equal(
    validWebhook("https://example.com/contact"),
    "https://example.com/contact",
  );
  for (const url of [
    undefined,
    "not-a-url",
    "http://example.com",
    "https://localhost",
    "https://127.0.0.1",
    "https://[::1]",
    "https://localhost.",
    "https://sub.localhost",
    "https://192.168.1.1",
    "https://user:pass@example.com",
    "https://server.internal",
  ])
    assert.equal(validWebhook(url), null);
});
test("rate limit rejects sixth attempt and renews after the window", () => {
  const limiter = new EnquiryRateLimit();
  for (let i = 0; i < 5; i++) assert.equal(limiter.allow("client", 1000), true);
  assert.equal(limiter.allow("client", 1000), false);
  assert.equal(limiter.allow("client", 61000), true);
  assert.equal(limiter.allow("another", 1000), true);
});
