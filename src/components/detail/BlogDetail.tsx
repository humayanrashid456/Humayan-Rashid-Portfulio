"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { Calendar, Clock, Heart, Bookmark, Share2, Tag, BookOpen } from "lucide-react";
import type { BlogPostSummary } from "@/lib/data/types";
import { formatDate, formatReadingTime } from "@/lib/format";
import DetailShell from "./DetailShell";

interface BlogDetailProps {
  post: BlogPostSummary;
  related: BlogPostSummary[];
  /** The article body, rendered on the server. */
  children: ReactNode;
}

const toggleClass = (active: boolean) =>
  `flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs font-semibold transition cursor-pointer ${
    active
      ? "bg-[#cbf341]/15 border-[#cbf341]/40 text-[#cbf341]"
      : "bg-[#0a2219] border-white/10 text-zinc-300 hover:border-[#cbf341]/30 hover:text-white"
  }`;

export default function BlogDetail({ post, related, children }: BlogDetailProps) {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const share = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: post.title, url }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(url).catch(() => {});
    }
  };

  return (
    <DetailShell
      title={post.title}
      subtitle={post.excerpt}
      backHref="/blog"
      eyebrow={post.category}
      eyebrowIcon={<Tag size={12} />}
      meta={
        <>
          <span className="flex items-center gap-1.5">
            <Calendar size={13} />
            <time dateTime={post.publishedAt ?? undefined}>{formatDate(post.publishedAt)}</time>
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={13} />
            {formatReadingTime(post.readingMinutes)}
          </span>
        </>
      }
      coverImage={post.coverImage}
      actions={
        <>
          <button type="button" onClick={() => setLiked((p) => !p)} className={toggleClass(liked)} aria-pressed={liked}>
            <Heart size={14} className={liked ? "fill-[#cbf341]" : ""} />
            <span>Like</span>
          </button>
          <button
            type="button"
            onClick={() => setBookmarked((p) => !p)}
            className={toggleClass(bookmarked)}
            aria-pressed={bookmarked}
          >
            <Bookmark size={14} className={bookmarked ? "fill-[#cbf341]" : ""} />
            <span>Save</span>
          </button>
          <button type="button" onClick={share} className={toggleClass(false)}>
            <Share2 size={14} />
            <span>Share</span>
          </button>
        </>
      }
    >
      <div className="max-w-none">
        {children}

        {post.tags.length > 0 && (
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-bold text-[#cbf341] uppercase tracking-widest mr-1">Tags:</span>
            {post.tags.map((t) => (
              <span key={t} className="text-[11px] px-2.5 py-1 rounded-full bg-[#0a2219] border border-white/10 text-zinc-300">
                #{t}
              </span>
            ))}
          </div>
        )}

        {related.length > 0 && (
          <section className="mt-12 pt-8 border-t border-white/10">
            <h2 className="font-display font-black text-xl text-white mb-5 flex items-center gap-2">
              <BookOpen size={18} className="text-[#cbf341]" />
              Related Articles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {related.map((rp) => (
                <Link
                  key={rp.slug}
                  href={`/blog/${rp.slug}`}
                  className="group block bg-[#0a2219] border border-white/5 hover:border-[#cbf341]/30 rounded-2xl p-4 transition"
                >
                  <span className="text-[10px] font-bold text-[#cbf341] uppercase tracking-widest">{rp.category}</span>
                  <h3 className="font-display font-bold text-white text-sm mt-1.5 group-hover:text-[#cbf341] transition-colors line-clamp-2">
                    {rp.title}
                  </h3>
                  <p className="text-[10px] text-zinc-500 mt-2">{formatReadingTime(rp.readingMinutes)}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </DetailShell>
  );
}
