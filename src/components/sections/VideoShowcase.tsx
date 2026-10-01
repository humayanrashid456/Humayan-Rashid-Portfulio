"use client";

import { useState } from "react";
import type { MouseEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { m, AnimatePresence } from "motion/react";
import { Play, Eye, Youtube, ArrowUpRight } from "lucide-react";
import ViewAllLink from "@/components/ui/ViewAllLink";
import type { HomeContent } from "@/lib/content/home";
import type { VideoCategory, VideoData } from "@/lib/data/types";
import FilterPills from "@/components/ui/FilterPills";
import VideoPlayer from "@/components/ui/VideoPlayer";
import { videoThumbnail } from "@/lib/video";

interface VideoShowcaseProps {
  heading: HomeContent["videos"];
  videos: VideoData[];
  youtubeChannelUrl?: string;
  viewAllHref?: string;
}

const thumbnailOf = (video: VideoData) => videoThumbnail(video);

export default function VideoShowcase({ heading, videos, youtubeChannelUrl, viewAllHref }: VideoShowcaseProps) {
  const router = useRouter();
  const videosList = videos;
  const [activeVideoState, setActiveVideoState] = useState<VideoData | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedTab, setSelectedTab] = useState<"all" | VideoCategory>("all");

  const activeVideo = activeVideoState || videosList[0];

  const filteredVideos = selectedTab === "all"
    ? videosList
    : videosList.filter(vid => vid.category === selectedTab);

  const handleVideoSelect = (vid: VideoData, e: MouseEvent) => {
    e.stopPropagation();
    setActiveVideoState(vid);
    setIsPlaying(false);
  };

  const openVideo = (slug: string) => router.push(`/videos/${slug}`);

  return (
    <section
      id="videos"
      className="py-12 sm:py-16 md:py-20 lg:py-28 bg-[#061910] text-white transition-colors duration-300 relative overflow-hidden"
    >
      <div className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full bg-[#cbf341]/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Title Group header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="font-mono text-xs font-bold text-[#cbf341] uppercase tracking-widest block mb-3">
              {heading.eyebrow}
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight">
              {heading.title}
            </h2>
            {heading.subtitle && <p className="text-zinc-400 text-sm mt-3">{heading.subtitle}</p>}
          </div>

          {/* Video Topic Categories switcher */}
          <FilterPills
            options={["all", "tutorials", "vlogs", "reviews"] as const}
            value={selectedTab}
            onChange={setSelectedTab}
            label="Filter videos by category"
            className="w-full md:w-auto"
          />
        </div>

        {/* Dynamic Interactive Deck Layout: Player left, Playlist right */}
        {videosList.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
            
            {/* Main Cinematic Action Player Frame (lg:col-span-7) */}
            <div className="lg:col-span-7">
              <div
                onClick={() => openVideo(activeVideo.slug)}
                role="link"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openVideo(activeVideo.slug);
                  }
                }}
                className="relative rounded-3xl overflow-hidden border border-white/5 bg-[#072418] p-3 sm:p-4 shadow-xl cursor-pointer hover:border-[#cbf341]/25 transition-colors"
              >
                <div className="aspect-video relative rounded-2xl bg-black overflow-hidden border border-white/5">
                  <AnimatePresence mode="wait">
                    {!isPlaying ? (
                      <m.div
                        key={activeVideo.slug}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 w-full h-full"
                      >
                        {/* Active Thumbnail poster */}
                        <Image
                          src={thumbnailOf(activeVideo)}
                          alt={activeVideo.title}
                          fill
                          sizes="(min-width: 1024px) 55vw, 100vw"
                          className="object-cover grayscale-[15%] group-hover:scale-105 transition-transform duration-700"
                        />
                        {/* Glass gradient cover for better contrast */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#061910] via-[#061910]/20 to-transparent" />

                        {/* Conversion Focused Play overlay widget */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <m.button
                            id="play-inline-showcase-btn"
                            whileHover={{ scale: 1.15, boxShadow: "0 0 35px rgba(203, 243, 65, 0.6)" }}
                            whileTap={{ scale: 0.95 }}
                            animate={{
                              boxShadow: ["0 0 0px rgba(203, 243, 65, 0)", "0 0 20px rgba(203, 243, 65, 0.4)", "0 0 0px rgba(203, 243, 65, 0)"],
                            }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsPlaying(true);
                            }}
                            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#cbf341] text-[#061910] flex items-center justify-center shadow-[0_0_20px_rgba(203,243,65,0.3)] cursor-pointer"
                            aria-label="Play selected video clip"
                          >
                            <Play size={28} className="fill-[#061910] translate-x-0.5 text-[#061910]" />
                          </m.button>
                          
                          <m.div 
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="mt-5 flex flex-col items-center gap-2"
                          >
                            <span className="font-display text-sm sm:text-base text-white font-bold bg-[#061910]/80 backdrop-blur-md px-5 py-2 rounded-full border border-[#cbf341]/30 shadow-lg uppercase tracking-wide">
                              Click to Watch Video
                            </span>
                          </m.div>
                        </div>

                        {/* Video Quick specs */}
                        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                          <div className="flex items-center gap-3 font-mono text-[10px] font-semibold uppercase">
                            <span className="px-2 py-0.5 rounded bg-[#061910]/90 border border-white/5">
                              {activeVideo.duration}
                            </span>
                            {activeVideo.views && (
                              <span className="flex items-center gap-1 text-zinc-300">
                                <Eye size={12} className="text-[#cbf341]" />
                                {activeVideo.views}
                              </span>
                            )}
                          </div>
                          {activeVideo.source === "youtube" && <Youtube size={18} className="text-red-500 fill-red-500" />}
                        </div>
                      </m.div>
                    ) : (
                      <m.div
                        key="live-player-embed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 w-full h-full"
                      >
                        <VideoPlayer video={activeVideo} autoPlay className="w-full h-full rounded-2xl" />
                      </m.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Active description details footer */}
                <div className="p-4 sm:p-5 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <span className="font-mono text-[9px] bg-[#0a291b] text-[#cbf341] px-2.5 py-1 rounded-full font-bold uppercase tracking-widest inline-block mb-3 border border-[#cbf341]/20">
                      {activeVideo.category}
                    </span>
                    <h3 className="font-display font-bold text-xl text-white leading-snug">
                      {activeVideo.title}
                    </h3>
                  </div>
                  <span className="font-mono text-[10px] font-bold text-[#cbf341] inline-flex items-center gap-1 shrink-0 group-hover:gap-2 transition-all">
                    <span>Open</span>
                    <ArrowUpRight size={12} />
                  </span>
                </div>
              </div>
            </div>

            {/* Interactive list deck selection column (lg:col-span-5) */}
            <div className="lg:col-span-5 space-y-3.5">
              <h3 className="font-mono text-xs font-semibold text-zinc-400 uppercase tracking-widest pl-1 mb-2 block">
                PLAYLIST ENTRIES ({filteredVideos.length})
              </h3>
              
              <div className="space-y-3 max-h-[460px] overflow-y-auto pr-2">
                {filteredVideos.map((vid) => {
                  const isSelected = vid.slug === activeVideo.slug;
                  return (
                    <m.div
                      key={vid.slug}
                      onClick={(e) => {
                        if (isSelected) {
                          openVideo(vid.slug);
                        } else {
                          handleVideoSelect(vid, e);
                        }
                      }}
                      whileHover={{ scale: 1.01 }}
                      className={`p-3.5 rounded-2xl border flex items-center gap-4 cursor-pointer transition-all ${
                        isSelected
                          ? "bg-[#0a291b] border-[#cbf341]/30 shadow-md ring-1 ring-[#cbf341]/10"
                          : "bg-[#072418]/40 border-white/5 hover:bg-[#072418]/80 hover:border-white/10"
                      }`}
                    >
                      {/* Tiny thumbnail frame */}
                      <div className="w-24 aspect-video rounded-xl overflow-hidden bg-[#0a291b] relative shrink-0">
                        <Image
                          className="object-cover grayscale-[10%]"
                          src={thumbnailOf(vid)}
                          alt=""
                          fill
                          sizes="96px"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <Play size={10} className="text-[#cbf341] fill-[#cbf341]" />
                        </div>
                        <span className="absolute bottom-1 right-1 font-mono text-[8px] bg-black/80 text-white px-1 rounded">
                          {vid.duration}
                        </span>
                      </div>

                      {/* Metadata text lines */}
                      <div className="flex-grow min-w-0">
                        <h4 className={`text-xs font-bold leading-snug truncate ${
                          isSelected ? "text-[#cbf341]" : "text-white"
                        }`}>
                          {vid.title}
                        </h4>
                        <div className="flex items-center gap-3 mt-1.5 font-mono text-[9px] text-zinc-400">
                          <span className="uppercase font-bold text-[#cbf341]">{vid.category}</span>
                          {vid.views && (
                            <>
                              <span>•</span>
                              <span>{vid.views}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </m.div>
                  );
                })}
              </div>

              {/* CTA action card */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-[#0a291b] to-[#072418] border border-white/5 mt-4 relative overflow-hidden backdrop-blur-md">
                <h4 className="font-display font-bold text-xs text-white flex items-center gap-1.5">
                  <Youtube className="text-red-500 fill-red-500" size={14} />
                  <span>Weekly Videos & Reviews</span>
                </h4>
                <p className="text-[11px] text-zinc-400 mt-2 leading-relaxed font-sans">
                  I upload system engineering breakdowns, web audits, and toolchain assessments every Tuesday.
                </p>
                {youtubeChannelUrl ? (
                  <a
                    href={youtubeChannelUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-mono text-[9px] font-bold uppercase text-[#cbf341] hover:underline mt-3"
                  >
                    <span>Subscribe on YouTube</span>
                    <ArrowUpRight size={10} />
                  </a>
                ) : (
                  <span
                    title="YouTube channel: link coming soon"
                    className="inline-flex items-center gap-1 font-mono text-[9px] font-bold uppercase text-zinc-500 cursor-not-allowed mt-3 select-none"
                  >
                    <span>Subscribe on YouTube</span>
                    <ArrowUpRight size={10} />
                  </span>
                )}
              </div>

            </div>

          </div>
        ) : (
          <div className="text-center py-20 bg-[#072418] rounded-3xl border border-dashed border-white/10">
            <h4 className="font-display font-semibold text-white text-lg">No videos published yet</h4>
            <p className="text-sm text-zinc-400 mt-1">Check back soon or create some in your CMS settings!</p>
          </div>
        )}

        {viewAllHref && <ViewAllLink href={viewAllHref} label="View All Videos" />}
      </div>
    </section>
  );
}
