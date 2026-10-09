import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { courses, registrationUrl } from "../../course-data";
import { createPageMetadata, siteUrl } from "../../site";

type ProgrammePageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return courses.map((course) => ({ slug: course.id }));
}

function getCourse(slug: string) {
  const course = courses.find((item) => item.id === slug);
  if (!course) notFound();
  return course;
}

export async function generateMetadata({
  params,
}: ProgrammePageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourse(slug);
  return createPageMetadata(
    course.title,
    course.description,
    `/courses/${course.id}`,
  );
}

export default async function ProgrammePage({ params }: ProgrammePageProps) {
  const { slug } = await params;
  const course = getCourse(slug);
  const enquiryUrl = `/enquire?course=${course.id}`;
  const topicNames = new Intl.ListFormat("en", {
    style: "long",
    type: "conjunction",
  }).format(course.topics);
  const otherCourses = courses.filter((item) => item.id !== course.id);
  const relatedCourses = [
    ...otherCourses.filter((item) => item.category === course.category),
    ...otherCourses.filter((item) => item.category !== course.category),
  ].slice(0, 2);
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Course",
        "@id": `${siteUrl}/courses/${course.id}#course`,
        name: course.title,
        description: course.description,
        url: `${siteUrl}/courses/${course.id}`,
        teaches: course.topics,
        provider: {
          "@type": "Organization",
          "@id": `${siteUrl}/#organization`,
          name: "APK Infotech",
          url: siteUrl,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Courses",
            item: `${siteUrl}/#courses`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: course.title,
            item: `${siteUrl}/courses/${course.id}`,
          },
        ],
      },
    ],
  };

  return (
    <main id="main" className="programme-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <section
        className="masthead detail-hero"
        aria-labelledby="programme-title"
      >
        <nav className="wrap breadcrumb" aria-label="Breadcrumb">
          <ol>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/#courses">Courses</Link>
            </li>
            <li aria-current="page">{course.title}</li>
          </ol>
        </nav>
        <div className="wrap hero">
          <div className="hero-copy">
            <h1 id="programme-title">{course.title}</h1>
            <p>{course.description}</p>
            <div className="hero-actions">
              <Link className="button gold" href={enquiryUrl}>
                Enquire Now
              </Link>
              <a
                className="button white"
                href={registrationUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`Register interest in ${course.title} (opens in a new tab)`}
              >
                Register interest
              </a>
            </div>
          </div>
          <figure className="hero-visual">
            <div className={`hero-photo course-photo-${course.image}`}>
              <Image
                src={`/images/${course.image}.webp`}
                alt={course.imageAlt}
                width={1400}
                height={1050}
                priority
                fetchPriority="high"
                sizes="(max-width: 760px) 100vw, 42vw"
              />
            </div>
            <figcaption>
              Past APK Infotech activity
              <span>Archive photograph; not a current course session</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <div className="wrap section detail-grid">
        <div>
          <section className="content-panel" aria-labelledby="overview-heading">
            <h2 id="overview-heading">Programme overview</h2>
            <p>{course.short}</p>
            <h3>Who might be interested?</h3>
            <p>
              Learners interested in {topicNames}. Ask the team whether the
              programme suits your background and what knowledge is expected
              before joining.
            </p>
          </section>

          <section className="content-panel" aria-labelledby="topics-heading">
            <h2 id="topics-heading">Confirmed topics</h2>
            <p>The programme covers these skills and subject areas.</p>
            <ul className="topic-list">
              {course.topics.map((topic) => (
                <li key={topic}>{topic}</li>
              ))}
            </ul>
            <p>
              These are the confirmed focus areas. Contact the team for the full
              syllabus, module sequence, and exercises.
            </p>
            <Link
              className="text-link"
              href={enquiryUrl}
              aria-label={`Request the full syllabus for ${course.title}`}
            >
              Request the full syllabus
            </Link>
          </section>

          <section className="content-panel" aria-labelledby="practice-heading">
            <h2 id="practice-heading">Practical learning</h2>
            <p>
              {/\bprojects\b|building robots/.test(course.description)
                ? course.description
                : "Ask the team which practical exercises, tools, and learning activities are included in this programme."}
            </p>
            <p>
              Confirm the project scope, learning resources, and support
              available with the team before joining.
            </p>
          </section>
        </div>

        <aside
          className="detail-aside content-panel"
          aria-labelledby="confirm-heading"
        >
          <h2 id="confirm-heading">Information to confirm</h2>
          <p>
            Ask the APK Infotech team for the current details before
            registering.
          </p>
          <ul>
            <li>Eligibility and any prior knowledge needed</li>
            <li>Duration and delivery format</li>
            <li>Upcoming batches and session timings</li>
            <li>Fees and what they include</li>
            <li>Trainer details and learner support</li>
            <li>Whether certification is included and its requirements</li>
          </ul>
          <Link className="button primary" href={enquiryUrl}>
            Ask about this programme
          </Link>
          <p>
            Registering interest does not confirm a place or a start date. The
            team can explain the next steps.
          </p>
        </aside>
      </div>

      <section
        className="wrap section faq-section"
        aria-labelledby="faq-heading"
      >
        <div>
          <h2 id="faq-heading">Programme questions</h2>
          <p>Confirm the details and choose your next step.</p>
        </div>
        <div className="faq-list">
          <details>
            <summary>When is the next batch available?</summary>
            <p>
              Batch dates and availability need confirmation.{" "}
              <Link href={enquiryUrl}>Enquire about {course.title}</Link> to ask
              the team about upcoming schedules and delivery options.
            </p>
          </details>
          <details>
            <summary>How do I register my interest?</summary>
            <p>
              Use APK Infotech’s{" "}
              <a href={registrationUrl} target="_blank" rel="noreferrer">
                official registration form (opens in a new tab)
              </a>
              . Confirm eligibility, fees, and the next available batch with the
              team before making an enrolment decision.
            </p>
          </details>
          <details>
            <summary>Which topics are confirmed?</summary>
            <p>
              The confirmed focus areas are {topicNames}.{" "}
              <Link href={enquiryUrl}>Ask for the full syllabus</Link> to check
              detailed modules, practical activities, and learning requirements.
            </p>
          </details>
        </div>
      </section>

      <section className="archive-section" aria-labelledby="related-heading">
        <div className="wrap section">
          <div className="section-heading">
            <div>
              <h2 id="related-heading">Explore other programmes</h2>
              <p>
                Compare the subjects and find a programme that interests you.
              </p>
            </div>
            <Link className="text-link" href="/#courses">
              View all programmes
            </Link>
          </div>
          <div className="related-grid">
            {relatedCourses.map((related) => (
              <article key={related.id}>
                <h3>
                  <Link href={`/courses/${related.id}`}>{related.title}</Link>
                </h3>
                <p>{related.short}</p>
                <Link
                  className="text-link"
                  href={`/courses/${related.id}`}
                  aria-label={`View programme: ${related.title}`}
                >
                  View programme
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
