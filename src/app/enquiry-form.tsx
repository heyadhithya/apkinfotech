"use client";

import {
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type FormEvent,
} from "react";
import { registrationUrl } from "./course-data";
import {
  enquiryCourses,
  enquiryDraft,
  validateEnquiry,
  type Enquiry,
  type EnquiryErrors,
} from "./enquiry-validation";

type EnquiryFormProps = { defaultCourse?: string; configured?: boolean };
const fieldOrder: (keyof Enquiry)[] = [
  "name",
  "email",
  "phone",
  "course",
  "message",
  "consent",
  "website",
];
const subscribeHydration = () => () => {};

export default function EnquiryForm({
  defaultCourse = "help-me-choose",
  configured = false,
}: EnquiryFormProps) {
  const prefix = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const attemptedSubmission = useRef(false);
  const hydrated = useSyncExternalStore(
    subscribeHydration,
    () => true,
    () => false,
  );
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [notice, setNotice] = useState("");
  const [draft, setDraft] = useState<{
    text: string;
    course: string;
    attempted: boolean;
  } | null>(null);
  const sending = status === "sending";
  const initialCourse = enquiryCourses.some(
    (course) => course.id === defaultCourse,
  )
    ? defaultCourse
    : "help-me-choose";
  const id = (field: keyof Enquiry) => `${prefix}-${field}`;
  const errorId = (field: keyof Enquiry) => `${id(field)}-error`;

  function showErrors(nextErrors: EnquiryErrors) {
    setErrors(nextErrors);
    requestAnimationFrame(() => {
      const first = fieldOrder.find((field) => nextErrors[field]);
      if (first && first !== "website") {
        const control = formRef.current?.elements.namedItem(first);
        if (control instanceof HTMLElement) {
          control.focus();
          control.scrollIntoView({ block: "center", behavior: "auto" });
        }
      }
    });
  }

  function readEnquiry() {
    if (!formRef.current) return undefined;
    const values = new FormData(formRef.current);
    const result = validateEnquiry({
      name: values.get("name"),
      email: values.get("email"),
      phone: values.get("phone"),
      course: values.get("course"),
      message: values.get("message"),
      consent: values.get("consent") === "on",
      website: values.get("website"),
    });
    showErrors(result.errors);
    return result.data;
  }

  function reviewDraft() {
    const data = readEnquiry();
    if (!data) return;
    setDraft({
      text: enquiryDraft(data),
      course: data.course,
      attempted: attemptedSubmission.current,
    });
    setStatus("idle");
    setNotice("");
  }

  function conversion(action: "whatsapp" | "enquiry-accepted", course: string) {
    window.dispatchEvent(
      new CustomEvent("apk:conversion", { detail: { action, course } }),
    );
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending || status === "success") return;
    setDraft(null);
    const data = readEnquiry();
    if (!data) return;
    if (!configured) {
      setDraft({
        text: enquiryDraft(data),
        course: data.course,
        attempted: false,
      });
      setStatus("idle");
      return;
    }
    setStatus("sending");
    setNotice("");
    attemptedSubmission.current = true;
    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as {
          fieldErrors?: unknown;
        } | null;
        if (body?.fieldErrors && typeof body.fieldErrors === "object") {
          const fieldErrors: EnquiryErrors = {};
          for (const field of fieldOrder) {
            const message = (body.fieldErrors as Record<string, unknown>)[
              field
            ];
            if (typeof message === "string") fieldErrors[field] = message;
          }
          showErrors(fieldErrors);
        }
        setStatus("error");
        setNotice(
          response.status === 429
            ? "Too many attempts. Please wait before retrying, or review a WhatsApp draft below."
            : "The contact service could not confirm acceptance. Retry, review a WhatsApp draft, or use the official registration form.",
        );
        return;
      }
      setStatus("success");
      setNotice(
        "Your enquiry was accepted by APK Infotech’s contact service. The team will need to confirm programme availability and details.",
      );
      conversion("enquiry-accepted", data.course);
    } catch {
      setStatus("error");
      setNotice(
        "We could not reach the contact service. Retry, review a WhatsApp draft, or use the official registration form.",
      );
    }
  }

  function changed(event: FormEvent<HTMLFormElement>) {
    const control = event.target as
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
    setDraft(null);
    setStatus("idle");
    setNotice("");
    if (fieldOrder.includes(control.name as keyof Enquiry)) {
      setErrors((current) => {
        const next = { ...current };
        delete next[control.name as keyof Enquiry];
        return next;
      });
    }
  }

  function fieldError(field: keyof Enquiry) {
    return errors[field] ? (
      <p className="form-error" id={errorId(field)}>
        {errors[field]}
      </p>
    ) : null;
  }

  return (
    <form
      ref={formRef}
      className="enquiry-form"
      method="post"
      action="/api/enquiry"
      onSubmit={submit}
      onChange={changed}
      noValidate
    >
      <noscript>
        <p className="form-notice">
          This form needs JavaScript. Please use the official registration form
          below, or call <a href="tel:+918939410255">+91 89394 10255</a>.
        </p>
      </noscript>
      <p className="form-notice">
        {configured
          ? "Share your enquiry with APK Infotech’s contact service. Required fields are marked below."
          : "Prepare a WhatsApp draft, review your details, then choose whether to open WhatsApp. This site does not submit or store your enquiry."}
      </p>
      {Object.keys(errors).length > 0 && (
        <div className="form-error" role="alert">
          <p>Please correct the following before continuing:</p>
          <ul>
            {fieldOrder
              .filter((field) => errors[field])
              .map((field) => (
                <li key={field}>{errors[field]}</li>
              ))}
          </ul>
        </div>
      )}
      <div className="form-grid">
        <div className="form-field">
          <label htmlFor={id("name")}>Full name (required)</label>
          <input
            id={id("name")}
            name="name"
            autoComplete="name"
            required
            minLength={2}
            maxLength={100}
            disabled={sending}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? errorId("name") : undefined}
          />
          {fieldError("name")}
        </div>
        <div className="form-field">
          <label htmlFor={id("email")}>Email (required)</label>
          <input
            id={id("email")}
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
            disabled={sending}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? errorId("email") : undefined}
          />
          {fieldError("email")}
        </div>
        <div className="form-field">
          <label htmlFor={id("phone")}>Phone (optional)</label>
          <input
            id={id("phone")}
            name="phone"
            type="tel"
            autoComplete="tel"
            maxLength={40}
            disabled={sending}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? errorId("phone") : undefined}
          />
          {fieldError("phone")}
        </div>
        <div className="form-field">
          <label htmlFor={id("course")}>Programme</label>
          <select
            id={id("course")}
            name="course"
            defaultValue={initialCourse}
            disabled={sending}
            aria-invalid={!!errors.course}
            aria-describedby={errors.course ? errorId("course") : undefined}
          >
            {enquiryCourses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.title}
              </option>
            ))}
          </select>
          {fieldError("course")}
        </div>
        <div className="form-field">
          <label htmlFor={id("message")}>Message (optional)</label>
          <textarea
            id={id("message")}
            name="message"
            rows={4}
            maxLength={2000}
            disabled={sending}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? errorId("message") : undefined}
          />
          {fieldError("message")}
        </div>
      </div>
      <div className="form-field">
        <label htmlFor={id("consent")}>
          <input
            id={id("consent")}
            name="consent"
            type="checkbox"
            required
            disabled={sending}
            aria-invalid={!!errors.consent}
            aria-describedby={errors.consent ? errorId("consent") : undefined}
          />{" "}
          I agree to share these details with APK Infotech to respond to my
          enquiry (required).
        </label>
        <p>
          Read our <a href="/privacy">privacy notice</a> before continuing.
        </p>
        {fieldError("consent")}
      </div>
      <div className="honeypot" aria-hidden="true">
        <label htmlFor={id("website")}>Leave this field blank</label>
        <input
          id={id("website")}
          name="website"
          tabIndex={-1}
          autoComplete="off"
          disabled={sending}
        />
      </div>
      <button
        className="button primary"
        type="submit"
        disabled={!hydrated || sending || status === "success"}
      >
        {sending
          ? "Sending enquiry…"
          : configured
            ? status === "error"
              ? "Retry enquiry"
              : "Send enquiry"
            : "Review WhatsApp draft"}
      </button>
      {status === "error" && (
        <button className="button outline" type="button" onClick={reviewDraft}>
          Review WhatsApp draft
        </button>
      )}
      {notice && (
        <p
          className="status-notice"
          role={status === "error" ? "alert" : "status"}
        >
          {notice}
        </p>
      )}
      {draft && (
        <div
          className="draft-review"
          role="region"
          aria-labelledby={`${prefix}-draft-heading`}
        >
          <h3 id={`${prefix}-draft-heading`}>Review your WhatsApp draft</h3>
          <pre>{draft.text}</pre>
          <p className="form-notice">
            {draft.attempted
              ? "The previous online submission could not be confirmed. Preparing this draft does not send another enquiry. Check with the team before resending to avoid a duplicate. "
              : "No enquiry has been submitted or stored by this site. "}
            Opening WhatsApp shares this draft with WhatsApp. Review it there
            and send only when you are ready. Edit the form to prepare a new
            draft.
          </p>
          <a
            className="button primary"
            href={`https://wa.me/918939410255?text=${encodeURIComponent(draft.text)}`}
            target="_blank"
            rel="noreferrer"
            onClick={() => conversion("whatsapp", draft.course)}
          >
            Open WhatsApp
          </a>
        </div>
      )}
      <p className="form-notice">
        You can also use APK Infotech’s{" "}
        <a href={registrationUrl} target="_blank" rel="noreferrer">
          official registration form
        </a>
        .
      </p>
    </form>
  );
}
