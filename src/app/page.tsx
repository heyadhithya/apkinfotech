import Image from "next/image";
import ActivityExplorer from "./activity-explorer";
import Navigation from "./navigation";
import Brand from "./brand";
import CourseExplorer from "./course-explorer";
import { registrationUrl } from "./course-data";

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h16m-6-6 6 6-6 6"}
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="announcement">
        Your next step starts with the right skills.{" "}
        <a href="#courses">
          Explore our programmes <Arrow />
        </a>
      </div>
      <Navigation />
      <main id="main">
        <section className="hero wrap">
          <div className="hero-copy">
            <h1>
              Learn the skills. <span>Build your next chapter.</span>
            </h1>
            <p>
              Explore programmes in software development, AI, hardware, and
              career readiness. Learn with APK Infotech—and see the real
              experiences behind our learning community.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#courses">
                Explore courses <Arrow />
              </a>
              <a className="text-link" href="#contact">
                Talk to our team <Arrow diagonal />
              </a>
            </div>
            <div className="hero-note">
              <span className="small-check">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 20 20"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="m5 10 3 3 7-7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </span>{" "}
              Real learners. Real experiences. A shared ambition.
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-photo">
              <Image
                src="/images/learners.webp"
                alt="Learners gathered at an APK Infotech project review and internship event"
                width={1280}
                height={960}
                priority
                sizes="(max-width: 760px) 100vw, 48vw"
              />
            </div>
            <div className="hero-label">
              <span className="label-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="m3 9 9-5 9 5-9 5-9-5Zm4 3v5c3 3 7 3 10 0v-5M21 9v7"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <div>
                <strong>Learn together. Go further.</strong>
                <span>A glimpse into life at APK Infotech</span>
              </div>
            </div>
          </div>
        </section>
        <div className="learning-strip">
          <div className="wrap strip-inner">
            <p>
              A little curiosity.
              <br />
              <strong>A lot of possibilities.</strong>
            </p>
            <span>Software development</span>
            <span>AI &amp; machine learning</span>
            <span>Hardware &amp; robotics</span>
            <span>Career readiness</span>
          </div>
        </div>
        <section id="courses" className="wrap section courses-section">
          <div className="section-heading">
            <div>
              <h2>A new skill. A new possibility.</h2>
              <p>Find a programme that fits where you want to go next.</p>
            </div>
            <a className="text-link" href="#contact">
              Need help choosing? <Arrow />
            </a>
          </div>
          <CourseExplorer />
        </section>
        <section id="activities" className="activities-section wrap section">
          <div className="section-heading">
            <div>
              <h2>Learning in action.</h2>
              <p>
                Discover the experiences that have brought our learners
                together.
              </p>
            </div>
            <span className="archive-label">From our activity archive</span>
          </div>
          <ActivityExplorer />
          <p className="activity-footnote">
            These are highlights of past activities. For upcoming programmes and
            availability,{" "}
            <a href="https://apkinfotech.in/" target="_blank" rel="noreferrer">
              visit our existing website <Arrow diagonal />
            </a>
            .
          </p>
        </section>
        <section id="story" className="story-section">
          <div className="wrap story-grid">
            <div className="story-photo">
              <Image
                src="/images/classroom.webp"
                alt="An instructor guiding learners during an in-person classroom session"
                width={1280}
                height={960}
                sizes="(max-width: 760px) 100vw, 45vw"
              />
              <span>More than a screen. A shared experience.</span>
            </div>
            <div className="story-copy">
              <h2>Good things happen when learning gets practical.</h2>
              <p>
                There&apos;s something different about being in the room. Asking
                a question. Working through a problem. Sharing what you&apos;ve
                built.
              </p>
              <p>
                Our archive tells that story: learners getting involved in
                workshops, internships, and project reviews—with people beside
                them.
              </p>
              <ul className="story-list">
                <li>
                  <span>Learn by getting involved</span>
                  <p>Technical sessions that bring ideas into the classroom.</p>
                </li>
                <li>
                  <span>Make room for real projects</span>
                  <p>
                    Opportunities to present, discuss, and review project work.
                  </p>
                </li>
                <li>
                  <span>Be part of a learning community</span>
                  <p>
                    Shared experiences with learners and college communities.
                  </p>
                </li>
              </ul>
              <a className="text-link" href="#gallery">
                See the moments behind the story <Arrow />
              </a>
            </div>
          </div>
        </section>
        <section id="gallery" className="wrap section gallery-section">
          <div className="section-heading">
            <div>
              <h2>Not just learning. Living it.</h2>
              <p>
                A few moments from our workshops, classrooms, and college
                engagements.
              </p>
            </div>
            <a className="text-link" href="#location">
              Where we learn <Arrow />
            </a>
          </div>
          <div className="gallery-grid">
            <figure className="gallery-large">
              <Image
                src="/images/college-engagement.webp"
                alt="Participants gathered for the Krishnaswamy Engineering College and Technology MOU event"
                width={1280}
                height={960}
                sizes="(max-width: 760px) 100vw, 55vw"
              />
              <figcaption>
                <span>College engagement</span>
                <strong>Building connections beyond the classroom.</strong>
              </figcaption>
            </figure>
            <figure>
              <Image
                src="/images/docker-workshop.webp"
                alt="A group taking part in a DevOps and Docker workshop"
                width={1280}
                height={960}
                sizes="(max-width: 760px) 100vw, 35vw"
              />
              <figcaption>
                <span>Workshop moments</span>
                <strong>Ideas shared. Questions asked.</strong>
              </figcaption>
            </figure>
            <figure>
              <Image
                src="/images/summer-internship.webp"
                alt="Learners attending a summer internship classroom session"
                width={1280}
                height={960}
                sizes="(max-width: 760px) 100vw, 35vw"
              />
              <figcaption>
                <span>Summer internship</span>
                <strong>Curiosity looks good on everyone.</strong>
              </figcaption>
            </figure>
          </div>
        </section>
        <section id="location" className="location-section wrap">
          <div className="location-copy">
            <h2>Let’s talk about your next step.</h2>
            <p>
              Visit our Mannivakkam office to discuss courses, internships, and
              career preparation with the APK Infotech team.
            </p>
            <div className="address">
              <svg
                width="25"
                height="25"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 1 1 16 0Z"
                  stroke="currentColor"
                  strokeWidth="1.7"
                />
                <circle
                  cx="12"
                  cy="10"
                  r="2.5"
                  stroke="currentColor"
                  strokeWidth="1.7"
                />
              </svg>
              <div>
                <strong>Mannivakkam, Chennai</strong>
                <p>
                  No. 65, 5th Street, Ram Nagar
                  <br />
                  Mannivakkam, Chennai, Tamil Nadu 600048
                </p>
              </div>
            </div>
            <a
              className="button outline"
              href="https://maps.google.com/?q=65,+5th+Street,+Ram+Nagar,+Manivakkam,+Chennai,+Tamil+Nadu+600048"
              target="_blank"
              rel="noreferrer"
            >
              Get directions <Arrow diagonal />
            </a>
            <small>
              Call ahead to confirm visiting hours:{" "}
              <a href="tel:+918939410255">+91 89394 10255</a>.
            </small>
          </div>
          <div className="location-photo">
            <Image
              src="/images/project-review.webp"
              alt="Participants at a past APK Infotech project review event"
              width={1280}
              height={960}
              sizes="(max-width: 760px) 100vw, 45vw"
            />
            <div>
              <span>Past project review event.</span>
              <strong>Meet the people behind the programmes.</strong>
            </div>
          </div>
        </section>
        <section className="faq-section wrap">
          <div>
            <h2>A little clarity before you begin.</h2>
            <p>Ready to take the next step? We’re here to help.</p>
          </div>
          <div className="faq-list">
            <details>
              <summary>How do I register for a programme?</summary>
              <p>
                Use APK Infotech’s{" "}
                <a href={registrationUrl} target="_blank" rel="noreferrer">
                  official registration form
                </a>{" "}
                to register your interest. Contact the team to confirm the next
                available batch.
              </p>
            </details>
            <details>
              <summary>Where can I find fees and schedules?</summary>
              <p>
                Call <a href="tel:+918939410255">+91 89394 10255</a> or{" "}
                <a href="mailto:official@apkinfotech.in">email the team</a> for
                the latest fees, duration, schedules, and entry requirements.
              </p>
            </details>
            <details>
              <summary>
                Can I ask about internships and placement preparation?
              </summary>
              <p>
                Yes. APK Infotech’s official website lists internships and
                placement support. Contact the team to discuss current
                availability and what support is included.
              </p>
            </details>
          </div>
        </section>
        <section id="contact" className="closing">
          <div className="wrap closing-inner">
            <div>
              <h2>Your next chapter starts with a conversation.</h2>
              <p>Let’s find the right programme for you.</p>
            </div>
            <a
              className="button white"
              href="https://wa.me/918939410255"
              target="_blank"
              rel="noreferrer"
            >
              Chat with our team <Arrow diagonal />
            </a>
          </div>
          <div className="wrap contact-options">
            <a href="tel:+918939410255">
              <span>Call us</span>
              <strong>+91 89394 10255</strong>
            </a>
            <a href="tel:+916381272033">
              <span>Speak to the team</span>
              <strong>+91 63812 72033</strong>
            </a>
            <a href="mailto:official@apkinfotech.in">
              <span>Email us</span>
              <strong>official@apkinfotech.in</strong>
            </a>
          </div>
        </section>
      </main>
      <footer className="wrap footer">
        <Brand />
        <p>Skills for your career. Solutions for your business.</p>
        <nav aria-label="Footer navigation">
          <a href="#courses">Courses</a>
          <a href="#gallery">Gallery</a>
          <a href="#location">Visit us</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} APK Infotech IT Solutions Pvt Ltd.
          </span>
          <a href="https://apkinfotech.in/" target="_blank" rel="noreferrer">
            Official website <Arrow diagonal />
          </a>
        </div>
      </footer>
    </>
  );
}
