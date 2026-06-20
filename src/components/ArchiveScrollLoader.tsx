"use client";

import { Sparkle } from "./art/MagicalDecor";

type LoaderVariant = "culture" | "history" | "place";

const MESSAGES: Record<LoaderVariant, string[]> = {
  culture: [
    "Tuning into Billboard charts…",
    "Finding the #1 song that week…",
    "Checking Bollywood & Hollywood box office…",
    "Flipping through bestseller lists…",
    "Listening for a ghazal from that era…",
  ],
  history: [
    "Who else was born on this day…",
    "Searching history books…",
    "Finding headlines from that year…",
    "Remembering those we lost…",
    "Turning the pages of time…",
  ],
  place: [
    "Reading weather records…",
    "Scanning local newspaper archives…",
    "Counting how the city has grown…",
    "Mapping your corner of the world…",
    "Opening the atlas to find you…",
  ],
};

function linesFor(variant: LoaderVariant, city: string): string[] {
  const base = MESSAGES[variant].map((m) => `✦ ${m}`);
  if (variant === "place" && city) {
    return [`✦ Checking the skies over ${city}…`, ...base];
  }
  return base;
}

function LoadingSparkles() {
  return (
    <div className="archive-loader-sparkles pointer-events-none" aria-hidden="true">
      <span className="archive-loader-spark archive-loader-spark-1" />
      <span className="archive-loader-spark archive-loader-spark-2" />
      <span className="archive-loader-spark archive-loader-spark-3" />
    </div>
  );
}

function ShimmerLines({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`relative z-10 space-y-2 ${compact ? "mb-2.5" : "mb-3"}`}
      aria-hidden="true"
    >
      <div className="magic-shimmer-bar w-[88%]" />
      <div className="magic-shimmer-bar w-[62%] magic-shimmer-bar-delay" />
      {!compact && <div className="magic-shimmer-bar w-[44%] magic-shimmer-bar-delay-2" />}
    </div>
  );
}

export function ArchiveScrollLoader({
  variant,
  city = "",
  compact = false,
}: {
  variant: LoaderVariant;
  city?: string;
  compact?: boolean;
}) {
  const lines = linesFor(variant, city);
  const loop = [...lines, ...lines];

  return (
    <div
      className={`archive-scroll overflow-hidden relative ${
        compact ? "h-9 md:h-10" : "h-12 md:h-14"
      }`}
      aria-live="polite"
      aria-busy="true"
    >
      <div className="absolute inset-x-0 top-0 h-3 bg-gradient-to-b from-[#1a0e32]/95 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-3 bg-gradient-to-t from-[#1a0e32]/95 to-transparent z-10 pointer-events-none" />
      <div className="archive-scroll-track">
        {loop.map((line, i) => (
          <p
            key={`${line}-${i}`}
            className={`archive-scroll-line font-serif italic text-center py-1 ${
              compact ? "text-xs md:text-sm" : "text-sm md:text-base"
            }`}
          >
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}

/** Full magical loader for Anthropic-backed tiles */
export function MagicalArchiveLoader({
  variant,
  city = "",
  compact = false,
}: {
  variant: LoaderVariant;
  city?: string;
  compact?: boolean;
}) {
  return (
    <div className="magical-archive-loader relative w-full" aria-live="polite" aria-busy="true">
      <LoadingSparkles />
      <ShimmerLines compact={compact} />
      <ArchiveScrollLoader variant={variant} city={city} compact={compact} />
    </div>
  );
}

export function ArchiveMarqueeBanner({ city }: { city: string }) {
  const allLines = [
    ...linesFor("culture", city),
    ...linesFor("history", city),
    ...linesFor("place", city),
    "✦ Asking the stars' librarian…",
    "✦ Almost there…",
  ];
  const loop = [...allLines, ...allLines];

  return (
    <div className="archive-marquee overflow-hidden py-2.5" aria-live="polite" aria-busy="true">
      <div className="archive-marquee-track flex gap-10 whitespace-nowrap">
        {loop.map((line, i) => (
          <span
            key={`${line}-${i}`}
            className="archive-scroll-line font-serif italic text-sm md:text-base inline-flex items-center gap-2"
          >
            {line}
          </span>
        ))}
      </div>
    </div>
  );
}

export function ArchiveLoadingBanner({ city }: { city: string }) {
  return (
    <div className="archive-loading-banner relative overflow-hidden rounded-[1.35rem] border border-gold/30 bg-white/[0.06] backdrop-blur-md px-4 md:px-6 py-4 shadow-[inset_0_1px_0_rgba(255,200,87,0.15),0_0_24px_rgba(201,184,255,0.12)]">
      <div className="magic-tile-loading-sweep pointer-events-none" aria-hidden="true" />
      <div className="relative z-10 flex items-center justify-center gap-2 mb-3">
        <Sparkle className="w-3 h-3 text-pink/80 animate-pulse" />
        <p className="text-gradient-gold-shimmer text-[11px] md:text-xs uppercase tracking-[0.28em] font-sans">
          Searching the archives
        </p>
        <Sparkle className="w-3 h-3 text-pink/80 animate-pulse" />
      </div>
      <div className="relative z-10 mb-3 h-1 rounded-full overflow-hidden bg-lavender/10">
        <div className="archive-indeterminate-bar h-full rounded-full" />
      </div>
      <ArchiveMarqueeBanner city={city} />
    </div>
  );
}
