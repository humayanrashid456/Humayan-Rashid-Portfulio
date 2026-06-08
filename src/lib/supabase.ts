import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

let client: SupabaseClient | null = null;

if (supabaseUrl && supabaseAnonKey) {
  client = createClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: false },
  });
}

export const supabase = client;

export function isSupabaseConfigured(): boolean {
  return client !== null;
}

export async function uploadImageToSupabase(
  file: File,
  bucket: string = "cms-images"
): Promise<string | null> {
  if (!client) return null;

  const ext = file.name.split(".").pop()?.toLowerCase() || "png";
  const fileName = `${Date.now()}_${Math.random().toString(36).slice(2, 10)}.${ext}`;

  const { error } = await client.storage.from(bucket).upload(fileName, file, {
    cacheControl: "3600",
    upsert: false,
    contentType: file.type,
  });

  if (error) {
    console.error("[Supabase Storage] Upload error:", error.message);
    return null;
  }

  const { data: urlData } = client.storage.from(bucket).getPublicUrl(fileName);
  return urlData?.publicUrl || null;
}
