import Arrow from "./arrow";
import Link from "next/link";
import Brand from "./brand";
import { business } from "./site";
export default function Footer() {
  return (
    <footer className="wrap footer">
      <div className="footer-top">
        <Brand />
        <nav aria-label="Footer navigation">
          <Link href="/#courses">Courses</Link>
          <Link href="/#internships">Internships</Link>
          <Link href="/#activities">Activities</Link>
          <Link href="/enquire">Enquire</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </nav>
      </div>
      <div className="footer-contact">
        <a href="tel:+918939410255">{business.phone}</a>
        <a href="tel:+916381272033">{business.secondaryPhone}</a>
        <a href={`mailto:${business.email}`}>{business.email}</a>
        <a href={business.maps} target="_blank" rel="noreferrer">
          Chennai · Get directions <Arrow diagonal />
        </a>
      </div>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} APK Infotech IT Solutions Pvt Ltd.
        </span>
        <a href="https://apkinfotech.in/" target="_blank" rel="noreferrer">
          Official website <Arrow diagonal />
        </a>
      </div>
    </footer>
  );
}
