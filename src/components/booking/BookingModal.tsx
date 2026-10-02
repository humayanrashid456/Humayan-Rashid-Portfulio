"use client";

import React, { useEffect, useState, useTransition } from "react";
import { m } from "motion/react";
import { X, Calendar, Video, Check, CheckCircle2, ChevronRight } from "lucide-react";
import { submitBooking } from "@/lib/actions/inquiries";
import { BOOKING_DURATIONS, BOOKING_SERVICES, BOOKING_TIMESLOTS } from "@/lib/content/forms";


interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [service, setService] = useState("");
  const [duration, setDuration] = useState<string>(BOOKING_DURATIONS[0]);
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [notes, setNotes] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [error, setError] = useState("");
  const [isLoading, startSubmit] = useTransition();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const services = BOOKING_SERVICES;
  const timeslots = BOOKING_TIMESLOTS;
  const today = new Date().toISOString().slice(0, 10);

  const handleNextStep = () => {
    if (step === 1 && !service) return;
    if (step === 2 && (!preferredDate || !preferredTime)) return;
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail || isLoading) return;

    setError("");
    startSubmit(async () => {
      const result = await submitBooking({
        service: service as (typeof BOOKING_SERVICES)[number],
        duration: duration as (typeof BOOKING_DURATIONS)[number],
        preferredDate,
        preferredTime: preferredTime as (typeof BOOKING_TIMESLOTS)[number],
        name: clientName,
        email: clientEmail,
        notes,
        website,
      });
      if (result.ok) {
        setStep(4);
        return;
      }
      const fieldMessages = Object.values(result.fieldErrors ?? {}).flat().filter(Boolean);
      setError(fieldMessages.length ? fieldMessages.join(" ") : result.error);
    });
  };

  const resetBooking = () => {
    setStep(1);
    setService("");
    setDuration(BOOKING_DURATIONS[0]);
    setPreferredDate("");
    setPreferredTime("");
    setNotes("");
    setClientName("");
    setClientEmail("");
    setWebsite("");
    setError("");
    onClose();
  };

return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
    >
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={resetBooking}
        className="absolute inset-0 bg-[#061910]/90 backdrop-blur-xl"
      />

      <m.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 30 }}
        transition={{ type: "spring", stiffness: 350, damping: 28 }}
        className="relative w-full max-w-lg bg-gradient-to-br from-[#0a291b] to-[#0b2b1d] border-2 border-[#cbf341]/30 rounded-3xl shadow-2xl shadow-[#cbf341]/25 max-h-[calc(100dvh-2rem)] overflow-y-auto z-10 glow-card"
      >
        <div className="p-4 sm:p-6 border-b border-[#cbf341]/20 flex items-center justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h2 id="booking-modal-title" className="font-display font-medium text-base sm:text-lg text-[#fafafa] flex items-center gap-2">
              <Calendar size={18} className="text-[#cbf341] shrink-0" />
              <span className="leading-tight">Initialize Strategic Session</span>
            </h2>
            {step < 4 && (
              <p className="font-mono text-[8px] text-[#cbf341]/70 font-bold uppercase tracking-widest mt-1">
                Protocol Phase {step} of 3 • System Integration
              </p>
            )}
          </div>
          <button
            id="close-booking-modal-btn"
            onClick={resetBooking}
            className="p-2 rounded-full hover:bg-[#0a291b] text-[#cbf341] hover:text-white transition cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center shrink-0"
            aria-label="Close booking form"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-5 sm:p-8">
          {step === 1 && (
            <div className="space-y-4">
              <label className="font-mono text-[8px] font-bold text-[#cbf341] uppercase tracking-widest block mb-2">
                01. Identify Service Objective Parameters
              </label>

              <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                {services.map((srv) => (
                  <button
                    key={srv}
                    onClick={() => setService(srv)}
                    className={`w-full p-3.5 rounded-xl text-left text-xs font-semibold border flex items-center justify-between transition-all cursor-pointer min-h-[44px] ${
                      service === srv
                        ? "bg-[#cbf341] text-[#061910] border-[#cbf341] shadow-lg shadow-[#cbf341]/20 btn-shimmer"
                        : "bg-[#0a2219] border-[#cbf341]/10 text-[#fafafa] hover:bg-[#0d3329]/60 border-[#cbf341]/20 hover:border-[#cbf341]/30 hover:text-[#cbf341]"
                    }`}
                  >
                    <span>{srv}</span>
                    {service === srv && <Check size={14} className="text-[#061910]" />}
                  </button>
                ))}
              </div>

              <div className="mt-5 pt-3 border-t border-[#cbf341]/20">
                <label className="font-mono text-[8px] font-bold text-[#cbf341] uppercase tracking-widest block mb-2">
                  Duration Configuration
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {BOOKING_DURATIONS.map((dur) => (
                    <button
                      key={dur}
                      onClick={() => setDuration(dur)}
                      className={`py-2 px-3 text-[11px] font-semibold rounded-lg border text-center transition cursor-pointer ${
                        duration === dur
                          ? "bg-[#cbf341]/10 border-[#cbf341]/30 text-[#cbf341]"
                          : "border-[#cbf341]/10 text-gray-400"
                      }`}
                    >
                      {dur}
                    </button>
                  ))}
                </div>
              </div>

              <button
                id="booking-step-1-next"
                disabled={!service}
                onClick={handleNextStep}
                className="w-full mt-6 py-3.5 bg-gradient-to-br from-[#cbf341] to-[#b2d932] text-[#061910] font-medium text-xs tracking-wider uppercase flex items-center justify-center gap-2 disabled:opacity-40 transition cursor-pointer btn-shimmer"
              >
                <span>Establish Timeline</span>
                <ChevronRight size={14} />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <label className="font-mono text-[8px] font-bold text-[#cbf341] uppercase tracking-widest block mb-2">
                02. Configure Calendar & Timing Parameters
              </label>

              <div className="flex flex-col gap-1.5">
                <input
                  id="booking-date-picker"
                  type="date"
                  required
                  min={today}
                  aria-label="Preferred date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="px-4 py-3 rounded-xl border-[#cbf341]/20 bg-transparent text-xs text-[#fafafa] focus:outline-none focus:ring-2 focus:ring-[#cbf341]/30 hover:border-[#cbf341]/30 transition font-medium placeholder:text-[#cbf341]/30 min-h-[44px]"
                />
              </div>

              <div className="pt-2">
                <label className="font-mono text-[8px] font-bold text-[#cbf341] uppercase tracking-widest block mb-2.5">
                    Accessible Time Slots
                </label>
                <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                  {timeslots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setPreferredTime(slot)}
                      className={`p-3 text-[11px] font-semibold rounded-xl border text-center transition-all cursor-pointer min-h-[44px] ${
                        preferredTime === slot
                          ? "bg-[#cbf341]/10 text-[#cbf341] border-[#cbf341]/30 shadow-lg shadow-[#cbf341]/20"
                          : "bg-[#0a2219] border-[#cbf341]/10 text-gray-400 hover:bg-[#0d3329]/60 hover:border-[#cbf341]/30 hover:text-[#cbf341]"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8 pt-2">
                <button
                  id="booking-step-2-back"
                  onClick={handlePrevStep}
                  className="w-full sm:w-1/2 py-3.5 border border-[#cbf341]/20 bg-[#0a291b] rounded-xl font-medium text-xs tracking-wider uppercase text-gray-400 hover:text-white cursor-pointer hover:border-[#cbf341]/30 min-h-[44px]"
                >
                  Protocol Return
                </button>
                <button
                  id="booking-step-2-next"
                  disabled={!preferredDate || !preferredTime}
                  onClick={handleNextStep}
                  className="w-full sm:w-1/2 py-3.5 bg-gradient-to-br from-[#cbf341] to-[#b2d932] text-[#061910] rounded-xl font-medium text-xs tracking-wider uppercase flex items-center justify-center gap-2 disabled:opacity-40 transition cursor-pointer btn-shimmer min-h-[44px]"
                >
                  <span>Verify Coordinates</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          )}

{step === 3 && (
            <form onSubmit={handleSubmitBooking} className="space-y-4">
              <label className="font-mono text-[8px] font-bold text-[#cbf341] uppercase tracking-widest block mb-2">
                03. Client Credentials & Initial Requirements
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="flex flex-col gap-1.5">
                  <input
                    id="booking-client-name"
                    type="text"
                    required
                    placeholder="Your name"
                    aria-label="Your name"
                    autoComplete="name"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="px-4 py-3 rounded-xl border-[#cbf341]/20 bg-transparent text-xs text-[#fafafa] focus:outline-none focus:ring-2 focus:ring-[#cbf341]/30 hover:border-[#cbf341]/30 transition font-medium placeholder:text-[#cbf341]/30 min-h-[44px]"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <input
                    id="booking-client-email"
                    type="email"
                    required
                    placeholder="you@company.com"
                    aria-label="Email address"
                    autoComplete="email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="px-4 py-3 rounded-xl border-[#cbf341]/20 bg-transparent text-xs text-[#fafafa] focus:outline-none focus:ring-2 focus:ring-[#cbf341]/30 hover:border-[#cbf341]/30 transition font-medium placeholder:text-[#cbf341]/30 min-h-[44px]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <textarea
                  id="booking-notes"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Tell me about your project, goals and timeline..."
                  aria-label="Project notes"
                  maxLength={2000}
                  className="px-4 py-3 rounded-xl border-[#cbf341]/20 bg-transparent text-xs text-[#fafafa] focus:outline-none focus:ring-2 focus:ring-[#cbf341]/30 hover:border-[#cbf341]/30 transition resize-none font-medium placeholder:text-[#cbf341]/30 min-h-[80px]"
                />
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

              <div className="p-4 rounded-2xl bg-[#0a2219]/80 border-2 border-[#cbf341]/20 mt-4 text-[11px] text-gray-400 space-y-2.5 backdrop-blur-xl">
                <div className="flex items-center gap-1.5 font-bold uppercase text-[#cbf341]">
                  <Video size={12} className="text-[#cbf341]" />
                  <span>System Configuration Summary</span>
                </div>
                <div className="pl-5 space-y-1 font-sans">
                  <p>• Object: <strong className="text-[#cbf341]">{service}</strong></p>
                  <p>• Duration: <strong className="text-[#cbf341]">{duration}</strong></p>
                  <p>• Coordinates: <strong className="text-[#cbf341]">{preferredDate} @ {preferredTime}</strong></p>
                </div>
              </div>

              {error && (
                <p role="alert" className="text-xs text-red-300 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3">
                  {error}
                </p>
              )}

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8">
                <button
                  id="booking-step-3-back"
                  type="button"
                  onClick={handlePrevStep}
                  className="w-full sm:w-1/2 py-3.5 border border-[#cbf341]/20 bg-[#0a291b] rounded-xl font-medium text-xs tracking-wider uppercase text-gray-400 hover:text-white cursor-pointer hover:border-[#cbf341]/30 min-h-[44px]"
                >
                  Configuration Return
                </button>
                <button
                  id="booking-step-3-next"
                  type="submit"
                  disabled={!clientName || !clientEmail || isLoading}
                  className="w-full sm:w-1/2 py-3.5 bg-gradient-to-br from-[#cbf341] to-[#b2d932] text-[#061910] rounded-xl font-medium text-xs tracking-wider uppercase flex items-center justify-center gap-2 disabled:opacity-40 transition cursor-pointer btn-shimmer min-h-[44px]"
                >
                  <span>Run Configuration</span>
                  <ChevronRight size={14} />
                  {isLoading ? <CheckCircle2 size={14} className="animate-pulse" /> : null}
                </button>
              </div>
            </form>
           )}

          {step === 4 && (
            <div className="space-y-6 text-center">
              <m.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-[#cbf341] to-[#b2d932] flex items-center justify-center shadow-2xl shadow-[#cbf341]/30"
              >
                <Check size={40} className="text-[#061910]" />
              </m.div>
              
              <h3 className="font-display font-bold text-2xl text-[#fafafa]">
                Configuration Complete
              </h3>
              <p className="text-gray-400 text-sm">
                Your request has been received. I&apos;ll confirm your session details by email shortly.
              </p>
              
              <button
                type="button"
                onClick={resetBooking}
                className="mt-6 px-8 py-3 bg-[#0a291b] border border-[#cbf341]/30 rounded-xl text-[#cbf341] font-medium text-sm hover:bg-[#0b2b1d] hover:border-[#cbf341] transition cursor-pointer"
              >
                Close Interface
              </button>
            </div>
          )}
        </div>
      </m.div>
    </div>
  );
}
