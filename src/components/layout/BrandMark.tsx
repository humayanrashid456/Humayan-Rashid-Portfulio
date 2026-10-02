interface BrandMarkProps {
  title: string;
  subtitle?: string;
  className?: string;
  titleClassName?: string;
}

/** Concentric-arc logo + wordmark shared by the navbar, footer and /abroad header. */
export default function BrandMark({ title, subtitle, className = "", titleClassName = "" }: BrandMarkProps) {
  return (
    <span className={`flex items-center gap-3 min-w-0 ${className}`}>
      <span className="relative w-10 h-10 text-[#cbf341] shrink-0" aria-hidden="true">
        <svg className="w-full h-full" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path d="M 30.6 9.4 A 15 15 0 1 0 30.6 29.6" />
          <path d="M 27.4 12.6 A 10.5 10.5 0 1 0 27.4 27.4" />
          <path d="M 24.2 15.8 A 6 6 0 1 0 24.2 24.2" strokeWidth="2.2" />
          <circle cx="20" cy="20" r="1.8" fill="currentColor" />
        </svg>
      </span>
      <span className="flex flex-col min-w-0 text-left">
        <span
          className={`font-sans font-black tracking-wider text-white text-base sm:text-lg leading-none uppercase truncate ${titleClassName}`}
        >
          {title}
        </span>
        {subtitle && (
          <span className="font-sans text-[8px] sm:text-[9px] font-bold tracking-[0.2em] text-white/70 uppercase leading-none mt-1 truncate">
            {subtitle}
          </span>
        )}
      </span>
    </span>
  );
}
