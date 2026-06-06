import React from "react";
import { motion } from "motion/react";
import { Phone, Mail, MessageSquare, FileText, Clock, MapPin, ArrowUpRight } from "lucide-react";
import { ContactSection } from "../types";

interface ContactProps {
  data?: ContactSection;
  openBookingModal?: () => void;
}

export default function Contact({ data, openBookingModal }: ContactProps) {
  const emailVal = data?.email || "support@domain.com";
  const phoneVal = data?.phone || "+1 (555) 019-2834";
  const addressVal = data?.address || "Bangkok, Thailand";

  const capsules = [
    {
      id: "phone",
      label: `Ph: ${phoneVal}`,
      link: `tel:${phoneVal}`,
      icon: <Phone size={14} className="text-[#061910]" />
    },
    {
      id: "form",
      label: "Our Contact Form",
      link: "#",
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        if (openBookingModal) openBookingModal();
      },
      icon: <FileText size={14} className="text-[#061910]" />
    },
    {
      id: "email",
      label: emailVal,
      link: `mailto:${emailVal}`,
      icon: <Mail size={14} className="text-[#061910]" />
    },
    {
      id: "hours",
      label: "24/7 Hours Call handling",
      link: "#",
      icon: <Clock size={14} className="text-[#061910]" />
    },
    {
      id: "whatsapp",
      label: "WhatsApp Chat",
      link: `https://wa.me/${phoneVal.replace(/[^0-9]/g, "")}`,
      icon: <MessageSquare size={14} className="text-[#061910]" />
    },
    {
      id: "map",
      label: "Get Map Direction",
      link: `https://maps.google.com/?q=${encodeURIComponent(addressVal)}`,
      icon: <MapPin size={14} className="text-[#061910]" />
    }
  ];

  return (
    <section
      id="contact"
      className="py-12 sm:py-16 md:py-20 lg:py-28 bg-[#061910] text-white transition-colors duration-300 relative overflow-hidden px-4 sm:px-6 lg:px-12"
    >
      {/* Dynamic ambient blur field */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#cbf341]/2 blur-[150px] pointer-events-none" />

      {/* Main Reach Out Us Card Wrapper */}
      <div className="max-w-7xl mx-auto rounded-3xl sm:rounded-[40px] bg-[#072418] border border-white/5 p-5 sm:p-8 lg:p-16 relative z-10 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Title group */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6">
            <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-[#0a291b] border border-[#cbf341]/25 text-[#cbf341] text-[10px] sm:text-xs font-semibold uppercase tracking-widest w-fit">
              Reach Out Us
            </span>
            <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
              Ready To Talk? Reach <br className="hidden md:block" /> Out Anytime
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-md font-sans">
              Have a project in mind? Let's chat! Our team is just a message away.
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={openBookingModal}
              className="px-5 sm:px-6 py-3 sm:py-3.5 bg-[#cbf341] text-[#061910] rounded-full font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg hover:bg-[#bce039] transition-colors cursor-pointer min-h-[44px]"
            >
              <span>Get Free Consultation</span>
              <ArrowUpRight size={14} />
            </motion.button>
          </div>

          {/* Right Column: Contact capsules in 2x3 grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {capsules.map((capsule) => {
              const Content = (
                <>
                  <div className="w-9 h-9 rounded-full bg-[#cbf341] flex items-center justify-center shrink-0">
                    {capsule.icon}
                  </div>
                  <span className="text-zinc-200 text-xs font-bold font-mono tracking-tight leading-none group-hover:text-[#cbf341] transition-colors duration-200 break-all sm:break-normal">
                    {capsule.label}
                  </span>
                </>
              );

              if (capsule.onClick) {
                return (
                  <button
                    key={capsule.id}
                    onClick={capsule.onClick}
                    className="w-full text-left group bg-[#0a291b]/50 border border-white/5 hover:border-[#cbf341]/30 rounded-full p-2 flex items-center gap-3 sm:gap-3.5 transition-all duration-300 shadow-md cursor-pointer min-h-[44px]"
                  >
                    {Content}
                  </button>
                );
              }

              return (
                <a
                  key={capsule.id}
                  href={capsule.link}
                  target={capsule.link.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="group bg-[#0a291b]/50 border border-white/5 hover:border-[#cbf341]/30 rounded-full p-2 flex items-center gap-3 sm:gap-3.5 transition-all duration-300 shadow-md cursor-pointer min-h-[44px]"
                >
                  {Content}
                </a>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
