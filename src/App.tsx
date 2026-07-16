import { useState } from "react";
import { content } from "./content";
import Nav from "./components/Nav";
import Envelope from "./components/Envelope";
import RevealCountdown from "./components/RevealCountdown";
import Closing from "./components/Closing";
import OurStory from "./components/sections/OurStory";
import CallGallery from "./components/sections/CallGallery";
import OurMusic from "./components/sections/OurMusic";
import TimeTogether from "./components/sections/TimeTogether";
import Reasons from "./components/sections/Reasons";
import TheDistance from "./components/sections/TheDistance";
import FutureMemories from "./components/sections/FutureMemories";
import OurDreams from "./components/sections/OurDreams";
import MessageFromMe from "./components/sections/MessageFromMe";

export default function App() {
  const { meta } = content;

  // Gate-countdown: only relevant while reveal.enabled is true and the
  // target date hasn't passed yet. Off by default per the brief.
  const [gatePassed, setGatePassed] = useState(
    !meta.reveal.enabled || new Date() >= new Date(meta.reveal.at)
  );
  const [entered, setEntered] = useState(false);

  if (!gatePassed) {
    return (
      <RevealCountdown
        targetAt={meta.reveal.at}
        girlName={meta.girlName}
        onReached={() => setGatePassed(true)}
      />
    );
  }

  if (!entered) {
    return <Envelope girlName={meta.girlName} fromName={meta.fromName} onOpen={() => setEntered(true)} />;
  }

  return (
    <div className="min-h-screen">
      <Nav hiddenIds={content.message ? [] : ["message"]} />
      <main className="md:pl-20 lg:pl-56">
        <OurStory story={content.story} />
        <CallGallery callGallery={content.callGallery} />
        <OurMusic music={content.music} />
        <TimeTogether startedAt={meta.startedAt} />
        <Reasons reasons={content.reasons} />
        <TheDistance places={content.places} />
        <FutureMemories futureMemories={content.futureMemories} />
        <OurDreams dreams={content.dreams} />
        <MessageFromMe message={content.message} fromName={meta.fromName} />
        <Closing girlName={meta.closingName ?? meta.girlName} fromName={meta.fromName} />
      </main>
    </div>
  );
}
