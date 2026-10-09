"use client";
import { useState } from "react";
export default function Navigation() {
  const [open, setOpen] = useState(false);
  return (
    <header className="header">
      <div className="wrap nav-inner">
        <a className="brand" href="#main" aria-label="APK Infotech home">
          <span className="brand-symbol" aria-hidden="true">
            a
          </span>
          <span>
            APK<span className="brand-light">infotech</span>
          </span>
        </a>
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
          <a href="#activities" onClick={() => setOpen(false)}>
            Our activities
          </a>
          <a href="#story" onClick={() => setOpen(false)}>
            Our story
          </a>
          <a href="#gallery" onClick={() => setOpen(false)}>
            Gallery
          </a>
          <a href="#location" onClick={() => setOpen(false)}>
            Location
          </a>
          <a
            className="button nav-button"
            href="https://apkinfotech.in/"
            target="_blank"
            rel="noreferrer"
            onClick={() => setOpen(false)}
          >
            Connect with us{" "}
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
        </nav>
      </div>
    </header>
  );
}
