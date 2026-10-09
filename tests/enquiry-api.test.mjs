import test from "node:test";
import assert from "node:assert/strict";
import { POST } from "../src/app/api/enquiry/route.ts";
const contact = {
  name: "A Learner",
  email: "learner@example.com",
  phone: "",
  course: "get",
  message: "Syllabus please",
  consent: true,
  website: "",
};
const request = (body, headers = {}) =>
  new Request("http://localhost:3001/api/enquiry", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      origin: "http://localhost:3001",
      ...headers,
    },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
test("enquiry endpoint rejects foreign origins and non-JSON before accepting contact data", async () => {
  assert.equal(
    (await POST(request(contact, { origin: "https://untrusted.example" })))
      .status,
    403,
  );
  assert.equal(
    (await POST(request(contact, { "content-type": "text/plain" }))).status,
    415,
  );
});
test("enquiry endpoint bounds payload, validates and never claims success without a service", async () => {
  assert.equal((await POST(request("x".repeat(17000)))).status, 413);
  const invalid = await POST(request({ ...contact, email: "bad" }));
  assert.equal(invalid.status, 400);
  assert.ok((await invalid.json()).fieldErrors.email);
  const result = await POST(request(contact));
  assert.equal(result.status, 503);
  assert.equal((await result.json()).code, "unconfigured");
});
test("upstream service failure is honest and success requires acceptance; sixth attempt is limited", async (t) => {
  t.mock.method(
    globalThis,
    "fetch",
    async () => new Response("", { status: 503 }),
  );
  const previous = process.env.ENQUIRY_WEBHOOK_URL;
  process.env.ENQUIRY_WEBHOOK_URL = "https://example.com/contact";
  try {
    assert.equal((await POST(request(contact))).status, 502);
    globalThis.fetch = async (_url, init) => {
      assert.equal(init.redirect, "error");
      const body = JSON.parse(init.body);
      assert.equal(body.courseTitle, "Graduate Engineering Training (GET)");
      assert.equal(body.email, contact.email);
      assert.equal("website" in body, false);
      return new Response("", { status: 202 });
    };
    assert.equal((await POST(request(contact))).status, 200);
    assert.equal((await POST(request(contact))).status, 429);
  } finally {
    if (previous === undefined) delete process.env.ENQUIRY_WEBHOOK_URL;
    else process.env.ENQUIRY_WEBHOOK_URL = previous;
  }
});
test("origin checks use the requested host behind Next internal bind addresses", async () => {
  const result = await POST(
    new Request("http://0.0.0.0:3001/api/enquiry", {
      method: "POST",
      headers: {
        host: "127.0.0.1:3001",
        origin: "http://127.0.0.1:3001",
        "content-type": "text/plain",
      },
      body: "blocked",
    }),
  );
  assert.equal(result.status, 415);
  const foreign = await POST(
    new Request("http://0.0.0.0:3001/api/enquiry", {
      method: "POST",
      headers: {
        host: "127.0.0.1:3001",
        origin: "http://evil.example",
        "content-type": "application/json",
      },
      body: "{}",
    }),
  );
  assert.equal(foreign.status, 403);
});
