"use client";

import { useActionState } from "react";
import { Loader2, LogIn } from "lucide-react";
import { login } from "@/lib/actions/auth";
import { inputClass, labelClass, primaryButton } from "./form/styles";

export default function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined);

  return (
    <form action={action} className="space-y-4">
      <div>
        <label htmlFor="email" className={labelClass}>
          Email
        </label>
        <input id="email" name="email" type="email" autoComplete="username" required className={inputClass} />
      </div>
      <div>
        <label htmlFor="password" className={labelClass}>
          Password
        </label>
        <input id="password" name="password" type="password" autoComplete="current-password" required className={inputClass} />
      </div>
      {state?.error && (
        <p role="alert" className="text-sm text-red-400">
          {state.error}
        </p>
      )}
      <button type="submit" disabled={pending} className={`${primaryButton} w-full`}>
        {pending ? <Loader2 size={16} className="animate-spin" /> : <LogIn size={16} />}
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
