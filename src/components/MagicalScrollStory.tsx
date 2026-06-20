"use client";

import ScrollReveal from "./ScrollReveal";
import MagicalHeader from "./MagicalHeader";
import { MagicalInitial } from "./art/MagicalDecor";
import MagicalCultureScroll, { MagicalScrollClosing } from "./MagicalCultureScroll";
import SkyCard from "./cards/SkyCard";
import ConstellationCard from "./cards/ConstellationCard";
import ZodiacCard from "./cards/ZodiacCard";
import SymbolsCard from "./cards/SymbolsCard";
import NumbersCard from "./cards/NumbersCard";
import EclipseCard from "./cards/EclipseCard";
import HistoryCard from "./cards/HistoryCard";
import PlaceCard from "./cards/PlaceCard";
import type { MagicalBentoProps } from "./MagicalBentoGrid";

export default function MagicalScrollStory({
  input,
  moon,
  sun,
  zodiac,
  symbols,
  numbers,
  constellations,
  eclipses,
  culture,
  history,
  place,
  apiLoading = false,
  apiFailed = false,
}: MagicalBentoProps) {
  const d = new Date(input.date + "T12:00:00");
  const formatted = d.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

  const nameInitial = input.name.trim().charAt(0).toUpperCase();

  return (
    <div className="scroll-story-root relative w-full">
      <div className="fixed top-4 left-3 md:top-6 md:left-6 z-30 pointer-events-none">
        <MagicalInitial initial={nameInitial} />
      </div>

      <section className="min-h-screen flex flex-col items-center justify-center px-4 pt-16 pb-12">
        <MagicalHeader name={input.name} formatted={formatted} city={input.city} />
        <ScrollReveal delay={0.3}>
          <p className="scroll-hint text-lavender/50 text-xs tracking-[0.35em] uppercase font-sans mt-8 flex flex-col items-center gap-2">
            <span>scroll to explore your universe</span>
            <span className="text-lg animate-pulse">✦</span>
          </p>
        </ScrollReveal>
      </section>

      <SkyCard moon={moon} sun={sun} input={input} />
      <ConstellationCard constellations={constellations} />
      <ZodiacCard zodiac={zodiac} />
      <SymbolsCard symbols={symbols} />
      <NumbersCard numbers={numbers} birthDate={input.date} />
      <EclipseCard eclipses={eclipses} />

      <MagicalCultureScroll
        culture={culture}
        loading={apiLoading}
        failed={apiFailed}
        city={input.city}
      />

      <HistoryCard history={history} loading={apiLoading} />
      <PlaceCard place={place} loading={apiLoading} input={input} />

      <MagicalScrollClosing
        name={input.name}
        formatted={formatted}
        worldPopulationAdded={numbers.worldPopulationAdded}
      />
    </div>
  );
}
