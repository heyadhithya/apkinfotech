export const registrationUrl =
  "https://docs.google.com/forms/d/e/1FAIpQLSeBUYiR5NKgq5vfsCip66shEFdUvE-uxSR1o5Jouf9WKkVRsw/viewform";
export const courses = [
  {
    id: "full-stack",
    title: "Full Stack Web Development",
    category: "Development",
    short: "Build for the web, from interface to database.",
    description:
      "Learn the MERN stack with React, Node.js, MongoDB, and Express through real-world projects.",
    topics: ["React", "Node.js", "MongoDB", "Express"],
    symbol: "code",
  },
  {
    id: "agentic-ai",
    title: "Agentic AI with Gen AI",
    category: "AI/ML",
    short: "Explore the next generation of AI applications.",
    description:
      "Build autonomous AI agents using LangChain, OpenAI, and multi-agent frameworks with hands-on projects.",
    topics: ["LangChain", "Generative AI", "AI agents"],
    symbol: "ai",
  },
  {
    id: "vlsi",
    title: "VLSI Design",
    category: "Hardware",
    short: "Discover the engineering inside every chip.",
    description:
      "Explore chip design, verification, and semiconductor fundamentals, including RTL design, simulation, and physical design.",
    topics: ["RTL design", "Verification", "Semiconductors"],
    symbol: "chip",
  },
  {
    id: "cyber-security",
    title: "Cyber Security",
    category: "Security",
    short: "Understand systems. Learn how to protect them.",
    description:
      "Learn penetration testing, vulnerability assessment, ethical hacking, and security hardening for systems and networks.",
    topics: ["Ethical hacking", "Network security", "Assessment"],
    symbol: "shield",
  },
  {
    id: "robotics",
    title: "Robotics and PCB Design",
    category: "Hardware",
    short: "Turn engineering ideas into working hardware.",
    description:
      "Explore embedded systems, automation, circuit design, and PCB layout by building robots and designing circuit boards.",
    topics: ["Embedded systems", "Automation", "PCB layout"],
    symbol: "robot",
  },
  {
    id: "placement",
    title: "Placement Readiness Program",
    category: "Career",
    short: "Prepare for the conversations that come next.",
    description:
      "Campus preparation covering mock interviews, resume building, aptitude training, and soft skills development.",
    topics: ["Interview practice", "Resume building", "Aptitude"],
    symbol: "career",
  },
  {
    id: "get",
    title: "Graduate Engineering Training (GET)",
    category: "Career",
    short: "Connect your academic foundation with industry.",
    description:
      "Develop practical engineering skills, tools training, and corporate readiness to bridge academics and industry.",
    topics: ["Engineering skills", "Tools training", "Readiness"],
    symbol: "graduate",
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
