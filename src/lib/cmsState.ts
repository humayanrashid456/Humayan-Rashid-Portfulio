import { CMSData, Project, Testimonial } from "../types";
import { PERSONAL_INFO, STATS, SKILLS, SERVICES, BLOGS, VIDEOS } from "../data";
import { supabase, isSupabaseConfigured } from "./supabase";

// Pre-packaged gorgeous testimonials
const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: "testimonial-1",
    name: "Sarah Jenkins",
    role: "Product Lead, Horizon FinTech",
    feedback: "Humayan delivers beyond just writing clean syntax. He owns the design process, understands data schemas, and communicates with high precision. An absolute asset for solo launches.",
    avatar: "https://picsum.photos/seed/testimonial1/100/100"
  },
  {
    id: "testimonial-2",
    name: "Marcus Aurelius",
    role: "CEO, Stoic Analytics",
    feedback: "The interactive dashboard Humayan built changed how our enterprise clients visualize server telemetry. Speed increases were noticeable from day one.",
    avatar: "https://picsum.photos/seed/testimonial2/100/100"
  }
];

// Pre-packaged premium portfolio projects
const DEFAULT_PROJECTS: Project[] = [
  {
    id: "project-1",
    title: "Aether - Web-Speed Telemetry",
    description: "A server-less visual playground designed to monitor edge server gateways and response latency vectors globally with sub-millisecond precision.",
    image: "https://picsum.photos/seed/projectaether/600/400",
    category: "Web App",
    technologies: ["React", "TypeScript", "Tailwind CSS", "D3.js"],
    liveUrl: "https://example.com/aether",
    githubUrl: "https://github.com/example/aether"
  },
  {
    id: "project-2",
    title: "Chronos - Intelligent Scheduler",
    description: "A drag-and-drop consultant booking applet with native timezone mapping, Slack messaging proxies and Stripe checkout integration.",
    image: "https://picsum.photos/seed/projectchronos/600/400",
    category: "State Engines",
    technologies: ["Next.js", "Express", "Prisma", "PostgreSQL"],
    liveUrl: "https://example.com/chronos",
    githubUrl: "https://github.com/example/chronos"
  },
  {
    id: "project-3",
    title: "Vivid - UI System Design",
    description: "A brutalist CSS component catalog built as a standard plugin for Tailwind CSS v4, supporting rich dark mode micro-animations.",
    image: "https://picsum.photos/seed/projectvivid/600/400",
    category: "Systems",
    technologies: ["CSS", "Vite", "Framer Motion"],
    liveUrl: "https://example.com/vivid",
    githubUrl: "https://github.com/example/vivid"
  }
];

// Assembly of initial model
export const DEFAULT_CMS_DATA: CMSData = {
  hero: {
    name: PERSONAL_INFO.name,
    title: PERSONAL_INFO.title,
    description: PERSONAL_INFO.tagline,
    tagline: PERSONAL_INFO.tagline,
    avatar: PERSONAL_INFO.avatar,
    shortDesc: PERSONAL_INFO.shortDesc,
    introVideoUrl: "dQw4w9WgXcQ", // YouTube Video ID
    ctaPrimaryText: "Hire Me Directly",
    ctaSecondaryText: "Explore Services",
    availabilityText: "Available globally",
    clientRating: "5.0",
    ratingLabel: "Client Rating"
  },
  stats: STATS,
  about: {
    profileImage: PERSONAL_INFO.avatar,
    detailedBio: PERSONAL_INFO.detailedBio,
    featuresList: [
      "Clean English Communication",
      "Responsive across all screens",
      "Daily milestones, zero blockages",
      "Vetted by 50+ Global Startups"
    ],
    testimonials: DEFAULT_TESTIMONIALS
  },
  skills: SKILLS,
  services: SERVICES,
  projects: DEFAULT_PROJECTS,
  videos: VIDEOS,
  blogs: BLOGS.map(blog => ({
    ...blog,
    body: "## Introduction\n\nWriting clean, scalable code is one of the most vital tasks in modern web engineering. Today, we're exploring how to build premium architectures that load in under 1 second and rank top of Google indexers.\n\n### The Core Methodology\n\nDeveloping high-performance architectures involves continuous refinement of bundles and assets:\n- Dynamic code splitting with Vite\n- Pre-fetching assets based on viewport intersection\n- Utilizing high-speed micro-interactions\n\n```tsx\nexport default function MicroAction() {\n  return (\n    <motion.div\n      whileHover={{ scale: 1.05 }}\n      className=\"p-4 bg-zinc-900 border border-zinc-800\"\n    />\n  );\n}\n```\n\n### Delivering Fluid Animations\n\nFramer Motion lets you construct declarative layout transitions without causing UI lag or structural recalculation. Keep layouts simple and rely on spring vectors.",
    seoTitle: `${blog.title} | Humayan Rashid Portfolio`,
    seoDescription: blog.excerpt,
    tags: ["React", "CSS", "Performance", blog.category]
  })),
  contact: {
    email: PERSONAL_INFO.email,
    phone: PERSONAL_INFO.phone,
    address: PERSONAL_INFO.location,
    github: PERSONAL_INFO.socials.github,
    linkedin: PERSONAL_INFO.socials.linkedin,
    twitter: PERSONAL_INFO.socials.twitter,
    youtube: PERSONAL_INFO.socials.youtube,
    dribbble: PERSONAL_INFO.socials.dribbble
  },
  footer: {
    logoText: "HR",
    copyrightText: `© ${new Date().getFullYear()} Humayan Rashid. All rights reserved.`,
    newsletterTitle: "Sustain your workflow speeds.",
    newsletterSubtitle: "Receive technical blueprint breakdowns on frontend architectures directly in your inbox twice a month."
  },
  settings: {
    defaultTheme: "dark",
    seoTitle: "Humayan Rashid | Premium Freelance Web Dev & Architect",
    seoDescription: "Hi, I'm Humayan Rashid. I help global startups build modular, pixel-perfect SPA web applications using React and TypeScript.",
    seoKeywords: "portfolio, cms, developer, portfolio admin panel, next.js, react 19, typescript, figma, tailwindcss v4",
    googleAnalyticsId: "G-AESTHETIC55",
    faviconUrl: "https://fav.farm/🌐",
    logoUrl: "HR",
    cloudinaryCloudName: "",
    cloudinaryUploadPreset: ""
  }
};

const LOCAL_STORAGE_KEY = "portfolio_cms_payload";
const CMS_SINGLETON_ID = 1;

// Module-level cache for synchronous access
let cmsCache: CMSData | null = null;

function patchData(parsed: Partial<CMSData>): CMSData {
  return {
    ...DEFAULT_CMS_DATA,
    ...parsed,
    hero: { ...DEFAULT_CMS_DATA.hero, ...parsed.hero },
    about: { ...DEFAULT_CMS_DATA.about, ...parsed.about },
    contact: { ...DEFAULT_CMS_DATA.contact, ...parsed.contact },
    footer: { ...DEFAULT_CMS_DATA.footer, ...parsed.footer },
    settings: { ...DEFAULT_CMS_DATA.settings, ...parsed.settings }
  };
}

// Async: load CMS data from Supabase, fall back to localStorage
export async function syncCMSFromSupabase(): Promise<CMSData> {
  if (!isSupabaseConfigured()) {
    console.log("[CMS Supabase] Supabase not configured, using localStorage.");
    return loadCMSData();
  }

  try {
    const { data: row, error } = await supabase!
      .from("cms_data")
      .select("data")
      .eq("id", CMS_SINGLETON_ID)
      .single();

    if (error || !row) {
      console.log("[CMS Supabase] No data found or error:", error?.message || "empty row");
      return loadCMSData();
    }

    const patched = patchData(row.data as Partial<CMSData>);
    cmsCache = patched;
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(patched));
    console.log("[CMS Supabase] Synced from Supabase successfully.");
    return patched;
  } catch (err) {
    console.error("[CMS Supabase] Sync error:", err);
    return loadCMSData();
  }
}

// Safe JSON loader (synchronous — reads from cache or localStorage)
export function loadCMSData(): CMSData {
  if (cmsCache) return cmsCache;

  try {
    const serialized = localStorage.getItem(LOCAL_STORAGE_KEY);
    console.log("[CMS Load] Loading CMS data state. Serialized payload detected:", serialized ? "YES" : "NO");
    if (!serialized) {
      console.log("[CMS Load] Fetching default CMS state as fallback:", DEFAULT_CMS_DATA.about.profileImage);
      cmsCache = DEFAULT_CMS_DATA;
      return DEFAULT_CMS_DATA;
    }
    const parsed = JSON.parse(serialized);
    const patchedData = patchData(parsed);
    console.log("[CMS Load] Patched & structured CMS active state successfully! About Image URL:", patchedData.about.profileImage || "None (Using static fallback)");
    cmsCache = patchedData;
    return patchedData;
  } catch (err) {
    console.error("[CMS Load Error] Failed to load CMS data from localStorage:", err);
    cmsCache = DEFAULT_CMS_DATA;
    return DEFAULT_CMS_DATA;
  }
}

// Safe JSON saver – saves to localStorage (sync) + Supabase (async)
export function saveCMSData(data: CMSData): void {
  cmsCache = data;

  try {
    console.log("[CMS Save] Storing updated CMS payload to localStorage. Details - About Image URL:", data.about.profileImage || "None");
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
    console.log("[CMS Save] Success! Data stored safely. Dispatching change notification events across channels...");
  } catch (err) {
    console.error("[CMS Save Error] Failed to save CMS data to localStorage:", err);
  }

  // Persist to Supabase asynchronously
  if (isSupabaseConfigured()) {
    supabase!
      .from("cms_data")
      .upsert(
        { id: CMS_SINGLETON_ID, data, updated_at: new Date().toISOString() },
        { onConflict: "id" }
      )
      .then(({ error }) => {
        if (error) console.error("[CMS Supabase] Save error:", error.message);
        else console.log("[CMS Supabase] Data saved successfully.");
      });
  }

  // Trigger custom event to notify other mounted components in the application in real-time
  // We dispatch both formats to ensure absolutely clean execution on all event targets.
  window.dispatchEvent(new Event("portfolio_cms_update"));
  window.dispatchEvent(new Event("portfolio-cms-update"));
  console.log("[CMS Save] Synchronization custom window dispatch complete.");
}

// Reset state – resets in localStorage + Supabase
export function resetCMSData(): CMSData {
  cmsCache = DEFAULT_CMS_DATA;
  saveCMSData(DEFAULT_CMS_DATA);
  return DEFAULT_CMS_DATA;
}
