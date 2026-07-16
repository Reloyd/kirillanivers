import type { Message } from "../../content";
import SectionWrapper from "../SectionWrapper";
import YouTubeFacade from "../YouTubeFacade";

type Props = {
  message: Message;
  fromName: string;
};

export default function MessageFromMe({ message, fromName }: Props) {
  if (!message) return null;

  return (
    <SectionWrapper id="message">
      <h2 className="section-heading">A message from me</h2>
      <p className="section-subheading">Something I wanted to say directly. — {fromName}</p>

      {message.type === "youtube" && (
        <YouTubeFacade youtubeId={message.src} title="A message from me" />
      )}

      {message.type === "video" && (
        <video controls className="w-full rounded-md shadow-polaroid" preload="metadata">
          <source src={message.src} />
          Your browser doesn't support embedded video.
        </video>
      )}

      {message.type === "audio" && (
        <audio controls className="w-full">
          <source src={message.src} />
          Your browser doesn't support embedded audio.
        </audio>
      )}

      {message.note && <p className="text-ink/60 text-sm mt-4 italic">{message.note}</p>}
    </SectionWrapper>
  );
}
