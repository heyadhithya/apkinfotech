"use client";
import { useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import {
  courses,
  courseCategories,
  filterCourses,
  registrationUrl,
} from "./course-data";
export default function CourseExplorer({ hero, photograph }: { hero: ReactNode; photograph: ReactNode }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All courses");
  const [expanded, setExpanded] = useState(true);
  const [programme, setProgramme] = useState("");
  const heading = useRef<HTMLHeadingElement>(null);
  const results = filterCourses(query, category);
  const visible =
    expanded || category !== "All courses" || query.trim()
      ? results
      : results.slice(0, 4);
  return (
    <>
      <section className="masthead">
        <div className="wrap hero">
          <div className="hero-copy">
            {hero}
            <form className="programme-finder" id="programme-finder" onSubmit={(event) => {
              event.preventDefault();
              setQuery(courses.find((course) => course.id === programme)?.title ?? "");
              setCategory("All courses");
              setExpanded(true);
              heading.current?.focus({ preventScroll: true });
              heading.current?.scrollIntoView({ block: "start" });
            }}>
              <label htmlFor="hero-programme">Choose a programme</label>
              <div className="finder-controls">
                <select id="hero-programme" value={programme} onChange={(event) => setProgramme(event.target.value)}>
                  <option value="">All programmes</option>
                  {courses.map((course) => <option key={course.id} value={course.id}>{course.title}</option>)}
                </select>
                <button className="button gold" type="submit">View programme <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12h16m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.7" /></svg></button>
              </div>
            </form>
            <a className="masthead-enquiry" href="#enquiry">Ask about fees and batches <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12" stroke="currentColor" strokeWidth="1.7" /></svg></a>
          </div>
          {photograph}
        </div>
        <div className="wrap masthead-foot"><span>Software development</span><span>AI</span><span>Electronics</span><span>Security</span><span>Career readiness</span></div>
      </section>
      <section id="courses" className="wrap section courses-section">
        <div className="section-heading">
          <div><h2 ref={heading} tabIndex={-1}>Programmes</h2><p>Explore the subjects. Read the overview. Register your interest.</p></div>
          <a className="text-link" href="#enquiry">Need help choosing? <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12h16m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.7" /></svg></a>
        </div>
      <div className="course-controls">
        <div
          className="tabs"
          role="group"
          aria-label="Filter courses by category"
        >
          {courseCategories.map((name) => (
            <button
              type="button"
              key={name}
              aria-pressed={category === name}
              aria-controls="course-results"
              onClick={() => setCategory(name)}
            >
              {name}
            </button>
          ))}
        </div>
        <div className="search">
          <svg
            width="19"
            height="19"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <circle
              cx="10.5"
              cy="10.5"
              r="6.5"
              stroke="currentColor"
              strokeWidth="1.7"
            />
            <path d="m16 16 5 5" stroke="currentColor" strokeWidth="1.7" />
          </svg>
          <input
            type="search"
            placeholder="What do you want to learn?"
            aria-label="Search courses"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>
      <p className="course-status" role="status">
        {results.length === 0
          ? "No courses match your filters."
          : `Showing ${visible.length} of ${results.length} programmes`}
        {(query || category !== "All courses") && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory("All courses");
              setExpanded(true);
            }}
          >
            Clear course filters
          </button>
        )}
      </p>
      <div id="course-results" className="course-grid">
        {visible.map((course) => (
          <article
            className="course-card"
            key={course.id}
          >
            <figure className={`course-photo course-photo-${course.image}`}>
              <div className="course-image-frame">
                <Image src={`/images/${course.image}.webp`} alt={course.imageAlt}
                  width={1400} height={1050}
                  sizes="(max-width: 680px) 100vw, (max-width: 1100px) 50vw, 33vw" />
              </div>
              <figcaption>From our activity archive</figcaption>
            </figure>
            <div className="course-body">
              <span className="course-category">{course.category}</span>
              <h3>{course.title}</h3>
              <p>{course.short}</p>
              <details>
                <summary>
                  Programme overview{" "}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="m6 9 6 6 6-6"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    />
                  </svg>
                </summary>
                <p>{course.description}</p>
              </details>
              <a
                className="course-enquiry"
                href={registrationUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`Register interest in ${course.title}`}
              >
                Register interest{" "}
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M6 18 18 6M6 6h12v12"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  />
                </svg>
              </a>
            </div>
          </article>
        ))}
      </div>
      {results.length === 0 && (
        <div className="empty-results">
          <h3>No courses found</h3>
          <p>
            Try another topic or clear your filters to explore all programmes.
          </p>
          <button
            className="button primary"
            onClick={() => {
              setQuery("");
              setCategory("All courses");
              setExpanded(true);
            }}
          >
            Show all courses
          </button>
        </div>
      )}
      {!query.trim() && category === "All courses" && (
        <div className="course-more">
          <button
            className="button outline"
            aria-expanded={expanded}
            aria-controls="course-results"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Show featured programmes" : "Explore all 7 programmes"}
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d={expanded ? "m6 15 6-6 6 6" : "m6 9 6 6 6-6"}
                stroke="currentColor"
                strokeWidth="1.7"
              />
            </svg>
          </button>
        </div>
      )}
      <p className="course-footnote">
        Photos show past APK Infotech activities, not individual course sessions.
        Contact the team for current batches, fees, duration, and entry requirements.
      </p>
      </section>
    </>
  );
}
