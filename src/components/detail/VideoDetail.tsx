import Image from "next/image";
import Link from "next/link";
import { Video, Eye, Clock, Youtube, Tag, Sparkles } from "lucide-react";
import type { VideoData } from "@/lib/data/types";
import VideoPlayer from "@/components/ui/VideoPlayer";
import { videoThumbnail } from "@/lib/video";
import DetailShell from "./DetailShell";

export default function VideoDetail({ video, related }: { video: VideoData; related: VideoData[] }) {
  return (
    <DetailShell
      title={video.title}
      backHref="/videos"
      eyebrow={video.category}
      eyebrowIcon={<Tag size={12} />}
      meta={
        <>
          {video.duration && (
            <span className="flex items-center gap-1.5">
              <Clock size={13} />
              {video.duration}
            </span>
          )}
          {video.views && (
            <span className="flex items-center gap-1.5">
              <Eye size={13} />
              {video.views}
            </span>
          )}
          {video.source === "youtube" && (
            <span className="flex items-center gap-1.5">
              <Youtube size={13} />
              On YouTube
            </span>
          )}
        </>
      }
    >
      <div className="space-y-10">
        <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#0a2219] aspect-video relative">
          <VideoPlayer video={video} />
        </div>

        <section>
          <h2 className="font-display font-black text-xl text-white mb-4 flex items-center gap-2">
            <Sparkles size={18} className="text-[#cbf341]" />
            About This Video
          </h2>
          <p className="text-zinc-300 text-base leading-relaxed">
            {video.description ||
              `${video.title}. In this walkthrough we break down the core concepts, design decisions, and engineering patterns that power this build.`}
          </p>
        </section>

        {related.length > 0 && (
          <section className="pt-8 border-t border-white/10">
            <h2 className="font-display font-black text-xl text-white mb-5 flex items-center gap-2">
              <Video size={18} className="text-[#cbf341]" />
              More Walkthroughs
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/videos/${r.slug}`}
                  className="group block bg-[#0a2219] border border-white/5 hover:border-[#cbf341]/30 rounded-2xl overflow-hidden transition"
                >
                  <div className="relative aspect-video overflow-hidden bg-[#072418]">
                    <Image
                      src={videoThumbnail(r)}
                      alt={r.thumbnail?.alt ?? r.title}
                      fill
                      sizes="(min-width: 640px) 280px, 100vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {r.duration && (
                      <div className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                        {r.duration}
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <span className="text-[10px] font-bold text-[#cbf341] uppercase tracking-widest">{r.category}</span>
                    <h3 className="font-display font-bold text-white text-sm mt-1.5 group-hover:text-[#cbf341] transition-colors line-clamp-2">
                      {r.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </DetailShell>
  );
}
