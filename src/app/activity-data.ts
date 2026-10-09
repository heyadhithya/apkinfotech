export type Activity = {
  title: string;
  category: string;
  image: string;
  tags: string;
  summary: string;
  detail: string;
  alt: string;
};

export const activities: Activity[] = [
  {
    title: "DevOps & Docker workshop",
    category: "Workshops",
    image: "docker-workshop",
    tags: "DevOps · Docker",
    summary: "A two-day DevOps and Docker workshop.",
    detail: "A two-day workshop captured in our activity archive.",
    alt: "Learners discussing DevOps and Docker in a classroom workshop",
  },
  {
    title: "Summer internship experience",
    category: "Internships",
    image: "summer-internship",
    tags: "Internship · Classroom learning",
    summary: "Classroom sessions from the summer 2026 internship.",
    detail:
      "Classroom moments from the supplied summer internship 2026 photo collection.",
    alt: "An instructor leading a summer internship session",
  },
  {
    title: "Project reviews & presentations",
    category: "Projects",
    image: "project-review",
    tags: "Project review · Presentations",
    summary: "Project presentations, reviews, and certification.",
    detail:
      "Highlights from our project review, internship, and certification event collection.",
    alt: "Participants gathered for a project review event",
  },
  {
    title: "College engagement",
    category: "College engagement",
    image: "college-engagement",
    tags: "College engagement · MOU event",
    summary: "Krishnaswamy Engineering College and Technology MOU event.",
    detail:
      "Photos from the Krishnaswamy Engineering College and Technology MOU event in the supplied archive.",
    alt: "A group photograph at a college MOU event",
  },
];
export const activityCategories = [
  "All activities",
  "Workshops",
  "Internships",
  "Projects",
  "College engagement",
];
