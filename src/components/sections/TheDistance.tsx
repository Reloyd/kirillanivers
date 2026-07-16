import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { Content } from "../../content";
import SectionWrapper from "../SectionWrapper";
import { MapPin } from "lucide-react";

type Props = {
  places: Content["places"];
};

const WIDTH = 640;
const HEIGHT = 460;
const PAD = 90;

function haversineKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) ** 2 + Math.sin(dLng / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  return Math.round(2 * R * Math.asin(Math.sqrt(h)));
}

export default function TheDistance({ places }: Props) {
  const [active, setActive] = useState<"from" | "to" | null>(null);
  const km = haversineKm(places.from, places.to);

  // Project the two points into a fixed, generously padded viewBox so the
  // illustration always fills the card nicely, regardless of which two
  // cities are configured. This is a stylized "globe", not a literal map.
  const { from, to, globeCenter, globeRadius } = useMemo(() => {
    const latSpan = Math.max(Math.abs(places.from.lat - places.to.lat), 1);
    const lngSpan = Math.max(Math.abs(places.from.lng - places.to.lng), 1);
    const minLat = Math.min(places.from.lat, places.to.lat) - latSpan * 0.5;
    const maxLat = Math.max(places.from.lat, places.to.lat) + latSpan * 0.5;
    const minLng = Math.min(places.from.lng, places.to.lng) - lngSpan * 0.5;
    const maxLng = Math.max(places.from.lng, places.to.lng) + lngSpan * 0.5;

    const project = (lat: number, lng: number) => ({
      x: PAD + ((lng - minLng) / (maxLng - minLng)) * (WIDTH - 2 * PAD),
      y: PAD + ((maxLat - lat) / (maxLat - minLat)) * (HEIGHT - 2 * PAD),
    });

    return {
      from: project(places.from.lat, places.from.lng),
      to: project(places.to.lat, places.to.lng),
      globeCenter: { x: WIDTH / 2, y: HEIGHT / 2 },
      globeRadius: Math.min(WIDTH, HEIGHT) / 2 - 24,
    };
  }, [places]);

  const midX = (from.x + to.x) / 2 - (to.y - from.y) * 0.18;
  const midY = (from.y + to.y) / 2 + (to.x - from.x) * 0.18;
  const path = `M ${from.x} ${from.y} Q ${midX} ${midY} ${to.x} ${to.y}`;

  const activePlace = active === "from" ? places.from : active === "to" ? places.to : null;

  return (
    <SectionWrapper id="distance">
      <h2 className="section-heading">The Distance</h2>
      <p className="section-subheading">{km.toLocaleString("en-US")} km apart, and it's never mattered less.</p>

      <div className="relative w-full bg-white/60 rounded-2xl p-3 sm:p-6 overflow-hidden border border-rose-light/40">
        <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="w-full h-auto">
          <defs>
            <radialGradient id="globeFill" cx="50%" cy="42%" r="65%">
              <stop offset="0%" stopColor="#F3EAE0" />
              <stop offset="100%" stopColor="#E8C4C4" stopOpacity="0.35" />
            </radialGradient>
          </defs>

          {/* Stylized globe */}
          <circle cx={globeCenter.x} cy={globeCenter.y} r={globeRadius} fill="url(#globeFill)" />
          <circle cx={globeCenter.x} cy={globeCenter.y} r={globeRadius} fill="none" stroke="#C9A96A" strokeOpacity="0.35" strokeWidth="1.5" />
          {/* meridians — nested vertical ellipses to suggest globe curvature */}
          {[0.55, 0.85].map((f) => (
            <ellipse
              key={f}
              cx={globeCenter.x}
              cy={globeCenter.y}
              rx={globeRadius * f}
              ry={globeRadius}
              fill="none"
              stroke="#C98A93"
              strokeOpacity="0.18"
              strokeWidth="1"
            />
          ))}
          {/* parallels */}
          {[0.33, 0.66].map((f) => (
            <ellipse
              key={f}
              cx={globeCenter.x}
              cy={globeCenter.y - globeRadius + globeRadius * 2 * f}
              rx={globeRadius * Math.sin(Math.PI * f)}
              ry={globeRadius * 0.14}
              fill="none"
              stroke="#C98A93"
              strokeOpacity="0.18"
              strokeWidth="1"
            />
          ))}

          <path id="distance-arc" d={path} fill="none" stroke="none" />

          <motion.path
            d={path}
            fill="none"
            stroke="#C9A96A"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="7 7"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
          />

          {/* a little pulse traveling along the arc, like a message crossing the distance */}
          <circle r="5" fill="#6E2A3A">
            <animateMotion dur="3.5s" repeatCount="indefinite" rotate="auto">
              <mpath href="#distance-arc" />
            </animateMotion>
          </circle>

          {[
            { p: from, key: "from" as const, place: places.from },
            { p: to, key: "to" as const, place: places.to },
          ].map(({ p, key, place }) => (
            <g
              key={key}
              transform={`translate(${p.x}, ${p.y})`}
              onClick={() => setActive(active === key ? null : key)}
              className="cursor-pointer"
            >
              <circle r="16" fill="#6E2A3A" opacity="0.12" />
              <circle r="7" fill="#6E2A3A" stroke="#FBF6EF" strokeWidth="2.5" />

              {/* label pill */}
              <g transform="translate(0, -20)">
                <rect
                  x={-(place.label.length * 3.6 + 12)}
                  y={-16}
                  width={place.label.length * 7.2 + 24}
                  height={24}
                  rx={12}
                  fill="#FBF6EF"
                  stroke="#E8C4C4"
                  strokeWidth="1"
                />
                <text
                  x="0"
                  y="0"
                  textAnchor="middle"
                  fontSize="13"
                  fill="#4E1D29"
                  className="font-serif select-none"
                >
                  {place.label}
                </text>
              </g>
            </g>
          ))}
        </svg>

        {activePlace && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-1 flex items-center gap-2 text-sm text-ink/70 justify-center"
          >
            <MapPin className="w-4 h-4 text-wine shrink-0" />
            <span>
              <strong className="text-wine">{activePlace.label}</strong>
              {activePlace.fact ? ` — ${activePlace.fact}` : ""}
            </span>
          </motion.div>
        )}
      </div>
    </SectionWrapper>
  );
}
