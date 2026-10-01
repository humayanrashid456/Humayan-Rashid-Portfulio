import { z } from "zod";
import {
  ABROAD_COUNTRIES,
  ABROAD_EDUCATION_LEVELS,
  ABROAD_INTAKES,
  BOOKING_DURATIONS,
  BOOKING_SERVICES,
  BOOKING_TIMESLOTS,
} from "@/lib/content/forms";

const name = z.string().trim().min(2, "Please enter your name").max(100);
const email = z.string().trim().toLowerCase().max(254).pipe(z.email("Please enter a valid email address"));
const phone = z
  .string()
  .trim()
  .regex(/^[+\d\s\-()]{7,25}$/, "Please enter a valid phone number");

/** Hidden field that real users never fill; bots usually do. The action discards filled ones. */
const honeypot = z.string().max(500).optional().default("");

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Please pick a date");

export const bookingSchema = z.object({
  service: z.enum(BOOKING_SERVICES),
  duration: z.enum(BOOKING_DURATIONS),
  preferredDate: isoDate.refine((value) => {
    const today = new Date().toISOString().slice(0, 10);
    return value >= today;
  }, "Please pick a date in the future"),
  preferredTime: z.enum(BOOKING_TIMESLOTS),
  name,
  email,
  notes: z.string().trim().max(2000).optional().default(""),
  website: honeypot,
});

export const studyAbroadLeadSchema = z.object({
  country: z.enum(ABROAD_COUNTRIES.map((c) => c.name) as [string, ...string[]]),
  intake: z.enum(ABROAD_INTAKES.map((i) => i.name) as [string, ...string[]]),
  education: z.enum(ABROAD_EDUCATION_LEVELS),
  name,
  email,
  phone,
  website: honeypot,
});

export type BookingInput = z.input<typeof bookingSchema>;
export type StudyAbroadLeadInput = z.input<typeof studyAbroadLeadSchema>;

export type ActionResult =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: Record<string, string[] | undefined> };
