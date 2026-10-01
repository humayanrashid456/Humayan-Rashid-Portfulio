"use client";

import type { ReactNode } from "react";
import { useBooking } from "@/components/providers/BookingProvider";

interface BookCallButtonProps {
  className?: string;
  children: ReactNode;
  "aria-label"?: string;
}

/** Opens the global booking modal. Lets Server Components render a booking CTA. */
export default function BookCallButton({ className, children, ...rest }: BookCallButtonProps) {
  const { openBooking } = useBooking();
  return (
    <button type="button" onClick={openBooking} className={className} {...rest}>
      {children}
    </button>
  );
}
