import Link from "next/link";
import { business, createPageMetadata } from "../site";

export const metadata = createPageMetadata(
  "Website terms",
  "Information about APK Infotech programme enquiries, registration, and details to confirm before enrolling.",
  "/terms",
);

export default function TermsPage() {
  return (
    <main id="main" className="legal-page wrap section">
      <h1>Website terms</h1>
      <p>
        Last updated: <time dateTime="2026-10-09">9 October 2026</time>
      </p>
      <p>
        This website introduces programmes and past activities of{" "}
        {business.name}. These website notes do not replace the course or
        enrolment terms the company provides directly.
      </p>

      <section aria-labelledby="programme-information">
        <h2 id="programme-information">Programme information</h2>
        <p>
          Listed programmes and contact details come from APK Infotech&apos;s
          official information. An overview is a starting point for an enquiry,
          rather than confirmation of a current batch, a place on a programme,
          or a complete syllabus. Activity photographs show past events and do
          not establish that a particular current course session or venue is
          pictured.
        </p>
      </section>

      <section aria-labelledby="confirm-before-enrolling">
        <h2 id="confirm-before-enrolling">Confirm details before enrolling</h2>
        <p>
          Ask the team to confirm fees, taxes or additional charges, batch
          dates, duration, delivery format, eligibility, syllabus,
          certification, cancellation and refund terms, and any placement
          support before making a commitment. Those terms have not been verified
          on this website. Course attendance, certification, internships,
          interviews, or employment are not guaranteed by a programme listing or
          enquiry.
        </p>
      </section>

      <section aria-labelledby="enquiries-registration">
        <h2 id="enquiries-registration">Enquiries and registration</h2>
        <p>
          An enquiry asks the team for information. A confirmed enquiry
          submission does not reserve a seat or create an enrolment. If a
          WhatsApp draft is offered, you must review and send it in WhatsApp
          before it becomes a message to the team. The official Google Form is a
          separate registration service; completing it is not a purchase on this
          website.
        </p>
        <p>
          This website has no checkout or payment collection. Obtain the
          company&apos;s confirmed enrolment and payment instructions directly.
        </p>
      </section>

      <section aria-labelledby="external-links">
        <h2 id="external-links">External links and personal information</h2>
        <p>
          Google Forms, WhatsApp, maps, and email or telephone services operate
          outside this website. Their own terms and privacy information apply
          when you use them. Read our{" "}
          <Link href="/privacy">privacy notice</Link>
          for how the website handles enquiries and prepares drafts.
        </p>
      </section>

      <section aria-labelledby="responsible-use">
        <h2 id="responsible-use">Using the website</h2>
        <p>
          Provide accurate contact information for your own enquiry. Do not
          submit unwanted promotional messages, impersonate another person, or
          attempt to disrupt the website. Repeated requests may be temporarily
          limited to keep the enquiry service available.
        </p>
      </section>

      <section aria-labelledby="terms-questions">
        <h2 id="terms-questions">Questions and corrections</h2>
        <p>
          For confirmed course terms, corrections to website information, or
          questions about these notes, contact{" "}
          <a href={`mailto:${business.email}`}>{business.email}</a> or{" "}
          <a href={`tel:${business.phone.replace(/\s/g, "")}`}>
            {business.phone}
          </a>
          . Call ahead to confirm visiting hours before travelling to the
          office.
        </p>
      </section>

      <p>
        <Link href="/#courses">Browse programmes</Link> ·{" "}
        <Link href="/#contact">Contact APK Infotech</Link>
      </p>
    </main>
  );
}
