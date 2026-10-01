"use server";

import mongoose from "mongoose";
import { refresh } from "next/cache";
import { z } from "zod";
import { verifySession } from "@/lib/auth/session";
import { connectDB } from "@/lib/db/connect";
import { Inquiry, INQUIRY_STATUSES } from "@/lib/db/models";

const idSchema = z.string().refine((v) => mongoose.isValidObjectId(v), "Invalid id");

export async function setInquiryStatus(id: string, status: (typeof INQUIRY_STATUSES)[number]): Promise<void> {
  await verifySession();
  const docId = idSchema.parse(id);
  const next = z.enum(INQUIRY_STATUSES).parse(status);
  await connectDB();
  await Inquiry.updateOne({ _id: docId }, { $set: { status: next } });
  refresh();
}

export async function deleteInquiry(id: string): Promise<void> {
  await verifySession();
  const docId = idSchema.parse(id);
  await connectDB();
  await Inquiry.deleteOne({ _id: docId });
  refresh();
}
