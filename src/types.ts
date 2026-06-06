/**
 * Shared Type Definitions for Humayan Rashid personal portfolio
 */

export interface Skill {
  name: string;
  level: number; // percentage (0-100)
  category: "Frontend" | "Backend" | "Design" | "Strategy" | "Marketing";
}

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string; // Dynamic icon rendering mapped from Lucide icons
  deliverables: string[];
}

export interface StatItem {
  id: string;
  label: string;
  value: string;
  number: number;
  suffix: string;
  description: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  likes: number;
  body?: string; // Content of the post
  seoTitle?: string;
  seoDescription?: string;
  tags?: string[];
}

export interface VideoItem {
  id: string;
  title: string;
  duration: string;
  views: string;
  youtubeId: string; // fallback iframe/embed link or simulated player action
  category: "tutorials" | "vlogs" | "reviews";
  thumbnail: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  feedback: string;
  avatar: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
}

export interface HeroSection {
  name: string;
  title: string;
  description: string;
  tagline: string;
  avatar: string;
  shortDesc: string;
  introVideoUrl: string; // YouTube embedding link or asset
  ctaPrimaryText: string;
  ctaSecondaryText: string;
  availabilityText: string;
  clientRating: string;
  ratingLabel: string;
}

export interface AboutSection {
  profileImage: string;
  detailedBio: string;
  featuresList: string[];
  testimonials: Testimonial[];
}

export interface ContactSection {
  email: string;
  phone: string;
  address: string;
  github: string;
  linkedin: string;
  twitter: string;
  youtube: string;
  dribbble: string;
}

export interface FooterSection {
  logoText: string;
  copyrightText: string;
  newsletterTitle: string;
  newsletterSubtitle: string;
}

export interface SiteSettings {
  defaultTheme: "light" | "dark";
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  googleAnalyticsId: string;
  faviconUrl: string;
  logoUrl: string;
  cloudinaryCloudName?: string;
  cloudinaryUploadPreset?: string;
}

export interface CMSData {
  hero: HeroSection;
  stats: StatItem[];
  about: AboutSection;
  skills: Skill[];
  services: Service[];
  projects: Project[];
  videos: VideoItem[];
  blogs: BlogPost[];
  contact: ContactSection;
  footer: FooterSection;
  settings: SiteSettings;
}
