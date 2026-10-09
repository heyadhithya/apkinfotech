"use client";
import { useState } from "react";
import Brand from "./brand";
export default function Navigation() {
  const [open, setOpen] = useState(false);
  return (
    <header className="header">
      <div className="wrap nav-inner">
        <Brand />
        <button
          className="menu-toggle"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => setOpen(!open)}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d={open ? "m5 5 14 14M5 19 19 5" : "M4 6h16M4 12h16M4 18h16"}
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <nav
          id="main-navigation"
          className={open ? "main-nav is-open" : "main-nav"}
          aria-label="Main navigation"
        >
          <a href="#courses" onClick={() => setOpen(false)}>
            Programmes
          </a>
          <a href="#activities" onClick={() => setOpen(false)}>
            Learning activities
          </a>
          <a href="#location" onClick={() => setOpen(false)}>
            Visit us
          </a>
          <a
            className="button nav-button"
            href="#enquiry"
            onClick={() => setOpen(false)}
          >
            Enquire{" "}
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M4 12h16m-6-6 6 6-6 6"
                stroke="currentColor"
                strokeWidth="1.7"
              />
            </svg>
          </a>
        </nav>
      </div>
    </header>
  );
}
