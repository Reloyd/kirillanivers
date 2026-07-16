import { useEffect } from "react";
import { useCountdown } from "../hooks/useCountdown";
import { formatPrettyDate } from "../utils/date";

type Props = {
  targetAt: string;
  girlName: string;
  onReached: () => void;
};

/**
 * Shown instead of the envelope when `content.meta.reveal.enabled` is true
 * and the anniversary hasn't happened yet. Automatically calls onReached()
 * once the countdown hits zero, so the page unlocks itself without a reload.
 */
export default function RevealCountdown({ targetAt, girlName, onReached }: Props) {
  const { reached, days, hours, minutes, seconds } = useCountdown(targetAt);

  useEffect(() => {
    if (reached) onReached();
  }, [reached, onReached]);

  if (reached) {
    return null;
  }

  const units = [
    { label: "days", value: days },
    { label: "hours", value: hours },
    { label: "minutes", value: minutes },
    { label: "seconds", value: seconds },
  ];

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-cream px-6 text-center">
      <p className="text-rose-dark/70 text-sm tracking-wide uppercase mb-4">For {girlName}</p>
      <h1 className="section-heading">Something's waiting for you</h1>
      <p className="text-ink/60 mb-10">Unlocks on {formatPrettyDate(targetAt)}</p>
      <div className="flex gap-4 sm:gap-6">
        {units.map((u) => (
          <div key={u.label} className="flex flex-col items-center">
            <span className="font-serif text-3xl sm:text-4xl text-wine tabular-nums">
              {String(u.value).padStart(2, "0")}
            </span>
            <span className="text-[11px] uppercase tracking-wide text-ink/40 mt-1">{u.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
