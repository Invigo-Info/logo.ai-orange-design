export interface CostCard {
  label: string;
  price: string;
  details: string[];
  highlighted?: boolean;
}

export const costCards: CostCard[] = [
  {
    label: "Designer",
    price: "$2,500+",
    details: ["2–4 week turnaround", "Limited revisions", "One-time delivery"],
  },
  {
    label: "Agency",
    price: "$5,000+",
    details: ["4–8 week process", "Meetings & briefs", "Brand guidelines extra"],
  },
  {
    label: "Templates",
    price: "$200+",
    details: ["Generic & overused", "Limited customization", "No originality"],
  },
  {
    label: "Logo.ai",
    price: "Free",
    details: ["Ready in 60 seconds", "Unlimited options", "Fully original"],
    highlighted: true,
  },
];

export interface TeamMember {
  name: string;
  title: string;
  description: string;
}

export const teamMembers: TeamMember[] = [
  { name: "Abhinav Reddy", title: "Co-Founder", description: "Leads product and technology." },
  { name: "Ashwin Reddy", title: "Co-Founder", description: "Leads strategy and growth." },
];

export interface Stat {
  value: string;
  suffix: string;
  label: string;
  numericEnd: number;
}

export const stats: Stat[] = [
  { value: "2", suffix: "+", label: "Years Building", numericEnd: 2 },
  { value: "100K", suffix: "+", label: "Logos Studied", numericEnd: 100 },
  { value: "1,000", suffix: "s", label: "Hours of Training", numericEnd: 1000 },
  { value: "50", suffix: "+", label: "AI & Design Experts", numericEnd: 50 },
];

export interface Milestone {
  date: string;
  title: string;
  description: string;
}

export const milestones: Milestone[] = [
  {
    date: "Jan 2024",
    title: "Started AI Training",
    description:
      "Began training proprietary models on millions of professional logos, brand marks, and design systems.",
  },
  {
    date: "Jul 2024",
    title: "AI Model V2 Complete",
    description:
      "Second-generation model achieved near-professional quality across 50+ industry categories.",
  },
  {
    date: "Jan 2025",
    title: "Private Beta Launch",
    description:
      "Opened to 5,000 early testers. Iterated on feedback across 100,000+ generated logos.",
  },
  {
    date: "Apr 2025",
    title: "Public Launch",
    description:
      "Logo.ai opens to the world — free for the first 500,000 users.",
  },
];
