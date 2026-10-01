"use client";

import { useActionState } from "react";
import { Loader2 } from "lucide-react";
import { changePassword } from "@/lib/actions/auth";
import { inputClass, labelClass, primaryButton } from "./form/styles";

export default function ChangePasswordForm() {
  const [state, action, pending] = useActionState(changePassword, undefined);

  return (
    <form action={action} className="space-y-4">
      {[
        { name: "current", label: "Current password", autoComplete: "current-password" },
        { name: "next", label: "New password (min 12 characters)", autoComplete: "new-password" },
        { name: "confirm", label: "Repeat new password", autoComplete: "new-password" },
      ].map((f) => (
        <div key={f.name}>
          <label htmlFor={f.name} className={labelClass}>
            {f.label}
          </label>
          <input id={f.name} name={f.name} type="password" autoComplete={f.autoComplete} required className={inputClass} />
        </div>
      ))}
      {state?.error && (
        <p role="alert" className="text-sm text-red-400">
          {state.error}
        </p>
      )}
      {state?.success && (
        <p role="status" className="text-sm text-[#cbf341]">
          {state.success}
        </p>
      )}
      <button type="submit" disabled={pending} className={primaryButton}>
        {pending && <Loader2 size={16} className="animate-spin" />}
        Change password
      </button>
    </form>
  );
}
