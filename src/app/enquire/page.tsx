import Link from "next/link";
import Arrow from "../arrow";
import ProgrammeEnquiry from "../programme-enquiry";
import { enquiryCourses } from "../enquiry-validation";
import { createPageMetadata } from "../site";
export const metadata = createPageMetadata(
  "Course enquiries",
  "Ask APK Infotech in Chennai about course syllabuses, fees, duration, eligibility, internships, and upcoming batches.",
  "/enquire",
);
export default async function Enquire({
  searchParams,
}: {
  searchParams: Promise<{ course?: string }>;
}) {
  const { course } = await searchParams;
  const selection = enquiryCourses.find((item) => item.id === course);
  return (
    <main id="main">
      <div className="wrap enquiry-heading">
        <Link className="text-link" href="/#courses">
          <Arrow left /> Back to courses
        </Link>
        <h1>
          {selection && selection.id !== "help-me-choose"
            ? `Enquire about ${selection.title}`
            : "Let’s find your programme."}
        </h1>
        <p>
          Confirm the details with APK Infotech before making an enrolment
          decision.
        </p>
      </div>
      <ProgrammeEnquiry defaultCourse={selection?.id} />
    </main>
  );
}
