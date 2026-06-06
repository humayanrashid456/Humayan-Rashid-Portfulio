import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Key, Shield, Settings2, Bell, Sparkles, Check, Copy, RefreshCw, 
  Slack, Database, Webhook, Github 
} from "lucide-react";

export default function Settings() {
  const [activeSubTab, setActiveSubTab] = useState<"keys" | "notifications" | "workspace">("keys");
  const [apiKey, setApiKey] = useState("pk_live_823fas91asdjkhgqwiue872913asd");
  const [copied, setCopied] = useState(false);
  const [loadingKey, setLoadingKey] = useState(false);

  // Integration states
  const [slackSync, setSlackSync] = useState(true);
  const [githubAutoDeploy, setGithubAutoDeploy] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState("https://api.skynet-ops.co/webhooks/ingress");

  const generateNewKey = () => {
    setLoadingKey(true);
    setTimeout(() => {
      const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let keyVal = "pk_live_";
      for (let i = 0; i < 30; i++) {
        keyVal += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      setApiKey(keyVal);
      setLoadingKey(false);
    }, 800);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="font-sans font-bold text-xl sm:text-2xl text-[#061910] text-[#061910] tracking-tight">System configuration</h2>
          <p className="font-sans text-xs text-[#061910]0 text-[#cbf341] mt-1">Manage infrastructure credentials, Slack logs integrations, and active webhooks.</p>
        </div>
      </div>

      {/* Sub tabs hierarchy */}
      <div className="flex border-b border-[#061910]/50 border-white/10">
        <button
          onClick={() => setActiveSubTab("keys")}
          className={`px-4 py-2.5 font-sans font-semibold text-xs border-b-2 transition-all cursor-pointer uppercase tracking-wider flex items-center gap-1.5 ${
            activeSubTab === "keys"
              ? "border-[#cbf341] text-[#cbf341]"
              : "border-transparent text-zinc-455 hover:text-zinc-700 dark:hover:text-zinc-300"
          }`}
        >
          <Key size={13} />
          <span>API Access Keys</span>
        </button>

        <button
          onClick={() => setActiveSubTab("notifications")}
          className={`px-4 py-2.5 font-sans font-semibold text-xs border-b-2 transition-all cursor-pointer uppercase tracking-wider flex items-center gap-1.5 ${
            activeSubTab === "notifications"
              ? "border-[#cbf341] text-[#cbf341]"
              : "border-transparent text-zinc-455 hover:text-zinc-700 dark:hover:text-zinc-300"
          }`}
        >
          <Bell size={13} />
          <span>Notifications</span>
        </button>

        <button
          onClick={() => setActiveSubTab("workspace")}
          className={`px-4 py-2.5 font-sans font-semibold text-xs border-b-2 transition-all cursor-pointer uppercase tracking-wider flex items-center gap-1.5 ${
            activeSubTab === "workspace"
              ? "border-[#cbf341] text-[#cbf341]"
              : "border-transparent text-zinc-455 hover:text-zinc-700 dark:hover:text-zinc-300"
          }`}
        >
          <Settings2 size={13} />
          <span>Global Integrations</span>
        </button>
      </div>

      {/* Rendering contents based on subTab */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Sub tab main block */}
        <div className="bg-[#0b2e24] border border-white/10 rounded-xl p-5 shadow-sm lg:col-span-8 space-y-6">
          
          {activeSubTab === "keys" && (
            <div className="space-y-6">
              <div>
                <h3 className="font-sans font-bold text-sm text-[#061910] text-zinc-100">Secret API Token credentials</h3>
                <p className="font-sans text-[11px] text-[#cbf341] mt-1">Use this secret key token to compile REST logs directly from outside CLI environments.</p>
              </div>

              {/* API Token Key Box */}
              <div className="relative bg-zinc-50 bg-[#0a2219] border border-[#061910] border-white/10 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 overflow-hidden">
                <div className="min-w-0">
                  <span className="block text-[10px] font-sans font-bold text-zinc-455 uppercase tracking-wide mb-1 select-none">Live Access Token</span>
                  <span className="block font-mono text-zinc-800 text-zinc-200 tracking-tight text-xs break-all">
                    {apiKey}
                  </span>
                </div>
                
                {/* Button actions for Keys */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    id="copy-api-key-btn"
                    onClick={copyToClipboard}
                    className="p-2 select-none border border-[#061910] border-white/10 hover:bg-[#072418] dark:hover:bg-zinc-850 text-zinc-600 dark:text-zinc-350 rounded-lg transition-colors cursor-pointer inline-flex items-center gap-1 text-xs font-sans font-bold"
                  >
                    {copied ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />}
                    <span>{copied ? "Copied!" : "Copy"}</span>
                  </button>

                  <button
                    id="regenerate-api-key-btn"
                    onClick={generateNewKey}
                    disabled={loadingKey}
                    className="p-2 select-none border border-[#061910] border-white/10 hover:bg-[#072418] dark:hover:bg-zinc-850 text-zinc-650 dark:text-zinc-350 rounded-lg transition-colors cursor-pointer inline-flex items-center gap-1.5 text-xs font-sans font-bold disabled:opacity-50"
                  >
                    <RefreshCw size={13} className={loadingKey ? "animate-spin" : ""} />
                    <span>Roll</span>
                  </button>
                </div>
              </div>

              <div className="pt-4 border-t border-[#061910] border-white/10 space-y-4">
                <h4 className="font-sans font-bold text-xs text-zinc-800 text-zinc-200">Security Clearance Rules</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="border border-[#061910]/50 border-white/10 p-3.5 rounded-xl text-xs space-y-1">
                    <span className="font-bold block text-zinc-850 text-zinc-200">IP Whitelist lock</span>
                    <p className="text-[#061910]0 text-[11px] leading-relaxed">Restrict credentials usage specifically to secure workspace server nodes IPs.</p>
                  </div>
                  <div className="border border-[#061910]/50 border-white/10 p-3.5 rounded-xl text-xs space-y-1">
                    <span className="font-bold block text-zinc-850 text-zinc-200">JWT Token Expiry</span>
                    <p className="text-[#061910]0 text-[11px] leading-relaxed">Authorize key session durations to terminate automatically after 180 days.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSubTab === "notifications" && (
            <div className="space-y-5">
              <div>
                <h3 className="font-sans font-bold text-sm text-[#061910] text-zinc-100">Server alerts & alerts logs</h3>
                <p className="font-sans text-[11px] text-[#cbf341] mt-1">Configure client report triggers and server diagnostic broadcast configurations.</p>
              </div>

              {/* Toggle switch selectors */}
              <div className="space-y-3.5">
                <div className="flex items-center justify-between p-3.5 hover:bg-[#0b2e24]/10 dark:hover:bg-zinc-850/10 rounded-xl transition-colors">
                  <div>
                    <span className="font-sans text-xs font-bold text-zinc-800 text-zinc-200">API Endpoint Rate Alert</span>
                    <p className="font-sans text-[11px] text-zinc-550 mt-0.5">Send a high-priority warning when workspace load triggers 85% RPM capacity threshold.</p>
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="h-4 w-8 rounded-full border-zinc-300 text-[#cbf341] focus:ring-[#cbf341] bg-zinc-200 bg-[#0d3329] cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-3.5 hover:bg-[#0b2e24]/10 dark:hover:bg-zinc-850/10 rounded-xl transition-colors">
                  <div>
                    <span className="font-sans text-xs font-bold text-zinc-800 text-zinc-200">Regional Gateway Fallback</span>
                    <p className="font-sans text-[11px] text-zinc-550 mt-0.5">Broadcast push notification alerts when Tokyo-SGP servers trigger backup nodes.</p>
                  </div>
                  <input
                    type="checkbox"
                    className="h-4 w-8 rounded-full border-zinc-300 text-[#cbf341] focus:ring-[#cbf341] bg-zinc-200 bg-[#0d3329] cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-3.5 hover:bg-[#0b2e24]/10 dark:hover:bg-zinc-850/10 rounded-xl transition-colors">
                  <div>
                    <span className="font-sans text-xs font-bold text-zinc-800 text-zinc-200">Daily Billing Summary Reports</span>
                    <p className="font-sans text-[11px] text-zinc-550 mt-0.5">Email total client payments, ledger statistics, and server running fees every morning.</p>
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="h-4 w-8 rounded-full border-zinc-300 text-[#cbf341] focus:ring-[#cbf341] bg-zinc-200 bg-[#0d3329] cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}

          {activeSubTab === "workspace" && (
            <div className="space-y-6">
              <div>
                <h3 className="font-sans font-bold text-sm text-[#061910] text-zinc-100">Third-party integrations channel</h3>
                <p className="font-sans text-[11px] text-[#cbf341] mt-1">Connect workspace processes directly with external APIs and DevOps hooks repositories.</p>
              </div>

              {/* Integrations checklist */}
              <div className="space-y-4">
                <div className="border border-[#061910]/60 border-white/10 rounded-xl p-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="p-2 bg-[#4A154B]/10 text-[#4A154B] rounded-xl flex items-center justify-center">
                      <Slack size={18} />
                    </span>
                    <div>
                      <span className="block font-sans text-xs font-bold text-zinc-850 text-zinc-200">Slack Notifications integration</span>
                      <p className="font-sans text-[11px] text-[#061910]0 mt-0.5">Push console warnings and invoice paid payouts logs directly to Slack channels.</p>
                    </div>
                  </div>
                  <button
                    id="slack-toggle-btn"
                    onClick={() => setSlackSync(!slackSync)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-sans font-bold cursor-pointer transition-all ${
                      slackSync 
                        ? "bg-rose-50 text-rose-650 hover:bg-rose-100 dark:bg-rose-950/20 dark:text-rose-400" 
                        : "bg-[#0b2e24] text-white hover:bg-[#0a2219] dark:bg-[#072418] text-[#061910]"
                    }`}
                  >
                    {slackSync ? "Disconnect" : "Connect"}
                  </button>
                </div>

                <div className="border border-[#061910]/60 border-white/10 rounded-xl p-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="p-2 bg-[#072418] bg-[#0d3329] text-zinc-800 text-zinc-200 rounded-xl flex items-center justify-center">
                      <Webhook size={18} />
                    </span>
                    <div className="flex-1 min-w-0">
                      <span className="block font-sans text-xs font-bold text-zinc-850 text-zinc-200">Gateway Webhook Endpoint url</span>
                      <input
                        id="webhook-url-input"
                        type="text"
                        value={webhookUrl}
                        onChange={(e) => setWebhookUrl(e.target.value)}
                        className="bg-zinc-50 bg-[#0a2219] border border-[#061910] border-white/10 focus:outline-none focus:ring-1 focus:ring-[#cbf341] text-[11.5px] font-mono rounded px-2 py-1 select-all text-zinc-700 text-zinc-300 w-full max-w-[280px] sm:max-w-md mt-1"
                      />
                    </div>
                  </div>
                  <button
                    id="webhook-save-btn"
                    onClick={() => alert("Webhook endpoint URL updated in core configuration successfully.")}
                    className="p-1 px-3 self-center text-xs font-bold bg-[#0b2e24] text-white dark:bg-[#072418] text-[#061910] rounded-lg cursor-pointer"
                  >
                    Save URL
                  </button>
                </div>

                <div className="border border-[#061910]/60 border-white/10 rounded-xl p-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="p-2 bg-[#0b2e24] border border-zinc-800 text-white bg-[#0a2219]/80 rounded-xl flex items-center justify-center">
                      <Github size={18} />
                    </span>
                    <div>
                      <span className="block font-sans text-xs font-bold text-zinc-850 text-zinc-200">GitHub Auto-Deploy webhooks</span>
                      <p className="font-sans text-[11px] text-[#061910]0 mt-0.5">Auto-roll deployment nodes when releases package updates are pushed to main git repository.</p>
                    </div>
                  </div>
                  <button
                    id="github-deploy-toggle-btn"
                    onClick={() => setGithubAutoDeploy(!githubAutoDeploy)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-sans font-bold cursor-pointer transition-all ${
                      githubAutoDeploy 
                        ? "bg-rose-50 text-rose-650 hover:bg-rose-100 dark:bg-rose-950/20 dark:text-rose-400" 
                        : "bg-[#0b2e24] text-white hover:bg-[#0a2219] dark:bg-[#072418] text-[#061910]"
                    }`}
                  >
                    {githubAutoDeploy ? "Disconnect" : "Connect"}
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Info panel side bar */}
        <div className="bg-gradient-to-br from-zinc-50 to-white dark:from-zinc-900/60 dark:to-zinc-900 border border-zinc-250/50 border-white/10 rounded-xl p-5 shadow-sm lg:col-span-4 self-start space-y-4 font-sans text-xs">
          <div className="pb-3 border-b border-[#061910]/60 border-white/10">
            <h4 className="font-bold text-[#061910] text-zinc-100">Workspace Status Checklist</h4>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
            <span className="font-semibold text-zinc-800 text-zinc-200">TLS certificates: Valid (Expires Feb 2027)</span>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
            <span className="font-semibold text-zinc-800 text-zinc-200">PostgreSQL Index cluster: Connected</span>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
            <span className="font-semibold text-zinc-800 text-zinc-200">Billing Limit: Tier 3 Active (Optimal)</span>
          </div>
          <div className="pt-3 border-t border-[#061910]/50 border-white/10/80 text-[11px] leading-relaxed text-zinc-455">
            <span className="block font-bold mb-1 text-zinc-700 dark:text-zinc-350">Workspace ID:</span>
            <code className="font-mono bg-[#072418] bg-[#0a2219] px-1.5 py-0.5 rounded text-zinc-600 block truncate">
              ws_antigravity_core_tokyo
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}
