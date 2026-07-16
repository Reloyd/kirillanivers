import { useState } from "react";
import { motion } from "framer-motion";
import type { StoryEvent } from "../../content";
import SectionWrapper from "../SectionWrapper";
import Lightbox from "../Lightbox";
import { formatPrettyDate } from "../../utils/date";
import { ImageOff } from "lucide-react";

type Props = {
  story: StoryEvent[];
};

export default function OurStory({ story }: Props) {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  if (story.length === 0) return null;

  return (
    <SectionWrapper id="story">
      <h2 className="section-heading">Our Story</h2>
      <p className="section-subheading">Every beginning, in order.</p>

      <ol className="relative border-l border-rose-light pl-6 sm:pl-8 space-y-12">
        {story.map((event, i) => (
          <motion.li
            key={`${event.date ?? "undated"}-${i}`}
            className="relative"
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
          >
            <span className="absolute -left-[31px] sm:-left-[39px] top-1 w-3.5 h-3.5 rounded-full bg-rose border-2 border-cream" />
            {event.date && (
              <p className="text-xs uppercase tracking-wide text-gold mb-1">
                {formatPrettyDate(event.date)}
              </p>
            )}
            <h3 className="font-serif text-xl text-wine mb-1.5">{event.title}</h3>
            <p className="text-ink/70 text-sm sm:text-base leading-relaxed mb-3">{event.text}</p>
            {event.images.length > 0 ? (
              <div
                className={`grid gap-4 ${
                  event.images.length > 1 ? "grid-cols-2 max-w-sm" : "grid-cols-1 max-w-xs"
                }`}
              >
                {event.images.map((image, imgIndex) => (
                  <button
                    key={image}
                    type="button"
                    onClick={() => setLightboxSrc(image)}
                    className="polaroid-frame w-full cursor-zoom-in text-left"
                    style={{ transform: `rotate(${imgIndex % 2 === 0 ? -3 : 3}deg)` }}
                    aria-label={`Open photo from ${event.title}`}
                  >
                    <img
                      src={image}
                      alt={event.title}
                      className="w-full aspect-[4/3] object-cover"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            ) : (
              <div className="polaroid-frame w-full max-w-xs">
                <div className="w-full aspect-[4/3] bg-rose-light/25 flex flex-col items-center justify-center gap-2 text-rose-dark/40">
                  <ImageOff className="w-6 h-6" strokeWidth={1.5} />
                  <span className="text-[11px] uppercase tracking-wide">Photo coming</span>
                </div>
              </div>
            )}
          </motion.li>
        ))}
      </ol>

      <Lightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </SectionWrapper>
  );
}
