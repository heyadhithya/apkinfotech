import Image from "next/image";
import Arrow from "./arrow";
import Link from "next/link";
import ActivityExplorer from "./activity-explorer";
import CourseExplorer from "./course-explorer";
import { registrationUrl } from "./course-data";
import ProgrammeEnquiry from "./programme-enquiry";
import { business, createPageMetadata, serializeJsonLd, siteUrl } from "./site";
export const metadata = createPageMetadata(
  "Technical courses & career preparation in Chennai | APK Infotech",
  "Explore APK Infotech’s seven programmes in software, AI, VLSI, cyber security, robotics, and career preparation. View real activities and enquire with the Chennai team.",
  "/",
);
export default function Home() {
  return (
    <main id="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd({
            "@context": "https://schema.org",
            "@type": "Organization",
            "@id": `${siteUrl}/#organization`,
            name: business.name,
            url: siteUrl,
            logo: `${siteUrl}/images/apk-official-logo.webp`,
            telephone: "+918939410255",
            email: business.email,
            sameAs: ["https://apkinfotech.in/"],
            address: {
              "@type": "PostalAddress",
              streetAddress: "No. 65, 5th Street, Ram Nagar, Mannivakkam",
              addressLocality: "Chennai",
              addressRegion: "Tamil Nadu",
              postalCode: "600048",
              addressCountry: "IN",
            },
          }),
        }}
      />
      <CourseExplorer
        hero={
          <>
            <h1>
              Technical skills.
              <br />
              Practical experience.
            </h1>
            <p>
              Explore programmes in software, AI, electronics, security, and
              career preparation. Find your next step with our Chennai team.
            </p>
          </>
        }
        photograph={
          <figure className="hero-visual">
            <div className="hero-photo">
              <Image
                src="/images/learners.webp"
                alt="Participants gathered for a past APK Infotech project review and internship event"
                width={1280}
                height={822}
                priority
                fetchPriority="high"
                sizes="(max-width: 480px) calc(100vw - 36px), (max-width: 760px) calc(100vw - 48px), (max-width: 1100px) calc(46vw - 46px), (max-width: 1320px) calc(46vw - 81px), 522px"
              />
            </div>
            <figcaption>
              Project reviews and internships{" "}
              <span>Past APK Infotech activity</span>
            </figcaption>
          </figure>
        }
      />
      <section id="about" className="about-section">
        <div className="wrap section">
          <div className="section-heading">
            <div>
              <h2>Get to know APK Infotech.</h2>
              <p>
                Technical training and career preparation in Mannivakkam,
                Chennai.
              </p>
            </div>
            <a className="text-link" href="#contact">
              Contact our team <Arrow />
            </a>
          </div>
          <div className="about-grid">
            <div>
              <h3>A range of technical subjects</h3>
              <p>
                Compare seven programmes, from Full Stack Web Development and
                Agentic AI to VLSI, Cyber Security, and Robotics and PCB Design.
              </p>
            </div>
            <div>
              <h3>A closer look at learning</h3>
              <p>
                Browse our archive of technical workshops, internship
                activities, college engagement, and project reviews.
              </p>
            </div>
            <div>
              <h3>A team you can speak with</h3>
              <p>
                Contact our Chennai office directly to discuss your background,
                programme topics, and current learning options.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id="activities" className="archive-section">
        <div id="gallery" className="wrap section">
          <div className="section-heading">
            <div>
              <h2>A closer look at the work.</h2>
              <p>
                Workshops, internships, and project reviews from past APK
                Infotech activities.
              </p>
            </div>
            <span className="archive-label">From our activity archive</span>
          </div>
          <ActivityExplorer />
          <p className="activity-footnote">
            These are highlights of past activities.{" "}
            <a href="#contact">
              Ask about upcoming programmes <Arrow diagonal />
            </a>
          </p>
        </div>
      </section>
      <section id="internships" className="wrap section internship-section">
        <figure className="internship-photo">
          <Image
            src="/images/summer-internship.webp"
            alt="Participants and trainers gathered at a past APK Infotech summer internship activity"
            width={1280}
            height={960}
            sizes="(max-width: 760px) 100vw, 45vw"
          />
          <figcaption>Summer internship · Past activity</figcaption>
        </figure>
        <div>
          <h2>
            Take a closer look
            <br />
            at internships.
          </h2>
          <p>
            Our archive includes internship activities and project reviews.
            Speak with the team about opportunities available now and how they
            fit your interests.
          </p>
          <ul>
            <li>Who can apply and what knowledge is expected?</li>
            <li>What work and guidance are included?</li>
            <li>When is the next intake, and what are the fees?</li>
          </ul>
          <Link className="button primary" href="/enquire?course=internships">
            Ask about internships <Arrow />
          </Link>
        </div>
      </section>
      <section className="faq-section wrap section">
        <div>
          <h2>
            A few questions
            <br />
            before you begin.
          </h2>
          <p>Make an informed choice before registering.</p>
        </div>
        <div className="faq-list">
          <details>
            <summary>Which programme is right for me?</summary>
            <p>
              Read the confirmed topics on each course page, then{" "}
              <Link href="/enquire">
                tell the team about your interests and background
              </Link>
              . Ask about eligibility and any prior knowledge needed.
            </p>
          </details>
          <details>
            <summary>Where can I find fees and schedules?</summary>
            <p>
              Call <a href="tel:+918939410255">+91 89394 10255</a> or{" "}
              <a href="mailto:official@apkinfotech.in">email the team</a> for
              current fees, duration, format, schedules, and entry requirements.
            </p>
          </details>
          <details>
            <summary>Who will be teaching my programme?</summary>
            <p>
              Ask the team for the assigned trainer’s background, teaching
              experience, and support available for your chosen batch.
            </p>
          </details>
          <details>
            <summary>
              What practical work and placement support are included?
            </summary>
            <p>
              Our photographs show past learning activities. Confirm the
              exercises, project scope, and support included in your programme.
              The Placement Readiness Program focuses on career preparation; no
              job outcome is guaranteed here.
            </p>
          </details>
          <details>
            <summary>How do I register my interest?</summary>
            <p>
              Use APK Infotech’s{" "}
              <a href={registrationUrl} target="_blank" rel="noreferrer">
                official registration form
              </a>
              . Registration of interest does not confirm a place. Ask the team
              about the next steps.
            </p>
          </details>
        </div>
      </section>
      <ProgrammeEnquiry />
      <section id="contact" className="contact-section">
        <div className="wrap contact-grid">
          <div className="contact-intro">
            <h2>
              Let’s talk about
              <br />
              what’s next.
            </h2>
            <p>Ask about courses, upcoming batches, and career preparation.</p>
            <a
              className="button white"
              href={business.whatsapp}
              target="_blank"
              rel="noreferrer"
            >
              Chat with our team <Arrow diagonal />
            </a>
          </div>
          <div className="contact-details">
            <div id="location" className="address">
              <h3>Visit our Chennai office</h3>
              <address>
                No. 65, 5th Street, Ram Nagar
                <br />
                Mannivakkam, Chennai
                <br />
                Tamil Nadu 600048
              </address>
              <a
                className="text-link"
                href={business.maps}
                target="_blank"
                rel="noreferrer"
              >
                Get directions <Arrow diagonal />
              </a>
              <p className="visit-note">
                Call ahead to confirm visiting hours.
              </p>
            </div>
            <div className="contact-options">
              <div>
                <span>Call us</span>
                <a href="tel:+918939410255">{business.phone}</a>
                <a href="tel:+916381272033">{business.secondaryPhone}</a>
              </div>
              <div>
                <span>Email us</span>
                <a href={`mailto:${business.email}`}>{business.email}</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
