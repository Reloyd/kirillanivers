import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import type { ReactNode } from "react";

type Props = {
  image: string | null;
  caption: string;
  date?: string;
  rotate?: number;
  placeholderIcon?: ReactNode;
};

/**
 * A single polaroid-style frame. If `image` is null, shows a soft
 * "coming soon" placeholder instead of breaking the layout — this is how
 * Future Memories and unfilled Story entries stay intact before Kirill
 * adds real photos.
 */
export default function Polaroid({ image, caption, date, rotate = -3, placeholderIcon }: Props) {
  return (
    <motion.div
      className="polaroid-frame w-full max-w-[220px] mx-auto cursor-default select-none"
      style={{ rotate: `${rotate}deg` }}
      whileHover={{ rotate: 0, scale: 1.04 }}
      whileTap={{ rotate: 0, scale: 1.04 }}
      transition={{ type: "spring", stiffness: 220, damping: 16 }}
    >
      <div className="aspect-square w-full bg-rose-light/30 overflow-hidden flex items-center justify-center">
        {image ? (
          <img src={image} alt={caption} className="w-full h-full object-cover" loading="lazy" />
        ) : (
          <div className="flex flex-col items-center gap-2 text-rose-dark/50">
            {placeholderIcon ?? <Heart className="w-7 h-7" strokeWidth={1.5} />}
            <span className="text-[11px] uppercase tracking-wide">Coming soon</span>
          </div>
        )}
      </div>
      <p className="mt-3 text-center font-serif text-sm text-ink/80">{caption}</p>
      {date && <p className="text-center text-[11px] text-ink/40 mt-0.5">{date}</p>}
    </motion.div>
  );
}
