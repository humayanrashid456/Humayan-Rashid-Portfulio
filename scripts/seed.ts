/**
 * Seeds the site's starting content: the content the site displayed before the rebuild.
 * Idempotent: documents are matched by slug and only inserted when missing, so
 * re-running never overwrites edits made later.   npm run db:seed
 *
 * After seeding a live deployment, redeploy (or save in the admin) so the cached
 * pages pick up the new data.
 */
import mongoose from "mongoose";
import { connectDB } from "@/lib/db/connect";
import { BlogPost, Project, SITE_SETTINGS_ID, Service, SiteSettings, Video } from "@/lib/db/models";

const img = (file: string, alt: string) => ({ url: `/images/${file}`, alt });

const SETTINGS = {
  brand: { name: "Humayan Rashid", logoTitle: "I AM HUMAYAN", logoSubtitle: "FROM TEXAS" },
  hero: { introVideo: "" },
  contact: {
    email: "humayan.rashid.dev@gmail.com",
    phone: "",
    whatsapp: "",
    address: "Bangkok, Thailand (GMT+7) / Remote",
    timezone: "Asia/Bangkok",
  },
  social: { linkedin: "", x: "", instagram: "", pinterest: "", tiktok: "", youtube: "", github: "" },
  footer: { copyrightText: "" },
  seo: {
    title: "Humayan Rashid | Web Design, SEO & Automation",
    description:
      "Humayan Rashid helps local businesses grow with high-converting websites, SEO and automation, so you get more calls, leads and revenue.",
  },
  skills: [],
  testimonials: [],
};

const SERVICES = [
  {
    slug: "web-dev",
    title: "Web Development",
    description:
      "Custom visual experiences built using standard React, TypeScript, and high-performance server logic. Focused on structural design patterns and optimized bundle sizes.",
    iconName: "Megaphone",
    deliverables: ["Single Page Applications", "State Architecture Planning", "Headless Content Management", "Component Libraries"],
    image: img("social-media-team.jpg", "Web development team at work"),
  },
  {
    slug: "seo-opt",
    title: "SEO Optimization",
    description:
      "Comprehensive audits, speed diagnostics, and core structural metadata integrations designed to rise to the top of Google indices.",
    iconName: "Search",
    deliverables: ["Technical Audit Mapping", "Optimized Asset Loading", "Semantics & Accessibility", "Structured Schema Setup"],
    image: img("seo-analysis-team.jpg", "SEO analysis session"),
  },
  {
    slug: "ui-ux",
    title: "UI/UX Design",
    description:
      "Crafting immersive user flows, dynamic interactive states, and pixel-accurate wireframes designed to lock in visual dominance and improve metrics.",
    iconName: "MousePointerClick",
    deliverables: ["Interactive Prototyping", "Aesthetic Theme Design", "Asset Layout Strategy", "Responsive Design Skeletons"],
    image: img("ppc-advertising-team.jpg", "Design review meeting"),
  },
  {
    slug: "e-com",
    title: "E-Commerce Engines",
    description:
      "Tailored checkouts, shopping integrations, secure payment proxy pipelines, and item collection management tools.",
    iconName: "ShoppingBag",
    deliverables: ["Custom Stripe Checkout", "Dynamic Shopping Cart Logic", "Order Summary Dashboards", "Responsive Item Grid"],
  },
  {
    slug: "consultation",
    title: "Expert Consultation",
    description:
      "A comprehensive roadmap, product review, or code analysis to streamline your tech stack before deploying to production.",
    iconName: "Compass",
    deliverables: ["Tech Stack Feasibility Audits", "Application Speed Profiling", "Security Auditing Overview", "Growth & Scale Planning"],
  },
  {
    slug: "maintenance",
    title: "Maintenance & Support",
    description:
      "Continuous updates, patch deployments, security checks, and rapid diagnostics so your application always operates flawlessly.",
    iconName: "Activity",
    deliverables: ["Weekly Framework Updates", "Up-time Diagnostics Monitoring", "Bug Tracking & Corrections", "Hosting Optimization"],
  },
];

const PROJECTS = [
  {
    slug: "aether-web-speed-telemetry",
    title: "Aether - Web-Speed Telemetry",
    description:
      "A server-less visual playground designed to monitor edge server gateways and response latency vectors globally with sub-millisecond precision.",
    category: "Web App",
    technologies: ["React", "TypeScript", "Tailwind CSS", "D3.js"],
    coverImage: img("case-study-team.jpg", "Aether telemetry dashboard case study"),
  },
  {
    slug: "chronos-intelligent-scheduler",
    title: "Chronos - Intelligent Scheduler",
    description:
      "A drag-and-drop consultant booking applet with native timezone mapping, Slack messaging proxies and Stripe checkout integration.",
    category: "State Engines",
    technologies: ["Next.js", "Express", "Prisma", "PostgreSQL"],
    coverImage: img("social-media-team.jpg", "Chronos scheduler case study"),
  },
  {
    slug: "vivid-ui-system-design",
    title: "Vivid - UI System Design",
    description:
      "A brutalist CSS component catalog built as a standard plugin for Tailwind CSS v4, supporting rich dark mode micro-animations.",
    category: "Systems",
    technologies: ["CSS", "Vite", "Framer Motion"],
    coverImage: img("seo-analysis-team.jpg", "Vivid design system case study"),
  },
];

const SAMPLE_BODY = `## Introduction

Writing clean, scalable code is one of the most vital tasks in modern web engineering. Today, we're exploring how to build premium architectures that load in under 1 second and rank at the top of Google.

### The Core Methodology

Developing high-performance architectures involves continuous refinement of bundles and assets:

- Dynamic code splitting
- Pre-fetching assets based on viewport intersection
- Utilizing high-speed micro-interactions

\`\`\`tsx
export default function MicroAction() {
  return <m.div whileHover={{ scale: 1.05 }} className="p-4 bg-zinc-900 border border-zinc-800" />;
}
\`\`\`

### Delivering Fluid Animations

Motion lets you construct declarative layout transitions without causing UI lag or structural recalculation. Keep layouts simple and rely on spring physics.`;

const BLOG_POSTS = [
  {
    slug: "building-microinteractions-in-modern-spas",
    title: "Building Microinteractions in Modern SPAs with Framer Motion",
    excerpt:
      "Learn how subtle hover effects, staggered dynamic layout enterings, and spring-physics keyframes raise standard UI views to high-end premium experiences.",
    category: "Technical Design",
    tags: ["React", "CSS", "Performance", "Technical Design"],
    coverImage: img("social-media-team.jpg", "Team discussing interface animations"),
    readingMinutes: 5,
    publishedAt: new Date("2026-05-18"),
  },
  {
    slug: "seo-strategies-2026-core-web-vitals",
    title: "SEO Strategies in 2026: Achieving Pristine Core Web Vitals",
    excerpt:
      "A comprehensive deep dive into asset optimization, rendering priorities, deferred scripts, and semantic structures that Google's indexers love.",
    category: "Growth & Strategy",
    tags: ["SEO", "Performance", "Growth & Strategy"],
    coverImage: img("seo-analysis-team.jpg", "SEO analysis on a laptop"),
    readingMinutes: 8,
    publishedAt: new Date("2026-04-29"),
  },
  {
    slug: "refactoring-legacy-portfolios",
    title: "Refactoring Legacy Portfolios: From Giant Bundles to Speedy Builds",
    excerpt:
      "Why modern frameworks, on-demand Tailwind compilation, and TypeScript strict checks are game changers for independent freelancer sites.",
    category: "Web Engineering",
    tags: ["React", "TypeScript", "Web Engineering"],
    coverImage: img("ppc-advertising-team.jpg", "Developers reviewing a codebase"),
    readingMinutes: 6,
    publishedAt: new Date("2026-03-15"),
  },
].map((post) => ({ ...post, body: SAMPLE_BODY }));

// Placeholder videos kept from the previous site: replace youtubeId with real uploads.
const VIDEOS = [
  { slug: "introductory-reel", title: "Introductory Reel: Designing Digital Dominance with Humayan Rashid", duration: "2:40", category: "tutorials" },
  { slug: "saas-application-redesign", title: "SaaS Application Redesign: Full Blueprint Walkthrough & UI Reveal", duration: "14:15", category: "vlogs" },
  { slug: "remote-dev-setup", title: "How I Optimised my Freelance Remote Dev Setup for Ultra-low Cognitive Load", duration: "8:50", category: "reviews" },
].map((video) => ({
  ...video,
  category: video.category as "tutorials" | "vlogs" | "reviews",
  youtubeId: "dQw4w9WgXcQ",
  thumbnail: img("video-banner.jpg", video.title),
}));

/** Inserts each doc (by slug) only if it does not exist yet; never overwrites. */
async function insertMissing<T extends { slug: string }>(
  label: string,
  docs: T[],
  upsert: (doc: T & { order: number; status: "published"; createdAt: Date; updatedAt: Date }) => Promise<{ upsertedCount: number }>
) {
  const now = new Date();
  let inserted = 0;
  for (const [order, doc] of docs.entries()) {
    const result = await upsert({ ...doc, order, status: "published", createdAt: now, updatedAt: now });
    inserted += result.upsertedCount;
  }
  console.log(`✓ ${label}: ${inserted} inserted, ${docs.length - inserted} already present`);
}

const ONLY_INSERT = { upsert: true, runValidators: true, timestamps: false } as const;

async function main() {
  await connectDB();

  const settings = await SiteSettings.updateOne(
    { _id: SITE_SETTINGS_ID },
    { $setOnInsert: { ...SETTINGS, createdAt: new Date(), updatedAt: new Date() } },
    ONLY_INSERT
  );
  console.log(`✓ site settings: ${settings.upsertedCount ? "inserted" : "already present"}`);

  await insertMissing("services", SERVICES, (doc) =>
    Service.updateOne({ slug: doc.slug }, { $setOnInsert: doc }, ONLY_INSERT).exec()
  );
  await insertMissing("projects", PROJECTS, (doc) =>
    Project.updateOne({ slug: doc.slug }, { $setOnInsert: doc }, ONLY_INSERT).exec()
  );
  await insertMissing("blog posts", BLOG_POSTS, (doc) =>
    BlogPost.updateOne({ slug: doc.slug }, { $setOnInsert: doc }, ONLY_INSERT).exec()
  );
  await insertMissing("videos", VIDEOS, (doc) =>
    Video.updateOne({ slug: doc.slug }, { $setOnInsert: doc }, ONLY_INSERT).exec()
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => mongoose.disconnect());
