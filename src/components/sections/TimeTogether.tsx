import SectionWrapper from "../SectionWrapper";
import { useElapsedTime } from "../../hooks/useElapsedTime";
import { formatPrettyDate } from "../../utils/date";

type Props = {
  startedAt: string;
};

export default function TimeTogether({ startedAt }: Props) {
  const { years, days, hours, minutes, seconds } = useElapsedTime(startedAt);

  const units = [
    { label: years === 1 ? "year" : "years", value: years },
    { label: days === 1 ? "day" : "days", value: days },
    { label: "hours", value: hours },
    { label: "minutes", value: minutes },
    { label: "seconds", value: seconds },
  ];

  return (
    <SectionWrapper id="time">
      <h2 className="section-heading">Time Together</h2>
      <p className="section-subheading">Counting since {formatPrettyDate(startedAt)}, and still going.</p>

      <div className="flex flex-wrap justify-center gap-4 sm:gap-6 bg-white/50 rounded-2xl px-4 py-8 sm:px-8">
        {units.map((u) => (
          <div key={u.label} className="flex flex-col items-center min-w-[54px]">
            <span className="font-serif text-3xl sm:text-4xl text-wine tabular-nums">
              {String(u.value).padStart(2, "0")}
            </span>
            <span className="text-[11px] uppercase tracking-wide text-ink/40 mt-1">{u.label}</span>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
