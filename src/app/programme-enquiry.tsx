import EnquiryForm from "./enquiry-form";
import { validWebhook } from "./enquiry-security";
export default function ProgrammeEnquiry({
  defaultCourse = "help-me-choose",
}: {
  defaultCourse?: string;
}) {
  return (
    <section id="enquiry" className="enquiry-section">
      <div className="wrap enquiry-grid">
        <div>
          <h2>
            Your next step
            <br />
            starts here.
          </h2>
          <p>
            Tell us what you want to learn. Ask about the syllabus, current
            batches, fees, and entry requirements.
          </p>
          <p>
            Prefer a conversation? Call{" "}
            <a className="text-link" href="tel:+918939410255">
              +91 89394 10255
            </a>
            .
          </p>
        </div>
        <EnquiryForm
          defaultCourse={defaultCourse}
          configured={Boolean(validWebhook(process.env.ENQUIRY_WEBHOOK_URL))}
        />
      </div>
    </section>
  );
}
