export type Elapsed = {
  years: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

/**
 * Breaks down the time elapsed between `startedAt` and now into
 * years / days / hours / minutes / seconds, accounting for real
 * calendar month lengths (not just fixed 365-day years).
 */
export function getElapsed(startedAt: string, now: Date = new Date()): Elapsed {
  const start = new Date(startedAt);
  let years = now.getFullYear() - start.getFullYear();

  const anniversaryThisYear = new Date(start);
  anniversaryThisYear.setFullYear(start.getFullYear() + years);
  if (anniversaryThisYear.getTime() > now.getTime()) {
    years -= 1;
  }

  const lastAnniversary = new Date(start);
  lastAnniversary.setFullYear(start.getFullYear() + years);

  let diffMs = now.getTime() - lastAnniversary.getTime();
  if (diffMs < 0) diffMs = 0;

  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { years, days, hours, minutes, seconds };
}

export function getCountdown(targetAt: string, now: Date = new Date()) {
  const target = new Date(targetAt);
  let diffMs = target.getTime() - now.getTime();
  const reached = diffMs <= 0;
  if (diffMs < 0) diffMs = 0;

  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { reached, days, hours, minutes, seconds };
}

export function formatPrettyDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
