import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  GraduationCap, Users, Building2, Globe, ShieldCheck,
  Phone, ClipboardCheck, Plane, BookOpen, Award, HeartHandshake,
} from "lucide-react";

interface StudyAbroadProps {
  openBookingModal: () => void;
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  }),
};

const countries = [
  { name: "USA",       code: "us" },
  { name: "UK",        code: "gb" },
  { name: "CANADA",    code: "ca" },
  { name: "AUSTRALIA", code: "au" },
  { name: "GERMANY",   code: "de" },
  { name: "IRELAND",   code: "ie" },
];



const services = [
  { icon: BookOpen,       title: "University Admission",   desc: "Top Ranked Universities" },
  { icon: ClipboardCheck, title: "Visa Processing",        desc: "Fast & Hassle-Free" },
  { icon: Award,          title: "Scholarship Guidance",   desc: "Maximize Your Chances" },
  { icon: Plane,          title: "Pre-Departure Support",  desc: "Travel with Confidence" },
  { icon: HeartHandshake, title: "Post Arrival Support",   desc: "We're there for you" },
];

export default function StudyAbroad({ openBookingModal }: StudyAbroadProps) {
  const navigate = useNavigate();
  return (
    <section
      id="study-abroad"
      className="py-16 sm:py-20 md:py-28 bg-[#061910] text-white relative overflow-hidden"
    >
      {/* ── Ambient glow blobs ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/3 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(203,243,65,0.06)_0%,transparent_70%)]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(203,243,65,0.04)_0%,transparent_70%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">

        {/* ╔══════════════════════════════════════╗
            ║   Main Card Container                ║
            ╚══════════════════════════════════════╝ */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="rounded-3xl border border-white/5 bg-gradient-to-br from-[#0a2618] via-[#081d13] to-[#071a10] shadow-2xl shadow-[#cbf341]/5 overflow-hidden relative"
        >
          {/* Subtle inner glow */}
          <div className="absolute top-0 right-0 w-[350px] h-[350px] bg-[radial-gradient(circle,rgba(203,243,65,0.07)_0%,transparent_60%)] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[250px] h-[250px] bg-[radial-gradient(circle,rgba(203,243,65,0.04)_0%,transparent_60%)] pointer-events-none" />

          {/* ── Two-Column Grid ── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">

            {/* ── Left: Photo Column ── */}
            <div className="lg:col-span-5 relative min-h-[400px] lg:min-h-[580px]">
              {/* Background image */}
              <div className="absolute inset-0">
                <img
                  src="/src/assets/images/humayan_custom_portrait.jpg"
                  alt="Humayan Rashid — Study Abroad Consultant"
                  className="w-full h-full object-cover object-top"
                />
                {/* Gradient overlays for depth */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#081d13] hidden lg:block" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#081d13] via-[#081d13]/40 to-transparent" />
              </div>

              {/* World map silhouette overlay — subtle texture */}
              <div className="absolute inset-0 opacity-[0.04] bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22200%22%20height%3D%22200%22%3E%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2280%22%20fill%3D%22none%22%20stroke%3D%22%23cbf341%22%20stroke-width%3D%220.5%22%2F%3E%3C%2Fsvg%3E')] bg-repeat pointer-events-none" />

              {/* Name badge — bottom-left */}
              <motion.div
                variants={fadeUp}
                custom={2}
                className="absolute bottom-6 left-6 right-6 lg:right-auto z-10"
              >
                <div className="flex items-center gap-3 bg-[#061910]/80 backdrop-blur-xl border border-white/10 rounded-2xl px-5 py-3.5 shadow-xl">
                  <div className="w-10 h-10 rounded-full bg-[#cbf341] flex items-center justify-center shrink-0">
                    <GraduationCap size={20} className="text-[#061910]" />
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm leading-tight">Humayan Rashid</p>
                    <p className="text-[11px] text-[#cbf341] font-semibold tracking-wide">Senior Study Abroad Consultant</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* ── Right: Content Column ── */}
            <div className="lg:col-span-7 px-6 sm:px-8 lg:px-10 xl:px-14 py-10 sm:py-12 lg:py-14 flex flex-col justify-center relative z-10">

              {/* Eyebrow */}
              <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 bg-[#cbf341]/10 border border-[#cbf341]/20 px-4 py-1.5 rounded-full w-fit mb-6">
                <GraduationCap size={14} className="text-[#cbf341]" />
                <span className="text-[10px] sm:text-xs font-bold text-[#cbf341] tracking-widest uppercase">Study Abroad with Biddaloy</span>
              </motion.div>

              {/* Headline */}
              <motion.h2
                variants={fadeUp}
                custom={1}
                className="font-black text-3xl sm:text-4xl lg:text-[44px] xl:text-5xl leading-[1.1] tracking-tight text-white mb-5"
              >
                Helping Students{" "}
                <span className="text-[#cbf341] relative inline-block">
                  Build Global Careers
                  <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-gradient-to-r from-[#cbf341]/60 to-transparent rounded-full" />
                </span>
              </motion.h2>

              {/* Description */}
              <motion.p
                variants={fadeUp}
                custom={2}
                className="text-sm sm:text-base text-zinc-300 leading-relaxed mb-6 max-w-lg"
              >
                University Admission, Visa Processing, Scholarship Guidance
                and Pre-Departure Support — Everything You Need, All in One Place.
              </motion.p>

              {/* ── Country Flags Grid ── */}
              <motion.div
                variants={fadeUp}
                custom={3}
                className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3 mb-10"
              >
                {countries.map((c, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center justify-center gap-1.5 bg-[#072418] border border-white/5 rounded-xl py-2.5 px-1 hover:border-[#cbf341]/25 transition-colors duration-200"
                  >
                    <img
                      src={`https://flagcdn.com/w80/${c.code}.png`}
                      alt={c.name}
                      className="w-8 h-5 sm:w-9 sm:h-6 object-cover rounded-[3px] shadow-sm"
                    />
                    <span className="text-[8px] sm:text-[9px] font-bold text-zinc-400 tracking-widest uppercase text-center">{c.name}</span>
                  </div>
                ))}
              </motion.div>

              {/* ── CTA Buttons ── */}
              <motion.div
                variants={fadeUp}
                custom={5}
                className="flex flex-wrap items-center gap-4"
              >
                <button
                  onClick={() => navigate("/abroad")}
                  className="bg-[#cbf341] hover:bg-[#b5da3a] text-[#061910] px-7 sm:px-9 py-4 rounded-xl font-black text-sm sm:text-base flex items-center gap-2 transition-all hover:scale-[1.03] shadow-lg shadow-[#cbf341]/20 w-full sm:w-auto justify-center"
                >
                  <Phone size={18} className="fill-current" />
                  Book Free Counseling
                </button>
                <button
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  className="flex items-center gap-2 px-6 py-4 rounded-xl font-bold text-sm sm:text-base text-zinc-300 hover:text-white border border-white/10 hover:border-white/20 transition-all duration-200 w-full sm:w-auto justify-center"
                >
                  <ClipboardCheck size={16} />
                  Check Eligibility
                </button>
              </motion.div>
            </div>
          </div>

          {/* ── Bottom Services Strip ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="border-t border-white/5 bg-[#05110b]/80 px-6 sm:px-8 lg:px-12 py-5"
          >
            <div className="flex flex-wrap items-center justify-center lg:justify-between gap-x-6 gap-y-4">
              {services.map((svc, i) => (
                <div key={i} className="flex items-center gap-3 min-w-fit">
                  <div className="w-8 h-8 rounded-lg bg-[#cbf341]/10 border border-[#cbf341]/15 flex items-center justify-center shrink-0">
                    <svc.icon size={16} className="text-[#cbf341]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white leading-tight">{svc.title}</p>
                    <p className="text-[10px] text-zinc-500 font-medium">{svc.desc}</p>
                  </div>
                  {i < services.length - 1 && (
                    <div className="hidden xl:block w-px h-8 bg-white/5 ml-4" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
