"use client";
import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { activities, activityCategories, type Activity } from "./activity-data";
export default function ActivityExplorer() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const launchButtonRef = useRef<HTMLButtonElement | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<Activity | null>(null);
  const captionId = useId();

  useEffect(() => {
    if (selectedPhoto && dialogRef.current && !dialogRef.current.open) {
      dialogRef.current.showModal();
    }
  }, [selectedPhoto]);

  function closePhoto() {
    setSelectedPhoto(null);
    launchButtonRef.current?.focus();
  }

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
          {activityCategories.map((name) => (
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
                sizes="(max-width: 480px) 96px, (max-width: 1100px) 45vw, 25vw"
              />
              <span>Past activity</span>
            </div>
            <div className="card-body">
              <h3>{item.title}</h3>
              <span className="card-tags">{item.tags}</span>
              <p>{item.summary}</p>
              <button
                type="button"
                className="photo-button"
                aria-label={`View photo: ${item.title}`}
                aria-haspopup="dialog"
                onClick={(event) => {
                  launchButtonRef.current = event.currentTarget;
                  setSelectedPhoto(item);
                }}
              >
                View photo
              </button>
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
      <dialog
        ref={dialogRef}
        className="lightbox-dialog"
        aria-labelledby={captionId}
        onClose={closePhoto}
      >
        <div className="lightbox-content">
          <button
            type="button"
            className="lightbox-close"
            onClick={() => dialogRef.current?.close()}
            autoFocus
          >
            Close photo
          </button>
          {selectedPhoto && (
            <figure>
              <Image
                src={`/images/${selectedPhoto.image}.webp`}
                alt={selectedPhoto.alt}
                width={1280}
                height={960}
                sizes="(max-width: 1000px) 95vw, 1000px"
              />
              <figcaption id={captionId}>
                Past activity · {selectedPhoto.title}
              </figcaption>
            </figure>
          )}
        </div>
      </dialog>
    </>
  );
}
