"use client";

import ScrollReveal from "../ScrollReveal";
import ZenithStarChart from "../art/ZenithStarChart";
import { highlightStarId, patternForStar } from "@/lib/constellationPatterns";
import type { ConstellationData } from "@/lib/types";

export default function ConstellationCard({
  constellations,
}: {
  constellations: ConstellationData;
}) {
  const starName = constellations.zenithStar ?? constellations.prominentStar;
  const constellation =
    constellations.zenithConstellation ??
    constellations.overhead[0] ??
    null;
  const pattern =
    starName && constellation ? patternForStar(starName, constellation) : null;
  const highlightId =
    pattern && starName ? highlightStarId(starName, pattern) : null;

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-24">
      <div className="max-w-2xl mx-auto text-center">
        <ScrollReveal>
          <h2 className="font-serif text-3xl md:text-5xl text-cream mb-4">
            The Stars Above You
          </h2>
          {!constellations.hasExactTime && (
            <p className="text-cream/30 text-xs font-sans mb-12">
              Approximate — based on noon at your birthplace
            </p>
          )}
        </ScrollReveal>

        {starName && (
          <ScrollReveal delay={0.2}>
            <div className="mb-12">
              <p className="text-cream/50 text-xs uppercase tracking-widest mb-3 font-sans">
                Directly overhead
              </p>
              {pattern && (
                <div className="flex justify-center mb-4">
                  <ZenithStarChart
                    pattern={pattern}
                    highlightId={highlightId}
                    className="w-64 h-64 md:w-80 md:h-80"
                  />
                </div>
              )}
              <p className="font-serif text-3xl md:text-4xl text-gold">{starName}</p>
              {constellation && constellation !== starName && (
                <p className="text-lavender/70 text-sm md:text-base mt-2 font-sans">
                  in {constellation}
                </p>
              )}
            </div>
          </ScrollReveal>
        )}

        <ScrollReveal delay={0.3}>
          <div className="border-t border-cream/10 pt-12">
            <p className="text-cream/50 text-xs uppercase tracking-widest mb-6 font-sans">
              Constellations visible in your sky
            </p>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
              {constellations.overhead.map((name) => (
                <span
                  key={name}
                  className="font-serif text-lg md:text-xl text-cream/80"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
