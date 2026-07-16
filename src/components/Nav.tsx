import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookHeart, Disc3, Clock3, Heart, MapPinned, Camera, Sparkles, Mail, Menu, X } from "lucide-react";

export type NavItem = {
  id: string;
  label: string;
  icon: typeof BookHeart;
};

export const NAV_ITEMS: NavItem[] = [
  { id: "story", label: "Our Story", icon: BookHeart },
  { id: "music", label: "Our Music", icon: Disc3 },
  { id: "time", label: "Time Together", icon: Clock3 },
  { id: "reasons", label: "Reasons", icon: Heart },
  { id: "distance", label: "The Distance", icon: MapPinned },
  { id: "future", label: "Future Memories", icon: Camera },
  { id: "dreams", label: "Our Dreams", icon: Sparkles },
  { id: "message", label: "A Message", icon: Mail },
];

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [ids]);

  return active;
}

type NavProps = {
  // ids of sections that are hidden right now (e.g. "message" when
  // content.message is null) — filtered out of the menu so it never
  // links to a section that doesn't exist on the page.
  hiddenIds?: string[];
};

export default function Nav({ hiddenIds = [] }: NavProps) {
  const items = NAV_ITEMS.filter((item) => !hiddenIds.includes(item.id));
  const ids = items.map((i) => i.id);
  const active = useActiveSection(ids);
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileOpen(false);
  };

  return (
    <>
      {/* Desktop sidebar */}
      <nav className="hidden md:flex flex-col gap-1 fixed left-0 top-0 h-screen w-20 lg:w-56 py-8 px-2 lg:px-4 z-40 bg-cream/80 backdrop-blur-sm border-r border-rose-light/40">
        <div className="mb-8 px-2 lg:px-2 hidden lg:block">
          <p className="font-serif text-wine text-lg leading-tight">La Vie en Rose</p>
        </div>
        {items.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            className={`group flex items-center gap-3 rounded-full px-3 py-2.5 transition-colors text-left ${
              active === id ? "bg-rose-light/40 text-wine" : "text-ink/50 hover:bg-rose-light/20 hover:text-wine"
            }`}
            aria-current={active === id}
          >
            <Icon className="w-5 h-5 shrink-0" strokeWidth={1.75} />
            <span className="hidden lg:inline text-sm font-medium">{label}</span>
          </button>
        ))}
      </nav>

      {/* Mobile bottom bar trigger */}
      <div className="md:hidden fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setMobileOpen((o) => !o)}
          className="w-12 h-12 rounded-full bg-wine text-cream shadow-lg flex items-center justify-center"
          aria-label="Open menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.25 }}
            className="md:hidden fixed bottom-20 right-4 z-50 bg-cream shadow-xl rounded-2xl border border-rose-light/40 p-2 flex flex-col gap-1 max-h-[60vh] overflow-y-auto"
          >
            {items.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-left whitespace-nowrap ${
                  active === id ? "bg-rose-light/40 text-wine" : "text-ink/60"
                }`}
              >
                <Icon className="w-4 h-4" strokeWidth={1.75} />
                <span className="text-sm font-medium">{label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
