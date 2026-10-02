"use client";

import { useState, useEffect, useRef, useTransition, type RefObject } from "react";
import Image from "next/image";
import { m, AnimatePresence } from "motion/react";
import {
  X, GraduationCap, Calendar, Check, ArrowRight, ArrowLeft,
  Sparkles, Phone, Mail, User, BookOpen, Award, PartyPopper,
} from "lucide-react";
import { submitStudyAbroadLead } from "@/lib/actions/inquiries";
import type { StudyAbroadLeadInput } from "@/lib/validation/inquiry";
import { ABROAD_COUNTRIES, ABROAD_EDUCATION_LEVELS, ABROAD_INTAKES } from "@/lib/content/forms";

interface AbroadLeadFormProps {
  isOpen: boolean;
  onClose: () => void;
  initialCountry?: string;
}

interface FormData {
  country: string;
  intake: string;
  education: string;
  name: string;
  email: string;
  phone: string;
}

const initialData: FormData = {
  country: "",
  intake: "",
  education: "",
  name: "",
  email: "",
  phone: "",
};

const steps = [
  { num: 1, label: "Country" },
  { num: 2, label: "Intake" },
  { num: 3, label: "Education" },
  { num: 4, label: "Details" },
];

const countries = ABROAD_COUNTRIES;
const intakes = ABROAD_INTAKES;

const EDUCATION_ICONS: Record<(typeof ABROAD_EDUCATION_LEVELS)[number], typeof BookOpen> = {
  SSC: BookOpen,
  HSC: BookOpen,
  Diploma: Award,
  "Bachelor's Degree": GraduationCap,
  "Master's Degree": GraduationCap,
  "PhD/Doctorate": Sparkles,
};
const educations = ABROAD_EDUCATION_LEVELS.map((name) => ({ name, icon: EDUCATION_ICONS[name] }));

export default function AbroadLeadForm({ isOpen, onClose, initialCountry }: AbroadLeadFormProps) {
  const [step, setStep] = useState(initialCountry ? 2 : 1);
  const [data, setData] = useState<FormData>({ ...initialData, country: initialCountry || "" });
  const [isSubmitting, startSubmit] = useTransition();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const nameInputRef = useRef<HTMLInputElement>(null);

  const selectedCountryMeta = initialCountry
    ? countries.find((c) => c.name === initialCountry)
    : data.country
    ? countries.find((c) => c.name === data.country)
    : undefined;

  // Reset form whenever modal closes
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setStep(1);
        setData(initialData);
        setIsSubmitted(false);
        setSubmitError("");
        setWebsite("");
        setEmailError("");
        setPhoneError("");
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Auto-focus first input on Step 4
  useEffect(() => {
    if (isOpen && step === 4 && !isSubmitted) {
      const t = setTimeout(() => nameInputRef.current?.focus(), 250);
      return () => clearTimeout(t);
    }
  }, [isOpen, step, isSubmitted]);

  // ESC to close
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  // Lock body scroll while open
  useEffect(() => {
    if (isOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isOpen]);

  const handleClose = () => onClose();

  const canContinue = () => {
    if (step === 1) return data.country.length > 0;
    if (step === 2) return data.intake.length > 0;
    if (step === 3) return data.education.length > 0;
    if (step === 4)
      return (
        data.name.trim().length >= 2 &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) &&
        /^[+\d\s\-()]{7,}$/.test(data.phone.trim())
      );
    return false;
  };

  const handleNext = () => {
    if (!canContinue()) return;
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    if (!canContinue()) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        setEmailError("Please enter a valid email address");
      }
      if (!/^[+\d\s\-()]{7,}$/.test(data.phone.trim())) {
        setPhoneError("Please enter a valid phone number");
      }
      return;
    }

    setSubmitError("");
    startSubmit(async () => {
      const result = await submitStudyAbroadLead({
        ...data,
        education: data.education as StudyAbroadLeadInput["education"],
        website,
      });
      if (result.ok) {
        setIsSubmitted(true);
        return;
      }
      const errors = result.fieldErrors ?? {};
      if (errors.email?.[0]) setEmailError(errors.email[0]);
      if (errors.phone?.[0]) setPhoneError(errors.phone[0]);
      setSubmitError(result.error);
    });
  };

  const handleChangeCountry = () => {
    setData({ ...data, country: "" });
    setStep(1);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="abroad-lead-form-title"
    >
      {/* Backdrop */}
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
        className="absolute inset-0 bg-[#061910]/90 backdrop-blur-xl"
      />

      {/* Modal */}
      <m.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 30 }}
        transition={{ type: "spring", stiffness: 350, damping: 28 }}
        className="relative w-full max-w-2xl bg-gradient-to-br from-[#0a291b] to-[#0b2b1d] border-2 border-[#cbf341]/30 rounded-3xl shadow-2xl shadow-[#cbf341]/25 max-h-[calc(100dvh-2rem)] overflow-hidden z-10 flex flex-col"
      >
        {/* ── Header ── */}
        <div className="px-5 sm:px-7 pt-5 sm:pt-6 pb-3 sm:pb-4 border-b border-[#cbf341]/20 flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h3
              id="abroad-lead-form-title"
              className="font-display font-bold text-base sm:text-lg text-white flex items-center gap-2"
            >
              <span className="leading-tight">
                {isSubmitted ? "Submission Complete" : "Free Study Abroad Consultation"}
              </span>
            </h3>
            {!isSubmitted && (
              <div className="mt-1 flex items-center gap-2 flex-wrap">
                <p className="font-mono text-[9px] sm:text-[10px] text-[#cbf341]/70 font-bold uppercase tracking-widest">
                  Step {step} of 4 · {steps[step - 1].label}
                </p>
                {selectedCountryMeta && step >= 2 && (
                  <button
                    type="button"
                    onClick={handleChangeCountry}
                    className="inline-flex items-center gap-1.5 bg-[#cbf341]/10 border border-[#cbf341]/30 hover:bg-[#cbf341]/20 transition px-2 py-0.5 rounded-full"
                    aria-label="Change selected country"
                  >
                    <Image
                      src={`https://flagcdn.com/w40/${selectedCountryMeta.code}.png`}
                      alt=""
                      width={40}
                      height={27}
                      className="w-3.5 h-2.5 object-cover rounded-[1px] border border-white/10"
                    />
                    <span className="text-[9px] sm:text-[10px] font-bold text-[#cbf341] tracking-wide">
                      {selectedCountryMeta.name}
                    </span>
                    <X size={9} className="text-[#cbf341]" />
                  </button>
                )}
              </div>
            )}
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-full hover:bg-[#0a291b] text-[#cbf341] hover:text-white transition cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center shrink-0"
            aria-label="Close form"
          >
            <X size={18} />
          </button>
        </div>

        {/* ── Progress Indicator ── */}
        {!isSubmitted && (
          <div className="px-5 sm:px-7 pt-5 sm:pt-6">
            <div className="flex items-start">
              {steps.map((s, i) => (
                <div
                  key={s.num}
                  className={`flex items-center ${i < steps.length - 1 ? "flex-1" : "flex-none"}`}
                >
                  <div className="flex flex-col items-center shrink-0">
                    <div
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold border-2 transition-all duration-300 ${
                        step > s.num
                          ? "bg-[#cbf341] border-[#cbf341] text-[#061910]"
                          : step === s.num
                          ? "bg-[#cbf341] border-[#cbf341] text-[#061910] shadow-lg shadow-[#cbf341]/40 scale-110"
                          : "bg-transparent border-white/15 text-zinc-500"
                      }`}
                    >
                      {step > s.num ? <Check size={15} strokeWidth={3} /> : s.num}
                    </div>
                    <span
                      className={`text-[9px] sm:text-[10px] mt-2 font-bold uppercase tracking-wider whitespace-nowrap ${
                        step >= s.num ? "text-[#cbf341]" : "text-zinc-500"
                      }`}
                    >
                      {s.label}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="flex-1 h-0.5 mx-1 sm:mx-2 mt-[18px] sm:mt-[20px] relative overflow-hidden bg-white/10 rounded-full">
                      <m.div
                        initial={false}
                        animate={{ width: step > s.num ? "100%" : "0%" }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="absolute inset-y-0 left-0 bg-[#cbf341] rounded-full"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Step Body ── */}
        <div className="flex-1 overflow-y-auto px-5 sm:px-7 py-6 sm:py-7">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <m.div
                key={`step-${step}`}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {step === 1 && <Step1Country data={data} setData={setData} />}
                {step === 2 && <Step2Intake data={data} setData={setData} />}
                {step === 3 && <Step3Education data={data} setData={setData} />}
                {step === 4 && (
                  <Step4LeadForm
                    data={data}
                    setData={setData}
                    emailError={emailError}
                    phoneError={phoneError}
                    setEmailError={setEmailError}
                    setPhoneError={setPhoneError}
                    nameInputRef={nameInputRef}
                  />
                )}
              </m.div>
            ) : (
              <SuccessState data={data} onClose={handleClose} />
            )}
          </AnimatePresence>
        </div>

        {/* Honeypot: hidden from people, often filled by bots */}
        <input
          type="text"
          name="website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute -left-[9999px] w-px h-px opacity-0"
        />

        {submitError && !isSubmitted && (
          <p role="alert" className="mx-5 sm:mx-7 mb-3 text-xs text-red-300 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3">
            {submitError}
          </p>
        )}

        {/* ── Footer ── */}
        {!isSubmitted && (
          <div className="px-5 sm:px-7 py-4 sm:py-5 border-t border-[#cbf341]/20 flex items-center justify-between gap-3 bg-[#061910]/40">
            <button
              type="button"
              onClick={handleBack}
              disabled={step === 1}
              className="px-4 sm:px-5 py-3 rounded-xl border border-[#cbf341]/20 bg-[#0a291b] text-zinc-400 hover:text-white hover:border-[#cbf341]/30 font-semibold text-[11px] sm:text-xs uppercase tracking-wider transition cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed min-h-[44px] flex items-center gap-1.5"
            >
              <ArrowLeft size={14} />
              <span>Go Back</span>
            </button>
            <button
              type="button"
              onClick={step === 4 ? handleSubmit : handleNext}
              disabled={!canContinue() || isSubmitting}
              className="flex-1 sm:flex-none sm:min-w-[160px] px-6 sm:px-8 py-3 rounded-xl bg-gradient-to-br from-[#cbf341] to-[#b2d932] text-[#061910] font-bold text-[11px] sm:text-xs uppercase tracking-wider transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed min-h-[44px] flex items-center justify-center gap-2 shadow-lg shadow-[#cbf341]/20 hover:shadow-[#cbf341]/40 btn-shimmer"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full border-2 border-[#061910] border-t-transparent animate-spin" />
                  <span>Submitting…</span>
                </span>
              ) : step === 4 ? (
                <>
                  <span>Submit</span>
                  <Check size={14} strokeWidth={3} />
                </>
              ) : (
                <>
                  <span>Continue</span>
                  <ArrowRight size={14} strokeWidth={2.5} />
                </>
              )}
            </button>
          </div>
        )}
      </m.div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   STEP 1 — Select Country
   ────────────────────────────────────────────────────────────── */
function Step1Country({ data, setData }: { data: FormData; setData: (d: FormData) => void; }) {
  return (
    <div>
      <h4 className="font-display font-black text-xl sm:text-2xl text-white leading-tight mb-1.5">
        Which country do you want to <span className="text-[#cbf341]">study in</span>?
      </h4>
      <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-5 sm:mb-6">
        Select your preferred destination — we&apos;ll tailor everything around it.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
        {countries.map((c) => {
          const isSelected = data.country === c.name;
          return (
            <button
              key={c.code}
              type="button"
              onClick={() => setData({ ...data, country: c.name })}
              className={`group flex items-center gap-3 p-3 sm:p-3.5 rounded-xl border text-left transition-all cursor-pointer min-h-[64px] ${
                isSelected
                  ? "bg-[#cbf341]/10 border-[#cbf341] shadow-lg shadow-[#cbf341]/15"
                  : "bg-[#0a2219] border-[#cbf341]/10 hover:border-[#cbf341]/30 hover:bg-[#0d3329]/60"
              }`}
            >
              <div className="w-10 h-7 sm:w-12 sm:h-8 overflow-hidden rounded-md border border-white/10 shadow-sm shrink-0">
                <Image
                  src={`https://flagcdn.com/w80/${c.code}.png`}
                  alt={c.name}
                  width={80}
                  height={53}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`font-bold text-sm leading-tight truncate ${isSelected ? "text-[#cbf341]" : "text-white"}`}>
                  {c.name}
                </p>
                <p className="text-[10px] text-zinc-400 truncate mt-0.5">{c.tagline}</p>
              </div>
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                  isSelected ? "bg-[#cbf341] border-[#cbf341]" : "border-white/20"
                }`}
              >
                {isSelected && <Check size={12} strokeWidth={3} className="text-[#061910]" />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   STEP 2 — Select Intake
   ────────────────────────────────────────────────────────────── */
function Step2Intake({ data, setData }: { data: FormData; setData: (d: FormData) => void; }) {
  return (
    <div>
      <h4 className="font-display font-black text-xl sm:text-2xl text-white leading-tight mb-1.5">
        When do you plan to <span className="text-[#cbf341]">start</span>?
      </h4>
      <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-5 sm:mb-6">
        Pick the intake that matches your preparation timeline.
      </p>

      <div className="flex flex-col gap-2.5 sm:gap-3">
        {intakes.map((it) => {
          const isSelected = data.intake === it.name;
          return (
            <button
              key={it.name}
              type="button"
              onClick={() => setData({ ...data, intake: it.name })}
              className={`group flex items-center gap-4 p-4 sm:p-5 rounded-xl border text-left transition-all cursor-pointer min-h-[68px] ${
                isSelected
                  ? "bg-[#cbf341]/10 border-[#cbf341] shadow-lg shadow-[#cbf341]/15"
                  : "bg-[#0a2219] border-[#cbf341]/10 hover:border-[#cbf341]/30 hover:bg-[#0d3329]/60"
              }`}
            >
              <div
                className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                  isSelected
                    ? "bg-[#cbf341] text-[#061910]"
                    : "bg-[#cbf341]/10 text-[#cbf341] border border-[#cbf341]/20"
                }`}
              >
                <Calendar size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`font-bold text-base sm:text-lg leading-tight ${isSelected ? "text-[#cbf341]" : "text-white"}`}>
                  {it.name}
                </p>
                <p className="text-[11px] text-zinc-400 mt-0.5">{it.desc}</p>
              </div>
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                  isSelected ? "bg-[#cbf341] border-[#cbf341]" : "border-white/20"
                }`}
              >
                {isSelected && <Check size={12} strokeWidth={3} className="text-[#061910]" />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   STEP 3 — Highest Education
   ────────────────────────────────────────────────────────────── */
function Step3Education({ data, setData }: { data: FormData; setData: (d: FormData) => void; }) {
  return (
    <div>
      <h4 className="font-display font-black text-xl sm:text-2xl text-white leading-tight mb-1.5">
        Are you ready for your <span className="text-[#cbf341]">study abroad</span> journey?
      </h4>
      <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-5 sm:mb-6">
        What&apos;s your highest level of education?
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
        {educations.map((ed) => {
          const Icon = ed.icon;
          const isSelected = data.education === ed.name;
          return (
            <button
              key={ed.name}
              type="button"
              onClick={() => setData({ ...data, education: ed.name })}
              className={`group flex items-center gap-3 p-3.5 sm:p-4 rounded-xl border text-left transition-all cursor-pointer min-h-[60px] ${
                isSelected
                  ? "bg-[#cbf341]/10 border-[#cbf341] shadow-lg shadow-[#cbf341]/15"
                  : "bg-[#0a2219] border-[#cbf341]/10 hover:border-[#cbf341]/30 hover:bg-[#0d3329]/60"
              }`}
            >
              <div
                className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                  isSelected
                    ? "bg-[#cbf341] text-[#061910]"
                    : "bg-[#cbf341]/10 text-[#cbf341] border border-[#cbf341]/20"
                }`}
              >
                <Icon size={18} />
              </div>
              <span className={`font-bold text-sm flex-1 ${isSelected ? "text-[#cbf341]" : "text-white"}`}>
                {ed.name}
              </span>
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                  isSelected ? "bg-[#cbf341] border-[#cbf341]" : "border-white/20"
                }`}
              >
                {isSelected && <Check size={12} strokeWidth={3} className="text-[#061910]" />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   STEP 4 — Lead Form (Name, Email, Phone)
   ────────────────────────────────────────────────────────────── */
interface Step4Props {
  data: FormData;
  setData: (d: FormData) => void;
  emailError: string;
  phoneError: string;
  setEmailError: (s: string) => void;
  setPhoneError: (s: string) => void;
  nameInputRef: RefObject<HTMLInputElement | null>;
}

function Step4LeadForm({ data, setData, emailError, phoneError, setEmailError, setPhoneError, nameInputRef }: Step4Props) {
  return (
    <div>
      <div className="text-center mb-5 sm:mb-6">
        <div className="inline-flex items-center gap-2 bg-[#cbf341]/10 border border-[#cbf341]/20 px-3 py-1 rounded-full mb-3">
          <PartyPopper size={12} className="text-[#cbf341]" />
          <span className="text-[9px] sm:text-[10px] font-bold text-[#cbf341] tracking-widest uppercase">Almost There</span>
        </div>
        <h4 className="font-display font-black text-2xl sm:text-3xl text-white leading-tight mb-2">
          Just one <span className="text-[#cbf341]">last step</span>!
        </h4>
        <p className="text-zinc-300 text-sm leading-relaxed max-w-md mx-auto">
          We will contact you to provide <span className="text-[#cbf341] font-semibold">Free-of-Cost</span> consultation.
        </p>
      </div>

      <div className="space-y-3 sm:space-y-4 max-w-md mx-auto">
        {/* Full Name */}
        <div className="relative">
          <User size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#cbf341]/70 pointer-events-none" />
          <input
            ref={nameInputRef}
            type="text"
            required
            placeholder="Full Name"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-[#cbf341]/20 bg-transparent text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#cbf341]/30 hover:border-[#cbf341]/30 transition font-medium placeholder:text-[#cbf341]/40 min-h-[48px]"
          />
        </div>

        {/* Email */}
        <div className="relative">
          <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#cbf341]/70 pointer-events-none" />
          <input
            type="email"
            required
            placeholder="Email Address"
            value={data.email}
            onChange={(e) => {
              setData({ ...data, email: e.target.value });
              if (emailError) setEmailError("");
            }}
            onBlur={() => {
              if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
                setEmailError("Please enter a valid email address");
              } else {
                setEmailError("");
              }
            }}
            className={`w-full pl-11 pr-4 py-3.5 rounded-xl border bg-transparent text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#cbf341]/30 hover:border-[#cbf341]/30 transition font-medium placeholder:text-[#cbf341]/40 min-h-[48px] ${
              emailError ? "border-red-500/60" : "border-[#cbf341]/20"
            }`}
          />
          {emailError && (
            <p className="text-red-400 text-[11px] mt-1 ml-1">{emailError}</p>
          )}
        </div>

        {/* Phone */}
        <div className="relative">
          <Phone size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#cbf341]/70 pointer-events-none" />
          <input
            type="tel"
            required
            placeholder="Phone Number"
            value={data.phone}
            onChange={(e) => {
              setData({ ...data, phone: e.target.value });
              if (phoneError) setPhoneError("");
            }}
            onBlur={() => {
              if (data.phone && !/^[+\d\s\-()]{7,}$/.test(data.phone.trim())) {
                setPhoneError("Please enter a valid phone number");
              } else {
                setPhoneError("");
              }
            }}
            className={`w-full pl-11 pr-4 py-3.5 rounded-xl border bg-transparent text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#cbf341]/30 hover:border-[#cbf341]/30 transition font-medium placeholder:text-[#cbf341]/40 min-h-[48px] ${
              phoneError ? "border-red-500/60" : "border-[#cbf341]/20"
            }`}
          />
          {phoneError && (
            <p className="text-red-400 text-[11px] mt-1 ml-1">{phoneError}</p>
          )}
        </div>

        {/* Trust note */}
        <p className="text-[10px] sm:text-[11px] text-zinc-500 text-center pt-1 leading-relaxed">
          <span className="text-[#cbf341]">🔒</span> Your information is 100% safe and will only be used to contact you.
        </p>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   SUCCESS STATE
   ────────────────────────────────────────────────────────────── */
function SuccessState({ data, onClose }: { data: FormData; onClose: () => void }) {
  return (
    <m.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="text-center py-2"
    >
      <m.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 14, delay: 0.1 }}
        className="mx-auto w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-[#cbf341] to-[#b2d932] flex items-center justify-center shadow-2xl shadow-[#cbf341]/30 mb-5 sm:mb-6"
      >
        <Check size={42} className="text-[#061910]" strokeWidth={3} />
      </m.div>

      <h4 className="font-display font-black text-2xl sm:text-3xl text-white leading-tight mb-2">
        Thank you{data.name ? `, ${data.name.split(" ")[0]}` : ""}!
      </h4>
      <p className="text-zinc-300 text-sm sm:text-base leading-relaxed max-w-md mx-auto mb-5">
        Your request has been received. Our senior counselor will contact you
        within <span className="text-[#cbf341] font-semibold">24 hours</span> for
        a free consultation about studying in <span className="font-semibold text-white">{data.country}</span>.
      </p>

      <div className="max-w-sm mx-auto bg-[#0a2219]/80 border border-[#cbf341]/20 rounded-2xl p-4 mb-6 text-left">
        <p className="font-mono text-[9px] font-bold text-[#cbf341] uppercase tracking-widest mb-2.5">
          Submission Summary
        </p>
        <div className="space-y-1.5 text-[11px] sm:text-xs text-zinc-300">
          <p>• Country: <strong className="text-white">{data.country || "—"}</strong></p>
          <p>• Intake: <strong className="text-white">{data.intake || "—"}</strong></p>
          <p>• Education: <strong className="text-white">{data.education || "—"}</strong></p>
          <p>• Name: <strong className="text-white">{data.name || "—"}</strong></p>
          <p>• Email: <strong className="text-white break-all">{data.email || "—"}</strong></p>
          <p>• Phone: <strong className="text-white">{data.phone || "—"}</strong></p>
        </div>
      </div>

      <button
        type="button"
        onClick={onClose}
        className="px-8 py-3.5 bg-[#cbf341] hover:bg-[#b2d932] text-[#061910] font-bold text-xs uppercase tracking-wider rounded-xl transition cursor-pointer min-h-[48px] inline-flex items-center gap-2 shadow-lg shadow-[#cbf341]/20"
      >
        <span>Close</span>
        <Check size={14} strokeWidth={3} />
      </button>
    </m.div>
  );
}
