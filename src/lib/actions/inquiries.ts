"use server";

import { headers } from "next/headers";
import type { z } from "zod";
import { connectDB } from "@/lib/db/connect";
import { Inquiry } from "@/lib/db/models";
import { consumeRateLimit, getClientIpHash } from "@/lib/rate-limit";
import {
  bookingSchema,
  studyAbroadLeadSchema,
  type ActionResult,
  type BookingInput,
  type StudyAbroadLeadInput,
} from "@/lib/validation/inquiry";

const SUBMISSIONS_PER_WINDOW = 5;
const WINDOW_SECONDS = 10 * 60;
const GENERIC_ERROR = "Something went wrong. Please try again in a moment.";

function invalid(error: z.ZodError): ActionResult {
  return {
    ok: false,
    error: "Please check the highlighted fields.",
    fieldErrors: error.flatten().fieldErrors as Record<string, string[] | undefined>,
  };
}

async function requestMeta() {
  const ipHash = await getClientIpHash();
  const userAgent = (await headers()).get("user-agent")?.slice(0, 400) ?? "";
  return { ipHash, userAgent };
}

export async function submitBooking(input: BookingInput): Promise<ActionResult> {
  const parsed = bookingSchema.safeParse(input);
  if (!parsed.success) return invalid(parsed.error);

  const { website, name, email, notes, ...details } = parsed.data;
  // Honeypot filled: report success so bots learn nothing, but store nothing.
  if (website) return { ok: true };

  try {
    const meta = await requestMeta();
    if (!(await consumeRateLimit(`inquiry:${meta.ipHash}`, SUBMISSIONS_PER_WINDOW, WINDOW_SECONDS))) {
      return { ok: false, error: "Too many requests. Please try again in a few minutes." };
    }

    await connectDB();
    await Inquiry.create({ type: "booking", name, email, message: notes, details, meta });
    return { ok: true };
  } catch (error) {
    console.error("[submitBooking] failed:", error);
    return { ok: false, error: GENERIC_ERROR };
  }
}

export async function submitStudyAbroadLead(input: StudyAbroadLeadInput): Promise<ActionResult> {
  const parsed = studyAbroadLeadSchema.safeParse(input);
  if (!parsed.success) return invalid(parsed.error);

  const { website, name, email, phone, ...details } = parsed.data;
  if (website) return { ok: true };

  try {
    const meta = await requestMeta();
    if (!(await consumeRateLimit(`inquiry:${meta.ipHash}`, SUBMISSIONS_PER_WINDOW, WINDOW_SECONDS))) {
      return { ok: false, error: "Too many requests. Please try again in a few minutes." };
    }

    await connectDB();
    await Inquiry.create({ type: "study_abroad", name, email, phone, details, meta });
    return { ok: true };
  } catch (error) {
    console.error("[submitStudyAbroadLead] failed:", error);
    return { ok: false, error: GENERIC_ERROR };
  }
}
