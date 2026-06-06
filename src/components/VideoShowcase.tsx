import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, Eye, Clock, Youtube, ArrowUpRight } from "lucide-react";
import { VideoItem } from "../types";
import { getVideoSource } from "./Hero";

export default function VideoShowcase({ data }: { data?: VideoItem[] }) {
  const videosList = data || [];
  const [activeVideoState, setActiveVideoState] = useState<VideoItem | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedTab, setSelectedTab] = useState<"all" | "tutorials" | "vlogs" | "reviews">("all");

  const activeVideo = activeVideoState || videosList[0];
  const videoMeta = getVideoSource(activeVideo?.youtubeId || "");

  const filteredVideos = selectedTab === "all"
    ? videosList
    : videosList.filter(vid => vid.category === selectedTab);

  const handleVideoSelect = (vid: VideoItem) => {
    setActiveVideoState(vid);
    setIsPlaying(false);
  };

  const getThumbnailImage = (thumbnail: string, index: number) => {
    if (thumbnail.includes("picsum.photos") || !thumbnail) {
      if (index === 0) return "/src/assets/images/case_study_team.png";
      if (index === 1) return "/src/assets/images/social_media_team.png";
      return "/src/assets/images/seo_analysis_team.png";
    }
    return thumbnail;
  };

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
              CREATIVE SHOWCASE
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight">
              Interactive Video Showcase & Tech Audits
            </h2>
          </div>

          {/* Video Topic Categories switcher */}
          <div className="flex flex-wrap gap-1.5 p-1.5 bg-[#072418] rounded-full border border-white/5 backdrop-blur-sm">
            {(["all", "tutorials", "vlogs", "reviews"] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`px-5 py-2 text-xs font-bold rounded-full transition-all uppercase tracking-wider cursor-pointer ${
                  selectedTab === tab
                    ? "bg-[#cbf341] text-[#061910] shadow-md font-black"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Interactive Deck Layout: Player left, Playlist right */}
        {videosList.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
            
            {/* Main Cinematic Action Player Frame (lg:col-span-7) */}
            <div className="lg:col-span-7">
              <div className="relative rounded-3xl overflow-hidden border border-white/5 bg-[#072418] p-3 sm:p-4 shadow-xl">
                <div className="aspect-video relative rounded-2xl bg-black overflow-hidden border border-white/5">
                  <AnimatePresence mode="wait">
                    {!isPlaying ? (
                      <motion.div
                        key={activeVideo.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 w-full h-full"
                      >
                        {/* Active Thumbnail poster */}
                        <img
                          src={getThumbnailImage(activeVideo.thumbnail, videosList.indexOf(activeVideo))}
                          alt={activeVideo.title}
                          className="w-full h-full object-cover grayscale-[15%] group-hover:scale-105 transition-transform duration-700"
                          referrerPolicy="no-referrer"
                        />
                        {/* Glass gradient cover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#061910]/90 via-[#061910]/30 to-[#061910]/40" />

                        {/* Play overlay widget icons */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <motion.button
                            id="play-inline-showcase-btn"
                            whileHover={{ scale: 1.1, boxShadow: "0 0 25px rgba(203, 243, 65, 0.5)" }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsPlaying(true)}
                            className="w-16 h-16 rounded-full bg-[#cbf341] text-[#061910] flex items-center justify-center shadow-2xl cursor-pointer"
                            aria-label="Play selected video clip"
                          >
                            <Play size={22} className="fill-[#061910] translate-x-0.5 text-[#061910]" />
                          </motion.button>
                          <span className="mt-4 font-mono text-[9px] text-[#cbf341] font-bold uppercase tracking-widest bg-[#061910]/90 px-3 py-1.5 rounded-lg border border-[#cbf341]/20">
                            CLICK TO PLAY REEL
                          </span>
                        </div>

                        {/* Video Quick specs */}
                        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                          <div className="flex items-center gap-3 font-mono text-[10px] font-semibold uppercase">
                            <span className="px-2 py-0.5 rounded bg-[#061910]/90 border border-white/5">
                              {activeVideo.duration}
                            </span>
                            <span className="flex items-center gap-1 text-zinc-350">
                              <Eye size={12} className="text-[#cbf341]" />
                              {activeVideo.views}
                            </span>
                          </div>
                          <Youtube size={18} className="text-red-500 fill-red-500" />
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="live-player-embed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 w-full h-full"
                      >
                        {videoMeta.isYoutube ? (
                          <iframe
                            title={activeVideo.title}
                            className="w-full h-full rounded-2xl border-0"
                            src={`https://www.youtube.com/embed/${videoMeta.src}?autoplay=1`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        ) : (
                          <video
                            src={videoMeta.src}
                            controls
                            autoPlay
                            className="w-full h-full rounded-2xl object-cover"
                          />
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Active description details footer */}
                <div className="p-4 sm:p-5">
                  <span className="font-mono text-[9px] bg-[#0a291b] text-[#cbf341] px-2.5 py-1 rounded-full font-bold uppercase tracking-widest inline-block mb-3 border border-[#cbf341]/20">
                    {activeVideo.category}
                  </span>
                  <h3 className="font-display font-bold text-xl text-white leading-snug">
                    {activeVideo.title}
                  </h3>
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
                  const isSelected = vid.id === activeVideo.id;
                  const itemIndex = videosList.indexOf(vid);
                  return (
                    <motion.div
                      key={vid.id}
                      onClick={() => handleVideoSelect(vid)}
                      whileHover={{ scale: 1.01 }}
                      className={`p-3.5 rounded-2xl border flex items-center gap-4 cursor-pointer transition-all ${
                        isSelected
                          ? "bg-[#0a291b] border-[#cbf341]/30 shadow-md ring-1 ring-[#cbf341]/10"
                          : "bg-[#072418]/40 border-white/5 hover:bg-[#072418]/80 hover:border-white/10"
                      }`}
                    >
                      {/* Tiny thumbnail frame */}
                      <div className="w-24 aspect-video rounded-xl overflow-hidden bg-[#0a291b] relative shrink-0">
                        <img
                          className="w-full h-full object-cover grayscale-[10%]"
                          src={getThumbnailImage(vid.thumbnail, itemIndex)}
                          alt="Thumbnail"
                          referrerPolicy="no-referrer"
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
                          <span>•</span>
                          <span>{vid.views}</span>
                        </div>
                      </div>
                    </motion.div>
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
                <a
                  href="#"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-[9px] font-bold uppercase text-[#cbf341] hover:text-[#bce039] hover:underline mt-3"
                >
                  <span>Subscribe on YouTube</span>
                  <ArrowUpRight size={10} />
                </a>
              </div>

            </div>

          </div>
        ) : (
          <div className="text-center py-20 bg-[#072418] rounded-3xl border border-dashed border-white/10">
            <h4 className="font-display font-semibold text-white text-lg">No videos published yet</h4>
            <p className="text-sm text-zinc-400 mt-1">Check back soon or create some in your CMS settings!</p>
          </div>
        )}
        
      </div>
    </section>
  );
}
