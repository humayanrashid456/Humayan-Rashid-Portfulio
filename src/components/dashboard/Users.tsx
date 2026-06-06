import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Plus, Search, Filter, Trash2, Edit2, ShieldAlert, CheckCircle, 
  X, UserPlus, Shield, Sparkles, Moon 
} from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Developer" | "Billing" | "Guest";
  status: "Active" | "Idle" | "Suspended";
  avatar: string;
  dateAdded: string;
}

export default function Users() {
  const [users, setUsers] = useState<User[]>( [
    { id: "u-1", name: "Sarah Connor", email: "sarah.connor@sky-engine.io", role: "Admin", status: "Active", avatar: "SC", dateAdded: "2026-02-12" },
    { id: "u-2", name: "David Hasselhoff", email: "david.h@kight-edge.de", role: "Developer", status: "Active", avatar: "DH", dateAdded: "2026-03-01" },
    { id: "u-3", name: "Ellen Ripley", email: "r Ripley@nostromo-node.net", role: "Developer", status: "Idle", avatar: "ER", dateAdded: "2026-03-10" },
    { id: "u-4", name: "Humayan Rashid", email: "humayan.dev@freelance-brand.com", role: "Admin", status: "Active", avatar: "HR", dateAdded: "2026-01-20" },
    { id: "u-5", name: "Bruce Wayne", email: "bruce@gotham-ledger.org", role: "Billing", status: "Suspended", avatar: "BW", dateAdded: "25-11-2025" }
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<"All" | "Admin" | "Developer" | "Billing" | "Guest">("All");
  const [isAddingUser, setIsAddingUser] = useState(false);
  
  // Form elements
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState<"Admin" | "Developer" | "Billing" | "Guest">("Developer");

  // Filtering users
  const filteredUsers = users.filter((user) => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRole = roleFilter === "All" || user.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  const handleAddUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) return;

    const userAvatar = newName.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
    const newUserObj: User = {
      id: `u-${Date.now()}`,
      name: newName,
      email: newEmail,
      role: newRole,
      status: "Active",
      avatar: userAvatar,
      dateAdded: new Date().toISOString().split("T")[0]
    };

    setUsers([newUserObj, ...users]);
    setNewName("");
    setNewEmail("");
    setNewRole("Developer");
    setIsAddingUser(false);
  };

  const deleteUser = (id: string) => {
    setUsers(users.filter(u => u.id !== id));
  };

  const toggleUserStatus = (id: string) => {
    setUsers(users.map(u => {
      if (u.id === id) {
        const nextStatus: "Active" | "Idle" | "Suspended" = 
          u.status === "Active" ? "Suspended" : u.status === "Suspended" ? "Idle" : "Active";
        return { ...u, status: nextStatus };
      }
      return u;
    }));
  };

  const cycleRole = (id: string) => {
    const roleCycle: ("Admin" | "Developer" | "Billing" | "Guest")[] = ["Admin", "Developer", "Billing", "Guest"];
    setUsers(users.map(u => {
      if (u.id === id) {
        const idx = roleCycle.indexOf(u.role);
        const nextRole = roleCycle[(idx + 1) % roleCycle.length];
        return { ...u, role: nextRole };
      }
      return u;
    }));
  };

  return (
    <div className="space-y-6">
      {/* Search Actions bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="font-sans font-bold text-xl sm:text-2xl text-[#061910] text-[#061910] tracking-tight">System stakeholders</h2>
          <p className="font-sans text-xs text-[#061910]0 text-[#cbf341] mt-1">Assign admin clearances, system accessibility keys, and view current workspace logs.</p>
        </div>

        <button
          id="add-team-member-btn"
          onClick={() => setIsAddingUser(true)}
          className="flex items-center gap-2 self-start px-3.5 py-2 font-sans font-semibold text-xs rounded-xl bg-[#0b2e24] text-white hover:bg-[#0a2219] dark:bg-[#072418] text-[#061910] hover:bg-[#b2d932] shadow-sm transition-all cursor-pointer"
        >
          <UserPlus size={14} />
          <span>Provision Colleague</span>
        </button>
      </div>

      {/* Grid search and Segment filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 text-[#cbf341] dark:text-zinc-550 shrink-0" size={16} />
          <input
            id="user-search-field"
            type="text"
            placeholder="Search email, first name, last name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0b2e24] border border-white/10 rounded-xl py-2 pl-9 pr-4 text-xs font-sans text-[#061910] text-[#061910] focus:outline-none focus:ring-1 focus:ring-[#cbf341] placeholder-[#cbf341] dark:placeholder-[#cbf341] transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-2.5 text-xs text-[#cbf341] hover:text-zinc-650"
            >
              Clear
            </button>
          )}
        </div>

        <div className="flex bg-[#072418]/80 bg-[#0a2219] border border-[#061910]/50 border-white/10 rounded-xl p-0.5 self-start overflow-x-auto max-w-full">
          {(["All", "Admin", "Developer", "Billing", "Guest"] as const).map((role) => (
            <button
              key={role}
              onClick={() => setRoleFilter(role)}
              className={`px-3 py-1.5 text-xs font-sans font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                roleFilter === role
                  ? "bg-white bg-[#0d3329] text-zinc-950 text-[#061910] shadow-xs"
                  : "text-zinc-455 hover:text-zinc-700 dark:hover:text-zinc-350"
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      {/* User Table Card Container */}
      <div className="bg-[#0b2e24] border border-white/10 rounded-xl overflow-x-auto shadow-sm">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b border-[#061910]/50 border-white/10 text-[10.5px] uppercase font-sans font-bold text-[#cbf341] text-[#061910]0 tracking-wider">
              <th className="px-6 py-4">Stakeholder</th>
              <th className="px-4 py-4">Clearence Scope</th>
              <th className="px-4 py-4">Security Level</th>
              <th className="px-4 py-4">Provision Date</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#061910] dark:divide-zinc-805/80 text-xs font-sans">
            <AnimatePresence initial={false}>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-[#cbf341] text-[#061910]0 font-sans">
                    No matching colleagues found in this sub-directory.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="hover:bg-[#0b2e24]/10 dark:hover:bg-zinc-850/20 group/row"
                  >
                    {/* User profile detail */}
                    <td className="px-6 py-4 flex items-center gap-3.5">
                      <div className="w-9 h-9 rounded-xl bg-[#072418] bg-[#0d3329] text-zinc-705 text-zinc-200 font-bold flex items-center justify-center border border-[#061910]/50 dark:border-zinc-705 group-hover/row:border-[#cbf341]/20 transition-colors select-none">
                        {user.avatar}
                      </div>
                      <div>
                        <span className="block font-bold text-zinc-850 text-zinc-100">{user.name}</span>
                        <span className="block text-[11px] text-[#cbf341] text-[#061910]0 mt-0.5">{user.email}</span>
                      </div>
                    </td>

                    {/* Badge Role selector */}
                    <td className="px-4 py-4">
                      <button
                        onClick={() => cycleRole(user.id)}
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-bold border transition-colors cursor-pointer capitalize ${
                          user.role === "Admin"
                            ? "text-rose-600 bg-rose-500/10 border-rose-500/20 dark:text-rose-452"
                            : user.role === "Developer"
                            ? "text-purple-600 bg-purple-500/10 border-purple-500/20 dark:text-purple-400"
                            : user.role === "Billing"
                            ? "text-sky-600 bg-sky-500/10 border-sky-500/20 dark:text-sky-400"
                            : "text-[#061910]0 bg-zinc-500/10 border-zinc-500/20"
                        }`}
                      >
                        <Shield size={10} />
                        <span>{user.role}</span>
                      </button>
                    </td>

                    {/* Status Badge */}
                    <td className="px-4 py-4">
                      <button
                        onClick={() => toggleUserStatus(user.id)}
                        className={`inline-flex items-center gap-1.5 font-sans font-bold text-[10.5px] cursor-pointer hover:underline ${
                          user.status === "Active"
                            ? "text-emerald-500"
                            : user.status === "Idle"
                            ? "text-amber-500"
                            : "text-[#cbf341]"
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          user.status === "Active"
                            ? "bg-emerald-500 animate-pulse"
                            : user.status === "Idle"
                            ? "bg-amber-500"
                            : "bg-zinc-500"
                        }`} />
                        <span>{user.status}</span>
                      </button>
                    </td>

                    {/* Join Date */}
                    <td className="px-4 py-4 font-mono text-[10.5px] text-[#061910]0 text-[#cbf341]">
                      {user.dateAdded}
                    </td>

                    {/* Trash & Suspension Actions */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2.5">
                        <button
                          onClick={() => toggleUserStatus(user.id)}
                          title="Flag or Suspend user toggle"
                          className="p-1.5 select-none rounded bg-zinc-50 hover:bg-zinc-150/70 dark:bg-zinc-805 dark:hover:bg-zinc-750 text-[#cbf341] hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors cursor-pointer"
                        >
                          <ShieldAlert size={13} />
                        </button>
                        <button
                          onClick={() => deleteUser(user.id)}
                          title="Revoke access certificate"
                          className="p-1.5 select-none rounded bg-red-50 hover:bg-red-100/60 dark:bg-red-950/20 dark:hover:bg-red-950/50 text-red-650 hover:text-red-700 dark:text-red-400 transition-colors cursor-pointer"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Add User Modal Dialog Wrapper */}
      <AnimatePresence>
        {isAddingUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddingUser(false)}
              className="absolute inset-0 bg-zinc-950/40 bg-[#0a2219]/70 backdrop-blur-xs cursor-pointer"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              className="relative w-full max-w-sm bg-[#0b2e24] border border-white/10 rounded-xl p-5 shadow-xl flex flex-col space-y-4"
            >
              <div className="flex items-center justify-between border-b border-[#061910] border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <span className="p-1 w-7 h-7 bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-lg flex items-center justify-center">
                    <Sparkles size={14} />
                  </span>
                  <h3 className="font-sans font-bold text-sm text-[#061910] text-zinc-100">Provision Workspace Node</h3>
                </div>
                <button
                  onClick={() => setIsAddingUser(false)}
                  className="p-1 rounded text-[#cbf341] hover:bg-zinc-50 dark:hover:bg-zinc-805 transition-colors cursor-pointer"
                >
                  <X size={15} />
                </button>
              </div>

              {/* Input Form Fields */}
              <form onSubmit={handleAddUserSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-sans font-bold text-[#cbf341] uppercase mb-1.5">First / Last Name</label>
                  <input
                    id="new-user-name"
                    type="text"
                    required
                    placeholder="e.g. Luke Skywalker"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full bg-zinc-50 bg-[#0a2219] border border-[#061910] border-white/10 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-[#cbf341] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-sans font-bold text-[#cbf341] uppercase mb-1.5">Administrative Email</label>
                  <input
                    id="new-user-email"
                    type="email"
                    required
                    placeholder="e.g. luke@jedi-council.net"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="w-full bg-zinc-50 bg-[#0a2219] border border-[#061910] border-white/10 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-[#cbf341] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-sans font-bold text-[#cbf341] uppercase mb-1.5">Workspace Role clearance</label>
                  <select
                    id="new-user-role"
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value as any)}
                    className="w-full bg-zinc-50 bg-[#0a2219] border border-[#061910] border-white/10 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-[#cbf341] focus:outline-none"
                  >
                    <option value="Developer">Developer (Engineering context)</option>
                    <option value="Admin">Admin (Full Control context)</option>
                    <option value="Billing">Billing (LTV Accounts context)</option>
                    <option value="Guest">Guest (Limited scope read-only)</option>
                  </select>
                </div>

                <div className="pt-3 border-t border-[#061910] border-white/10 flex items-center justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => setIsAddingUser(false)}
                    className="px-3 py-2 text-xs font-semibold text-zinc-650 hover:text-[#061910] dark:hover:text-zinc-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-[#cbf341] hover:bg-[#b2d932] text-[#061910] shadow-sm transition-colors"
                  >
                    Authorize Node
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
