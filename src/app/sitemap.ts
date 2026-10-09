import type { MetadataRoute } from "next";
import { courses } from "./course-data";
import { indexingEnabled, siteUrl } from "./site";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!indexingEnabled) return [];

  return [
    "",
    ...courses.map((course) => `/courses/${course.id}`),
    "/enquire",
    "/privacy",
    "/terms",
  ].map((path) => ({ url: `${siteUrl}${path}` }));
}
