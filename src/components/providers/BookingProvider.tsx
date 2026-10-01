"use client";

import dynamic from "next/dynamic";
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

// The modal isn't needed for first paint, so its code is only downloaded
// the first time someone opens it.
const BookingModal = dynamic(() => import("@/components/booking/BookingModal"), { ssr: false });

interface BookingContextValue {
  openBooking: () => void;
}

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);

  const openBooking = useCallback(() => {
    setHasOpened(true);
    setIsOpen(true);
  }, []);
  const closeBooking = useCallback(() => setIsOpen(false), []);
  const value = useMemo(() => ({ openBooking }), [openBooking]);

  return (
    <BookingContext value={value}>
      {children}
      {hasOpened && <BookingModal isOpen={isOpen} onClose={closeBooking} />}
    </BookingContext>
  );
}

export function useBooking(): BookingContextValue {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used inside <BookingProvider>");
  return ctx;
}
