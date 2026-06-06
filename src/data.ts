import { Skill, Service, StatItem, BlogPost, VideoItem } from "./types";

export const PERSONAL_INFO = {
  name: "Humayan Rashid",
  title: "Independent Full-Stack Developer & UI/UX Architect",
  tagline: "Building high-performance digital experiences with absolute visual precision.",
  avatar: "/src/assets/images/humayan_portrait_1779387213470.png",
  shortDesc: "I help global startups and established businesses launch pixel-perfect web applications, design systems, and SEO strategies. Expert in high-speed React applications and interactive interfaces.",
  detailedBio: "With over 6 years of professional freelancing experience, I have partnered with dozens of companies worldwide to convert complex concepts into elegant, performant digital solutions. My philosophy centers around clean software architecture, bulletproof typography, and responsive, fluid user animations. I believe a website shouldn't just run fast—it should feel incredibly premium to interact with.",
  email: "humayan.rashid.dev@gmail.com",
  phone: "+1 (555) 019-2834",
  location: "Bangkok, Thailand (GMT+7) / Remote",
  socials: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    youtube: "https://youtube.com",
    dribbble: "https://dribbble.com"
  }
};

export const STATS: StatItem[] = [
  {
    id: "stat-1",
    label: "Projects Completed",
    value: "120+",
    number: 120,
    suffix: "+",
    description: "Successfully shipped high-end web applications globally."
  },
  {
    id: "stat-2",
    label: "Happy Clients",
    value: "80+",
    number: 80,
    suffix: "+",
    description: "Direct long-term support with exceptional reviews."
  },
  {
    id: "stat-3",
    label: "Years of Experience",
    value: "6+",
    number: 6,
    suffix: "+",
    description: "Refining core engineering and aesthetic design values."
  },
  {
    id: "stat-4",
    label: "Countries Reached",
    value: "15+",
    number: 15,
    suffix: "+",
    description: "Collaborated seamlessly across multiple timezones."
  }
];

export const SKILLS: Skill[] = [
  { name: "React / Next.js SPA", level: 95, category: "Frontend" },
  { name: "TypeScript & Data Schemas", level: 92, category: "Frontend" },
  { name: "Tailwind CSS & Theme Design", level: 98, category: "Design" },
  { name: "UI/UX Interactive Mockups", level: 88, category: "Design" },
  { name: "Node.js & Express API Engines", level: 85, category: "Backend" },
  { name: "SEO Optimization & Web Auditing", level: 90, category: "Strategy" },
  { name: "E-commerce & Stripe API Integrations", level: 86, category: "Strategy" },
  { name: "Deployment Infrastructure & Cloud Run", level: 82, category: "Backend" }
];

export const SERVICES: Service[] = [
  {
    id: "web-dev",
    title: "Web Development",
    description: "Custom visual experiences built using standard React, TypeScript, and high-performance server logic. Focused on structural design patterns and optimized bundle sizes.",
    iconName: "Code",
    deliverables: ["Single Page Applications", "State Architecture Planning", "Headless Content Management", "Component Libraries"]
  },
  {
    id: "ui-ux",
    title: "UI/UX Design",
    description: "Crafting immersive user flows, dynamic interactive states, and pixel-accurate wireframes designed to lock in visual dominance and improve metrics.",
    iconName: "Palette",
    deliverables: ["Interactive Prototyping", "Aesthetic Theme Design", "Asset Layout Strategy", "Responsive Design Skeletons"]
  },
  {
    id: "seo-opt",
    title: "SEO Optimization",
    description: "Comprehensive audits, speed diagnostics, and core structural metadata integrations designed to rise to the top of Google indices.",
    iconName: "Search",
    deliverables: ["Technical Audit Mapping", "Optimized Asset Loading", "Semantics & Accessibility", "Structured Schema Setup"]
  },
  {
    id: "e-com",
    title: "E-Commerce Engines",
    description: "Tailored checkouts, shopping integrations, secure payment proxy pipelines, and item collection management tools.",
    iconName: "ShoppingBag",
    deliverables: ["Custom Stripe Checkout", "Dynamic Shopping Cart Logic", "Order Summary Dashboards", "Responsive Item Grid"]
  },
  {
    id: "consultation",
    title: "Expert Consultation",
    description: "A comprehensive roadmap, product review, or code analysis to streamline your tech stack before deploying to production.",
    iconName: "Compass",
    deliverables: ["Tech Stack Feasibility Audits", "Application Speed Profiling", "Security Auditing Overview", "Growth & Scale Planning"]
  },
  {
    id: "maintenance",
    title: "Maintenance & Support",
    description: "Continuous updates, patch deployments, security checks, and rapid diagnostics so your application always operates flawlessly.",
    iconName: "Activity",
    deliverables: ["Weekly Framework Updates", "Up-time Diagnostics Monitoring", "Bug Tracking & Corrections", "Cloud Run Optimization"]
  }
];

export const BLOGS: BlogPost[] = [
  {
    id: "blog-1",
    title: "Building Microinteractions in Modern SPAs with Framer Motion",
    excerpt: "Learn how subtle hover effects, staggered dynamic layout enterings, and spring-physics keyframes raise standard UI views to high-end premium experiences.",
    category: "Technical Design",
    date: "May 18, 2026",
    readTime: "5 min read",
    image: "https://picsum.photos/seed/techinteractions/800/600",
    likes: 84
  },
  {
    id: "blog-2",
    title: "SEO Strategies in 2026: Achieving Pristine Core Web Vitals",
    excerpt: "A comprehensive deep dive into asset optimization, rendering priorities, script deferred mappings, and semantic structures that Google’s indexers absolute love.",
    category: "Growth & Strategy",
    date: "April 29, 2026",
    readTime: "8 min read",
    image: "https://picsum.photos/seed/seoaudits/800/600",
    likes: 112
  },
  {
    id: "blog-3",
    title: "Refactoring Legacy Portfolios: From Giant Bundles to Speedy Vite Devs",
    excerpt: "Why micro-frameworks, on-demand Tailwind compile-hooks, and TypeScript strict checks are absolute game changers for independent freelancer branding speeds.",
    category: "Web Engineering",
    date: "March 15, 2026",
    readTime: "6 min read",
    image: "https://picsum.photos/seed/speedybundle/800/600",
    likes: 95
  }
];

export const VIDEOS: VideoItem[] = [
  {
    id: "vid-1",
    title: "Introductory Reel: Designing Digital Dominance with Humayan Rashid",
    duration: "2:40",
    views: "1.2K views",
    youtubeId: "dQw4w9WgXcQ", // rickroll fallback or premium embed layout
    category: "tutorials",
    thumbnail: "https://picsum.photos/seed/introvideo/640/360"
  },
  {
    id: "vid-2",
    title: "SaaS Application Redesign: Full Blueprint walkthrough & UI Reveal",
    duration: "14:15",
    views: "4.8K views",
    youtubeId: "dQw4w9WgXcQ",
    category: "vlogs",
    thumbnail: "https://picsum.photos/seed/saasredesign/640/360"
  },
  {
    id: "vid-3",
    title: "How I Optimised my Freelance Remote Dev Setup for Ultra-low Cognitive Load",
    duration: "8:50",
    views: "2.3K views",
    youtubeId: "dQw4w9WgXcQ",
    category: "reviews",
    thumbnail: "https://picsum.photos/seed/setupport/640/360"
  }
];
