import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteHeader, SiteFooter } from "./site-chrome";
import { siteUrl, indexingEnabled } from "./site";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "APK Infotech | Technical training in Chennai",
    template: "%s | APK Infotech",
  },
  robots: { index: indexingEnabled, follow: indexingEnabled },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/apple-icon.png",
  },
};
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/fonts/manrope-400.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/manrope-600.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SiteHeader demoEnabled={process.env.PORTAL_DEMO_MODE === "true"} />
        {children}
        <SiteFooter demoEnabled={process.env.PORTAL_DEMO_MODE === "true"} />
      </body>
    </html>
  );
}
