import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Calendar, Clock, Heart, ChevronRight } from "lucide-react";
import { BlogPost } from "../types";

export default function Blog({ data }: { data?: BlogPost[] }) {
  const navigate = useNavigate();
  const blogsList = data || [];
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});

  const toggleLike = (postId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setLikedPosts(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const openBlog = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/blog/${id}`);
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
                onClick={(e) => openBlog(blog.id, e)}
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
      </div>
    </section>
  );
}
