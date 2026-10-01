import mongoose from "mongoose";
import { serverEnv } from "@/lib/env";

type ConnectionCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

// Cached on globalThis so dev hot-reloads and warm serverless instances reuse one
// connection pool, and concurrent callers share a single in-flight connect.
const globalCache = globalThis as unknown as { __mongoose?: ConnectionCache };
const cache = (globalCache.__mongoose ??= { conn: null, promise: null });

mongoose.set("strictQuery", true);
// Strips `$`-prefixed operators from query filters built from user input.
mongoose.set("sanitizeFilter", true);

export async function connectDB(): Promise<typeof mongoose> {
  if (cache.conn) return cache.conn;

  if (!cache.promise) {
    const env = serverEnv();
    cache.promise = mongoose.connect(env.MONGODB_URI, {
      dbName: env.MONGODB_DB,
      maxPoolSize: 10,
      minPoolSize: 0,
      serverSelectionTimeoutMS: 5000,
      bufferCommands: false,
      // Indexes are created by `npm run db:indexes`, not on every cold start.
      autoIndex: env.NODE_ENV !== "production",
    });
  }

  try {
    cache.conn = await cache.promise;
  } catch (error) {
    cache.promise = null;
    throw error;
  }
  return cache.conn;
}
