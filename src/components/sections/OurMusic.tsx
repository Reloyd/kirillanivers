import { useState } from "react";
import type { Content } from "../../content";
import SectionWrapper from "../SectionWrapper";
import YouTubeFacade from "../YouTubeFacade";
import { Music2 } from "lucide-react";

type Props = {
  music: Content["music"];
};

export default function OurMusic({ music }: Props) {
  const { featured, playlist } = music;
  const [activeId, setActiveId] = useState<string | null>(null);

  const hasTracks = playlist.tracks.some((t) => t.youtubeId);

  return (
    <SectionWrapper id="music">
      <h2 className="section-heading">Our Music</h2>
      <p className="section-subheading">The song that started it, and the ones that followed.</p>

      {/* Featured track */}
      <div className="mb-14">
        <YouTubeFacade youtubeId={featured.youtubeId} title={featured.title} />
        <h3 className="font-serif text-2xl text-wine mt-4">{featured.title}</h3>
        <p className="text-ink/70 text-sm sm:text-base leading-relaxed mt-2">{featured.note}</p>
      </div>

      {/* Playlist */}
      {hasTracks ? (
        <div>
          <h3 className="font-serif text-lg text-wine mb-3 flex items-center gap-2">
            <Music2 className="w-4 h-4" /> Our playlist
          </h3>

          {activeId && (
            <div className="mb-4">
              <YouTubeFacade youtubeId={activeId} title="Now playing" autoplayOnClick />
            </div>
          )}

          <ul className="divide-y divide-rose-light/50 rounded-lg overflow-hidden border border-rose-light/50">
            {playlist.tracks
              .filter((t) => t.youtubeId)
              .map((track) => (
                <li key={track.youtubeId}>
                  <button
                    onClick={() => setActiveId(track.youtubeId)}
                    className={`w-full flex items-center justify-between gap-3 px-4 py-3 text-left hover:bg-rose-light/15 transition-colors ${
                      activeId === track.youtubeId ? "bg-rose-light/25" : ""
                    }`}
                  >
                    <span>
                      <span className="block text-sm font-medium text-ink">{track.title}</span>
                      <span className="block text-xs text-ink/50">{track.artist}</span>
                    </span>
                    <Music2 className="w-4 h-4 text-rose-dark shrink-0" />
                  </button>
                </li>
              ))}
          </ul>
        </div>
      ) : playlist.youtubePlaylistId ? (
        <div className="aspect-video w-full rounded-md overflow-hidden shadow-polaroid">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/videoseries?list=${playlist.youtubePlaylistId}`}
            title="Our playlist"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : null}
    </SectionWrapper>
  );
}
