"use client";

import ScrollReveal from "../ScrollReveal";
import type { CultureData } from "@/lib/types";

function Shimmer() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-6 bg-cream/5 rounded w-3/4 mx-auto" />
      <div className="h-4 bg-cream/5 rounded w-1/2 mx-auto" />
      <div className="h-6 bg-cream/5 rounded w-2/3 mx-auto mt-8" />
      <div className="h-4 bg-cream/5 rounded w-1/2 mx-auto" />
    </div>
  );
}

export default function CultureCard({
  culture,
  loading,
}: {
  culture: CultureData | null;
  loading: boolean;
}) {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-24">
      <div className="max-w-2xl mx-auto text-center">
        <ScrollReveal>
          <p className="text-cream/40 uppercase tracking-[0.3em] text-xs mb-4 font-sans">
            The Culture
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-cream mb-16">
            The Charts That Week
          </h2>
        </ScrollReveal>

        {loading ? (
          <ScrollReveal delay={0.2}>
            <Shimmer />
            <p className="text-cream/30 text-xs mt-8 font-sans">
              Searching the archives...
            </p>
          </ScrollReveal>
        ) : culture ? (
          <>
            <ScrollReveal delay={0.2}>
              <div className="mb-16">
                <p className="text-cream/50 text-xs uppercase tracking-widest mb-4 font-sans">
                  #1 Song
                </p>
                <p className="font-serif text-2xl md:text-4xl text-gold">
                  &ldquo;{culture.song}&rdquo;
                </p>
                <p className="text-cream/60 text-lg mt-2 font-sans">
                  {culture.songArtist}
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-cream/10 pt-12">
                <div>
                  <p className="text-cream/50 text-xs uppercase tracking-widest mb-4 font-sans">
                    #1 at the Box Office
                  </p>
                  <p className="font-serif text-xl md:text-2xl text-cream">
                    {culture.hollywoodMovie}
                  </p>
                </div>
                <div>
                  <p className="text-cream/50 text-xs uppercase tracking-widest mb-4 font-sans">
                    #1 in Bollywood
                  </p>
                  <p className="font-serif text-xl md:text-2xl text-cream">
                    {culture.bollywoodMovie}
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {culture.bestsellingBook && culture.bestsellingBook !== "Unknown" && (
              <ScrollReveal delay={0.4}>
                <div className="border-t border-cream/10 pt-12 mt-12">
                  <p className="text-cream/50 text-xs uppercase tracking-widest mb-4 font-sans">
                    Bestselling Book
                  </p>
                  <p className="font-serif text-xl md:text-2xl text-cream italic">
                    {culture.bestsellingBook}
                  </p>
                  <p className="text-cream/50 text-sm mt-2 font-sans">
                    {culture.bestsellingBookAuthor}
                  </p>
                </div>
              </ScrollReveal>
            )}

            {culture.ghazal && culture.ghazal !== "Unknown" && (
              <ScrollReveal delay={0.5}>
                <div className="border-t border-cream/10 pt-12 mt-12">
                  <p className="text-cream/50 text-xs uppercase tracking-widest mb-6 font-sans">
                    A Sher From That Era
                  </p>
                  <p className="font-serif text-lg md:text-xl text-gold/90 leading-relaxed italic">
                    &ldquo;{culture.ghazal}&rdquo;
                  </p>
                  <p className="text-cream/50 text-sm mt-3 font-sans">
                    — {culture.ghazalPoet}
                  </p>
                </div>
              </ScrollReveal>
            )}
          </>
        ) : (
          <ScrollReveal delay={0.2}>
            <p className="text-cream/30 font-sans">
              Could not retrieve chart data for this date.
            </p>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
