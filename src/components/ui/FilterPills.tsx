"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

interface FilterPillsProps<T extends string> {
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
  /** Accessible name for the group, e.g. "Filter videos by category". */
  label: string;
  renderIcon?: (option: T) => ReactNode;
  className?: string;
}

const FADE = "28px";

/**
 * Segmented filter buttons in a pill. Always one row: on narrow screens the pills
 * share the width evenly, and when they still don't fit, the pill itself scrolls
 * sideways (a wrapped pill breaks the rounded shape). An edge fades out while more
 * options are hidden on that side, so the row reads as scrollable.
 */
export default function FilterPills<T extends string>({ options, value, onChange, label, renderIcon, className = "" }: FilterPillsProps<T>) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: false, end: false });

  const measure = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const next = { start: el.scrollLeft > 1, end: el.scrollLeft + el.clientWidth < el.scrollWidth - 1 };
    setEdges((prev) => (prev.start === next.start && prev.end === next.end ? prev : next));
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [measure, options]);

  const mask =
    edges.start || edges.end
      ? `linear-gradient(to right, ${edges.start ? "transparent" : "black"} 0, black ${FADE}, black calc(100% - ${FADE}), ${edges.end ? "transparent" : "black"} 100%)`
      : undefined;

  return (
    <div className={`max-w-full rounded-full bg-[#072418] border border-white/5 backdrop-blur-sm ${className}`}>
      <div
        ref={scrollerRef}
        onScroll={measure}
        className="overflow-x-auto overscroll-x-contain rounded-full [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={mask ? { maskImage: mask, WebkitMaskImage: mask } : undefined}
      >
        <div role="group" aria-label={label} className="flex w-max min-w-full gap-1 p-1.5">
          {options.map((option) => {
            const active = option === value;
            return (
              <button
                type="button"
                key={option}
                aria-pressed={active}
                onClick={(e) => {
                  onChange(option);
                  // Keep the chosen pill fully visible when the row is scrolled.
                  e.currentTarget.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "smooth" });
                }}
                className={`flex-1 shrink-0 whitespace-nowrap inline-flex items-center justify-center gap-1.5 min-h-10 px-2 sm:px-5 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-normal sm:tracking-wider transition-colors cursor-pointer ${
                  active ? "bg-[#cbf341] text-[#061910] shadow-md font-black" : "text-zinc-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {renderIcon?.(option)}
                <span>{option}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
