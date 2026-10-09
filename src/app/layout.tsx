import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "APK Infotech | Hands-on learning, shared experiences",
  description:
    "Explore APK Infotech workshops, internships, project reviews, and college engagement through real moments from our learning community.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
