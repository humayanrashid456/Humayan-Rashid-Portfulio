import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import BookCallButton from "@/components/booking/BookCallButton";
import type { SiteSettingsData } from "@/lib/data/types";
import BrandMark from "./BrandMark";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/projects" },
  { label: "Blogs", href: "/blog" },
];

const supportLinks = [
  { label: "Working Process", href: "/process" },
  { label: "Benefits", href: "/benefits" },
  { label: "Videos", href: "/videos" },
  { label: "Contact us", href: "/contact" },
  { label: "Study Abroad", href: "/abroad" },
];

const linkClass =
  "font-medium text-xs sm:text-sm text-zinc-300 hover:text-[#cbf341] transition-colors leading-relaxed hover:underline min-h-[28px] flex items-center";

const SOCIAL_ICONS: { key: keyof SiteSettingsData["social"]; label: string; icon: ReactNode }[] = [
  {
    key: "instagram",
    label: "Instagram",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
      </svg>
    ),
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    key: "x",
    label: "X",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    key: "pinterest",
    label: "Pinterest",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.41 7.61 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.007-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.211-.174.257-.402.15-1.503-.699-2.44-2.895-2.44-4.652 0-3.79 2.757-7.269 7.935-7.269 4.166 0 7.4 2.97 7.4 6.942 0 4.14-2.611 7.472-6.233 7.472-1.219 0-2.364-.633-2.757-1.38l-.75 2.853c-.27 1.04-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.607 0 11.985-5.36 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" />
      </svg>
    ),
  },
  {
    key: "tiktok",
    label: "TikTok",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.06-2.89-.52-4.06-1.47-.73-.59-1.32-1.35-1.72-2.22-.05 1.78-.02 3.56-.04 5.34-.04 2.67-.88 5.43-2.92 7.15-2.02 1.73-4.96 2.25-7.5 1.55-2.58-.69-4.83-2.72-5.54-5.29-.79-2.85-.02-6.12 2.06-8.16 1.83-1.83 4.54-2.42 7.02-1.7v4.09c-1.35-.45-2.88-.13-3.92.83-1.12 1.01-1.47 2.74-1.04 4.19.4 1.34 1.7 2.38 3.1 2.49 1.63.15 3.32-.82 3.86-2.36.27-.71.32-1.48.3-2.23l-.04-11.45z" />
      </svg>
    ),
  },
];

function ContactItem({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-center sm:text-left xl:border-r last:xl:border-r-0 border-white/10 xl:px-4 2xl:px-6 min-w-0 xl:flex-1">
      <div className="w-9 h-9 rounded-lg border border-[#cbf341]/30 flex items-center justify-center text-[#cbf341] shrink-0 bg-[#0a291b]/30">
        {icon}
      </div>
      <div className="flex flex-col gap-1 min-w-0">
        <span className="text-[10px] sm:text-[11px] text-zinc-300 font-medium leading-none">{label}</span>
        {children}
      </div>
    </div>
  );
}

export default function Footer({ settings }: { settings: SiteSettingsData }) {
  const { brand, contact, social, footer } = settings;
  const valueClass =
    "font-display text-xs sm:text-sm font-bold text-white hover:text-[#cbf341] transition-colors block leading-snug [overflow-wrap:anywhere]";

  return (
    <footer
      id="footer-root"
      className="bg-[#061910] text-white pt-12 sm:pt-16 md:pt-20 pb-10 sm:pb-12 md:pb-16 relative overflow-visible px-0"
    >
      <div className="w-[92%] sm:w-[85%] lg:w-[80%] mx-auto relative">
        {/* Floating Contact Bar: one overlapping row from xl up; below that the
            four cells don't fit side by side, so it stays in flow as a grid. */}
        <div
          id="floating-contact-bar"
          className="relative xl:absolute -mb-8 xl:mb-0 xl:-top-[60px] xl:left-1/2 xl:-translate-x-1/2 w-full xl:w-[96%] z-20 bg-[#214332] rounded-3xl py-6 px-5 sm:px-8 xl:px-8 shadow-xl border border-white/5"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:flex gap-5 sm:gap-6 xl:gap-4 items-center">
            <div className="col-span-1 sm:col-span-2 xl:col-span-1 flex items-center justify-center xl:justify-start xl:border-r border-white/10 pb-5 xl:pb-0 xl:pr-6 border-b xl:border-b-0 min-w-0 xl:shrink-0">
              <BrandMark title={brand.logoTitle || brand.name} subtitle={brand.logoSubtitle} titleClassName="!text-xl" />
            </div>

            {contact.phone && (
              <ContactItem icon={<Phone size={16} strokeWidth={2} />} label="Call Us On">
                <a href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`} className={valueClass}>
                  {contact.phone}
                </a>
              </ContactItem>
            )}

            {contact.email && (
              <ContactItem icon={<Mail size={16} strokeWidth={2} />} label="Email Us">
                <a href={`mailto:${contact.email}`} className={valueClass}>
                  {contact.email}
                </a>
              </ContactItem>
            )}

            {contact.address && (
              <ContactItem icon={<MapPin size={16} strokeWidth={2} />} label="Our Address">
                <span className="font-display text-xs sm:text-sm font-bold text-white block leading-snug [overflow-wrap:anywhere]">
                  {contact.address}
                </span>
              </ContactItem>
            )}
          </div>
        </div>

        {/* Main Footer Container */}
        <div
          id="main-footer-card"
          className="bg-gradient-to-b from-[#0b2e24] to-[#133c31] border border-white/10 rounded-2xl sm:rounded-3xl lg:rounded-[32px] pt-20 sm:pt-24 xl:pt-28 pb-8 sm:pb-10 px-5 sm:px-8 md:px-10 lg:px-16 shadow-2xl relative z-10 min-h-[350px] flex flex-col justify-between"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-8 pb-10 sm:pb-12 border-b border-white/10">
            {/* Left: call to action & socials */}
            <div className="lg:col-span-5 flex flex-col gap-6 text-center lg:text-left">
              <div className="space-y-3">
                <h3 className="font-display font-black text-2xl lg:text-3xl text-white tracking-tight leading-tight">
                  Let&apos;s Build Something Great
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed max-w-md font-sans mx-auto lg:mx-0">
                  Tell me about your project and book a free strategy call. I usually reply within one business day.
                </p>
              </div>

              <BookCallButton className="w-fit mx-auto lg:mx-0 px-6 py-3 rounded-full bg-[#cbf341] hover:bg-[#b2d932] text-[#061910] font-bold text-xs sm:text-[13px] tracking-wider flex items-center gap-2 shadow-lg shadow-[#cbf341]/10 transition-colors cursor-pointer">
                <ArrowUpRight size={15} strokeWidth={2.5} />
                <span>Book A Call</span>
              </BookCallButton>

              <div className="space-y-3 mt-2">
                <h4 className="font-display font-bold text-xs uppercase tracking-wider text-zinc-400 text-center lg:text-left">
                  Find Us:
                </h4>
                <div className="flex gap-2.5 justify-center lg:justify-start">
                  {SOCIAL_ICONS.map(({ key, label, icon }) =>
                    social[key] ? (
                      <a
                        key={key}
                        href={social[key]}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="w-9 h-9 rounded-full bg-[#0b251e] border border-white/10 text-zinc-300 hover:text-[#cbf341] hover:border-[#cbf341]/40 flex items-center justify-center shadow-sm transition-colors"
                      >
                        {icon}
                      </a>
                    ) : (
                      <span
                        key={key}
                        title={`${label}: link coming soon`}
                        aria-label={`${label} (coming soon)`}
                        className="w-9 h-9 rounded-full bg-[#0b251e] border border-white/10 text-zinc-500 flex items-center justify-center shadow-sm cursor-not-allowed select-none"
                      >
                        {icon}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Right: link columns */}
            <nav aria-label="Footer" className="lg:col-span-7 grid grid-cols-2 gap-4 sm:gap-4 md:gap-8 text-left">
              <div className="flex flex-col gap-3 sm:gap-4">
                <h4 className="font-display font-bold text-xs sm:text-sm text-[#cbf341] uppercase tracking-wider">Quick Links</h4>
                <div className="flex flex-col gap-2.5 sm:gap-3">
                  {quickLinks.map((item) => (
                    <Link key={item.label} href={item.href} className={linkClass}>
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:gap-4">
                <h4 className="font-display font-bold text-xs sm:text-sm text-[#cbf341] uppercase tracking-wider">Support</h4>
                <div className="flex flex-col gap-2.5 sm:gap-3">
                  {supportLinks.map((item) => (
                    <Link key={item.label} href={item.href} className={linkClass}>
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </nav>
          </div>

          <div className="pt-6 sm:pt-8 text-center border-t border-white/10">
            <span className="font-sans text-[11px] sm:text-xs text-zinc-500 tracking-wide font-medium block max-w-xs sm:max-w-none mx-auto leading-relaxed px-2">
              {footer.copyrightText}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
