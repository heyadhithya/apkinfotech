import Image from "next/image";
import ActivityExplorer from "./activity-explorer";
import Navigation from "./navigation";

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
        Learning happens when you get involved.{" "}
        <a href="#activities">
          See what we&apos;ve been building <Arrow />
        </a>
      </div>
      <Navigation />
      <main id="main">
        <section className="hero wrap">
          <div className="hero-copy">
            <h1>
              Your next chapter starts with <span>hands-on learning.</span>
            </h1>
            <p>
              From the classroom to real projects. Explore how we bring learners
              together through technical workshops, internships, and practical
              experience.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#activities">
                Explore our activities <Arrow />
              </a>
              <a className="text-link" href="#story">
                Get to know APK <Arrow diagonal />
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
            <span>Technical workshops</span>
            <span>Internship experiences</span>
            <span>Project reviews</span>
            <span>College engagement</span>
          </div>
        </div>
        <section id="activities" className="activities-section wrap section">
          <div className="section-heading">
            <div>
              <h2>Find your spark.</h2>
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
            <h2>Learning, a little closer to home.</h2>
            <p>
              Our activity photos capture a learning venue in Mannivakkam, Tamil
              Nadu. Take a look at the location behind these classroom moments.
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
                <strong>Mannivakkam, Tamil Nadu</strong>
                <p>
                  6/185a, Maneswarar Nagar
                  <br />
                  Mannivakkam, Tamil Nadu 600048
                </p>
              </div>
            </div>
            <a
              className="button outline"
              href="https://www.google.com/maps/search/?api=1&query=12.892882%2C80.064307"
              target="_blank"
              rel="noreferrer"
            >
              View photographed location <Arrow diagonal />
            </a>
            <small>
              Location shown in the supplied photos. Please confirm the current
              venue before visiting.
            </small>
          </div>
          <div className="location-photo">
            <Image
              src="/images/project-review.webp"
              alt="Learners gathered during a project review and internship event"
              width={1280}
              height={960}
              sizes="(max-width: 760px) 100vw, 45vw"
            />
            <div>
              <span>A place for curiosity.</span>
              <strong>And the people who bring it.</strong>
            </div>
          </div>
        </section>
        <section className="closing">
          <div className="wrap closing-inner">
            <div>
              <h2>What will you learn next?</h2>
              <p>
                Start a conversation about your next step with APK Infotech.
              </p>
            </div>
            <a
              className="button white"
              href="https://apkinfotech.in/"
              target="_blank"
              rel="noreferrer"
            >
              Visit APK Infotech <Arrow diagonal />
            </a>
          </div>
        </section>
      </main>
      <footer className="wrap footer">
        <a className="brand" href="#main">
          <span className="brand-symbol" aria-hidden="true">
            a
          </span>
          <span>
            APK<span className="brand-light">infotech</span>
          </span>
        </a>
        <p>Curiosity today. Possibilities tomorrow.</p>
        <nav aria-label="Footer navigation">
          <a href="#activities">Our activities</a>
          <a href="#gallery">Gallery</a>
          <a href="#location">Location</a>
        </nav>
        <div className="footer-bottom">
          <span>APK Infotech · Learning in good company.</span>
          <span>Built around real moments.</span>
        </div>
      </footer>
    </>
  );
}
