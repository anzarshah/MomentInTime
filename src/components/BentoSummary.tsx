"use client";

import type {
  BirthInput,
  BirthSymbolsData,
  CultureData,
  HistoryData,
  MoonData,
  NumbersData,
  PlaceData,
  ZodiacData,
} from "@/lib/types";

export interface BentoSummaryProps {
  input: BirthInput;
  moon: MoonData;
  zodiac: ZodiacData;
  symbols: BirthSymbolsData;
  numbers: NumbersData;
  culture: CultureData | null;
  history: HistoryData | null;
  place: PlaceData | null;
}

function BentoTile({
  className = "",
  label,
  children,
  accent = "lavender",
}: {
  className?: string;
  label: string;
  children: React.ReactNode;
  accent?: "lavender" | "pink" | "honey";
}) {
  const accents = {
    lavender: "from-lavender/25 to-white/5 border-lavender/30",
    pink: "from-pink/25 to-white/5 border-pink/30",
    honey: "from-gold/25 to-white/5 border-gold/40",
  };

  return (
    <div
      className={`rounded-[20px] border bg-gradient-to-br p-4 flex flex-col ${accents[accent]} ${className}`}
    >
      <p className="text-[10px] uppercase tracking-[0.2em] text-cream/50 font-sans mb-2">
        {label}
      </p>
      <div className="flex-1 flex flex-col justify-center">{children}</div>
    </div>
  );
}

export default function BentoSummary({
  input,
  moon,
  zodiac,
  symbols,
  numbers,
  culture,
  history,
  place,
}: BentoSummaryProps) {
  const d = new Date(input.date + "T12:00:00");
  const formatted = d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });

  const totalEclipses =
    numbers.solarEclipsesSinceBirth + numbers.lunarEclipsesSinceBirth;

  return (
    <div className="bento-export-root">
      <div
        id="bento-summary"
        className="relative overflow-hidden"
        style={{ width: 1080, height: 1350 }}
      >
        {/* Background */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(145deg, #1e1033 0%, #3a1f5c 40%, #2d1854 70%, #1a0f2e 100%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(circle at 15% 10%, rgba(255,184,217,0.25) 0%, transparent 40%), radial-gradient(circle at 85% 85%, rgba(255,200,87,0.15) 0%, transparent 35%)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 p-10 h-full flex flex-col">
          {/* Header */}
          <div className="text-center mb-8">
            <p className="font-display text-gold text-lg tracking-wide mb-1">
              ✨ Moment in Time ✨
            </p>
            <h1 className="font-serif text-4xl text-cream leading-tight">
              {input.name}&apos;s universe
            </h1>
            <p className="text-lavender/90 text-sm mt-2 font-sans">{formatted}</p>
            <p className="text-cream/50 text-sm font-sans">{input.city}</p>
          </div>

          {/* Bento grid */}
          <div className="grid grid-cols-4 auto-rows-fr gap-3 flex-1 min-h-0">
            {/* Row 1-2: Moon hero */}
            <BentoTile
              className="col-span-2 row-span-2"
              label="The sky that night"
              accent="honey"
            >
              <p className="font-serif text-3xl text-gold leading-snug">{moon.phase}</p>
              <p className="text-cream/70 text-sm mt-2 font-sans">
                {moon.illumination}% lit · {moon.distanceKm.toLocaleString()} km away
              </p>
            </BentoTile>

            {/* Zodiac */}
            <BentoTile className="col-span-1 row-span-1" label="Sun sign" accent="pink">
              <p className="font-serif text-2xl text-cream">{zodiac.sunSign}</p>
            </BentoTile>

            <BentoTile className="col-span-1 row-span-1" label="Chinese zodiac" accent="lavender">
              <p className="font-serif text-xl text-gold">
                {zodiac.chineseZodiac}
              </p>
              <p className="text-cream/50 text-xs mt-1">{zodiac.chineseElement}</p>
            </BentoTile>

            {/* Moon/rising if available */}
            <BentoTile className="col-span-2 row-span-1" label="Stars" accent="lavender">
              {zodiac.hasExactTime && zodiac.moonSign ? (
                <p className="font-serif text-lg text-cream">
                  Moon in {zodiac.moonSign}
                  {zodiac.risingSign ? ` · Rising ${zodiac.risingSign}` : ""}
                </p>
              ) : (
                <p className="font-serif text-lg text-cream/60 italic">
                  Born under {zodiac.sunSign}
                </p>
              )}
            </BentoTile>

            {/* Symbols row */}
            <BentoTile label="Stone" accent="pink">
              <p className="font-serif text-lg text-gold">{symbols.stone.name}</p>
            </BentoTile>
            <BentoTile label="Flower" accent="lavender">
              <p className="font-serif text-lg text-gold">{symbols.flower.name}</p>
            </BentoTile>
            <BentoTile label="Tree" accent="honey">
              <p className="font-serif text-lg text-gold">{symbols.tree.name}</p>
            </BentoTile>

            {/* Life numbers */}
            <BentoTile label="Life" accent="pink">
              <p className="font-serif text-2xl text-cream">{numbers.ageYears}</p>
              <p className="text-cream/50 text-xs">years · {numbers.seasonsLived} seasons</p>
            </BentoTile>

            <BentoTile label="Little extras" accent="lavender">
              <p className="text-cream text-sm font-sans leading-relaxed">
                {numbers.leapYearsLived} leap years · {totalEclipses} eclipses ·{" "}
                {numbers.fullMoonsSince.toLocaleString()} full moons
              </p>
            </BentoTile>

            <BentoTile className="col-span-2" label="Breaths & heartbeats" accent="honey">
              <p className="font-serif text-xl text-cream">
                {numbers.ageBreaths.toLocaleString()} breaths
              </p>
              <p className="text-cream/60 text-sm mt-1">
                {numbers.ageHeartbeats.toLocaleString()} heartbeats and counting
              </p>
            </BentoTile>

            {/* Culture / history wide */}
            <BentoTile className="col-span-2" label="That week in culture" accent="pink">
              {culture?.song ? (
                <>
                  <p className="font-serif text-lg text-gold leading-snug">
                    &ldquo;{culture.song}&rdquo;
                  </p>
                  <p className="text-cream/60 text-xs mt-1">{culture.songArtist}</p>
                </>
              ) : (
                <p className="text-cream/40 text-sm italic">Charts from your week</p>
              )}
            </BentoTile>

            <BentoTile className="col-span-2" label="On your day in history" accent="lavender">
              {history?.famousBirthday ? (
                <>
                  <p className="font-serif text-base text-cream leading-snug">
                    {history.famousBirthday}
                  </p>
                  <p className="text-cream/50 text-xs mt-1">
                    born {history.famousBirthdayYear}
                  </p>
                </>
              ) : (
                <p className="text-cream/40 text-sm italic">A day worth remembering</p>
              )}
            </BentoTile>

            {/* Place + world */}
            <BentoTile className="col-span-2" label={input.city} accent="honey">
              {place?.weather ? (
                <p className="text-cream text-sm font-sans">{place.weather}</p>
              ) : (
                <p className="text-cream/40 text-sm italic">Your corner of the world</p>
              )}
            </BentoTile>

            <BentoTile className="col-span-2" label="The world grew" accent="pink">
              <p className="font-serif text-xl text-gold">
                +{numbers.worldPopulationAdded}
              </p>
              <p className="text-theme-light text-xs mt-1 font-serif italic">
                since you arrived — and the universe made you
              </p>
            </BentoTile>
          </div>

          {/* Footer */}
          <p className="text-center text-cream/35 text-xs font-sans mt-6 tracking-widest uppercase">
            made with stardust & honey · moment in time
          </p>
        </div>
      </div>
    </div>
  );
}
