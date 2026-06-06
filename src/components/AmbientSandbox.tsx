import { useState } from "react";
import { Component as YellowGlow } from "@/components/ui/background-components";
import { Component as GreenGlow } from "@/components/ui/demo";
import { Sparkles, Shield, Layers, HelpCircle } from "lucide-react";

export default function AmbientSandbox() {
  const [activeTab, setActiveTab] = useState<"yellow" | "green">("yellow");

  return (
    <section
      id="ambient-sandbox"
      className="py-16 md:py-20 bg-white dark:bg-[#09090b] border-t border-b border-zinc-200/50 dark:border-zinc-900/60 transition-colors duration-300 relative overflow-hidden"
    >
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-mono text-xs font-bold text-cyan-500 uppercase tracking-widest block mb-2">
            INTEGRATED COMPONENT LABS
          </span>
          <h2 className="font-display font-medium text-3xl sm:text-4xl text-zinc-900 dark:text-zinc-50 tracking-tight">
            Ambient Backdrop Sandbox
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm sm:text-base leading-relaxed mt-3 font-sans">
            Preview the newly integrated shadcn-compliant background glow components. Switch tabs to render the actual React components loaded directly from your <code>/components/ui</code> directory.
          </p>
        </div>

        {/* Dynamic Sandbox Shell */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Controls - left (lg:col-span-4) */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-6 p-6 sm:p-8 rounded-2xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200/50 dark:border-zinc-800/40">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Shield size={18} className="text-cyan-500" />
                <h3 className="font-display font-semibold text-zinc-950 dark:text-white text-base">
                  Component Pipeline
                </h3>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-sans mb-6">
                Both components are compiled dynamically under the <code>@/components/ui/</code> mapping. They maintain independent reactive states and custom styling values.
              </p>

              {/* Selector Tabs */}
              <div className="space-y-3">
                <button
                  onClick={() => setActiveTab("yellow")}
                  className={`w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                    activeTab === "yellow"
                      ? "bg-amber-500/5 border-amber-300 dark:border-amber-500/30 text-zinc-950 dark:text-amber-400 font-medium"
                      : "bg-transparent border-zinc-200 dark:border-zinc-805 text-zinc-500 hover:text-zinc-850 dark:text-zinc-450 dark:hover:text-zinc-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <div className="flex flex-col">
                      <span className="text-sm">Yellow Ambient Glow</span>
                      <span className="text-[10px] font-mono tracking-tight text-zinc-450 dark:text-zinc-500">background-components.tsx</span>
                    </div>
                  </div>
                  <Sparkles size={14} className={activeTab === "yellow" ? "text-amber-400 opacity-100" : "opacity-0"} />
                </button>

                <button
                  onClick={() => setActiveTab("green")}
                  className={`w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                    activeTab === "green"
                      ? "bg-emerald-500/5 border-emerald-300 dark:border-emerald-500/30 text-zinc-950 dark:text-emerald-400 font-medium"
                      : "bg-transparent border-zinc-200 dark:border-zinc-805 text-zinc-500 hover:text-zinc-850 dark:text-zinc-450 dark:hover:text-zinc-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    <div className="flex flex-col">
                      <span className="text-sm">Green Ambient Glow</span>
                      <span className="text-[10px] font-mono tracking-tight text-zinc-450 dark:text-zinc-500">demo.tsx</span>
                    </div>
                  </div>
                  <Sparkles size={14} className={activeTab === "green" ? "text-emerald-400 opacity-100" : "opacity-0"} />
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-200/55 dark:border-zinc-900">
              <div className="flex items-center gap-2 text-[11px] text-zinc-455 dark:text-zinc-400/90 font-mono">
                <Layers size={12} className="text-cyan-500" />
                <span>Path: @/components/ui/</span>
              </div>
            </div>
          </div>

          {/* Sandbox Frame - right (lg:col-span-8) */}
          <div className="lg:col-span-8 relative rounded-3xl overflow-hidden border border-zinc-200/70 dark:border-zinc-805/80 bg-zinc-100 dark:bg-zinc-950/45 flex flex-col justify-between shadow-2xl min-h-[400px]">
            {/* Header frame indicator */}
            <div className="flex items-center justify-between px-6 py-3.5 border-b border-zinc-200/40 dark:border-zinc-900 bg-zinc-50/80 dark:bg-zinc-950/80 backdrop-blur z-10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              </div>
              <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                ACTIVE COMPONENT INTEGRATION
              </span>
            </div>

            {/* Simulated Live Viewport */}
            <div className="relative flex-1 bg-white dark:bg-zinc-950 overflow-hidden flex flex-col items-center justify-center p-8 text-center min-h-[300px]">
              
              {/* Dynamic render container */}
              <div className="absolute inset-0 z-0">
                {activeTab === "yellow" ? <YellowGlow /> : <GreenGlow />}
              </div>

              {/* Centered card to show responsive wrapper */}
              <div className="relative z-10 glass-panel border border-zinc-200/40 dark:border-zinc-805 p-5 sm:p-8 rounded-2xl max-w-md shadow-xl bg-white/95 dark:bg-[#0c0c0e]/95 mx-3">
                <h3 className="font-display font-medium text-xl text-zinc-900 dark:text-zinc-50 mb-2">
                  {activeTab === "yellow" ? "Yellow Accent Layer" : "Green Ambient Layer"}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-sans mb-6">
                  This card sits directly over your radial backdrop. In production, this can wrap any custom SaaS dashboards, text grids, or interactive stats sheets.
                </p>

                <div className="flex items-center justify-center gap-3">
                  <div className="px-3.5 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 text-[10px] font-mono font-bold uppercase text-zinc-500 dark:text-cyan-400 tracking-wider">
                    {activeTab === "yellow" ? "Multiply Blend" : "Standard Overlay"}
                  </div>
                  <div className="px-3.5 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 text-[10px] font-mono font-bold uppercase text-zinc-500 dark:text-cyan-400 tracking-wider">
                    z-index: 0
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
