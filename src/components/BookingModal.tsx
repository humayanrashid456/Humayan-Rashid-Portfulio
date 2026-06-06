import React, { useState } from "react";
import { motion } from "motion/react";
import { X, Calendar, Clock, Video, Check, CheckCircle2, ChevronRight, HelpCircle } from "lucide-react";


interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [service, setService] = useState("");
  const [duration, setDuration] = useState("30 Min Intro (Free)");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [notes, setNotes] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const services = [
    "Full-Stack Web App Build",
    "UI/UX Visual Prototyping",
    "SEO Core Metrics Speed Diagnostic",
    "Stripe Engine & Store Setup",
    "General Architecture Consultation"
  ];

  const timeslots = ["09:00 AM (GMT+7)", "11:30 AM (GMT+7)", "02:00 PM (GMT+7)", "04:30 PM (GMT+7)"];

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
    if (!clientName || !clientEmail) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep(4); // Success step
    }, 1500);
  };

  const resetBooking = () => {
    setStep(1);
    setService("");
    setDuration("30 Min Intro (Free)");
    setPreferredDate("");
    setPreferredTime("");
    setNotes("");
    setClientName("");
    setClientEmail("");
    onClose();
  };

return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={resetBooking}
        className="absolute inset-0 bg-[#061910]/90 backdrop-blur-xl"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 30 }}
        transition={{ type: "spring", stiffness: 350, damping: 28 }}
        className="relative w-full max-w-lg bg-gradient-to-br from-[#0a291b] to-[#0b2b1d] border-2 border-[#cbf341]/30 rounded-3xl shadow-2xl shadow-[#cbf341]/25 max-h-[calc(100vh-2rem)] overflow-y-auto z-10 glow-card"
      >
        <div className="p-4 sm:p-6 border-b border-[#cbf341]/20 flex items-center justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h3 className="font-display font-medium text-base sm:text-lg text-[#fafafa] flex items-center gap-2">
              <Calendar size={18} className="text-[#cbf341] shrink-0" />
              <span className="truncate">Initialize Strategic Session</span>
            </h3>
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
            aria-label="Terminate scheduler"
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
                  {["30 Min Intro (Free)", "60 Min Strategy Session"].map((dur) => (
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
                  min="2026-05-21"
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
                    placeholder="ZAI Protocol User"
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
                    placeholder="user@protocol.ai"
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
                  placeholder="Initialize system documentation and timeline parameters..."
                  className="px-4 py-3 rounded-xl border-[#cbf341]/20 bg-transparent text-xs text-[#fafafa] focus:outline-none focus:ring-2 focus:ring-[#cbf341]/30 hover:border-[#cbf341]/30 transition resize-none font-medium placeholder:text-[#cbf341]/30 min-h-[80px]"
                />
              </div>

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
                  disabled={!clientName || !clientEmail}
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
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-[#cbf341] to-[#b2d932] flex items-center justify-center shadow-2xl shadow-[#cbf341]/30"
              >
                <Check size={40} className="text-[#061910]" />
              </motion.div>
              
              <h3 className="font-display font-bold text-2xl text-[#fafafa]">
                Configuration Complete
              </h3>
              <p className="text-gray-400 text-sm">
                Your strategic session has been scheduled. We will send you a confirmation with your consultation details shortly.
              </p>
              
              <button
                onClick={() => {
                  setStep(1);
                  onClose();
                }}
                className="mt-6 px-8 py-3 bg-[#0a291b] border border-[#cbf341]/30 rounded-xl text-[#cbf341] font-medium text-sm hover:bg-[#0b2b1d] hover:border-[#cbf341] transition cursor-pointer"
              >
                Close Interface
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
