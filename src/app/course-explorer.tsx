"use client";
import { useState } from "react";
import {
  courseCategories,
  filterCourses,
  registrationUrl,
} from "./course-data";
function CourseIcon({ kind }: { kind: string }) {
  const paths: Record<string, string> = {
    code: "m9 8-4 4 4 4m6-8 4 4-4 4m-2-11-2 14",
    ai: "M8 5h8v4h4v6h-4v4H8v-4H4V9h4V5Zm0 7h8M12 5v14",
    chip: "M7 7h10v10H7V7Zm3 3h4v4h-4v-4M9 3v4m6-4v4M9 17v4m6-4v4M3 9h4m-4 6h4m10-6h4m-4 6h4",
    shield: "m12 3 8 4v5c0 5-8 9-8 9s-8-4-8-9V7l8-4Zm-4 9 3 3 5-6",
    robot:
      "M6 8h12v11H6V8Zm6-5v5M3 11h3m12 0h3M9 19v3m6-3v3M9 12h1m4 0h1M9 16h6",
    career: "M4 8h16v12H4V8Zm4 0V4h8v4M4 12l8 3 8-3M12 13v4",
    graduate: "m3 9 9-5 9 5-9 5-9-5Zm4 3v5c3 3 7 3 10 0v-5M21 9v7",
  };
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={paths[kind]}
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export default function CourseExplorer() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All courses");
  const [expanded, setExpanded] = useState(false);
  const results = filterCourses(query, category);
  const visible =
    expanded || category !== "All courses" || query.trim()
      ? results
      : results.slice(0, 4);
  return (
    <>
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
              setExpanded(false);
            }}
          >
            Clear course filters
          </button>
        )}
      </p>
      <div id="course-results" className="course-grid">
        {visible.map((course) => (
          <article
            className={`course-card course-${course.symbol}`}
            key={course.id}
          >
            <div className="course-art">
              <CourseIcon kind={course.symbol} />
              <span>{course.category}</span>
            </div>
            <div className="course-body">
              <h3>{course.title}</h3>
              <p>{course.short}</p>
              <div className="topic-tags">
                {course.topics.slice(0, 3).map((topic) => (
                  <span key={topic}>{topic}</span>
                ))}
              </div>
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
        Programmes listed on APK Infotech&apos;s official website. Contact the
        team for current batches, duration, fees, and entry requirements.
      </p>
    </>
  );
}
