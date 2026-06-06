import React, { useState } from "react";
import { 
  BarChart, Activity, Globe, Zap, AlertCircle, RefreshCw, Layers, Database, Gauge, ArrowUpRight 
} from "lucide-react";

interface RegionItem {
  id: string;
  name: string;
  flagCode: string;
  load: number; // 0-100%
  latency: number; // ms
  status: "Healthy" | "High Load" | "Degraded";
  queriesCount: string;
}

export default function Analytics() {
  const [metricView, setMetricView] = useState<"api" | "db" | "cache">("api");
  const [regions, setRegions] = useState<RegionItem[]>([
    { id: "ap-east", name: "Tokyo, Japan (ap-northeast-1)", flagCode: "🇯🇵", load: 24, latency: 4, status: "Healthy", queriesCount: "1.4M / hr" },
    { id: "ap-sea", name: "Singapore Gateway (ap-southeast-1)", flagCode: "🇸🇬", load: 45, latency: 12, status: "Healthy", queriesCount: "982k / hr" },
    { id: "eu-central", name: "Frankfurt, Germany (eu-central-1)", flagCode: "🇩🇪", load: 78, latency: 32, status: "High Load", queriesCount: "2.1M / hr" },
    { id: "us-east", name: "N. Virginia, USA (us-east-1)", flagCode: "🇺🇸", load: 12, latency: 18, status: "Healthy", queriesCount: "2.4M / hr" },
    { id: "us-west", name: "Oregon, USA (us-west-2)", flagCode: "🇺🇸", load: 92, latency: 75, status: "Degraded", queriesCount: "1.1M / hr" },
  ]);

  const simulateSync = () => {
    setRegions((prev) =>
      prev.map((r) => {
        const deltaLoad = Math.floor(Math.random() * 20) - 10;
        const deltaLat = Math.floor(Math.random() * 6) - 3;
        const nextLoad = Math.max(5, Math.min(98, r.load + deltaLoad));
        let nextStatus: "Healthy" | "High Load" | "Degraded" = "Healthy";
        if (nextLoad >= 85) nextStatus = "Degraded";
        else if (nextLoad >= 65) nextStatus = "High Load";

        return {
          ...r,
          load: nextLoad,
          latency: Math.max(2, r.latency + deltaLat),
          status: nextStatus,
        };
      })
    );
  };

  return (
    <div className="space-y-6">
      {/* Tab Header title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="font-sans font-bold text-xl sm:text-2xl text-[#061910] text-[#061910] tracking-tight">Performance telemetry</h2>
          <p className="font-sans text-xs text-[#061910]0 text-[#cbf341] mt-1">Deep analytics on cache distribution, network performance, and core region servers.</p>
        </div>
        <button
          id="sync-telemetry-btn"
          onClick={simulateSync}
          className="flex items-center gap-2 self-start px-3.5 py-2 font-sans font-semibold text-xs rounded-xl bg-[#0b2e24] text-white hover:bg-[#0a2219] dark:bg-[#072418] text-[#061910] hover:bg-[#b2d932] shadow-sm transition-all cursor-pointer"
        >
          <RefreshCw size={12} className="animate-spin-slow" />
          <span>Force Refresh Metrics</span>
        </button>
      </div>

      {/* Segment Selector tabs */}
      <div className="flex border-b border-[#061910]/50 border-white/10">
        {(["api", "db", "cache"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setMetricView(t)}
            className={`px-4 py-2.5 font-sans font-semibold text-xs border-b-2 transition-all cursor-pointer uppercase tracking-wider ${
              metricView === t
                ? "border-[#cbf341] text-[#cbf341]"
                : "border-transparent text-[#cbf341] hover:text-zinc-700 dark:hover:text-zinc-300"
            }`}
          >
            {t === "api" ? "⚡ API Requests" : t === "db" ? "🗄️ Database Load" : "📦 Cache Allocation"}
          </button>
        ))}
      </div>

      {/* Main telemetry metrics grid panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Core telemetry details card */}
        <div className="bg-[#0b2e24] border border-white/10 rounded-xl p-5 shadow-sm lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between pb-2">
            <div>
              <h3 className="font-sans font-bold text-sm text-[#061910] text-zinc-100">Telemetry Stream Distribution</h3>
              <p className="font-sans text-[11px] text-[#061910]0 mt-0.5">Real-time load variables and response rates per aggregate request group.</p>
            </div>
            <span className="p-1.5 bg-[#072418] bg-[#0d3329] text-[#061910]0 text-[#cbf341] rounded-lg">
              <Gauge size={16} />
            </span>
          </div>

          {/* Dynamically configured content grids representing mock chart stats details */}
          {metricView === "api" && (
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-sans font-semibold text-zinc-650 text-[#cbf341] mb-1">
                  <span>GET /api/v1/auth/session</span>
                  <span className="font-mono">82% volume / 0.8ms average</span>
                </div>
                <div className="w-full bg-[#072418] bg-[#0a2219] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#cbf341] h-full rounded-full transition-all duration-500" style={{ width: "82%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-sans font-semibold text-zinc-650 text-[#cbf341] mb-1">
                  <span>POST /api/v1/ledger/record</span>
                  <span className="font-mono">12% volume / 4.1ms average</span>
                </div>
                <div className="w-full bg-[#072418] bg-[#0a2219] h-2 rounded-full overflow-hidden">
                  <div className="bg-purple-500 h-full rounded-full transition-all duration-500" style={{ width: "24%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-sans font-semibold text-zinc-650 text-[#cbf341] mb-1">
                  <span>DELETE /api/v1/cluster/instance</span>
                  <span className="font-mono">6% volume / 184ms average (heavy run)</span>
                </div>
                <div className="w-full bg-[#072418] bg-[#0a2219] h-2 rounded-full overflow-hidden">
                  <div className="bg-rose-500 h-full rounded-full transition-all duration-500" style={{ width: "6%" }} />
                </div>
              </div>

              <div className="pt-4 grid grid-cols-2 gap-4 border-t border-[#061910] border-white/10">
                <div className="bg-zinc-50 bg-[#0a2219]/40 p-4 rounded-xl">
                  <span className="block text-[11px] font-sans font-semibold text-[#cbf341] uppercase tracking-wide">P99 Server Response</span>
                  <span className="block text-lg font-mono font-bold text-zinc-800 text-[#061910] mt-1">198.4 ms</span>
                </div>
                <div className="bg-zinc-50 bg-[#0a2219]/40 p-4 rounded-xl">
                  <span className="block text-[11px] font-sans font-semibold text-[#cbf341] uppercase tracking-wide">Current Error Rate</span>
                  <span className="block text-lg font-mono font-bold text-emerald-500 mt-1">0.031%</span>
                </div>
              </div>
            </div>
          )}

          {metricView === "db" && (
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-sans font-semibold text-zinc-650 text-[#cbf341] mb-1">
                  <span>Index Writes Pool Rate</span>
                  <span className="font-mono">4,120 ips / optimal threshold</span>
                </div>
                <div className="w-full bg-[#072418] bg-[#0a2219] h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: "42%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-sans font-semibold text-zinc-650 text-[#cbf341] mb-1">
                  <span>Replicas Buffer Pool Utilization</span>
                  <span className="font-mono">68% / steady workload</span>
                </div>
                <div className="w-full bg-[#072418] bg-[#0a2219] h-2 rounded-full overflow-hidden">
                  <div className="bg-purple-500 h-full rounded-full transition-all duration-500" style={{ width: "68%" }} />
                </div>
              </div>

              <div className="pt-4 grid grid-cols-2 gap-4 border-t border-[#061910] border-white/10">
                <div className="bg-zinc-50 bg-[#0a2219]/40 p-4 rounded-xl">
                  <span className="block text-[11px] font-sans font-semibold text-[#cbf341] uppercase tracking-wide">Read Operations / sec</span>
                  <span className="block text-lg font-mono font-bold text-zinc-800 text-[#061910] mt-1">124,592</span>
                </div>
                <div className="bg-zinc-50 bg-[#0a2219]/40 p-4 rounded-xl">
                  <span className="block text-[11px] font-sans font-semibold text-[#cbf341] uppercase tracking-wide">Avg Disk IOPS Latency</span>
                  <span className="block text-lg font-mono font-bold text-zinc-800 text-[#061910] mt-1">0.14 ms</span>
                </div>
              </div>
            </div>
          )}

          {metricView === "cache" && (
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-sans font-semibold text-zinc-650 text-[#cbf341] mb-1">
                  <span>Persistent Cache L1 (Static Assets)</span>
                  <span className="font-mono">99.1% Hit ratio</span>
                </div>
                <div className="w-full bg-[#072418] bg-[#0a2219] h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: "99.1%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-sans font-semibold text-zinc-650 text-[#cbf341] mb-1">
                  <span>Dynamic Session Cache L2 (API Outputs)</span>
                  <span className="font-mono">91.4% Hit ratio</span>
                </div>
                <div className="w-full bg-[#072418] bg-[#0a2219] h-2 rounded-full overflow-hidden">
                  <div className="bg-orange-500 h-full rounded-full transition-all duration-500" style={{ width: "91.4%" }} />
                </div>
              </div>

              <div className="pt-4 grid grid-cols-2 gap-4 border-t border-[#061910] border-white/10">
                <div className="bg-zinc-50 bg-[#0a2219]/40 p-4 rounded-xl">
                  <span className="block text-[11px] font-sans font-semibold text-[#cbf341] uppercase tracking-wide">Total Cache Evictions</span>
                  <span className="block text-lg font-mono font-bold text-rose-500 mt-1">42 / hour</span>
                </div>
                <div className="bg-zinc-50 bg-[#0a2219]/40 p-4 rounded-xl">
                  <span className="block text-[11px] font-sans font-semibold text-[#cbf341] uppercase tracking-wide">Memory Block Size</span>
                  <span className="block text-lg font-mono font-bold text-zinc-800 text-[#061910] mt-1">128 MB cluster</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Global Node distribution performance indicator table */}
        <div className="bg-[#0b2e24] border border-white/10 rounded-xl p-5 shadow-sm lg:col-span-4 flex flex-col justify-between">
          <div className="pb-3 border-b border-[#061910] border-white/10 mb-4">
            <div className="flex items-center gap-2">
              <Globe size={16} className="text-[#cbf341]" />
              <h3 className="font-sans font-bold text-xs text-[#061910] text-zinc-100 uppercase tracking-wider">Multi-Region Edge Nodes</h3>
            </div>
            <p className="font-sans text-[11px] text-[#061910]0 mt-1">Distributed gateways matching client route zones.</p>
          </div>

          <div className="space-y-3.5 flex-1 justify-around flex flex-col">
            {regions.map((region) => (
              <div key={region.id} className="flex items-center justify-between gap-2.5">
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="select-none text-xs">{region.flagCode}</span>
                    <span className="font-sans text-xs font-semibold text-zinc-800 text-zinc-200 truncate">{region.name}</span>
                  </div>
                  <span className="font-mono text-[10.5px] text-zinc-455 text-[#061910]0 block mt-0.5 ml-5">{region.queriesCount} queries</span>
                </div>

                <div className="text-right shrink-0">
                  <div className="flex items-center justify-end gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      region.status === "Healthy"
                        ? "bg-emerald-500"
                        : region.status === "High Load"
                        ? "bg-amber-500"
                        : "bg-rose-500"
                    }`} />
                    <span className="font-mono text-xs font-bold text-[#061910] text-zinc-100">{region.latency}ms</span>
                  </div>
                  <span className={`text-[9.5px] font-bold uppercase tracking-wider mt-0.5 block ${
                    region.status === "Healthy"
                      ? "text-emerald-500"
                      : region.status === "High Load"
                      ? "text-amber-500"
                      : "text-rose-500"
                  }`}>
                    {region.status} ({region.load}%)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Database stats banner check */}
      <div className="border border-[#061910]/60 border-white/10 p-4 rounded-xl bg-sky-500/5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex gap-3 items-start sm:items-center">
          <div className="p-2.5 bg-sky-500/10 text-sky-600 dark:text-sky-400 rounded-xl shrink-0">
            <Zap size={18} />
          </div>
          <div>
            <span className="block font-sans text-xs font-bold text-zinc-800 text-zinc-100">Regional DNS Auto-Route enabled</span>
            <span className="block font-sans text-[11px] text-[#061910]0 mt-1">
              Active clients are automatically targeted to the lowest-ping responsive CDN instance ( Tokyo edge cluster currently handling JP-SGP-AU regions ).
            </span>
          </div>
        </div>
        <button
          id="dns-health-check-btn"
          className="px-3 py-1.5 border border-[#061910] border-white/10 text-zinc-700 dark:text-zinc-350 hover:bg-zinc-50 dark:hover:bg-[#0a2219] shadow-sm rounded-lg text-xs font-sans font-bold cursor-pointer shrink-0 inline-flex items-center gap-1.5"
        >
          <span>DNS Settings</span>
          <ArrowUpRight size={13} />
        </button>
      </div>
    </div>
  );
}
