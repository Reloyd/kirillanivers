import type { Dream } from "../../content";
import SectionWrapper from "../SectionWrapper";
import { Sparkles } from "lucide-react";

type Props = {
  dreams: Dream[];
};

export default function OurDreams({ dreams }: Props) {
  if (dreams.length === 0) return null;

  return (
    <SectionWrapper id="dreams">
      <h2 className="section-heading">Our Dreams</h2>
      <p className="section-subheading">What's ahead of us.</p>

      <div className="grid sm:grid-cols-2 gap-5">
        {dreams.map((dream) => (
          <div
            key={dream.title}
            className="bg-white/50 rounded-2xl p-6 flex flex-col gap-2 border border-rose-light/40"
          >
            <Sparkles className="w-5 h-5 text-gold" strokeWidth={1.5} />
            <h3 className="font-serif text-lg text-wine">{dream.title}</h3>
            {dream.text && <p className="text-sm text-ink/70 leading-relaxed">{dream.text}</p>}
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
