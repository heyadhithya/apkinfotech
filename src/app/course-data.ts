export const registrationUrl =
  "https://docs.google.com/forms/d/e/1FAIpQLSeBUYiR5NKgq5vfsCip66shEFdUvE-uxSR1o5Jouf9WKkVRsw/viewform";
export const courses = [
  {
    id: "full-stack",
    title: "Full Stack Web Development",
    category: "Development",
    short: "React, Node.js, Express, and MongoDB.",
    description:
      "Learn the MERN stack with React, Node.js, MongoDB, and Express through real-world projects.",
    topics: ["React", "Node.js", "MongoDB", "Express"],
    image: "workshop-presentation",
    imageAlt: "An instructor presenting at a past APK Infotech workshop",
  },
  {
    id: "agentic-ai",
    title: "Agentic AI with Gen AI",
    category: "AI/ML",
    short: "AI agents, generative AI, and LangChain.",
    description:
      "Build autonomous AI agents using LangChain, OpenAI, and multi-agent frameworks with hands-on projects.",
    topics: ["LangChain", "Generative AI", "AI agents"],
    image: "classroom-discussion",
    imageAlt: "Learners attending a past classroom discussion",
  },
  {
    id: "vlsi",
    title: "VLSI Design",
    category: "Hardware",
    short: "RTL design, verification, and semiconductor fundamentals.",
    description:
      "Explore chip design, verification, and semiconductor fundamentals, including RTL design, simulation, and physical design.",
    topics: ["RTL design", "Verification", "Semiconductors"],
    image: "technical-session",
    imageAlt: "A trainer presenting at a past technical classroom session",
  },
  {
    id: "cyber-security",
    title: "Cyber Security",
    category: "Security",
    short: "Network security, ethical hacking, and vulnerability assessment.",
    description:
      "Learn penetration testing, vulnerability assessment, ethical hacking, and security hardening for systems and networks.",
    topics: ["Ethical hacking", "Network security", "Assessment"],
    image: "workshop-group",
    imageAlt: "Participants at a past DevOps workshop",
  },
  {
    id: "robotics",
    title: "Robotics and PCB Design",
    category: "Hardware",
    short: "Embedded systems, automation, and PCB layout.",
    description:
      "Explore embedded systems, automation, circuit design, and PCB layout by building robots and designing circuit boards.",
    topics: ["Embedded systems", "Automation", "PCB layout"],
    image: "classroom-teaching",
    imageAlt: "An instructor teaching during a past summer internship",
  },
  {
    id: "placement",
    title: "Placement Readiness Program",
    category: "Career",
    short: "Interview practice, resumes, aptitude, and communication.",
    description:
      "Campus preparation covering mock interviews, resume building, aptitude training, and soft skills development.",
    topics: ["Interview practice", "Resume building", "Aptitude"],
    image: "workshop-conversation",
    imageAlt: "A discussion with learners at a past APK Infotech workshop",
  },
  {
    id: "get",
    title: "Graduate Engineering Training (GET)",
    category: "Career",
    short: "Practical engineering skills, tools training, and corporate readiness.",
    description:
      "Develop practical engineering skills, tools training, and corporate readiness to bridge academics and industry.",
    topics: ["Engineering skills", "Tools training", "Readiness"],
    image: "internship-classroom",
    imageAlt: "Learners in a classroom during a past summer internship",
  },
];
export const courseCategories = [
  "All courses",
  "Development",
  "AI/ML",
  "Hardware",
  "Security",
  "Career",
];
export function filterCourses(query: string, category: string) {
  const term = query.trim().toLowerCase();
  return courses.filter(
    (course) =>
      (category === "All courses" || course.category === category) &&
      [course.title, course.category, course.description, ...course.topics]
        .join(" ")
        .toLowerCase()
        .includes(term),
  );
}
