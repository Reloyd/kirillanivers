import SectionWrapper from "../SectionWrapper";
import Polaroid from "../Polaroid";

type Props = {
  callGallery: string[];
};

export default function CallGallery({ callGallery }: Props) {
  if (callGallery.length === 0) return null;

  return (
    <SectionWrapper id="calls">
      <h2 className="section-heading">Call Screenshots</h2>
      <p className="section-subheading">Imperfect quality, perfect company.</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-8">
        {callGallery.map((src, i) => (
          <Polaroid key={src} image={src} caption="" rotate={i % 2 === 0 ? -4 : 4} />
        ))}
      </div>
    </SectionWrapper>
  );
}
