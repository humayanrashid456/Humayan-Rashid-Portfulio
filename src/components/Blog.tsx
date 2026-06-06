import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, Clock, Heart, X, ChevronRight, Bookmark, Share2 } from "lucide-react";
import { BlogPost } from "../types";

export default function Blog({ data }: { data?: BlogPost[] }) {
  const blogsList = data || [];
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});

  const toggleLike = (postId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedPosts(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const getBlogImage = (imagePath: string, index: number) => {
    if (imagePath.includes("picsum.photos") || !imagePath) {
      if (index === 0) return "/src/assets/images/social_media_team.png";
      if (index === 1) return "/src/assets/images/seo_analysis_team.png";
      return "/src/assets/images/ppc_advertising_team.png";
    }
    return imagePath;
  };

  return (
    <section
      id="blog"
      className="py-12 sm:py-16 md:py-20 lg:py-28 bg-[#061910] text-white transition-colors duration-300 relative"
    >
      <div className="absolute bottom-1/3 left-10 w-96 h-96 rounded-full bg-[#cbf341]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 lg:mb-16 px-2">
          <span className="font-mono text-xs font-bold text-[#cbf341] uppercase tracking-widest block mb-3">
            TECHNICAL INSIGHTS
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight">
            Humayan's Dev Log & Tactical Guides
          </h2>
          <p className="text-zinc-400 text-sm mt-3">
            Explaining deep concepts in system engineering, UI mechanics, and organic ranking.
          </p>
        </div>

        {/* Responsive Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
          {blogsList.map((blog, idx) => {
            const isLiked = likedPosts[blog.id];
            return (
              <motion.article
                key={blog.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
                onClick={() => setSelectedPost(blog)}
                className="group cursor-pointer flex flex-col h-full bg-[#072418] rounded-3xl border border-white/5 overflow-hidden shadow-xl hover:scale-[1.02] transition-all duration-300"
              >
                {/* Blog Cover Image banner */}
                <div className="aspect-[4/3] bg-[#0a291b] overflow-hidden relative border-b border-white/5">
                  <img
                    src={getBlogImage(blog.image, idx)}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-550"
                    referrerPolicy="no-referrer"
                  />
                  {/* Category Pill Tag */}
                  <div className="absolute top-4 left-4 bg-[#061910]/90 backdrop-blur-md text-[#cbf341] text-[10px] font-mono font-bold tracking-wider px-3 py-1.5 rounded-full uppercase border border-[#cbf341]/20">
                    {blog.category}
                  </div>
                </div>

                {/* Card Content body */}
                <div className="p-6 sm:p-7 flex-grow flex flex-col justify-between">
                  <div>
                    {/* Timestamp specs */}
                    <div className="flex items-center gap-4 font-mono text-[10px] text-zinc-400 font-semibold uppercase">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={12} className="text-[#cbf341]" />
                        <span>{blog.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock size={12} className="text-[#cbf341]" />
                        <span>{blog.readTime}</span>
                      </div>
                    </div>

                    {/* Blog title */}
                    <h3 className="font-display font-bold text-lg text-white mt-4 line-clamp-2 leading-snug group-hover:text-[#cbf341] transition-colors">
                      {blog.title}
                    </h3>

                    {/* Short excerpt description */}
                    <p className="text-zinc-400 text-sm mt-3 line-clamp-3 leading-relaxed font-sans">
                      {blog.excerpt}
                    </p>
                  </div>

                  {/* Read action footer */}
                  <div className="flex items-center justify-between border-t border-white/5 mt-6 pt-5">
                    <span className="font-mono text-xs font-bold text-[#cbf341] inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                      <span>Read Full Entry</span>
                      <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                    </span>

                    {/* Mini Like mechanism */}
                    <button
                      id={`like-blog-${blog.id}`}
                      onClick={(e) => toggleLike(blog.id, e)}
                      className={`p-2 rounded-xl border transition-colors flex items-center gap-1.5 cursor-pointer ${
                        isLiked
                          ? "bg-[#0a291b] border-[#cbf341]/30 text-[#cbf341]"
                          : "border-white/10 text-zinc-400 hover:text-white hover:border-white/20"
                      }`}
                      aria-label="Like post"
                    >
                      <Heart size={13} className={isLiked ? "fill-[#cbf341] text-[#cbf341]" : ""} />
                      <span className="font-mono text-[10px] font-bold">
                        {blog.likes + (isLiked ? 1 : 0)}
                      </span>
                    </button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Read Post Overlay Modal */}
        <AnimatePresence>
          {selectedPost && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedPost(null)}
                className="absolute inset-0 bg-[#061910]/80 backdrop-blur-md"
              />

              {/* Modal Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", stiffness: 350, damping: 28 }}
                className="relative w-full max-w-3xl max-h-[90vh] sm:max-h-[85vh] overflow-y-auto bg-[#072418] rounded-3xl border border-white/10 shadow-2xl z-10"
              >
                {/* Article Header Thumbnail */}
                <div className="aspect-[21/9] bg-[#0a291b] relative w-full border-b border-white/5">
                  <img
                    src={getBlogImage(selectedPost.image, blogsList.indexOf(selectedPost))}
                    alt={selectedPost.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#072418] via-transparent to-transparent/30" />
                  
                  {/* Close button */}
                  <button
                    id="close-article-btn"
                    onClick={() => setSelectedPost(null)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-black/55 text-white border border-white/20 hover:bg-black/85 transition cursor-pointer"
                    aria-label="Close article"
                  >
                    <X size={18} />
                  </button>

                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="font-mono text-[10px] font-bold uppercase py-1.5 px-3 rounded-full bg-[#061910]/90 text-[#cbf341] border border-[#cbf341]/20">
                      {selectedPost.category}
                    </span>
                    <h2 className="font-display font-bold text-xl sm:text-2xl lg:text-3xl text-white mt-4 leading-snug">
                      {selectedPost.title}
                    </h2>
                  </div>
                </div>

                {/* Article Body Content */}
                <div className="p-5 sm:p-8 md:p-10">
                  {/* Metadata line info */}
                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-6 font-mono text-[10px] sm:text-xs text-zinc-400 border-b border-white/5 pb-5 mb-5 uppercase font-semibold">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={13} className="text-[#cbf341]" />
                      <span>{selectedPost.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock size={13} className="text-[#cbf341]" />
                      <span>{selectedPost.readTime}</span>
                    </div>
                    <span>By Humayan Rashid</span>
                  </div>

                  {/* HTML-structured simulated article prose */}
                  <div className="prose prose-invert max-w-none text-zinc-300 space-y-5 text-base leading-relaxed">
                    <p className="font-semibold text-white text-lg leading-relaxed">
                      {selectedPost.excerpt}
                    </p>
                    <p>
                      In modern engineering workflows, visual friction directly leads to higher user bounce rates. In order to mitigate this, developers must coordinate interactive elements at a microscopic scale. By styling components and setting precise animation delays using custom spring-mechanics, we create intuitive spatial cues that direct attention to call-to-actions.
                    </p>
                    <h3 className="font-display font-bold text-xl text-white pt-3">
                      1. Avoiding Cumulative Layout Shift
                    </h3>
                    <p>
                      Layout shifts feel cheap and unpolished. I prioritize defining strict bounds, static aspect ratios for all assets (such as defining image aspect bounds directly inside cards to eliminate pixel jitters), and deferring analytical libraries. This guarantees a smooth first contentful paint.
                    </p>
                    <blockquote className="border-l-4 border-[#cbf341] pl-4 py-2 italic font-serif text-zinc-300 bg-[#0a291b] p-4 rounded-r-xl border border-white/5">
                      "Good performance is invisible. Shoddy asset optimization is highly noticeable. Optimize first, iterate second."
                    </blockquote>
                    <h3 className="font-display font-bold text-xl text-white pt-3">
                      2. Real-time Optimization Audits
                    </h3>
                    <p>
                      When clients complain about mobile performance, 90% of the time, the culprit is uncompressed images loaded with full-resolution pipelines. For all my web applications, I leverage modern formats like WebP or AVIF, alongside on-demand resizing utilities, reducing general load times by up to 65%.
                    </p>
                  </div>

                  {/* Actions in Footer */}
                  <div className="flex justify-between items-center mt-10 pt-6 border-t border-white/5">
                    <div className="flex items-center gap-2">
                      <button
                        id="bookmark-article"
                        className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition cursor-pointer"
                      >
                        <Bookmark size={16} />
                      </button>
                      <button
                        id="share-article"
                        className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition cursor-pointer"
                      >
                        <Share2 size={16} />
                      </button>
                    </div>

                    <button
                      id="close-reading-cta"
                      onClick={() => setSelectedPost(null)}
                      className="px-5 py-2.5 bg-[#cbf341] hover:bg-[#bce039] text-[#061910] rounded-xl text-xs font-black transition cursor-pointer"
                    >
                      Done Reading
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
