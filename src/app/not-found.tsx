import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="wrap section state-page">
      <h1>We couldn’t find this page.</h1>
      <p>
        The link may have changed. Explore APK Infotech’s programmes or contact
        the team to find what you need.
      </p>
      <div className="hero-actions">
        <Link className="button primary" href="/">
          Return home
        </Link>
        <Link className="button outline" href="/#courses">
          Explore programmes
        </Link>
        <Link className="text-link" href="/enquire">
          Contact the team
        </Link>
      </div>
    </main>
  );
}
