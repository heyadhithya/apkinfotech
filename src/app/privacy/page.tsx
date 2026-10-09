import Link from "next/link";
import { business, createPageMetadata } from "../site";

export const metadata = createPageMetadata(
  "Privacy",
  "How APK Infotech website enquiries, WhatsApp drafts, and external registration links handle your information.",
  "/privacy",
);

export default function PrivacyPage() {
  return (
    <main id="main" className="legal-page wrap section">
      <h1>Privacy</h1>
      <p>
        Last updated: <time dateTime="2026-10-09">9 October 2026</time>
      </p>
      <p>
        This notice describes information handling on this APK Infotech website.
        For questions about how {business.name} handles information after an
        enquiry, contact{" "}
        <a href={`mailto:${business.email}`}>{business.email}</a>.
      </p>

      <section aria-labelledby="enquiry-information">
        <h2 id="enquiry-information">Information in an enquiry</h2>
        <p>
          The enquiry form asks for your name, email address, programme of
          interest, an optional phone number, and an optional message. You must
          explicitly consent to using these details to respond to your enquiry
          before continuing. Please include only information needed to discuss
          your programme; do not include passwords, payment details, or identity
          documents.
        </p>
      </section>

      <section aria-labelledby="enquiry-handling">
        <h2 id="enquiry-handling">
          Submitting an enquiry or preparing a draft
        </h2>
        <p>
          When the company enquiry service is configured, the website forwards
          the details you submit to that service so the team can respond. The
          website does not maintain a local enquiry database or write submitted
          contact details and messages to application logs.
        </p>
        <p>
          When no company enquiry service is configured, the website offers a
          WhatsApp draft instead of recording a completed submission. Preparing
          a draft does not submit an enquiry to the company. You can review it
          before opening WhatsApp, where you decide whether to send it. Opening
          the draft shares its contents with WhatsApp and may place the draft
          text in the external URL and your browser history.
        </p>
      </section>

      <section aria-labelledby="technical-information">
        <h2 id="technical-information">
          Technical information and measurement
        </h2>
        <p>
          The enquiry endpoint uses a temporary, hashed network identifier to
          limit repeated requests. This counter is held in server memory rather
          than an enquiry database. Hosting and external services may process
          network and request information as part of operating their services.
        </p>
        <p>
          This website has no installed external analytics or advertising
          trackers, and its application does not set cookies. Anonymous
          conversion events run within your browser; no external analytics
          service receives them from this implementation.
        </p>
      </section>

      <section aria-labelledby="external-services">
        <h2 id="external-services">
          External registration and contact services
        </h2>
        <p>
          Official registration opens Google Forms. WhatsApp, map links, email,
          and telephone actions use services outside this website. Information
          you enter or send there is handled by those services and, where
          applicable, APK Infotech. Review their privacy information before
          sharing personal details. This website does not control their storage
          or retention practices.
        </p>
      </section>

      <section aria-labelledby="privacy-questions">
        <h2 id="privacy-questions">
          Access, correction, deletion, and retention
        </h2>
        <p>
          Contact <a href={`mailto:${business.email}`}>{business.email}</a> to
          ask about access to, correction of, or deletion of enquiry
          information, withdrawal of consent, or how long the company and its
          enquiry service retain it. A company retention period has not been
          confirmed for this website. Do not assume that closing a draft or
          leaving this page deletes information already sent through an external
          service.
        </p>
      </section>

      <p>
        <Link href="/enquire">Make an enquiry</Link> ·{" "}
        <Link href="/terms">Website terms</Link>
      </p>
    </main>
  );
}
