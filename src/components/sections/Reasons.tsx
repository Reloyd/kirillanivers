import { AnimatePresence, motion } from "framer-motion";
import SectionWrapper from "../SectionWrapper";
import { useRandomReason } from "../../hooks/useRandomReason";
import { Heart } from "lucide-react";

type Props = {
  reasons: string[];
};

export default function Reasons({ reasons }: Props) {
  const { reason, pick } = useRandomReason(reasons);

  if (reasons.length === 0) return null;

  return (
    <SectionWrapper id="reasons">
      <h2 className="section-heading">Reasons I'm grateful for you</h2>
      <p className="section-subheading">{reasons.length} and counting.</p>

      <div className="bg-white/50 rounded-2xl px-6 py-10 sm:px-10 text-center min-h-[180px] flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {reason ? (
            <motion.p
              key={reason}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="font-serif text-xl sm:text-2xl text-wine leading-snug max-w-lg"
            >
              {reason}
            </motion.p>
          ) : (
            <motion.p
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-ink/40 italic"
            >
              Press the button — see where it lands.
            </motion.p>
          )}
        </AnimatePresence>

        <button
          onClick={pick}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-wine text-cream px-6 py-3 text-sm font-medium tracking-wide hover:bg-wine-dark transition-colors"
        >
          <Heart className="w-4 h-4" fill="currentColor" />
          Give me a reason
        </button>
      </div>
    </SectionWrapper>
  );
}
