import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, LucideIcon, BarChart3, Users, CreditCard, Settings, RefreshCw, X, Shield, Terminal } from "lucide-react";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTab: (tab: string) => void;
}

interface CommandItem {
  id: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  category: "Navigation" | "Actions" | "System";
  shortcut?: string;
  action: () => void;
}

export default function CommandPalette({ isOpen, onClose, onSelectTab }: CommandPaletteProps) {
  const [search, setSearch] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent handles toggle, which is safer
      }
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const commands: CommandItem[] = [
    {
      id: "overview",
      title: "Go to Dashboard Overview",
      subtitle: "View core business stats, node status, and server logs",
      icon: Terminal,
      category: "Navigation",
      shortcut: "G + O",
      action: () => {
        onSelectTab("overview");
        onClose();
      },
    },
    {
      id: "analytics",
      title: "Open Performance Analytics",
      subtitle: "Deep dive charts, database latency, and regional metrics",
      icon: BarChart3,
      category: "Navigation",
      shortcut: "G + A",
      action: () => {
        onSelectTab("analytics");
        onClose();
      },
    },
    {
      id: "users",
      title: "Manage System Users",
      subtitle: "Add colleagues, assign workspace roles, and edit scopes",
      icon: Users,
      category: "Navigation",
      shortcut: "G + U",
      action: () => {
        onSelectTab("users");
        onClose();
      },
    },
    {
      id: "transactions",
      title: "Review Financial Transactions",
      subtitle: "Audit invoices, billing receipts, and payouts history",
      icon: CreditCard,
      category: "Navigation",
      shortcut: "G + T",
      action: () => {
        onSelectTab("transactions");
        onClose();
      },
    },
    {
      id: "settings",
      title: "Configure App Settings",
      subtitle: "Workspace settings, developer API tokens, and hooks",
      icon: Settings,
      category: "Navigation",
      shortcut: "G + S",
      action: () => {
        onSelectTab("settings");
        onClose();
      },
    },
    {
      id: "refresh",
      title: "Sync Databases & Systems",
      subtitle: "Force pull latest server performance records from Cloud Engine",
      icon: RefreshCw,
      category: "Actions",
      action: () => {
        alert("Database indexes synced successfully with Edge Servers.");
        onClose();
      },
    },
    {
      id: "security",
      title: "View Security Policies",
      subtitle: "Inspect TLS status, active SSH keys, and IAM certificates",
      icon: Shield,
      category: "System",
      action: () => {
        onSelectTab("settings");
        onClose();
      },
    },
  ];

  const filteredCommands = commands.filter(
    (cmd) =>
      cmd.title.toLowerCase().includes(search.toLowerCase()) ||
      cmd.subtitle.toLowerCase().includes(search.toLowerCase()) ||
      cmd.category.toLowerCase().includes(search.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-[12vh] p-4">
        {/* Backdrop overlay */}
        <motion.div
          id="cmd-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-zinc-950/45 bg-[#0a2219]/75 backdrop-blur-sm cursor-pointer"
        />

        {/* Command search box */}
        <motion.div
          id="cmd-box"
          initial={{ opacity: 0, scale: 0.96, y: -8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -8 }}
          className="relative w-full max-w-lg bg-[#0b2e24] border border-white/10 rounded-xl shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Input Header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-[#061910]/50 border-white/10">
            <Search className="text-[#cbf341] text-[#061910]0 shrink-0" size={18} />
            <input
              id="cmd-search-input"
              type="text"
              placeholder="Search views, settings, and commands..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent border-none text-[#061910] text-[#061910] text-sm focus:outline-none placeholder-[#cbf341] dark:placeholder-[#cbf341]"
              autoFocus
            />
            <button
              id="cmd-close-btn"
              onClick={onClose}
              className="p-1 rounded text-[#cbf341] hover:bg-[#072418] dark:hover:bg-[#0a2219] transition-colors"
            >
              <X size={15} />
            </button>
          </div>

          {/* Results Area */}
          <div className="max-h-[340px] overflow-y-auto p-2 scrollbar-thin">
            {filteredCommands.length === 0 ? (
              <div className="py-8 text-center text-[#cbf341] text-[#061910]0 text-sm font-sans">
                No commands matching your query.
              </div>
            ) : (
              <div>
                {["Navigation", "Actions", "System"].map((category) => {
                  const items = filteredCommands.filter((c) => c.category === category);
                  if (items.length === 0) return null;
                  return (
                    <div key={category} className="mb-2">
                      <div className="px-3 py-1.5 font-sans font-semibold text-[10px] tracking-wider uppercase text-[#cbf341] text-[#061910]0">
                        {category}
                      </div>
                      <div className="space-y-0.5">
                        {items.map((cmd) => {
                          const Icon = cmd.icon;
                          return (
                            <button
                              key={cmd.id}
                              onClick={cmd.action}
                              className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left hover:bg-[#072418]/80 dark:hover:bg-[#0a2219]/60 transition-colors group cursor-pointer"
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <span className="p-1.5 bg-[#072418] bg-[#0d3329] text-[#061910]0 text-[#cbf341] group-hover:bg-white dark:group-hover:bg-zinc-750 group-hover:text-[#061910] dark:group-hover:text-[#061910] rounded-md transition-colors shrink-0">
                                  <Icon size={16} />
                                </span>
                                <div className="min-w-0">
                                  <div className="font-sans font-medium text-xs text-zinc-800 text-zinc-200 group-hover:text-zinc-950 dark:group-hover:text-[#061910] truncate">
                                    {cmd.title}
                                  </div>
                                  <div className="font-sans text-[10.5px] text-[#cbf341] text-[#061910]0 truncate mt-0.5">
                                    {cmd.subtitle}
                                  </div>
                                </div>
                              </div>
                              {cmd.shortcut && (
                                <kbd className="hidden sm:inline-flex items-center h-5 select-none pointer-events-none px-1.5 font-mono text-[9px] font-bold tracking-widest text-[#cbf341] bg-zinc-50 border border-[#061910] bg-[#0a2219] border-white/10 rounded text-[#061910]0">
                                  {cmd.shortcut}
                                </kbd>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* CMD Footbar */}
          <div className="px-4 py-2 bg-zinc-50 bg-[#0a2219]/40 border-t border-[#061910]/50 border-white/10/85 flex items-center justify-between text-[10.5px] text-[#cbf341] dark:text-zinc-555 font-sans">
            <div className="flex items-center gap-4">
              <span>Use <kbd className="font-mono bg-zinc-150/70 px-1 py-0.2 rounded dark:bg-zinc-805">↑↓</kbd> to navigate</span>
              <span><kbd className="font-mono bg-zinc-150/70 px-1 py-0.2 rounded dark:bg-zinc-805">Enter</kbd> to select</span>
            </div>
            <span>Esc to close</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
