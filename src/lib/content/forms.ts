/**
 * Option lists shared by the public forms (for rendering) and the server actions
 * (for validation), so a submission can only contain values the UI offers.
 */

export const BOOKING_SERVICES = [
  "Full-Stack Web App Build",
  "UI/UX Visual Prototyping",
  "SEO Core Metrics Speed Diagnostic",
  "Stripe Engine & Store Setup",
  "General Architecture Consultation",
] as const;

export const BOOKING_DURATIONS = ["30 Min Intro (Free)", "60 Min Strategy Session"] as const;

export const BOOKING_TIMESLOTS = [
  "09:00 AM (GMT+7)",
  "11:30 AM (GMT+7)",
  "02:00 PM (GMT+7)",
  "04:30 PM (GMT+7)",
] as const;

export const ABROAD_COUNTRIES = [
  { name: "Australia", code: "au", tagline: "Top Universities" },
  { name: "United Kingdom", code: "gb", tagline: "Heritage Education" },
  { name: "Canada", code: "ca", tagline: "PR Pathways" },
  { name: "USA", code: "us", tagline: "Global Rankings" },
  { name: "Germany", code: "de", tagline: "Tuition-Free Options" },
  { name: "Ireland", code: "ie", tagline: "Innovation Hub" },
  { name: "Malaysia", code: "my", tagline: "Affordable Excellence" },
] as const;

export const ABROAD_INTAKES = [
  { name: "November 2026", desc: "Winter Intake" },
  { name: "January 2027", desc: "Spring Intake" },
] as const;

export const ABROAD_EDUCATION_LEVELS = [
  "SSC",
  "HSC",
  "Diploma",
  "Bachelor's Degree",
  "Master's Degree",
  "PhD/Doctorate",
] as const;
