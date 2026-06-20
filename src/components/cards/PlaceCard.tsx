"use client";

import ScrollReveal from "../ScrollReveal";
import type { PlaceData, BirthInput } from "@/lib/types";

function Shimmer() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-6 bg-cream/5 rounded w-3/4 mx-auto" />
      <div className="h-4 bg-cream/5 rounded w-1/2 mx-auto" />
      <div className="h-6 bg-cream/5 rounded w-2/3 mx-auto mt-8" />
    </div>
  );
}

export default function PlaceCard({
  place,
  loading,
  input,
}: {
  place: PlaceData | null;
  loading: boolean;
  input: BirthInput;
}) {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-24">
      <div className="max-w-2xl mx-auto text-center">
        <ScrollReveal>
          <p className="text-cream/40 uppercase tracking-[0.3em] text-xs mb-4 font-sans">
            Your City
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-cream mb-16">
            {input.city}
          </h2>
        </ScrollReveal>

        {loading ? (
          <ScrollReveal delay={0.2}>
            <Shimmer />
            <p className="text-cream/30 text-xs mt-8 font-sans">
              Researching the archives...
            </p>
          </ScrollReveal>
        ) : place ? (
          <>
            <ScrollReveal delay={0.2}>
              <div className="mb-12">
                <p className="text-cream/50 text-xs uppercase tracking-widest mb-3 font-sans">
                  Weather That Day
                </p>
                <p className="font-serif text-xl md:text-2xl text-cream">
                  {place.weather}
                </p>
              </div>
            </ScrollReveal>

            {place.headline && place.headline !== "Unknown" && (
              <ScrollReveal delay={0.3}>
                <div className="mb-12 border-t border-cream/10 pt-12">
                  <p className="text-cream/50 text-xs uppercase tracking-widest mb-3 font-sans">
                    Headline That Day
                  </p>
                  <p className="font-serif text-lg md:text-xl text-cream/90 leading-relaxed italic">
                    &ldquo;{place.headline}&rdquo;
                  </p>
                </div>
              </ScrollReveal>
            )}

            <ScrollReveal delay={0.4}>
              <div className="grid grid-cols-2 gap-8 border-t border-cream/10 pt-12">
                <div>
                  <p className="text-cream/50 text-xs uppercase tracking-widest mb-2 font-sans">
                    City population then
                  </p>
                  <p className="font-serif text-xl md:text-2xl text-cream">
                    {place.cityPopulationThen}
                  </p>
                </div>
                <div>
                  <p className="text-cream/50 text-xs uppercase tracking-widest mb-2 font-sans">
                    City population now
                  </p>
                  <p className="font-serif text-xl md:text-2xl text-gold">
                    {place.cityPopulationNow}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </>
        ) : (
          <ScrollReveal delay={0.2}>
            <p className="text-cream/30 font-sans">
              Could not retrieve place data for this city and date.
            </p>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
