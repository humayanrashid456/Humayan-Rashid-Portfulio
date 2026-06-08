import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Video, Eye, Clock, Youtube, Play, Tag, Sparkles } from "lucide-react";
import { VideoItem } from "../types";
import { loadCMSData } from "../lib/cmsState";
import { DetailShell } from "./BlogDetail";
import { getVideoSource } from "./VideoShowcase";

export default function VideoDetail() {
  const { id } = useParams<{ id: string }>();
  const [video, setVideo] = useState<VideoItem | null>(null);
  const [related, setRelated] = useState<VideoItem[]>([]);

  useEffect(() => {
    const data = loadCMSData();
    const videos = data.videos || [];
    const found = videos.find((v) => v.id === id) || null;
    setVideo(found);
    if (found) {
      setRelated(videos.filter((v) => v.id !== id).slice(0, 3));
    }
  }, [id]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [id]);

  if (!video) {
    return (
      <DetailShell
        title="Video Not Found"
        subtitle="The video you're looking for doesn't exist or has been moved."
        backHref="/#videos"
      >
        <div />
      </DetailShell>
    );
  }

  const source = getVideoSource(video.youtubeId);

  return (
    <DetailShell
      title={video.title}
      backHref="/#videos"
      eyebrow={video.category}
      eyebrowIcon={<Tag size={12} />}
      meta={
        <>
          <span className="flex items-center gap-1.5">
            <Clock size={13} />
            {video.duration}
          </span>
          <span className="flex items-center gap-1.5">
            <Eye size={13} />
            {video.views}
          </span>
          <span className="flex items-center gap-1.5">
            <Youtube size={13} />
            Video Walkthrough
          </span>
        </>
      }
    >
      <div className="space-y-10">
        <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#0a2219] aspect-video relative">
          {source.isYoutube ? (
            <iframe
              src={`https://www.youtube.com/embed/${source.src}?autoplay=0&rel=0&modestbranding=1`}
              title={video.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : source.src ? (
            <video
              src={source.src}
              controls
              poster={video.thumbnail}
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-center p-6">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="absolute inset-0 w-full h-full object-cover opacity-50"
                loading="lazy"
              />
              <div className="relative z-10 w-16 h-16 rounded-full bg-[#cbf341] text-[#061910] flex items-center justify-center shadow-xl">
                <Play size={26} className="fill-current translate-x-0.5" />
              </div>
              <p className="relative z-10 text-xs text-white/80 font-semibold">
                Video source unavailable
              </p>
            </div>
          )}
        </div>

        <section>
          <h3 className="font-display font-black text-xl text-white mb-4 flex items-center gap-2">
            <Sparkles size={18} className="text-[#cbf341]" />
            About This Video
          </h3>
          <p className="text-zinc-300 text-base leading-relaxed">
            {video.title}. In this {video.duration} walkthrough we break down
            the core concepts, design decisions, and engineering patterns that
            power this build. Use the chapters and timestamps below to navigate
            to the section most relevant to you.
          </p>
        </section>

        {related.length > 0 && (
          <section className="pt-8 border-t border-white/10">
            <h3 className="font-display font-black text-xl text-white mb-5 flex items-center gap-2">
              <Video size={18} className="text-[#cbf341]" />
              More Walkthroughs
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {related.map((r) => (
                <Link
                  key={r.id}
                  to={`/videos/${r.id}`}
                  className="group block bg-[#0a2219] border border-white/5 hover:border-[#cbf341]/30 rounded-2xl overflow-hidden transition"
                >
                  <div className="relative aspect-video overflow-hidden bg-[#072418]">
                    <img
                      src={r.thumbnail}
                      alt={r.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                      {r.duration}
                    </div>
                  </div>
                  <div className="p-4">
                    <span className="text-[10px] font-bold text-[#cbf341] uppercase tracking-widest">
                      {r.category}
                    </span>
                    <h4 className="font-display font-bold text-white text-sm mt-1.5 group-hover:text-[#cbf341] transition-colors line-clamp-2">
                      {r.title}
                    </h4>
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
