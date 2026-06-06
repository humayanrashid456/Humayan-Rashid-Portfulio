import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  CreditCard, Search, ArrowDownLeft, ArrowUpRight, CheckCircle2, 
  HelpCircle, AlertTriangle, FileText, Download, Calendar, ExternalLink, ChevronDown, ChevronUp 
} from "lucide-react";

interface Transaction {
  id: string; // e.g. tx_01ASDF
  customer: string;
  email: string;
  amount: number;
  type: "Subscription Payment" | "Invoice Settlement" | "API Credit purchase" | "Refund Allocation";
  pm: "Stripe Card" | "Apple Pay" | "PayPal" | "Crypto (USDC)";
  status: "Succeeded" | "Pending" | "Failed";
  date: string;
  fees: number;
  gatewayHost: string;
}

export default function Transactions() {
  const [txs, setTxs] = useState<Transaction[]>([
    { id: "tx_920s8a", customer: "Acme Enterprise Corp", email: "billing@acme.com", amount: 1450.00, type: "Invoice Settlement", pm: "Stripe Card", status: "Succeeded", date: "2026-06-03 12:44:02", fees: 43.50, gatewayHost: "stripe-prod-us-east-1" },
    { id: "tx_123f8s", customer: "Hassan Al-Zubair", email: "hassan@al-corp.ae", amount: 129.00, type: "Subscription Payment", pm: "Apple Pay", status: "Succeeded", date: "2026-06-03 10:22:11", fees: 3.87, gatewayHost: "stripe-prod-eu-central-1" },
    { id: "tx_452d9a", customer: "Marta Fernandez", email: "marta.fer@madrid-node.es", amount: 25.00, type: "API Credit purchase", pm: "Crypto (USDC)", status: "Succeeded", date: "2026-06-02 23:12:01", fees: 0.12, gatewayHost: "crypto-gateway-poly" },
    { id: "tx_871w0d", customer: "Vercel Build Bots", email: "bots@deploy.vercel.com", amount: 450.00, type: "Subscription Payment", pm: "Stripe Card", status: "Pending", date: "2026-06-02 18:04:31", fees: 13.50, gatewayHost: "stripe-prod-us-west-2" },
    { id: "tx_651a2d", customer: "Cyberdyne Systems", email: "skynet@cyberdyne.jp", amount: -45.00, type: "Refund Allocation", pm: "PayPal", status: "Succeeded", date: "2026-06-01 14:10:05", fees: 1.35, gatewayHost: "stripe-prod-ap-northeast-1" },
    { id: "tx_992h1a", customer: "Dr. Peter Venkman", email: "ghostbusters@nyc-node.us", amount: 89.00, type: "API Credit purchase", pm: "Stripe Card", status: "Failed", date: "2026-05-30 08:31:42", fees: 0.00, gatewayHost: "stripe-prod-us-east-1" }
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | "Succeeded" | "Pending" | "Failed">("All");
  const [expandedTxId, setExpandedTxId] = useState<string | null>(null);

  const toggleToggleExpand = (id: string) => {
    if (expandedTxId === id) setExpandedTxId(null);
    else setExpandedTxId(id);
  };

  const filteredTxs = txs.filter((tx) => {
    const matchesSearch = 
      tx.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "All" || tx.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Title block */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="font-sans font-bold text-xl sm:text-2xl text-[#061910] text-[#061910] tracking-tight">Financial Ledger</h2>
          <p className="font-sans text-xs text-[#061910]0 text-[#cbf341] mt-1">Audit billing settlements, subscription upgrades, and gateway webhooks.</p>
        </div>
      </div>

      {/* Search Actions bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 text-[#cbf341] dark:text-zinc-550 shrink-0" size={16} />
          <input
            id="tx-search-input"
            type="text"
            placeholder="Search Invoice UUID, client name or index address..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0b2e24] border border-white/10 rounded-xl py-2 pl-9 pr-4 text-xs font-sans text-[#061910] text-[#061910] focus:outline-none focus:ring-1 focus:ring-[#cbf341] placeholder-[#cbf341] dark:placeholder-[#cbf341] transition-all"
          />
        </div>

        <div className="flex bg-[#072418]/80 bg-[#0a2219] border border-[#061910]/50 border-white/10 rounded-xl p-0.5 self-start overflow-x-auto max-w-full">
          {(["All", "Succeeded", "Pending", "Failed"] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 text-xs font-sans font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                statusFilter === st
                  ? "bg-white bg-[#0d3329] text-zinc-950 text-[#061910] shadow-xs"
                  : "text-zinc-455 hover:text-zinc-700 dark:hover:text-zinc-350"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Transactions Grid */}
      <div className="bg-[#0b2e24] border border-white/10 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b border-[#061910]/50 border-white/10 text-[10.5px] uppercase font-sans font-bold text-zinc-455 text-[#061910]0 tracking-wider">
              <th className="px-6 py-4">Transaction Details</th>
              <th className="px-4 py-4">Fulfillment Mode</th>
              <th className="px-4 py-4">Status</th>
              <th className="px-4 py-4">Settlement Date</th>
              <th className="px-4 py-4">Sum Value</th>
              <th className="px-6 py-4 text-right">View Audit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#061910] dark:divide-zinc-805/80 text-xs font-sans">
            {filteredTxs.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-[#cbf341] text-[#061910]0 font-sans">
                  No registered financial invoices matching the active filters.
                </td>
              </tr>
            ) : (
              filteredTxs.map((tx) => {
                const isExpanded = expandedTxId === tx.id;
                const isRefund = tx.amount < 0;

                return (
                  <React.Fragment key={tx.id}>
                    <tr
                      className={`hover:bg-[#0b2e24]/10 dark:hover:bg-zinc-850/20 group/row cursor-pointer transition-colors ${
                        isExpanded ? "bg-zinc-50/60 bg-[#0d3329]/15" : ""
                      }`}
                      onClick={() => toggleToggleExpand(tx.id)}
                    >
                      {/* Name customer and transaction type */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <span className={`p-2 rounded-xl flex items-center justify-center shrink-0 ${
                            isRefund
                              ? "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                              : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          }`}>
                            {isRefund ? <ArrowUpRight size={14} /> : <ArrowDownLeft size={14} />}
                          </span>
                          <div>
                            <span className="block font-bold text-zinc-850 text-zinc-100">{tx.customer}</span>
                            <span className="block text-[11px] text-[#cbf341] text-[#061910]0 mt-0.5">{tx.type}</span>
                          </div>
                        </div>
                      </td>

                      {/* Payment method */}
                      <td className="px-4 py-4 font-sans font-semibold text-zinc-650 dark:text-zinc-350">
                        {tx.pm}
                      </td>

                      {/* Transaction Status badge */}
                      <td className="px-4 py-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-bold border ${
                          tx.status === "Succeeded"
                            ? "text-emerald-600 bg-emerald-500/10 border-emerald-500/20 dark:text-emerald-400"
                            : tx.status === "Pending"
                            ? "text-amber-600 bg-amber-500/10 border-amber-500/20 dark:text-amber-400"
                            : "text-rose-600 bg-rose-500/10 border-rose-500/20 dark:text-rose-452"
                        }`}>
                          <span>{tx.status}</span>
                        </span>
                      </td>

                      {/* Settlement Date */}
                      <td className="px-4 py-4 font-mono text-[10.5px] text-zinc-455 text-[#cbf341]">
                        {tx.date}
                      </td>

                      {/* Amount */}
                      <td className={`px-4 py-4 font-mono font-bold ${
                        isRefund ? "text-rose-500" : "text-zinc-850 text-zinc-100"
                      }`}>
                        {isRefund ? `-$${Math.abs(tx.amount).toFixed(2)}` : `$${tx.amount.toFixed(2)}`}
                      </td>

                      {/* Expand Arrow click */}
                      <td className="px-6 py-4 text-right">
                        <button
                          id={`tx-expand-btn-${tx.id}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleToggleExpand(tx.id);
                          }}
                          className="p-1 rounded text-[#cbf341] hover:bg-zinc-150/70 dark:hover:bg-zinc-805 transition-colors cursor-pointer inline-flex items-center"
                        >
                          {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        </button>
                      </td>
                    </tr>

                    {/* Expandable Receipt Breakdown accordion content */}
                    {isExpanded && (
                      <tr className="bg-[#0b2e24]/10 bg-[#0a2219]/25">
                        <td colSpan={6} className="px-6 py-4 font-sans text-xs text-zinc-650 text-[#cbf341] border-b border-[#061910] border-white/10">
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="grid grid-cols-1 md:grid-cols-3 gap-6 py-2"
                          >
                            <div>
                              <span className="block font-bold text-[10.5px] uppercase text-[#cbf341] text-[#061910]0 tracking-wider mb-2">Invoice Specs</span>
                              <div className="space-y-1 bg-[#0b2e24] border border-[#061910]/50 border-white/10 p-3 rounded-xl shadow-xs">
                                <div className="flex justify-between font-mono text-[11px] py-1 border-b border-zinc-50 border-white/10">
                                  <span>UUID:</span>
                                  <span className="font-bold text-zinc-800 text-zinc-100">{tx.id}</span>
                                </div>
                                <div className="flex justify-between font-mono text-[11px] py-1 border-b border-zinc-50 border-white/10">
                                  <span>Gross:</span>
                                  <span className="text-zinc-800 text-zinc-100">${tx.amount.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between font-mono text-[11px] py-1">
                                  <span>Contractor:</span>
                                  <span className="truncate max-w-[120px]">{tx.customer}</span>
                                </div>
                              </div>
                            </div>

                            <div>
                              <span className="block font-bold text-[10.5px] uppercase text-[#cbf341] text-[#061910]0 tracking-wider mb-2">Broker & Gateway Webhook</span>
                              <div className="space-y-1 bg-[#0b2e24] border border-[#061910]/50 border-white/10 p-3 rounded-xl shadow-xs">
                                <div className="flex justify-between font-mono text-[11px] py-1 border-b border-zinc-50 border-white/10">
                                  <span>Operator:</span>
                                  <span className="text-[#cbf341] font-bold">{tx.pm}</span>
                                </div>
                                <div className="flex justify-between font-mono text-[11px] py-1 border-b border-zinc-50 border-white/10">
                                  <span>Processing Fee:</span>
                                  <span>${tx.fees.toFixed(2)} USD</span>
                                </div>
                                <div className="flex justify-between font-mono text-[11px] py-1">
                                  <span>Edge Ingress Server:</span>
                                  <span className="text-[#cbf341] truncate max-w-[120px]">{tx.gatewayHost}</span>
                                </div>
                              </div>
                            </div>

                            <div className="flex flex-col justify-end">
                              <div className="space-y-2">
                                <button
                                  id={`download-receipt-${tx.id}`}
                                  onClick={() => alert(`Generating PDF Receipt for Invoice ${tx.id}... Complete.`)}
                                  className="w-full flex items-center justify-center gap-1.5 px-3 py-2 font-semibold text-xs border border-[#061910] border-white/10 hover:bg-zinc-50 dark:hover:bg-[#0a2219] rounded-lg text-zinc-700 text-zinc-300 shadow-xs cursor-pointer transition-colors"
                                >
                                  <Download size={13} />
                                  <span>Export PDF Receipt</span>
                                </button>
                                <button
                                  id={`stripe-audit-${tx.id}`}
                                  onClick={() => alert("Forwarding user securely to verified gateway ledger logs endpoint.")}
                                  className="w-full flex items-center justify-center gap-1.5 px-3 py-2 font-semibold text-xs border border-[#061910] border-white/10 hover:bg-zinc-50 dark:hover:bg-[#0a2219] rounded-lg text-zinc-700 text-zinc-300 shadow-xs cursor-pointer transition-colors"
                                >
                                  <ExternalLink size={13} />
                                  <span>Audit In Stripe Dashboard</span>
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* LTV aggregate warning */}
      <div className="flex items-center gap-3 bg-teal-500/5 border border-teal-550/10 p-4 rounded-xl font-sans text-xs text-zinc-550 text-[#cbf341]">
        <FileText size={18} className="text-teal-500 shrink-0" />
        <div>
          <span className="font-bold block text-[#061910] text-zinc-100">PCI-DSS Compliant</span>
          <span className="block mt-0.5 text-[#061910]0 text-[#cbf341]">
            Internal financial data stream generated by Stripe Gateway. Raw payload attributes are secured using HMAC signatures to guarantee webhook validity.
          </span>
        </div>
      </div>
    </div>
  );
}
