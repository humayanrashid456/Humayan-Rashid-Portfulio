import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { 
  TrendingUp, TrendingDown, Terminal as TermIcon, Play, RefreshCw, Send, CheckCircle, 
  Clock, Activity, AlertTriangle, ShieldCheck, Database, Server, Cpu,
  Briefcase, Layers, BookOpen, MessageSquare, Users, Sparkles
} from "lucide-react";

interface StatWidgetProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  sparklineData: number[];
  colorClass: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

function StatWidget({ title, value, change, isPositive, sparklineData, colorClass, icon: Icon }: StatWidgetProps) {
  // Simple sparkline generator
  const max = Math.max(...sparklineData);
  const min = Math.min(...sparklineData);
  const spread = max - min || 1;
  const width = 100;
  const height = 30;
  const points = sparklineData
    .map((val, idx) => {
      const x = (idx / (sparklineData.length - 1)) * width;
      const y = height - ((val - min) / spread) * height;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="bg-[#0b2e24] border border-white/10 rounded-xl p-5 shadow-sm overflow-hidden relative">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-[#072418] bg-[#0d3329] text-[#061910]0 text-[#cbf341] shrink-0">
            <Icon size={14} className="transition-colors" style={{ color: colorClass }} />
          </span>
          <span className="font-sans text-xs font-semibold text-[#061910]0 text-[#cbf341] capitalize whitespace-nowrap">{title}</span>
        </div>
        <div className={`flex items-center gap-1 text-[11px] font-sans font-bold px-1.5 py-0.5 rounded-full ${
          isPositive 
            ? "text-emerald-600 bg-emerald-500/10 text-emerald-400" 
            : "text-rose-600 bg-rose-500/10 text-rose-400"
        }`}>
          {isPositive ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
          <span>{change}</span>
        </div>
      </div>
      <div className="mt-3 flex items-end justify-between">
        <div>
          <span className="font-mono text-xl sm:text-2xl font-bold tracking-tight text-[#061910] text-[#061910]">{value}</span>
          <p className="font-sans text-[10px] text-[#cbf341] text-[#061910]0 mt-1">vs last 30d average</p>
        </div>
        {/* Sparkline */}
        <div className="w-[80px] h-[30px] opacity-75 sm:opacity-100 shrink-0 select-none">
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
            <polyline
              fill="none"
              stroke={colorClass}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={points}
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

interface Log {
  time: string;
  type: "info" | "success" | "warn" | "error";
  message: string;
}

export default function Overview() {
  const [activeRange, setActiveRange] = useState<"7d" | "30d" | "90d">("30d");
  const [consoleInput, setConsoleInput] = useState("");
  
  // Real-time statistics counters with interactive simulation
  const [projectCount, setProjectCount] = useState(120);
  const [servicesCount, setServicesCount] = useState(6);
  const [blogsCount, setBlogsCount] = useState(3);
  const [messagesCount, setMessagesCount] = useState(24);
  const [subscriberCount, setSubscriberCount] = useState(1420);

  // Sparkline state updates dynamically on action trigger
  const [projectsSpark, setProjectsSpark] = useState([114, 115, 116, 118, 120, 120]);
  const [servicesSpark, setServicesSpark] = useState([6, 6, 6, 6, 6, 6]);
  const [blogsSpark, setBlogsSpark] = useState([1, 1, 2, 2, 2, 3]);
  const [messagesSpark, setMessagesSpark] = useState([14, 16, 19, 18, 22, 24]);
  const [subscriberSpark, setSubscriberSpark] = useState([1180, 1220, 1280, 1310, 1380, 1420]);

  const [consoleLogs, setConsoleLogs] = useState<Log[]>([
    { time: "17:34:01", type: "info", message: "Starting portfolio server gateway instance v4.1.2_prod..." },
    { time: "17:34:02", type: "success", message: "Database cluster connected successfully. Latency: 3.2ms" },
    { time: "17:34:10", type: "info", message: "Glow sensors, messages API and project triggers validated." },
    { time: "17:34:12", type: "success", message: "Main handshake registered with Edge Server at Tokyo node." },
  ]);
  const consoleBottomRef = useRef<HTMLDivElement>(null);

  // Simulation handler function when action buttons are clicked
  const simulateEvent = (customTime?: string) => {
    const categories = ["project", "service", "blog", "message", "subscriber"];
    const chosen = categories[Math.floor(Math.random() * categories.length)];
    const now = new Date();
    const timeStr = customTime || `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;

    if (chosen === "project") {
      const nextCount = projectCount + 1;
      setProjectCount(nextCount);
      setProjectsSpark(prev => [...prev.slice(1), nextCount]);
      setConsoleLogs(prev => [
        ...prev,
        { time: timeStr, type: "success", message: `Portfolio Event: Completed new contract project #${nextCount} successfully. Shipped to staging.` }
      ].slice(-30));
    } else if (chosen === "service") {
      const nextCount = servicesCount + 1;
      setServicesCount(nextCount);
      setServicesSpark(prev => [...prev.slice(1), nextCount]);
      setConsoleLogs(prev => [
        ...prev,
        { time: timeStr, type: "info", message: `Catalog Update: Registered service deliverable #${nextCount} ('Interactive UX Analytics').` }
      ].slice(-30));
    } else if (chosen === "blog") {
      const nextCount = blogsCount + 1;
      setBlogsCount(nextCount);
      setBlogsSpark(prev => [...prev.slice(1), nextCount]);
      setConsoleLogs(prev => [
        ...prev,
        { time: timeStr, type: "success", message: `CMS Live: New markdown article published. Active blog count rises to ${nextCount}.` }
      ].slice(-30));
    } else if (chosen === "message") {
      const nextCount = messagesCount + 1;
      setMessagesCount(nextCount);
      setMessagesSpark(prev => [...prev.slice(1), nextCount]);
      setConsoleLogs(prev => [
        ...prev,
        { time: timeStr, type: "info", message: `Inbound Message: Received custom triage query from guest visitor regarding project proposal.` }
      ].slice(-30));
    } else {
      const nextCount = subscriberCount + 1;
      setSubscriberCount(nextCount);
      setSubscriberSpark(prev => [...prev.slice(1), nextCount]);
      setConsoleLogs(prev => [
        ...prev,
        { time: timeStr, type: "success", message: `Newsletter Growth: Subscriber verified successfully. Total active database list: ${nextCount}` }
      ].slice(-30));
    }
  };

  // Generate simulated chart data based on active range
  const chartPoints = activeRange === "7d"
    ? [ { label: "Mon", value: 450 }, { label: "Tue", value: 390 }, { label: "Wed", value: 580 }, { label: "Thu", value: 620 }, { label: "Fri", value: 480 }, { label: "Sat", value: 720 }, { label: "Sun", value: 890 } ]
    : activeRange === "30d"
    ? [ { label: "W1", value: 2400 }, { label: "W2", value: 3100 }, { label: "W3", value: 2800 }, { label: "W4", value: 4200 }, { label: "W5", value: 5120 } ]
    : [ { label: "Q1", value: 12000 }, { label: "Q2", value: 14500 }, { label: "Q3", value: 18900 }, { label: "Q4", value: 24120 } ];

  const maxVal = Math.max(...chartPoints.map(p => p.value));
  const svgWidth = 500;
  const svgHeight = 220;

  // Render SVG Path Area coordinates
  const pointsString = chartPoints.map((p, i) => {
    const x = (i / (chartPoints.length - 1)) * (svgWidth - 60) + 30;
    const y = svgHeight - (p.value / maxVal) * (svgHeight - 65) - 30;
    return `${x},${y}`;
  }).join(" ");

  const areaPoints = `30,${svgHeight - 30} ${pointsString} ${svgWidth - 30},${svgHeight - 30}`;

  // Real-time console log typing simulation
  useEffect(() => {
    const logPool: Log[] = [
      { time: "17:41:22", type: "info", message: "Portfolio project schema requested by remote client." },
      { time: "17:42:05", type: "warn", message: "Newsletter signup queue pending processing. Retrying..." },
      { time: "17:43:00", type: "success", message: "New subscriber registered: diana.p@themyscyra.org." },
      { time: "17:44:11", type: "error", message: "Message delivery failed on spam filter: host IP 192.174.12.9 throttled." },
      { time: "17:45:02", type: "info", message: "Core services manifest validated. 6 active routes online." },
      { time: "17:46:15", type: "success", message: "New message query from 'Bruce Wayne' captured in inbox stream." },
      { time: "17:47:30", type: "info", message: "Blog article read-count incremented: 'Framer Motion Microinteractions'." },
    ];

    const interval = setInterval(() => {
      const idx = Math.floor(Math.random() * logPool.length);
      const randLog = logPool[idx];
      const now = new Date();
      const timeStr = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;
      
      setConsoleLogs((prev) => [
        ...prev.slice(-29), // keep only last 30 logs
        { ...randLog, time: timeStr },
      ]);
    }, 8500);

    return () => clearInterval(interval);
  }, []);

  // Scroll to console bottom
  useEffect(() => {
    if (consoleBottomRef.current) {
      consoleBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [consoleLogs]);

  const handleConsoleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consoleInput.trim()) return;

    const cmd = consoleInput.trim().toLowerCase();
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;

    const newLogs = [...consoleLogs, { time: timeStr, type: "info" as const, message: `guest@edgeconsole:~$ ${consoleInput}` }];

    if (cmd === "help") {
      newLogs.push(
        { time: timeStr, type: "info", message: "Supported commands: help, sysinfo, ping, metrics, stats, simulate, clear" }
      );
    } else if (cmd === "sysinfo") {
      newLogs.push(
        { time: timeStr, type: "success", message: "OS: CloudLinux OS, v8.9. Kernel: 5.15-antigravity" },
        { time: timeStr, type: "info", message: "CPU Core Load: 8.12% / Active Engagements Pipeline: Bound" },
        { time: timeStr, type: "success", message: "Node Network status: Connected, optimal latency to Tokyo-SGP" }
      );
    } else if (cmd === "ping") {
      newLogs.push(
        { time: timeStr, type: "info", message: "64 bytes from edge.saas-engine.io: icmp_seq=1 ttl=56 time=1.12 ms" },
        { time: timeStr, type: "info", message: "64 bytes from edge.saas-engine.io: icmp_seq=2 ttl=56 time=1.05 ms" },
        { time: timeStr, type: "success", message: "--- ping statistics: 2 packets transmitted, 0% packet loss" }
      );
    } else if (cmd === "clear") {
      setConsoleLogs([]);
      setConsoleInput("");
      return;
    } else if (cmd === "metrics") {
      newLogs.push(
        { time: timeStr, type: "info", message: `Subscribers: ${subscriberCount} / Projects: ${projectCount} / Active Services: ${servicesCount}` },
        { time: timeStr, type: "success", message: "All portfolio system parameters running green." }
      );
    } else if (cmd === "stats") {
      newLogs.push(
        { time: timeStr, type: "success", message: "ACTIVE PORTFOLIO & AUDIENCE STATS MAPPING:" },
        { time: timeStr, type: "info", message: ` ├─ Completed Projects: ${projectCount}` },
        { time: timeStr, type: "info", message: ` ├─ Core Services: ${servicesCount}` },
        { time: timeStr, type: "info", message: ` ├─ Published Blogs: ${blogsCount}` },
        { time: timeStr, type: "info", message: ` ├─ Client Message Inbox: ${messagesCount}` },
        { time: timeStr, type: "success", message: ` └─ Newsletter Subscribers: ${subscriberCount}` }
      );
    } else if (cmd === "simulate") {
      setConsoleLogs(newLogs);
      setConsoleInput("");
      simulateEvent(timeStr);
      return;
    } else {
      newLogs.push({ time: timeStr, type: "error", message: `command not found: "${cmd}". Type "help" for a list of diagnostics.` });
    }

    setConsoleLogs(newLogs);
    setConsoleInput("");
  };

  return (
    <div className="space-y-6">
      {/* Welcome header info context */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="font-sans font-bold text-xl sm:text-2xl text-[#061910] text-[#061910] tracking-tight">Portfolio Overview</h2>
          <p className="font-sans text-xs text-[#061910]0 text-[#cbf341] mt-1">Overview of your freelance portfolio projects, service catalog, and audience engagements.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3 self-start">
          <button
            id="simulate-activity-btn"
            onClick={() => simulateEvent()}
            className="flex items-center gap-1.5 px-3 py-1.5 font-sans font-bold text-xs border border-[#061910] border-white/10 hover:bg-[#072418] hover:bg-[#0d3329] rounded-xl text-zinc-700 text-zinc-300 shadow-sm transition-colors cursor-pointer"
            title="Simulate random influx of visitors, subscribers, or projects"
          >
            <Sparkles size={12} className="text-amber-500 animate-pulse" />
            <span>Simulate Portfolio Activity</span>
          </button>
          
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-sans text-xs font-semibold text-emerald-600 text-emerald-400">Main Gateway: Live</span>
          </div>
        </div>
      </div>

      {/* Stats Widgets Grid (5 Columns on Desktop, Responded beautifully) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <StatWidget
          title="completed projects"
          value={`${projectCount}+`}
          change="+5.2%"
          isPositive={true}
          sparklineData={projectsSpark}
          colorClass="#cbf341" // lime
          icon={Briefcase}
        />
        <StatWidget
          title="core services"
          value={`${servicesCount} Active`}
          change="Optimal"
          isPositive={true}
          sparklineData={servicesSpark}
          colorClass="#8b5cf6" // purple
          icon={Layers}
        />
        <StatWidget
          title="published blogs"
          value={`${blogsCount} Articles`}
          change="+33.3%"
          isPositive={true}
          sparklineData={blogsSpark}
          colorClass="#10b981" // green
          icon={BookOpen}
        />
        <StatWidget
          title="client messages"
          value={`${messagesCount} Received`}
          change="98% reply"
          isPositive={true}
          sparklineData={messagesSpark}
          colorClass="#f59e0b" // orange/amber
          icon={MessageSquare}
        />
        <StatWidget
          title="total subscribers"
          value={subscriberCount.toLocaleString()}
          change="+14.2%"
          isPositive={true}
          sparklineData={subscriberSpark}
          colorClass="#f43f5e" // rose
          icon={Users}
        />
      </div>

      {/* Main Charts & Diagnostics Console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* SVG Analytics Area Graph Component */}
        <div className="bg-[#0b2e24] border border-white/10 rounded-xl p-5 shadow-sm lg:col-span-7 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-[#061910] border-white/10 pb-4">
            <div>
              <h3 className="font-sans font-bold text-sm text-[#061910] text-zinc-100">Portfolio Engagement Yield</h3>
              <p className="font-sans text-[11px] text-[#061910]0">Historical portfolio views, blog reads, and subscriber signup conversions</p>
            </div>
            
            {/* Segment Range Buttons */}
            <div className="flex bg-[#072418]/80 bg-[#0a2219] border border-[#061910]/50 border-white/10 rounded-lg p-0.5">
              {(["7d", "30d", "90d"] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setActiveRange(r)}
                  className={`px-3 py-1 text-xs font-sans font-semibold rounded-md transition-all cursor-pointer ${
                    activeRange === r
                      ? "bg-white bg-[#0d3329] text-zinc-950 text-[#061910] shadow-sm"
                      : "text-[#cbf341] hover:text-zinc-700 hover:text-zinc-300"
                  }`}
                >
                  {r.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="py-2.5 relative flex-1 min-h-[220px]">
            {/* Legend info overlay */}
            <div className="absolute top-2 left-2 flex items-center gap-4 text-[10.5px] font-sans font-bold text-zinc-445 text-[#061910]5">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-1 bg-[#cbf341] rounded" />
                This Period
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-0.5 border-t border-dashed border-zinc-300 dark:border-zinc-700 rounded" />
                Baseline Target
              </span>
            </div>

            {/* Custom Interactive SVG Line Plot */}
            <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-full select-none overflow-visible">
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#cbf341" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#cbf341" stopOpacity="0.00" />
                </linearGradient>
              </defs>

              {/* Grid Horizontal Guidelines */}
              {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
                const y = svgHeight - ratio * (svgHeight - 65) - 30;
                return (
                  <line
                    key={ratio}
                    x1="30"
                    y1={y}
                    x2={svgWidth - 30}
                    y2={y}
                    className="stroke-zinc-150/60 stroke-white/10"
                    strokeWidth="1"
                  />
                );
              })}

              {/* Baseline target dashed line */}
              <line
                x1="30"
                y1={svgHeight - 90}
                x2={svgWidth - 30}
                y2={svgHeight - 90}
                className="stroke-zinc-300 stroke-white/15"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />

              {/* Gradient Filled Area */}
              <polygon points={areaPoints} fill="url(#chartGradient)" />

              {/* Colored Line Path */}
              <polyline
                fill="none"
                stroke="#cbf341"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={pointsString}
              />

              {/* Nodes and Grid labels */}
              {chartPoints.map((p, i) => {
                const x = (i / (chartPoints.length - 1)) * (svgWidth - 60) + 30;
                const y = svgHeight - (p.value / maxVal) * (svgHeight - 65) - 30;
                return (
                  <g key={i} className="group/node">
                    <circle
                      cx={x}
                      cy={y}
                      r="4"
                      className="fill-[#0b2e24] stroke-[#cbf341]"
                      strokeWidth="2.5"
                    />
                    <circle
                      cx={x}
                      cy={y}
                      r="10"
                      className="fill-[#cbf341] opacity-0 group-hover/node:opacity-15 transition-opacity cursor-pointer"
                    />
                    {/* Tiny hover value state */}
                    <text
                      x={x}
                      y={y - 12}
                      textAnchor="middle"
                      className="hidden group-hover/node:block font-mono text-[10px] font-bold fill-zinc-900 fill-zinc-50"
                    >
                      {activeRange === "7d" ? `${p.value}` : `${(p.value / 1000).toFixed(1)}k`}
                    </text>
                    {/* X axis index label */}
                    <text
                      x={x}
                      y={svgHeight - 10}
                      textAnchor="middle"
                      className="font-sans text-[10.5px] fill-zinc-400 fill-zinc-505 font-semibold"
                    >
                      {p.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="flex items-center justify-between border-t border-[#061910] border-white/10 pt-3 text-[11px] text-[#cbf341] text-[#061910]5 font-sans">
            <span className="flex items-center gap-1.5 text-emerald-505 font-bold">
              <TrendingUp size={13} className="shrink-0" />
              Audience interaction yield increased by 14.8% this week
            </span>
            <span>Refreshed: Every 60s</span>
          </div>
        </div>

        {/* Live Commands Diagnostics Node Terminal Console */}
        <div className="bg-zinc-950 rounded-xl p-4 flex flex-col justify-between overflow-hidden shadow-md max-h-[350px] lg:col-span-5 relative text-zinc-300 font-mono text-[11.5px] leading-snug">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-zinc-850 pb-2.5 mb-2.5 shrink-0">
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center p-1 bg-[#0a2219] text-[#cbf341] rounded-md">
                <TermIcon size={14} />
              </span>
              <span className="text-[10.5px] font-bold text-zinc-445 font-sans uppercase tracking-wider">Edge Live Console</span>
            </div>
            
            <div className="flex items-center gap-1">
              <span className="px-1.5 py-0.5 rounded bg-zinc-855 text-emerald-400 text-[9px] font-bold tracking-wide">SECURE TLS</span>
            </div>
          </div>

          {/* Console Window log output */}
          <div className="flex-1 overflow-y-auto mb-2.5 space-y-1.5 scrollbar-thin max-h-[200px]">
            {consoleLogs.map((log, idx) => (
              <div key={idx} className="flex items-start gap-2.5">
                <span className="text-zinc-600 select-none">{log.time}</span>
                <span className={`font-mono leading-relaxed ${
                  log.type === "success" 
                    ? "text-emerald-400" 
                    : log.type === "warn" 
                    ? "text-amber-400" 
                    : log.type === "error" 
                    ? "text-rose-500 font-semibold" 
                    : "text-zinc-350"
                }`}>
                  {log.message}
                </span>
              </div>
            ))}
            <div ref={consoleBottomRef} />
          </div>

          {/* Console Input Footer */}
          <form onSubmit={handleConsoleSubmit} className="flex items-center gap-2 border-t border-zinc-905 pt-2 shrink-0">
            <span className="text-emerald-400 select-none font-bold">guest@edgeconsole:~$</span>
            <input
              id="terminal-input"
              type="text"
              placeholder="Type help, stats, simulate or clear..."
              value={consoleInput}
              onChange={(e) => setConsoleInput(e.target.value)}
              className="flex-1 bg-transparent border-none text-[#061910] border-0 focus:ring-0 focus:outline-none placeholder-zinc-700 selection:bg-[#0a2219]"
            />
            <button
              id="terminal-submit-btn"
              type="submit"
              className="p-1 bg-zinc-850 text-[#cbf341] hover:text-zinc-200 hover:bg-[#0a2219] rounded transition-colors"
            >
              <Send size={12} />
            </button>
          </form>
        </div>
      </div>

      {/* Grid Subsystem Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center gap-4 bg-[#0b2e24] border border-white/10 p-4 rounded-xl">
          <div className="p-3 bg-[#cbf341]/10 text-[#cbf341] rounded-xl shrink-0">
            <Cpu size={20} className="animate-spin-slow" />
          </div>
          <div>
            <span className="block font-sans text-[11px] font-bold text-[#cbf341] text-[#061910]0 uppercase tracking-wide">CPU Node Consumption</span>
            <span className="block font-sans text-sm font-bold text-[#061910] text-zinc-100 mt-0.5">8.12% (Optimized)</span>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white bg-[#0b2e24] border border-[#061910]/60 dark:border-zinc-805/60 p-4 rounded-xl">
          <div className="p-3 bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-xl shrink-0">
            <Database size={20} />
          </div>
          <div>
            <span className="block font-sans text-[11px] font-bold text-[#cbf341] text-[#061910]5 uppercase tracking-wide">Database Indexes Status</span>
            <span className="block font-sans text-sm font-bold text-[#061910] text-zinc-100 mt-0.5">Optimal Sync (100%)</span>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-[#0b2e24] border border-white/10 p-4 rounded-xl">
          <div className="p-3 bg-emerald-500/10 text-emerald-600 text-emerald-400 rounded-xl shrink-0">
            <ShieldCheck size={20} />
          </div>
          <div>
            <span className="block font-sans text-[11px] font-bold text-[#cbf341] text-[#061910]0 uppercase tracking-wide">Gateway Certificates</span>
            <span className="block font-sans text-sm font-bold text-[#061910] text-zinc-100 mt-0.5">Authorized (TLS 1.3)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
