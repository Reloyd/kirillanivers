import type { FutureMemory } from "../../content";
import SectionWrapper from "../SectionWrapper";
import Polaroid from "../Polaroid";

type Props = {
  futureMemories: FutureMemory[];
};

export default function FutureMemories({ futureMemories }: Props) {
  if (futureMemories.length === 0) return null;

  return (
    <SectionWrapper id="future">
      <h2 className="section-heading">Future Memories</h2>
      <p className="section-subheading">Empty frames, waiting for us to fill them.</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-8">
        {futureMemories.map((memory, i) => (
          <Polaroid
            key={memory.caption}
            image={memory.image}
            caption={memory.caption}
            rotate={i % 2 === 0 ? -3 : 3}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}
