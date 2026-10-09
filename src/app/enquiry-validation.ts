import { courses } from "./course-data.ts";
export type Enquiry = {
  name: string;
  email: string;
  phone: string;
  course: string;
  message: string;
  consent: true;
  website: string;
};
export type EnquiryErrors = Partial<Record<keyof Enquiry, string>>;
export const enquiryCourses = [
  { id: "help-me-choose", title: "Help me choose" },
  { id: "internships", title: "Internships" },
  ...courses,
];
export function validateEnquiry(input: unknown): {
  data?: Enquiry;
  errors: EnquiryErrors;
} {
  const errors: EnquiryErrors = {};
  const value =
    input && typeof input === "object" && !Array.isArray(input)
      ? (input as Record<string, unknown>)
      : {};
  const field = (key: string) =>
    typeof value[key] === "string" ? (value[key] as string).trim() : "";
  const data = {
    name: field("name"),
    email: field("email"),
    phone: field("phone"),
    course: field("course"),
    message: field("message"),
    consent: value.consent,
    website: field("website"),
  };
  if (data.name.length < 2 || data.name.length > 100)
    errors.name = "Enter your full name (2–100 characters).";
  if (data.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = "Enter a valid email address.";
  if (
    data.phone &&
    (!/^[+\d\s().-]+$/.test(data.phone) ||
      data.phone.replace(/\D/g, "").length < 7 ||
      data.phone.replace(/\D/g, "").length > 15)
  )
    errors.phone = "Enter a valid phone number, or leave it blank.";
  if (!enquiryCourses.some((course) => course.id === data.course))
    errors.course = "Choose a listed programme or Help me choose.";
  if (data.message.length > 2000)
    errors.message = "Keep your message within 2,000 characters.";
  if (data.consent !== true)
    errors.consent = "Confirm consent before continuing.";
  if (data.website)
    errors.website =
      "This enquiry could not be processed. Please contact the team directly.";
  return Object.keys(errors).length
    ? { errors }
    : { data: { ...data, consent: true }, errors };
}
export function enquiryDraft(data: Enquiry) {
  const title =
    enquiryCourses.find((course) => course.id === data.course)?.title ??
    "Help me choose";
  return `Hello APK Infotech, I'm interested in ${title}.\nName: ${data.name}\nEmail: ${data.email}${data.phone ? `\nPhone: ${data.phone}` : ""}\n${data.message || "Please share current batches, fees, duration, and entry requirements."}`;
}
