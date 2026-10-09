import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "APK Infotech | Courses, internships & career preparation",
  description:
    "Explore APK Infotech programmes in Full Stack Development, Agentic AI, VLSI, Cyber Security, Robotics, and career readiness. Connect with our team in Mannivakkam, Chennai.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
