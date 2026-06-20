"use client";

import ScrollReveal from "./ScrollReveal";
import CultureCover from "./CultureCover";
import { ArchiveMarqueeBanner, MagicalArchiveLoader } from "./ArchiveScrollLoader";
import { Sparkle } from "./art/MagicalDecor";
import type { CultureData } from "@/lib/types";

function CultureCoverGrid({ culture }: { culture: CultureData }) {
  return (
    <div className="culture-cover-grid-scroll">
      <CultureCover
        size="lg"
        title={`${culture.song} · ${culture.songArtist}`}
        coverUrl={culture.songArtworkUrl}
        label="#1 Song"
      />
      <CultureCover
        size="lg"
        title={culture.hollywoodMovie}
        coverUrl={culture.hollywoodPosterUrl}
        label="Hollywood"
      />
      <CultureCover
        size="lg"
        title={culture.bollywoodMovie}
        coverUrl={culture.bollywoodPosterUrl}
        label="Bollywood"
      />
      <CultureCover
        size="lg"
        title={culture.bestsellingBook}
        coverUrl={culture.bookCoverUrl}
        label="Bestseller"
      />
    </div>
  );
}

export default function MagicalCultureScroll({
  culture,
  loading,
  failed,
  city,
}: {
  culture: CultureData | null;
  loading: boolean;
  failed: boolean;
  city: string;
}) {
  return (
    <section className="scroll-magic-section px-6 py-24">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <p className="text-lavender/70 uppercase tracking-[0.3em] text-xs mb-4 font-sans text-center">
            That week in culture
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-gradient-magic magic-title-glow text-center mb-4">
            The charts remembered you
          </h2>
          <p className="text-cream/50 text-sm md:text-base font-serif italic text-center mb-12">
            the song, screens, and shelves from your very first week
          </p>
        </ScrollReveal>

        {loading ? (
          <ScrollReveal delay={0.15}>
            <div className="magic-tile magic-tile-pink p-6 md:p-8 rounded-[1.35rem]">
              <ArchiveMarqueeBanner city={city} />
              <div className="mt-6">
                <MagicalArchiveLoader variant="culture" city={city} />
              </div>
            </div>
          </ScrollReveal>
        ) : culture?.song ? (
          <>
            <ScrollReveal delay={0.15}>
              <CultureCoverGrid culture={culture} />
            </ScrollReveal>

            {culture.ghazal && culture.ghazal !== "Unknown" && (
              <ScrollReveal delay={0.35}>
                <div className="magic-tile magic-tile-violet p-6 md:p-10 rounded-[1.35rem] mt-10 text-center">
                  <p className="magic-tile-label mb-4">A sher from that era</p>
                  <p className="font-serif text-lg md:text-xl text-cream/90 leading-relaxed italic">
                    &ldquo;{culture.ghazal}&rdquo;
                  </p>
                  <p className="text-cream/50 text-sm mt-4 font-sans">— {culture.ghazalPoet}</p>
                </div>
              </ScrollReveal>
            )}
          </>
        ) : (
          <ScrollReveal delay={0.15}>
            <p className="text-cream/50 text-sm italic text-center font-serif">
              {failed
                ? "The archives are quiet right now — scroll on, the stars still have plenty to say."
                : "Couldn't reach the archives this time."}
            </p>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}

export function MagicalScrollClosing({
  name,
  formatted,
  worldPopulationAdded,
}: {
  name: string;
  formatted: string;
  worldPopulationAdded: string;
}) {
  return (
    <section className="scroll-magic-section min-h-[70vh] flex items-center justify-center px-6 py-24 pb-32">
      <div className="max-w-2xl mx-auto text-center">
        <ScrollReveal>
          <p className="text-gradient-gold-shimmer uppercase tracking-[0.35em] text-xs mb-6 font-sans flex items-center justify-center gap-2">
            <Sparkle className="w-3 h-3 text-pink/70" />
            the world grew
            <Sparkle className="w-3 h-3 text-pink/70" />
          </p>
          <p className="font-serif text-4xl md:text-5xl text-gold mb-3">
            +{worldPopulationAdded}
          </p>
          <p className="text-theme-light text-sm md:text-base font-serif italic leading-relaxed">
            since you arrived — and the universe made you
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="mt-16 pt-12 border-t border-lavender/15">
            <p className="font-serif text-2xl md:text-3xl text-cream/90 leading-relaxed">
              {formatted}
            </p>
            <p className="text-lavender/75 text-base md:text-lg mt-6 font-serif italic">
              the day the world got a little brighter — hello, {name}.
            </p>
            <p className="text-cream/40 text-xs mt-10 font-sans tracking-wide">
              tap save below for your bento summary card ✨
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
