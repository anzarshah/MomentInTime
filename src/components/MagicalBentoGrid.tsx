"use client";

import MoonPhaseIcon from "./cards/MoonPhaseIcon";
import {
  ArchiveLoadingBanner,
  MagicalArchiveLoader,
} from "./ArchiveScrollLoader";
import MagicalHeader from "./MagicalHeader";
import {
  BentoBackground,
  BeatingHeartArt,
  CornerOrnaments,
  FlowerArt,
  GemArt,
  LungsArt,
  MagicalInitial,
  Sparkle,
  TreeArt,
  ZodiacBadge,
} from "./art/MagicalDecor";
import type {
  BirthInput,
  BirthSymbolsData,
  ConstellationData,
  CultureData,
  EclipseData,
  HistoryData,
  MoonData,
  NumbersData,
  PlaceData,
  SunData,
  ZodiacData,
} from "@/lib/types";
import ZenithStarChart from "./art/ZenithStarChart";
import { highlightStarId, patternForStar } from "@/lib/constellationPatterns";

export interface MagicalBentoProps {
  input: BirthInput;
  moon: MoonData;
  sun: SunData;
  zodiac: ZodiacData;
  symbols: BirthSymbolsData;
  numbers: NumbersData;
  constellations: ConstellationData;
  eclipses: EclipseData;
  culture: CultureData | null;
  history: HistoryData | null;
  place: PlaceData | null;
  apiLoading?: boolean;
  apiFailed?: boolean;
  variant?: "export";
}

function BentoCultureTitles({ culture }: { culture: CultureData }) {
  const items = [
    {
      label: "#1 Song",
      title: culture.song,
      sub: culture.songArtist,
    },
    {
      label: "Hollywood",
      title: culture.hollywoodMovie,
    },
    {
      label: "Bollywood",
      title: culture.bollywoodMovie,
    },
    {
      label: "Bestseller",
      title: culture.bestsellingBook,
      sub: culture.bestsellingBookAuthor,
    },
  ];

  return (
    <div className="bento-culture-titles">
      {items.map((item) => (
        <div key={item.label} className="bento-culture-item">
          <p className="bento-culture-label">{item.label}</p>
          <p className="bento-culture-title">{item.title}</p>
          {item.sub && item.sub !== "Unknown" ? (
            <p className="bento-culture-sub">{item.sub}</p>
          ) : null}
        </div>
      ))}
    </div>
  );
}

function MagicTile({
  className = "",
  label,
  children,
  glow = "lavender",
  loading = false,
}: {
  className?: string;
  label: string;
  children: React.ReactNode;
  glow?: "lavender" | "pink" | "honey" | "violet";
  loading?: boolean;
}) {
  const glowClass = {
    lavender: "magic-tile-lavender",
    pink: "magic-tile-pink",
    honey: "magic-tile-honey",
    violet: "magic-tile-violet",
  }[glow];

  return (
    <div className={`magic-tile ${glowClass} ${loading ? "magic-tile-loading" : ""} ${className}`}>
      {loading && <div className="magic-tile-loading-sweep" aria-hidden="true" />}
      <CornerOrnaments />
      <p className="magic-tile-label">
        {label}
        {loading && (
          <span className="ml-2 normal-case tracking-normal font-serif italic text-gold/85 text-[11px] md:text-xs animate-pulse">
            · searching
          </span>
        )}
      </p>
      <div className="relative z-10 flex-1 flex flex-col justify-center">{children}</div>
    </div>
  );
}

export default function MagicalBentoGrid({
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
  variant = "export",
}: MagicalBentoProps) {
  const exportMode = true;
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

  const chineseEmoji: Record<string, string> = {
    Rat: "🐀", Ox: "🐂", Tiger: "🐅", Rabbit: "🐰", Dragon: "🐉",
    Snake: "🐍", Horse: "🐴", Goat: "🐐", Monkey: "🐒", Rooster: "🐓",
    Dog: "🐕", Pig: "🐷",
  };

  const nameInitial = input.name.trim().charAt(0).toUpperCase();
  const symbolsRowClass = exportMode
    ? "col-span-1"
    : "col-span-1 min-h-[130px] sm:col-span-1 md:col-span-1";
  const symbolsRowStart = exportMode ? "col-start-2" : "md:col-start-2";

  const zenithStarName = constellations.zenithStar ?? constellations.prominentStar;
  const zenithConstellation =
    constellations.zenithConstellation ?? constellations.overhead[0] ?? null;
  const zenithPattern =
    zenithStarName && zenithConstellation
      ? patternForStar(zenithStarName, zenithConstellation)
      : null;
  const zenithHighlightId =
    zenithPattern && zenithStarName
      ? highlightStarId(zenithStarName, zenithPattern)
      : null;

  return (
    <div
      id={exportMode ? "bento-summary" : undefined}
      style={exportMode ? { width: 1080 } : undefined}
      className={`bento-summary-export relative ${exportMode ? "" : "overflow-hidden w-full min-h-screen"}`}
    >
      <BentoBackground exportMode={exportMode} />

      <MagicalInitial initial={nameInitial} exportMode={exportMode} />

      <div
        className={`relative z-10 flex flex-col w-full ${
          exportMode ? "px-8 py-6" : "px-4 py-6 sm:px-8 sm:py-8 lg:px-12 lg:py-10"
        }`}
      >
        {/* Header */}
        <MagicalHeader
          name={input.name}
          formatted={formatted}
          city={input.city}
          exportMode={exportMode}
        />

        {/* Bento grid — 6 columns on md+ so every row fills full width */}
        <div
          className={`bento-grid grid flex-1 w-full ${
            exportMode
              ? "grid-cols-6 auto-rows-min"
              : "grid-cols-2 sm:grid-cols-4 md:grid-cols-6"
          }`}
        >
          {/* Moon hero */}
          <MagicTile
            className={`${exportMode ? "col-span-3 min-h-[240px]" : "col-span-2 sm:col-span-2 md:col-span-3 min-h-[200px] md:min-h-[240px]"}`}
            label="The sky that night"
            glow="honey"
          >
            <div className="flex flex-col items-center justify-center text-center gap-3 md:gap-4">
              <MoonPhaseIcon phaseAngle={moon.phaseAngle} size="xl" />
              <div className="w-full">
                <p className="font-serif text-2xl md:text-4xl text-gold leading-tight">
                  {moon.phase}
                </p>
                <p className="text-cream/65 text-sm md:text-base mt-2 font-sans">
                  {moon.illumination}% lit
                </p>
                <p className="text-cream/45 text-xs md:text-sm font-sans">
                  {moon.distanceKm.toLocaleString()} km away
                </p>
                <p className="text-lavender/60 text-xs md:text-sm mt-3 font-sans">
                  ☀ {sun.sunrise} – {sun.sunset}
                </p>
              </div>
            </div>
          </MagicTile>

          {/* Sun sign */}
          <MagicTile
            className={exportMode ? "col-span-1 min-h-[120px]" : "col-span-1 md:col-span-1 min-h-[140px] md:min-h-[160px]"}
            label="Sun sign"
            glow="pink"
          >
            <ZodiacBadge sign={zodiac.sunSign} size="md" className="mb-2 mx-auto" />
            <p className="font-serif text-xl md:text-2xl text-cream">{zodiac.sunSign}</p>
          </MagicTile>

          {/* Chinese zodiac */}
          <MagicTile
            className={exportMode ? "col-span-1 min-h-[120px]" : "col-span-1 min-h-[140px] md:min-h-[160px]"}
            label="Chinese zodiac"
            glow="violet"
          >
            <p className="text-3xl md:text-4xl mb-1">
              {chineseEmoji[zodiac.chineseZodiac] ?? "✦"}
            </p>
            <p className="font-serif text-xl md:text-2xl text-gold">{zodiac.chineseZodiac}</p>
            <p className="text-cream/50 text-xs md:text-sm mt-1">{zodiac.chineseElement}</p>
          </MagicTile>

          {/* Stars / moon rising */}
          <MagicTile
            className={exportMode ? "col-span-1 min-h-[100px]" : "col-span-2 sm:col-span-2 md:col-span-1 min-h-[120px] md:min-h-[160px]"}
            label="Written in the stars"
            glow="lavender"
          >
            {zodiac.hasExactTime && zodiac.moonSign ? (
              <p className="font-serif text-lg md:text-2xl text-cream leading-snug">
                Moon in {zodiac.moonSign}
                {zodiac.risingSign ? (
                  <>
                    <br />
                    <span className="text-lavender/80">Rising {zodiac.risingSign}</span>
                  </>
                ) : null}
              </p>
            ) : (
              <p className="font-serif text-lg md:text-xl text-cream/70 italic">
                Born under {zodiac.sunSign}
              </p>
            )}
          </MagicTile>

          {/* Constellations — full width row, no side gutter */}
          <MagicTile
            className={exportMode ? "col-span-6 min-h-[150px]" : "col-span-2 sm:col-span-4 md:col-span-6 min-h-[130px] md:min-h-[150px]"}
            label="Overhead"
            glow="violet"
          >
            <div className="flex flex-col items-center text-center gap-2 md:gap-3">
              {zenithPattern && (
                <ZenithStarChart
                  pattern={zenithPattern}
                  highlightId={zenithHighlightId}
                  compact={exportMode}
                  className="w-36 h-36 md:w-44 md:h-44"
                />
              )}
              {zenithStarName && (
                <p className="font-serif text-sm md:text-base text-gold">
                  {zenithStarName}
                  {zenithConstellation && zenithConstellation !== zenithStarName
                    ? ` · ${zenithConstellation}`
                    : ""}
                </p>
              )}
              <p className="font-serif text-base md:text-lg text-cream/75 leading-relaxed w-full">
                {constellations.overhead.slice(0, 4).join(" · ") || "—"}
              </p>
            </div>
          </MagicTile>

          {/* Symbols row — centered (Stone · Flower · Tree · Life) */}
          <MagicTile
            className={`${symbolsRowClass} ${symbolsRowStart}`}
            label="Stone"
            glow="pink"
          >
            <GemArt className="w-10 h-10 md:w-12 md:h-12 mb-2 opacity-90" />
            <p className="font-serif text-lg md:text-xl text-gold">{symbols.stone.name}</p>
            <p className="text-cream/40 text-[10px] md:text-xs italic mt-1 line-clamp-2">
              {symbols.stone.meaning}
            </p>
          </MagicTile>

          <MagicTile className={symbolsRowClass} label="Flower" glow="lavender">
            <FlowerArt className="w-10 h-10 md:w-12 md:h-12 mb-2" />
            <p className="font-serif text-base md:text-lg text-gold leading-tight">
              {symbols.flower.name}
            </p>
          </MagicTile>

          <MagicTile className={symbolsRowClass} label="Tree" glow="honey">
            <TreeArt className="w-10 h-10 md:w-12 md:h-12 mb-2" />
            <p className="font-serif text-lg md:text-xl text-gold">{symbols.tree.name}</p>
          </MagicTile>

          <MagicTile className={symbolsRowClass} label="Life" glow="pink">
            <p className="font-serif text-4xl md:text-5xl text-cream tabular-nums">
              {numbers.ageYears}
            </p>
            <p className="text-cream/50 text-xs md:text-sm mt-1">
              years · {numbers.seasonsLived} seasons
            </p>
          </MagicTile>

          {/* Breaths */}
          <MagicTile
            className={exportMode ? "col-span-3 min-h-[110px]" : "col-span-2 sm:col-span-2 md:col-span-3 min-h-[120px] md:min-h-[140px]"}
            label="Breaths of air"
            glow="lavender"
          >
            <div className="flex items-center gap-3 md:gap-5">
              <LungsArt />
              <div className="flex-1 min-w-0 text-center md:text-left">
                <p className="font-serif text-2xl md:text-3xl lg:text-4xl text-gradient-light tabular-nums">
                  {numbers.ageBreaths.toLocaleString()}
                </p>
                <p className="text-cream/45 text-xs md:text-sm mt-1 font-serif italic">
                  soft, steady, yours
                </p>
              </div>
            </div>
          </MagicTile>

          {/* Heartbeats */}
          <MagicTile
            className={exportMode ? "col-span-3 min-h-[110px]" : "col-span-2 sm:col-span-2 md:col-span-3 min-h-[120px] md:min-h-[140px]"}
            label="Heartbeats"
            glow="pink"
          >
            <div className="flex items-center gap-3 md:gap-5">
              <div className="flex-1 min-w-0 text-center md:text-right">
                <p className="font-serif text-2xl md:text-3xl lg:text-4xl text-gradient-light tabular-nums">
                  {numbers.ageHeartbeats.toLocaleString()}
                </p>
                <p className="text-cream/45 text-xs md:text-sm mt-1">and counting</p>
              </div>
              <BeatingHeartArt />
            </div>
          </MagicTile>

          {/* Extras row */}
          <MagicTile
            className={exportMode ? "col-span-3" : "col-span-2 sm:col-span-2 md:col-span-3 min-h-[100px]"}
            label="Little magic"
            glow="violet"
          >
            <p className="text-cream/80 text-sm md:text-base font-sans leading-relaxed">
              {numbers.leapYearsLived} leap years · {totalEclipses} eclipses ·{" "}
              {numbers.fullMoonsSince.toLocaleString()} full moons
            </p>
          </MagicTile>

          {/* Eclipses at birth */}
          <MagicTile
            className={exportMode ? "col-span-3" : "col-span-2 sm:col-span-2 md:col-span-3 min-h-[100px]"}
            label="Eclipses nearby"
            glow="honey"
          >
            <p className="text-sm md:text-base text-cream/75 font-sans leading-relaxed">
              {eclipses.nextSolar && (
                <span>Next ☀ {eclipses.nextSolar.type} · {eclipses.nextSolar.date.split(",")[0]}</span>
              )}
              {eclipses.nextLunar && (
                <>
                  <br />
                  <span className="text-cream/50">
                    Next 🌕 {eclipses.nextLunar.type} · {eclipses.nextLunar.date.split(",")[0]}
                  </span>
                </>
              )}
            </p>
          </MagicTile>

          {/* Anthropic API loading banner */}
          {apiLoading && !exportMode && (
            <div className="col-span-2 sm:col-span-4 md:col-span-6">
              <ArchiveLoadingBanner city={input.city} />
            </div>
          )}

          {/* Culture — titles only in bento export */}
          <MagicTile
            className={
              exportMode
                ? "col-span-6 min-h-[100px]"
                : `col-span-2 sm:col-span-4 md:col-span-6 ${
                    apiLoading ? "min-h-[130px] md:min-h-[150px]" : "min-h-[110px] md:min-h-[130px]"
                  }`
            }
            label="That week in culture"
            glow="pink"
            loading={apiLoading && !exportMode}
          >
            {apiLoading && !exportMode ? (
              <MagicalArchiveLoader variant="culture" city={input.city} compact />
            ) : culture?.song ? (
              <BentoCultureTitles culture={culture} />
            ) : (
              <p className="text-cream/50 text-sm italic">
                {apiFailed
                  ? "The archives are quiet right now — refresh to try again"
                  : "Couldn't reach the archives"}
              </p>
            )}
          </MagicTile>

          {/* History */}
          <MagicTile
            className={
              exportMode
                ? "col-span-3 min-h-[100px]"
                : `col-span-2 sm:col-span-4 md:col-span-3 ${
                    apiLoading ? "min-h-[130px] md:min-h-[150px]" : "min-h-[110px] md:min-h-[130px]"
                  }`
            }
            label="On your day in history"
            glow="lavender"
            loading={apiLoading && !exportMode}
          >
            {apiLoading && !exportMode ? (
              <MagicalArchiveLoader variant="history" city={input.city} compact />
            ) : history?.famousBirthday ? (
              <>
                <p className="font-serif text-lg md:text-xl text-cream leading-snug">
                  {history.famousBirthday}
                </p>
                <p className="text-cream/50 text-xs md:text-sm mt-1">
                  born {history.famousBirthdayYear}
                </p>
              </>
            ) : (
              <p className="text-cream/50 text-sm italic">
                {apiFailed
                  ? "History is still being written — try refreshing"
                  : "A day worth remembering"}
              </p>
            )}
          </MagicTile>

          {/* Place */}
          <MagicTile
            className={
              exportMode
                ? "col-span-3"
                : `col-span-2 sm:col-span-2 md:col-span-3 ${
                    apiLoading ? "min-h-[120px] md:min-h-[140px]" : "min-h-[100px]"
                  }`
            }
            label={input.city}
            glow="honey"
            loading={apiLoading && !exportMode}
          >
            {apiLoading && !exportMode ? (
              <MagicalArchiveLoader variant="place" city={input.city} compact />
            ) : place?.weather ? (
              <p className="text-cream/80 text-sm md:text-base font-sans">{place.weather}</p>
            ) : (
              <p className="text-cream/50 text-sm italic">
                {apiFailed
                  ? "Couldn't read the skies — refresh to try again"
                  : "Your corner of the world"}
              </p>
            )}
          </MagicTile>

          {/* World grew — full width footer stat */}
          <MagicTile
            className={exportMode ? "col-span-6 min-h-[90px]" : "col-span-2 sm:col-span-2 md:col-span-3 min-h-[100px]"}
            label="The world grew"
            glow="violet"
          >
            <p className="font-serif text-3xl md:text-4xl text-gold">+{numbers.worldPopulationAdded}</p>
            <p className="text-theme-light text-xs md:text-sm mt-2 font-serif italic leading-relaxed">
              since you arrived — and the universe made you
            </p>
          </MagicTile>
        </div>

        <footer className="text-center mt-4 md:mt-6 pb-2">
          <p className="text-cream/30 text-[10px] md:text-xs font-sans tracking-[0.3em] uppercase flex items-center justify-center gap-2">
            <Sparkle className="w-2 h-2" />
            made with stardust & honey
            <Sparkle className="w-2 h-2" />
          </p>
        </footer>
      </div>
    </div>
  );
}
