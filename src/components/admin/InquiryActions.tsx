"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { deleteInquiry, setInquiryStatus } from "@/lib/actions/admin/inbox";
import { inputClass } from "./form/styles";

const STATUSES = ["new", "read", "replied", "archived"] as const;

export default function InquiryActions({ id, status }: { id: string; status: string }) {
  const [pending, startTransition] = useTransition();

  return (
    <div className={`flex items-center gap-2 ${pending ? "opacity-60" : ""}`}>
      <select
        aria-label="Status"
        value={status}
        disabled={pending}
        onChange={(e) => {
          const next = e.target.value as (typeof STATUSES)[number];
          startTransition(() => setInquiryStatus(id, next));
        }}
        className={`${inputClass} !w-auto !py-1.5 !text-xs capitalize`}
      >
        {STATUSES.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
      <button
        type="button"
        aria-label="Delete message"
        disabled={pending}
        onClick={() => {
          if (window.confirm("Delete this message permanently?")) startTransition(() => deleteInquiry(id));
        }}
        className="p-1.5 text-zinc-300 hover:text-red-300"
      >
        <Trash2 size={15} />
      </button>
    </div>
  );
}
