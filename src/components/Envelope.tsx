import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";

type Props = {
  girlName: string;
  fromName: string;
  onOpen: () => void;
};

/**
 * Entry screen: a sealed envelope. Clicking it plays a short open
 * animation, then hands off to the rest of the site via onOpen().
 */
export default function Envelope({ girlName, fromName, onOpen }: Props) {
  const [opening, setOpening] = useState(false);

  const handleClick = () => {
    if (opening) return;
    setOpening(true);
    setTimeout(onOpen, 1100);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-cream px-6 text-center">
      <AnimatePresence>
        {!opening && (
          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-rose-dark/70 text-sm tracking-wide uppercase mb-6"
          >
            For {girlName}
          </motion.p>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={handleClick}
        aria-label="Open your gift"
        className="relative w-64 sm:w-72 focus:outline-none"
        animate={opening ? { scale: 0.94, opacity: 0 } : { scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: opening ? 0.4 : 0 }}
      >
        <motion.div
          className="relative w-full aspect-[4/3]"
          animate={!opening ? { y: [0, -6, 0] } : {}}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Envelope body */}
          <div className="absolute inset-0 bg-rose-light/70 rounded-md shadow-polaroid border border-rose-dark/10" />
          {/* Envelope flap */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-1/2 origin-top bg-rose-dark/80 rounded-t-md"
            style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
            animate={opening ? { rotateX: 180 } : { rotateX: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          />
          {/* Wax seal */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-wine flex items-center justify-center shadow-md z-10"
            animate={opening ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Heart className="w-5 h-5 text-cream" fill="currentColor" />
          </motion.div>
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {!opening && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 text-ink/50 text-sm"
          >
            tap to open — {fromName}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
