"use client";

import ScrollReveal from "../ScrollReveal";
import MoonPhaseIcon from "./MoonPhaseIcon";
import type { MoonData, SunData, BirthInput } from "@/lib/types";

function formatDayLength(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m}m`;
}

export default function SkyCard({
  moon,
  sun,
  input,
}: {
  moon: MoonData;
  sun: SunData;
  input: BirthInput;
}) {
  const closerOrFarther = moon.distancePercent < 0 ? "closer" : "farther";
  const pct = Math.abs(moon.distancePercent);

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-24">
      <div className="max-w-2xl mx-auto text-center">
        <ScrollReveal>
          <p className="text-cream/40 uppercase tracking-[0.3em] text-xs mb-4 font-sans">
            The Cosmos
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-cream mb-16">
            The Sky That Night
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="flex flex-col items-center">
            <MoonPhaseIcon phaseAngle={moon.phaseAngle} size="xl" />
            <p className="font-serif text-2xl md:text-3xl text-gold mt-8">
              {moon.phase}
            </p>
            <p className="text-cream/60 text-lg mt-2 font-sans">
              {moon.illumination}% illuminated
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="mt-16 border-t border-cream/10 pt-12">
            <p className="text-cream/50 text-sm uppercase tracking-widest mb-2 font-sans">
              Distance
            </p>
            <p className="font-serif text-xl md:text-2xl text-cream">
              {moon.distanceKm.toLocaleString()} km
            </p>
            <p className="text-cream/40 text-sm mt-2 font-sans">
              {pct}% {closerOrFarther} than average
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <div className="mt-16 grid grid-cols-3 gap-8 border-t border-cream/10 pt-12">
            <div>
              <p className="text-cream/50 text-xs uppercase tracking-widest mb-2 font-sans">
                Sunrise
              </p>
              <p className="font-serif text-lg md:text-xl text-cream">{sun.sunrise}</p>
            </div>
            <div>
              <p className="text-cream/50 text-xs uppercase tracking-widest mb-2 font-sans">
                Day length
              </p>
              <p className="font-serif text-lg md:text-xl text-gold">
                {formatDayLength(sun.dayLengthMinutes)}
              </p>
            </div>
            <div>
              <p className="text-cream/50 text-xs uppercase tracking-widest mb-2 font-sans">
                Sunset
              </p>
              <p className="font-serif text-lg md:text-xl text-cream">{sun.sunset}</p>
            </div>
          </div>
        </ScrollReveal>

        {!input.time && (
          <ScrollReveal delay={0.5}>
            <p className="text-cream/20 text-xs mt-12 font-sans">
              Sun times are approximate local times based on longitude
            </p>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
