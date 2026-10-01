/**
 * Creates/updates every collection's indexes (unique, TTL, compound).
 * Production connections run with autoIndex off, so run this on first deploy
 * and whenever a schema's indexes change:  npm run db:indexes
 */
import mongoose from "mongoose";
import { connectDB } from "@/lib/db/connect";
import { AuthToken, BlogPost, Inquiry, Media, Project, RateLimit, Service, Session, SiteSettings, User, Video } from "@/lib/db/models";

const MODELS = [User, Session, AuthToken, RateLimit, SiteSettings, Service, Project, BlogPost, Video, Inquiry, Media];

async function main() {
  await connectDB();
  for (const model of MODELS) {
    await model.syncIndexes();
    console.log(`✓ ${model.collection.collectionName}`);
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => mongoose.disconnect());
