"use client";

import { Sparkle } from "./art/MagicalDecor";

const HEADER_STARS = [
  [8, 18], [18, 8], [28, 22], [72, 10], [82, 20], [92, 12],
  [12, 45], [88, 42], [5, 65], [95, 58], [22, 72], [78, 68],
  [50, 5], [35, 15], [65, 14], [44, 25], [56, 24],
];

interface Props {
  name: string;
  formatted: string;
  city: string;
  exportMode?: boolean;
}

export default function MagicalHeader({ name, formatted, city, exportMode = false }: Props) {
  if (exportMode) {
    return (
      <header className="bento-export-header relative text-center mb-5 w-full pt-2 pb-2">
        <p className="relative z-10 font-display text-gold uppercase tracking-[0.35em] text-[11px] mb-3">
          Moment in Time
        </p>
        <h1 className="relative z-10 font-serif leading-[1.15] px-16">
          <span className="text-theme-light text-[2.35rem] block">{name}&apos;s</span>
          <span className="text-gold text-[2rem] italic block mt-0.5">universe</span>
        </h1>
        <p className="relative z-10 text-lavender text-base mt-4 font-serif italic">{formatted}</p>
        <p className="relative z-10 text-theme-light text-sm font-sans mt-1 tracking-wide">{city}</p>
      </header>
    );
  }

  return (
    <header className="relative text-center mb-8 md:mb-10 w-full py-6 md:py-10">
      <div
        className="magic-header-aura absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(100%,720px)] h-48 md:h-64 pointer-events-none"
        aria-hidden="true"
      />

      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {HEADER_STARS.map(([left, top], i) => (
          <span
            key={i}
            className="header-sparkle animate-twinkle-soft"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              animationDelay: `${(i % 7) * 0.35}s`,
            }}
          />
        ))}
      </div>

      <p className="relative z-10 font-display text-gold/90 text-sm md:text-base tracking-[0.35em] mb-4 md:mb-6 flex items-center justify-center gap-3">
        <Sparkle className="w-3 h-3 md:w-4 md:h-4 text-pink/70 animate-pulse" />
        <span className="text-gradient-gold-shimmer uppercase text-xs md:text-sm">
          Moment in Time
        </span>
        <Sparkle className="w-3 h-3 md:w-4 md:h-4 text-pink/70 animate-pulse" />
      </p>

      <h1 className="relative z-10 font-serif leading-[1.08] w-full px-2 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem]">
        <span className="text-gradient-magic magic-title-glow inline-block">{name}</span>
        <span className="text-gradient-universe magic-title-glow inline-block ml-2 md:ml-3">
          &apos;s universe
        </span>
      </h1>

      <p className="relative z-10 text-lavender/90 text-base md:text-xl lg:text-2xl mt-5 md:mt-6 font-serif italic">
        {formatted}
      </p>
      <p className="relative z-10 text-lavender/80 text-sm md:text-base lg:text-lg font-sans mt-2 tracking-wide">
        {city}
      </p>
    </header>
  );
}
