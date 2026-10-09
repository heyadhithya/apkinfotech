"use client";
import Image from "next/image";
import { useState } from "react";
const activities = [
  {
    title: "DevOps & Docker workshop",
    category: "Workshops",
    image: "docker-workshop",
    tags: "DevOps · Docker",
    summary: "A two-day DevOps and Docker workshop.",
    detail: "A two-day workshop captured in our activity archive.",
    alt: "Learners discussing DevOps and Docker in a classroom workshop",
  },
  {
    title: "Summer internship experience",
    category: "Internships",
    image: "summer-internship",
    tags: "Internship · Classroom learning",
    summary: "Classroom sessions from the summer 2026 internship.",
    detail:
      "Classroom moments from the supplied summer internship 2026 photo collection.",
    alt: "An instructor leading a summer internship session",
  },
  {
    title: "Project reviews & presentations",
    category: "Projects",
    image: "project-review",
    tags: "Project review · Presentations",
    summary: "Project presentations, reviews, and certification.",
    detail:
      "Highlights from our project review, internship, and certification event collection.",
    alt: "Participants gathered for a project review event",
  },
  {
    title: "College engagement",
    category: "College engagement",
    image: "college-engagement",
    tags: "College engagement · MOU event",
    summary: "Krishnaswamy Engineering College and Technology MOU event.",
    detail:
      "Photos from the Krishnaswamy Engineering College and Technology MOU event in the supplied archive.",
    alt: "A group photograph at a college MOU event",
  },
];
const categories = [
  "All activities",
  "Workshops",
  "Internships",
  "Projects",
  "College engagement",
];
export default function ActivityExplorer() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All activities");
  const visible = activities.filter(
    (item) =>
      (category === "All activities" || item.category === category) &&
      `${item.title} ${item.tags} ${item.summary}`
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
  );
  return (
    <>
      <div className="activity-controls">
        <div
          className="tabs"
          role="group"
          aria-label="Filter activities by category"
        >
          {categories.map((name) => (
            <button
              type="button"
              key={name}
              aria-pressed={name === category}
              aria-controls="activity-results"
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
            <path
              d="m16 16 5 5"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
            />
          </svg>
          <input
            type="search"
            aria-label="Search our learning activities"
            placeholder="Find an activity"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>
      <div id="activity-results" className="activity-grid">
        <span className="sr-only" role="status">
          {visible.length} activities found
        </span>
        {visible.map((item) => (
          <article className="activity-card" key={item.title}>
            <div className="card-photo">
              <Image
                src={`/images/${item.image}.webp`}
                alt={item.alt}
                width={1280}
                height={960}
                sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 25vw"
              />
              <span>Past activity</span>
            </div>
            <div className="card-body">
              <span className="card-tags">{item.tags}</span>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
              <details>
                <summary>
                  View activity{" "}
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="m5 12 14 0m-5-5 5 5-5 5"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                </summary>
                <p>{item.detail}</p>
              </details>
            </div>
          </article>
        ))}
        {visible.length === 0 && (
          <div className="empty-results">
            <h3>No activities found</h3>
            <p>Try a different search or explore all of our past activities.</p>
            <button
              className="button primary"
              onClick={() => {
                setQuery("");
                setCategory("All activities");
              }}
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </>
  );
}
