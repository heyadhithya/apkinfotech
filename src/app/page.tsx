import Image from "next/image";
import ActivityExplorer from "./activity-explorer";
import Navigation from "./navigation";
import Brand from "./brand";
import CourseExplorer from "./course-explorer";
import { registrationUrl } from "./course-data";

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h16m-6-6 6 6-6 6"}
        stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Navigation />
      <main id="main">
        <section className="hero wrap">
          <div className="hero-copy">
            <h1>Technical courses.<br /><span>Career preparation.</span></h1>
            <p>Explore seven programmes across software, AI, electronics, security, and career readiness.</p>
            <div className="hero-actions">
              <a className="button primary" href="#courses">Browse courses <Arrow /></a>
              <a className="text-link" href="#contact">Ask about a programme <Arrow diagonal /></a>
            </div>
            <p className="hero-location">APK Infotech · Mannivakkam, Chennai</p>
          </div>
          <figure className="hero-visual">
            <div className="hero-photo">
              <Image src="/images/learners.webp"
                alt="Participants gathered for a past APK Infotech project review and internship event"
                width={1280} height={960} priority sizes="(max-width: 760px) 100vw, 45vw" />
            </div>
            <figcaption>Project reviews and internships <span>From the APK Infotech archive</span></figcaption>
          </figure>
        </section>
        <section id="courses" className="wrap section courses-section">
          <div className="section-heading">
            <div>
              <h2>Find your programme</h2>
              <p>Choose a subject, read the overview, and register your interest.</p>
            </div>
            <a className="text-link" href="#contact">Need help choosing? <Arrow /></a>
          </div>
          <CourseExplorer />
        </section>
        <section id="activities" className="archive-section">
          <div id="gallery" className="wrap section">
            <div className="section-heading">
              <div>
                <h2>Workshops, internships,<br />and project reviews</h2>
                <p>A selection from past APK Infotech activities.</p>
              </div>
              <span className="archive-label">From our activity archive</span>
            </div>
            <ActivityExplorer />
            <p className="activity-footnote">These are highlights of past activities. <a href="#contact">Ask about upcoming programmes <Arrow diagonal /></a></p>
          </div>
        </section>
        <section className="faq-section wrap section">
          <div><h2>Before you register</h2><p>Programme details and how to get started.</p></div>
          <div className="faq-list">
            <details>
              <summary>How do I register for a programme?</summary>
              <p>Use APK Infotech’s <a href={registrationUrl} target="_blank" rel="noreferrer">official registration form</a> to register your interest. Contact the team to confirm the next available batch.</p>
            </details>
            <details>
              <summary>Where can I find fees and schedules?</summary>
              <p>Call <a href="tel:+918939410255">+91 89394 10255</a> or <a href="mailto:official@apkinfotech.in">email the team</a> for the latest fees, duration, schedules, and entry requirements.</p>
            </details>
            <details>
              <summary>Can I ask about internships and placement preparation?</summary>
              <p>Yes. APK Infotech’s official website lists internships and placement support. Contact the team to discuss current availability and what support is included.</p>
            </details>
          </div>
        </section>
        <section id="contact" className="contact-section">
          <div className="wrap contact-grid">
            <div className="contact-intro">
              <h2>Speak with<br />APK Infotech</h2>
              <p>Ask about courses, upcoming batches, and career preparation.</p>
              <a className="button white" href="https://wa.me/918939410255" target="_blank" rel="noreferrer">Chat with our team <Arrow diagonal /></a>
            </div>
            <div className="contact-details">
              <div id="location" className="address">
                <h3>Visit our Chennai office</h3>
                <address>No. 65, 5th Street, Ram Nagar<br />Mannivakkam, Chennai<br />Tamil Nadu 600048</address>
                <a className="text-link" href="https://maps.google.com/?q=65,+5th+Street,+Ram+Nagar,+Manivakkam,+Chennai,+Tamil+Nadu+600048" target="_blank" rel="noreferrer">Get directions <Arrow diagonal /></a>
                <p className="visit-note">Call ahead to confirm visiting hours.</p>
              </div>
              <div className="contact-options">
                <div><span>Call us</span><a href="tel:+918939410255">+91 89394 10255</a><a href="tel:+916381272033">+91 63812 72033</a></div>
                <div><span>Email us</span><a href="mailto:official@apkinfotech.in">official@apkinfotech.in</a></div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="wrap footer">
        <div className="footer-top">
          <Brand />
          <nav aria-label="Footer navigation"><a href="#courses">Courses</a><a href="#activities">Activities</a><a href="#location">Visit us</a><a href="#contact">Contact</a></nav>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} APK Infotech IT Solutions Pvt Ltd.</span>
          <a href="https://apkinfotech.in/" target="_blank" rel="noreferrer">Official website <Arrow diagonal /></a>
        </div>
      </footer>
    </>
  );
}
