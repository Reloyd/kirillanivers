import { Heart } from "lucide-react";

type Props = {
  girlName: string;
  fromName: string;
};

export default function Closing({ girlName, fromName }: Props) {
  return (
    <section className="w-full px-6 py-24 sm:py-32 text-center flex flex-col items-center gap-4">
      <Heart className="w-8 h-8 text-rose" fill="currentColor" />
      <h2 className="font-serif text-2xl sm:text-3xl text-wine max-w-md">
        Happy anniversary, {girlName}.
      </h2>
      <p className="text-ink/60 max-w-sm text-sm sm:text-base leading-relaxed">
        Here's to everything that's already ours, and everything that hasn't happened yet.
      </p>
      <p className="text-ink/40 text-sm mt-2">— {fromName}</p>
    </section>
  );
}
