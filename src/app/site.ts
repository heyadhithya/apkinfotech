import type { Metadata } from "next";

export const siteUrl = (
  process.env.SITE_URL || "https://apkinfotech.vercel.app"
).replace(/\/$/, "");
export const indexingEnabled =
  process.env.NODE_ENV === "production" &&
  process.env.VERCEL_ENV !== "preview" &&
  process.env.SEARCH_INDEXING !== "off";
export const business = {
  name: "APK Infotech IT Solutions Pvt Ltd",
  email: "official@apkinfotech.in",
  phone: "+91 89394 10255",
  secondaryPhone: "+91 63812 72033",
  whatsapp: "https://wa.me/918939410255",
  address:
    "No. 65, 5th Street, Ram Nagar, Mannivakkam, Chennai, Tamil Nadu 600048",
  maps: "https://maps.google.com/?q=65,+5th+Street,+Ram+Nagar,+Manivakkam,+Chennai,+Tamil+Nadu+600048",
};
export function createPageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  return {
    title,
    description,
    alternates: { canonical: `${siteUrl}${path}` },
    openGraph: {
      title,
      description,
      url: `${siteUrl}${path}`,
      siteName: "APK Infotech",
      type: "website",
      locale: "en_IN",
      images: [
        {
          url: `${siteUrl}/social-preview.png`,
          width: 1200,
          height: 630,
          alt: "APK Infotech — technical training and career preparation",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${siteUrl}/social-preview.png`],
    },
  };
}
export function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
