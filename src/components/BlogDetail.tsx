import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft, Calendar, Clock, Heart, Bookmark, Share2,
  Tag, Sparkles, CheckCircle2, BookOpen,
} from "lucide-react";
import { BlogPost } from "../types";
import { loadCMSData } from "../lib/cmsState";

export default function BlogDetail() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const data = loadCMSData();
    const blogs = data.blogs || [];
    const found = blogs.find((b) => b.id === id) || null;
    setPost(found);
    if (found) {
      setRelatedPosts(blogs.filter((b) => b.id !== id).slice(0, 3));
    }
  }, [id]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [id]);

  if (!post) {
    return (
      <DetailShell
        title="Article Not Found"
        subtitle="The article you're looking for doesn't exist or has been moved."
        backHref="/#blog"
      >
        <div />
      </DetailShell>
    );
  }

  const fallbackImage =
    "https://picsum.photos/seed/" + (post.id || "blog") + "/1200/600";

  return (
    <DetailShell
      title={post.title}
      subtitle={post.excerpt}
      backHref="/#blog"
      eyebrow={post.category}
      eyebrowIcon={<Tag size={12} />}
      meta={
        <>
          <span className="flex items-center gap-1.5">
            <Calendar size={13} />
            {post.date}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={13} />
            {post.readTime}
          </span>
          <span className="flex items-center gap-1.5">
            <Heart size={13} />
            {post.likes + (liked ? 1 : 0)} likes
          </span>
        </>
      }
      coverImage={post.image || fallbackImage}
      actions={
        <>
          <button
            onClick={() => setLiked((p) => !p)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs font-semibold transition cursor-pointer ${
              liked
                ? "bg-[#cbf341]/15 border-[#cbf341]/40 text-[#cbf341]"
                : "bg-[#0a2219] border-white/10 text-zinc-300 hover:border-[#cbf341]/30 hover:text-white"
            }`}
            aria-label="Like article"
          >
            <Heart size={14} className={liked ? "fill-[#cbf341]" : ""} />
            <span>Like</span>
          </button>
          <button
            onClick={() => setBookmarked((p) => !p)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs font-semibold transition cursor-pointer ${
              bookmarked
                ? "bg-[#cbf341]/15 border-[#cbf341]/40 text-[#cbf341]"
                : "bg-[#0a2219] border-white/10 text-zinc-300 hover:border-[#cbf341]/30 hover:text-white"
            }`}
            aria-label="Bookmark article"
          >
            <Bookmark size={14} className={bookmarked ? "fill-[#cbf341]" : ""} />
            <span>Save</span>
          </button>
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: post.title, url: window.location.href }).catch(() => {});
              } else {
                navigator.clipboard?.writeText(window.location.href).catch(() => {});
              }
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-white/10 bg-[#0a2219] text-zinc-300 hover:border-[#cbf341]/30 hover:text-white text-xs font-semibold transition cursor-pointer"
            aria-label="Share article"
          >
            <Share2 size={14} />
            <span>Share</span>
          </button>
        </>
      }
    >
      <article className="prose prose-invert max-w-none">
        <div className="text-zinc-300 text-base leading-relaxed space-y-5">
          {(post.body ? post.body.split("\n\n") : defaultBody).map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-bold text-[#cbf341] uppercase tracking-widest mr-1">Tags:</span>
            {post.tags.map((t) => (
              <span
                key={t}
                className="text-[11px] px-2.5 py-1 rounded-full bg-[#0a2219] border border-white/10 text-zinc-300"
              >
                #{t}
              </span>
            ))}
          </div>
        )}

        {relatedPosts.length > 0 && (
          <div className="mt-12 pt-8 border-t border-white/10">
            <h3 className="font-display font-black text-xl text-white mb-5 flex items-center gap-2">
              <BookOpen size={18} className="text-[#cbf341]" />
              Related Articles
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedPosts.map((rp) => (
                <Link
                  key={rp.id}
                  to={`/blog/${rp.id}`}
                  className="group block bg-[#0a2219] border border-white/5 hover:border-[#cbf341]/30 rounded-2xl p-4 transition"
                >
                  <span className="text-[10px] font-bold text-[#cbf341] uppercase tracking-widest">
                    {rp.category}
                  </span>
                  <h4 className="font-display font-bold text-white text-sm mt-1.5 group-hover:text-[#cbf341] transition-colors line-clamp-2">
                    {rp.title}
                  </h4>
                  <p className="text-[10px] text-zinc-500 mt-2">{rp.readTime}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </DetailShell>
  );
}

const defaultBody = [
  "This article explores a focused topic with practical insights, real-world examples, and actionable strategies you can apply immediately.",
  "Throughout the discussion we break down the core principles, common pitfalls, and the best tooling choices to ensure a smooth, premium experience for the end user.",
  "By the end, you will have a clear roadmap to follow — one that's battle-tested across multiple production deployments and refined through constant iteration.",
];

interface ShellProps {
  title: string;
  subtitle?: string;
  backHref: string;
  eyebrow?: string;
  eyebrowIcon?: ReactNode;
  meta?: ReactNode;
  coverImage?: string;
  actions?: ReactNode;
  children: ReactNode;
}

export function DetailShell({
  title,
  subtitle,
  backHref,
  eyebrow,
  eyebrowIcon,
  meta,
  coverImage,
  actions,
  children,
}: ShellProps) {
  return (
    <article className="relative">
      {/* Inline back link (the global Navbar is rendered by DetailPageLayout) */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        <Link
          to={backHref}
          className="inline-flex items-center gap-1.5 text-zinc-300 hover:text-[#cbf341] text-xs font-semibold transition"
        >
          <ArrowLeft size={14} />
          <span>Back</span>
        </Link>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {eyebrow && (
            <span className="inline-flex items-center gap-1.5 bg-[#cbf341]/10 border border-[#cbf341]/20 px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold text-[#cbf341] tracking-widest uppercase mb-4">
              {eyebrowIcon}
              {eyebrow}
            </span>
          )}

          <h1 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white leading-[1.1] tracking-tight mb-4">
            {title}
          </h1>

          {subtitle && (
            <p className="text-zinc-300 text-base sm:text-lg leading-relaxed mb-5 max-w-3xl">
              {subtitle}
            </p>
          )}

          {meta && (
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-zinc-400 mb-6">
              {meta}
            </div>
          )}

          {actions && (
            <div className="flex flex-wrap items-center gap-2 mb-8">
              {actions}
            </div>
          )}

          {coverImage && (
            <div className="rounded-2xl overflow-hidden border border-white/10 mb-8 bg-[#0a2219] aspect-[16/8]">
              <img
                src={coverImage}
                alt={title}
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    "https://picsum.photos/seed/cover/1200/600";
                }}
              />
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.div>
      </div>
    </article>
  );
}
