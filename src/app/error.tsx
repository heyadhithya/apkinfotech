"use client";

import Link from "next/link";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ reset }: ErrorPageProps) {
  return (
    <main id="main" className="wrap section state-page">
      <h1>We couldn’t load this page.</h1>
      <p role="alert">
        Please try again. You can also return to the home page or contact APK
        Infotech for programme information.
      </p>
      <div className="hero-actions">
        <button className="button primary" type="button" onClick={reset}>
          Try again
        </button>
        <Link className="button outline" href="/">
          Return home
        </Link>
        <Link className="text-link" href="/enquire">
          Contact the team
        </Link>
      </div>
    </main>
  );
}
