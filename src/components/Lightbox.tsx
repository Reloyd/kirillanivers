import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

type Props = {
  src: string | null;
  alt?: string;
  onClose: () => void;
};

/**
 * Full-screen photo viewer. Pass the currently selected image src (or null
 * to keep it closed) — used by sections where photos are shown small
 * (polaroids, timeline images) so they can still be seen at full size.
 */
export default function Lightbox({ src, alt, onClose }: Props) {
  return (
    <AnimatePresence>
      {src && (
        <motion.div
          className="fixed inset-0 z-[60] bg-ink/85 flex items-center justify-center p-4 sm:p-8 cursor-zoom-out"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.img
            src={src}
            alt={alt ?? ""}
            className="max-w-full max-h-full rounded-md shadow-2xl cursor-default"
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full bg-cream/90 flex items-center justify-center shadow-lg"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-wine" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
