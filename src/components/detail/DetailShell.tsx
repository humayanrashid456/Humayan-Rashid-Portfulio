"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { m } from "motion/react";
import { ArrowLeft } from "lucide-react";
import type { ImageData } from "@/lib/data/types";

interface DetailShellProps {
  title: string;
  subtitle?: string;
  backHref: string;
  eyebrow?: string;
  eyebrowIcon?: ReactNode;
  meta?: ReactNode;
  coverImage?: ImageData;
  actions?: ReactNode;
  children: ReactNode;
}

const EASE = [0.22, 1, 0.36, 1] as const;

/** Shared header + animated body for blog, project, service and video pages. */
export default function DetailShell({
  title,
  subtitle,
  backHref,
  eyebrow,
  eyebrowIcon,
  meta,
  coverImage,
  actions,
  children,
}: DetailShellProps) {
  return (
    <article className="relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32">
        <Link
          href={backHref}
          className="inline-flex items-center gap-1.5 text-zinc-300 hover:text-[#cbf341] text-xs font-semibold transition"
        >
          <ArrowLeft size={14} />
          <span>Back</span>
        </Link>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-20">
        <m.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }}>
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
            <p className="text-zinc-300 text-base sm:text-lg leading-relaxed mb-5 max-w-3xl">{subtitle}</p>
          )}

          {meta && <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-zinc-400 mb-6">{meta}</div>}

          {actions && <div className="flex flex-wrap items-center gap-2 mb-8">{actions}</div>}

          {coverImage && (
            <div className="relative rounded-2xl overflow-hidden border border-white/10 mb-8 bg-[#0a2219] aspect-[16/8]">
              <Image
                src={coverImage.url}
                alt={coverImage.alt}
                fill
                priority
                sizes="(min-width: 896px) 896px, 100vw"
                className="object-cover"
              />
            </div>
          )}
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
        >
          {children}
        </m.div>
      </div>
    </article>
  );
}
