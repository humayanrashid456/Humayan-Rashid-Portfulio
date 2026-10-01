const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
  // Fixed zone so server and browser render the same text (no hydration mismatch).
  timeZone: "UTC",
});

export function formatDate(iso: string | null | undefined): string {
  return iso ? dateFormatter.format(new Date(iso)) : "";
}

export const formatReadingTime = (minutes: number) => `${Math.max(1, Math.round(minutes))} min read`;
