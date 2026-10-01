import type { UploadSignature } from "@/lib/actions/admin/media";

/**
 * Browser → Cloudinary upload with a server-issued signature.
 * Files above one chunk are sent in pieces (Cloudinary's chunked upload API), so a
 * large video survives a flaky connection chunk by chunk and reports real progress.
 */
const CHUNK_BYTES = 20 * 1024 * 1024; // Cloudinary requires ≥ 5 MB per chunk (except the last)

export interface CloudinaryUploadResult {
  public_id: string;
  version: number;
  signature: string;
}

interface UploadOptions {
  onProgress?: (fraction: number) => void;
  signal?: AbortSignal;
}

function send(
  url: string,
  body: FormData,
  headers: Record<string, string>,
  onProgress: (loaded: number) => void,
  signal?: AbortSignal
): Promise<Record<string, unknown>> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    for (const [k, v] of Object.entries(headers)) xhr.setRequestHeader(k, v);
    xhr.upload.onprogress = (e) => onProgress(e.loaded);
    xhr.onload = () => {
      let json: Record<string, unknown> = {};
      try {
        json = JSON.parse(xhr.responseText);
      } catch {
        /* non-JSON error page */
      }
      if (xhr.status >= 200 && xhr.status < 300) resolve(json);
      else reject(new Error((json.error as { message?: string } | undefined)?.message ?? `Upload failed (${xhr.status})`));
    };
    xhr.onerror = () => reject(new Error("Network error. Check your connection and try again."));
    xhr.onabort = () => reject(new DOMException("Upload cancelled", "AbortError"));
    signal?.addEventListener("abort", () => xhr.abort(), { once: true });
    xhr.send(body);
  });
}

export async function uploadToCloudinary(file: File, sig: UploadSignature, { onProgress, signal }: UploadOptions = {}): Promise<CloudinaryUploadResult> {
  const url = `https://api.cloudinary.com/v1_1/${sig.cloudName}/${sig.resourceType}/upload`;
  const fields = (): FormData => {
    const form = new FormData();
    form.append("api_key", sig.apiKey);
    form.append("timestamp", String(sig.timestamp));
    form.append("folder", sig.folder);
    form.append("allowed_formats", sig.allowedFormats);
    form.append("signature", sig.signature);
    return form;
  };

  if (file.size <= CHUNK_BYTES) {
    const form = fields();
    form.append("file", file);
    const res = await send(url, form, {}, (loaded) => onProgress?.(loaded / file.size), signal);
    onProgress?.(1);
    return res as unknown as CloudinaryUploadResult;
  }

  const uploadId = crypto.randomUUID();
  let result: Record<string, unknown> = {};
  for (let start = 0; start < file.size; start += CHUNK_BYTES) {
    if (signal?.aborted) throw new DOMException("Upload cancelled", "AbortError");
    const end = Math.min(start + CHUNK_BYTES, file.size);
    const form = fields();
    form.append("file", file.slice(start, end), file.name);
    result = await send(
      url,
      form,
      { "X-Unique-Upload-Id": uploadId, "Content-Range": `bytes ${start}-${end - 1}/${file.size}` },
      (loaded) => onProgress?.((start + loaded) / file.size),
      signal
    );
  }
  onProgress?.(1);
  // The response to the last chunk describes the whole, assembled file.
  return result as unknown as CloudinaryUploadResult;
}
