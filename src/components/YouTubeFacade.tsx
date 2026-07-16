import { useState } from "react";
import { Play } from "lucide-react";

type Props = {
  youtubeId: string;
  title: string;
  autoplayOnClick?: boolean;
  className?: string;
};

/**
 * Click-to-load YouTube embed. Renders a lightweight thumbnail + play
 * button and only mounts the real iframe after a click, so the page
 * doesn't pay the cost of loading multiple YouTube players up front
 * (important on mobile / slower connections).
 */
export default function YouTubeFacade({ youtubeId, title, autoplayOnClick = true, className = "" }: Props) {
  const [loaded, setLoaded] = useState(false);

  if (!youtubeId) {
    return (
      <div
        className={`aspect-video w-full bg-rose-light/20 rounded-md flex items-center justify-center text-rose-dark/50 text-sm ${className}`}
      >
        Video link coming soon
      </div>
    );
  }

  if (loaded) {
    return (
      <div className={`aspect-video w-full rounded-md overflow-hidden shadow-polaroid ${className}`}>
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=${autoplayOnClick ? 1 : 0}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setLoaded(true)}
      className={`group relative aspect-video w-full rounded-md overflow-hidden shadow-polaroid block ${className}`}
      aria-label={`Play ${title}`}
    >
      <img
        src={`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`}
        alt={title}
        className="w-full h-full object-cover"
        loading="lazy"
      />
      <span className="absolute inset-0 bg-ink/25 group-hover:bg-ink/35 transition-colors flex items-center justify-center">
        <span className="w-14 h-14 rounded-full bg-cream/90 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
          <Play className="w-6 h-6 text-wine ml-1" fill="currentColor" />
        </span>
      </span>
    </button>
  );
}
