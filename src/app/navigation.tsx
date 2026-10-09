"use client";
import Arrow from "./arrow";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Brand from "./brand";
const links = [
  { title: "Home", href: "/" },
  { title: "Courses", href: "/#courses" },
  { title: "Internships", href: "/#internships" },
  { title: "Activities", href: "/#activities" },
  { title: "About", href: "/#about" },
  { title: "Contact", href: "/#contact" },
];
const subscribeHash = (listener: () => void) => {
  window.addEventListener("hashchange", listener);
  window.addEventListener("popstate", listener);
  return () => {
    window.removeEventListener("hashchange", listener);
    window.removeEventListener("popstate", listener);
  };
};
const readHash = () => window.location.hash;
export default function Navigation() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const navigation = useRef<HTMLElement>(null);
  const header = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const hash = useSyncExternalStore(subscribeHash, readHash, () => "");
  useEffect(() => {
    if (!open) return;
    const closeOutside = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !header.current?.contains(event.target)
      )
        setOpen(false);
    };
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, [open]);
  return (
    <header
      className="header"
      ref={header}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          setOpen(false);
          toggle.current?.focus();
        }
      }}
    >
      <div className="wrap nav-inner">
        <Brand />
        <button
          ref={toggle}
          className="menu-toggle"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => {
            setOpen(!open);
            if (!open)
              requestAnimationFrame(() =>
                navigation.current
                  ?.querySelector<HTMLAnchorElement>("a")
                  ?.focus(),
              );
          }}
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
          ref={navigation}
          id="main-navigation"
          className={open ? "main-nav is-open" : "main-nav"}
          aria-label="Main navigation"
          onBlur={(event) => {
            if (
              open &&
              event.relatedTarget instanceof Node &&
              !header.current?.contains(event.relatedTarget)
            )
              setOpen(false);
          }}
        >
          {links.map((link) => {
            const current =
              (link.title === "Courses" && pathname.startsWith("/courses/")) ||
              (pathname === "/" &&
                (link.href === "/"
                  ? !hash || hash === "#main"
                  : link.href === `/${hash}`));
            return (
              <Link
                key={link.title}
                href={link.href}
                aria-current={
                  current ? (hash ? "location" : "page") : undefined
                }
                onClick={(event) => {
                  setOpen(false);
                  if (
                    pathname === "/" &&
                    !event.metaKey &&
                    !event.ctrlKey &&
                    !event.shiftKey &&
                    !event.altKey &&
                    event.button === 0
                  ) {
                    event.preventDefault();
                    window.location.hash =
                      link.href === "/" ? "main" : link.href.split("#")[1];
                  }
                }}
              >
                {link.title}
              </Link>
            );
          })}
          <Link
            className="button nav-button"
            href="/enquire"
            aria-current={pathname === "/enquire" ? "page" : undefined}
            onClick={() => setOpen(false)}
          >
            Enquire now <Arrow diagonal />
          </Link>
        </nav>
      </div>
    </header>
  );
}
