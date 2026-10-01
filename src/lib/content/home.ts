/**
 * Homepage content: one schema per section, stored under `SiteSettings.home.<section>`.
 * The schemas validate admin saves and parse what is read back; a section that is
 * missing or fails to parse falls back to its default below, so the site always renders.
 * The defaults are the copy the site shipped with.
 */
import { z } from "zod";
import { iconName, imageSchema, optionalText, text } from "@/lib/validation/common";

const enabled = z.boolean().default(true);
const iconItem = z.object({ icon: iconName, label: text(60, "Label") });

export const heroSchema = z.object({
  enabled,
  greeting: text(40, "Greeting"),
  name: text(60, "Name"),
  subheadline: text(400, "Sub-headline"),
  bullets: z.array(text(80, "Bullet")).max(8),
  primaryCta: text(40, "Button text"),
  secondaryCta: text(40, "Button text"),
  introVideo: optionalText(200),
  videoCaption: optionalText(80),
  bannerImage: imageSchema,
  tabs: z.array(iconItem).max(6),
  trustItems: z.array(iconItem).max(6),
  tagline: optionalText(60),
});

export const aboutSchema = z.object({
  enabled,
  eyebrow: text(40, "Eyebrow"),
  title: text(120, "Title"),
  description: text(600, "Description"),
  features: z.array(text(100, "Feature")).max(6),
  ctaLabel: text(40, "Button text"),
  image: imageSchema,
  stats: z.array(z.object({ icon: iconName, value: text(20, "Value"), label: text(60, "Label") })).max(4),
  marquee: z.array(text(60, "Item")).max(12),
});

export const processSchema = z.object({
  enabled,
  eyebrow: text(40, "Eyebrow"),
  title: text(120, "Title"),
  image: imageSchema,
  // The desktop layout places exactly four steps around the image.
  steps: z
    .array(z.object({ icon: iconName, title: text(60, "Title"), description: text(240, "Description") }))
    .length(4, "The process needs exactly 4 steps"),
});

export const benefitsSchema = z.object({
  enabled,
  eyebrow: text(40, "Eyebrow"),
  title: text(120, "Title"),
  withLabel: text(40, "Label"),
  withoutLabel: text(40, "Label"),
  rows: z
    .array(
      z.object({
        icon: iconName,
        withTitle: text(60, "Title"),
        withDescription: text(240, "Description"),
        withoutTitle: text(60, "Title"),
        withoutDescription: text(240, "Description"),
      })
    )
    .max(6),
});

export const studyAbroadSchema = z.object({
  enabled,
  eyebrow: text(60, "Eyebrow"),
  title: text(80, "Title"),
  highlight: text(80, "Highlighted text"),
  description: text(400, "Description"),
  image: imageSchema,
  consultantName: text(60, "Name"),
  consultantRole: text(80, "Role"),
  countries: z
    .array(
      z.object({
        name: text(30, "Country"),
        code: z.string().trim().toLowerCase().regex(/^[a-z]{2}$/, "Use the 2-letter country code, e.g. us"),
      })
    )
    .max(12),
  services: z.array(z.object({ icon: iconName, title: text(60, "Title"), description: text(80, "Description") })).max(6),
  primaryCta: text(40, "Button text"),
  secondaryCta: text(40, "Button text"),
});

export const contactSchema = z.object({
  enabled,
  eyebrow: text(40, "Eyebrow"),
  title: text(120, "Title"),
  description: text(300, "Description"),
  ctaLabel: text(40, "Button text"),
  hoursLabel: optionalText(60),
});

/** Heading block for the sections whose items come from their own collections. */
const listingHeading = z.object({
  enabled,
  eyebrow: text(40, "Eyebrow"),
  title: text(120, "Title"),
  subtitle: optionalText(300),
});

export const HOME_SCHEMAS = {
  hero: heroSchema,
  services: listingHeading,
  about: aboutSchema,
  portfolio: listingHeading,
  process: processSchema,
  benefits: benefitsSchema,
  videos: listingHeading,
  studyAbroad: studyAbroadSchema,
  blog: listingHeading,
  contact: contactSchema,
} as const;

export type HomeSectionKey = keyof typeof HOME_SCHEMAS;
export const HOME_SECTION_KEYS = Object.keys(HOME_SCHEMAS) as HomeSectionKey[];
export type HomeContent = { [K in HomeSectionKey]: z.infer<(typeof HOME_SCHEMAS)[K]> };

const img = (file: string, alt: string) => ({ url: `/images/${file}`, alt });

export const HOME_DEFAULTS: HomeContent = {
  hero: {
    enabled: true,
    greeting: "Hi, I'm",
    name: "Humayan Rashid.",
    subheadline:
      "Helping USA Local Businesses grow through high-converting **Web Design**, **SEO** & **Automation** — so you get more calls, leads and revenue.",
    bullets: ["High Converting Websites", "Automation & Funnels", "SEO & Local SEO", "Ongoing Growth Support"],
    primaryCta: "Book A Free Strategy Call",
    secondaryCta: "View My Work",
    introVideo: "",
    videoCaption: "90 Second Introduction",
    bannerImage: img("video-banner.jpg", ""),
    tabs: [
      { icon: "Monitor", label: "WEBSITES" },
      { icon: "Search", label: "SEO" },
      { icon: "MapPin", label: "LOCAL SEO" },
      { icon: "Settings", label: "AUTOMATION" },
      { icon: "Tag", label: "BRANDING" },
    ],
    trustItems: [
      { icon: "Clock", label: "USA Time Zone Support" },
      { icon: "PhoneCall", label: "Fast Response" },
      { icon: "Target", label: "100% Focus on Results" },
      { icon: "Shield", label: "Trusted by Local Businesses" },
    ],
    tagline: "RESULTS THAT MATTER",
  },
  services: { enabled: true, eyebrow: "Our Services", title: "Our Digital Services To Grow Your Brand", subtitle: "" },
  about: {
    enabled: true,
    eyebrow: "About Us",
    title: "Expert Digital Marketing Solutions For Every Size",
    description:
      "Digital marketing agencies are versatile partners, offering customized strategies that cater to diverse business goals, whether for burgeoning startups or established corporations.",
    features: ["Tailored Strategies for Every Business", "Comprehensive Service Offerings", "Results-Driven Digital Growth"],
    ctaLabel: "Get In Touch",
    image: img("about-presentation.jpg", "Team working together"),
    stats: [
      { icon: "FileText", value: "900+", label: "Successful Projects" },
      { icon: "Users", value: "98%", label: "Client Satisfaction Rate" },
      { icon: "DollarSign", value: "$10M+", label: "Revenue Generated" },
      { icon: "Layers", value: "25+", label: "Industry Platforms" },
    ],
    marquee: [
      "Research & Analysis",
      "Search Engine Optimization",
      "Digital Marketing",
      "Social Media Marketing",
      "Content Marketing",
      "Branding Services",
    ],
  },
  portfolio: { enabled: true, eyebrow: "Case Studies", title: "Our Recent Works & Case Studies", subtitle: "" },
  process: {
    enabled: true,
    eyebrow: "Working Process",
    title: "Our Step-By-Step Approach",
    image: img("working-process-team.jpg", "Our step-by-step collaboration team"),
    steps: [
      {
        icon: "Compass",
        title: "Discovery & Strategy",
        description: "We start by understanding your business, goals, and audience to craft a tailored marketing roadmap.",
      },
      {
        icon: "Palette",
        title: "Creative Planning",
        description: "Our team designs compelling content, campaigns, and visuals aligned with your brand's voice.",
      },
      {
        icon: "Settings",
        title: "Execution & Optimization",
        description: "We launch, manage, and continuously refine every campaign for maximum impact and ROI.",
      },
      {
        icon: "TrendingUp",
        title: "Reporting & Growth",
        description: "You receive transparent reports and insights as we scale results and evolve with your goals.",
      },
    ],
  },
  benefits: {
    enabled: true,
    eyebrow: "Why Choose Us",
    title: "The Benefits Of Choosing Us",
    withLabel: "With HR",
    withoutLabel: "Without HR",
    rows: [
      {
        icon: "Target",
        withTitle: "Results-Driven Focus",
        withDescription: "Measurable outcomes like high ROI, verified leads, and absolute conversions—never vanity metrics.",
        withoutTitle: "Vanity Metrics Only",
        withoutDescription:
          "Focusing on surface-level clicks, traffic spikes, and impressions without actual revenue pipeline growth.",
      },
      {
        icon: "Shield",
        withTitle: "Bespoke Premium Code",
        withDescription: "Fluid React & Tailwind SPAs built from scratch for maximum speed, ranking, and audit scores.",
        withoutTitle: "Bloated Templates",
        withoutDescription: "Bloated theme layouts, heavy script plugins, and slow loading times that hurt organic SEO.",
      },
      {
        icon: "TrendingUp",
        withTitle: "Direct Active Partnership",
        withDescription: "Work directly with a veteran developer. Clear communication, daily updates, zero bureaucracy.",
        withoutTitle: "Agency Bureaucracy",
        withoutDescription: "Messages routed through account managers, causing developer blockages and delayed feedback.",
      },
    ],
  },
  videos: { enabled: true, eyebrow: "CREATIVE SHOWCASE", title: "Interactive Video Showcase & Tech Audits", subtitle: "" },
  studyAbroad: {
    enabled: true,
    eyebrow: "Study Abroad with Biddaloy",
    title: "Helping Students",
    highlight: "Build Global Careers",
    description:
      "University Admission, Visa Processing, Scholarship Guidance and Pre-Departure Support — Everything You Need, All in One Place.",
    image: img("humayan-study-abroad.jpg", "Humayan Rashid, Study Abroad Consultant"),
    consultantName: "Humayan Rashid",
    consultantRole: "Senior Study Abroad Consultant",
    countries: [
      { name: "USA", code: "us" },
      { name: "UK", code: "gb" },
      { name: "CANADA", code: "ca" },
      { name: "AUSTRALIA", code: "au" },
      { name: "GERMANY", code: "de" },
      { name: "IRELAND", code: "ie" },
    ],
    services: [
      { icon: "BookOpen", title: "University Admission", description: "Top Ranked Universities" },
      { icon: "ClipboardCheck", title: "Visa Processing", description: "Fast & Hassle-Free" },
      { icon: "Award", title: "Scholarship Guidance", description: "Maximize Your Chances" },
      { icon: "Plane", title: "Pre-Departure Support", description: "Travel with Confidence" },
      { icon: "HeartHandshake", title: "Post Arrival Support", description: "We're there for you" },
    ],
    primaryCta: "Book Free Counseling",
    secondaryCta: "Check Eligibility",
  },
  blog: {
    enabled: true,
    eyebrow: "TECHNICAL INSIGHTS",
    title: "Humayan's Dev Log & Tactical Guides",
    subtitle: "Explaining deep concepts in system engineering, UI mechanics, and organic ranking.",
  },
  contact: {
    enabled: true,
    eyebrow: "Reach Out Us",
    title: "Ready To Talk? Reach Out Anytime",
    description: "Have a project in mind? Let's chat! Our team is just a message away.",
    ctaLabel: "Get Free Consultation",
    hoursLabel: "24/7 Hours Call handling",
  },
};

/** Parses one stored section, falling back to its default when missing or invalid. */
export function parseHomeSection<K extends HomeSectionKey>(key: K, raw: unknown): HomeContent[K] {
  if (raw === undefined || raw === null) return HOME_DEFAULTS[key];
  const parsed = HOME_SCHEMAS[key].safeParse(raw);
  if (!parsed.success) {
    console.warn(`[home] stored "${key}" section is invalid; using defaults.`, parsed.error.issues[0]);
    return HOME_DEFAULTS[key];
  }
  return parsed.data as HomeContent[K];
}
