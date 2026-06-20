"use client";

import { useId } from "react";
import { ZODIAC_PATHS } from "./zodiacPaths";

export default function ZodiacSymbolArt({
  sign,
  className = "w-full h-full",
  variant = "badge",
}: {
  sign: string;
  className?: string;
  variant?: "badge" | "hero";
}) {
  const uid = useId().replace(/:/g, "");
  const paths = ZODIAC_PATHS[sign] ?? ["M32 16 L32 48 M24 32 L40 32"];
  const strokeWidth = variant === "hero" ? 2.2 : 1.85;

  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      aria-hidden="true"
      overflow="hidden"
    >
      <defs>
        <linearGradient id={`${uid}-gold`} x1="12" y1="10" x2="52" y2="54">
          <stop offset="0%" stopColor="#fff8fc" />
          <stop offset="50%" stopColor="#ffc857" />
          <stop offset="100%" stopColor="#e8a830" />
        </linearGradient>
      </defs>
      <circle
        cx="32"
        cy="32"
        r="27"
        fill="none"
        stroke="rgba(255, 200, 87, 0.15)"
        strokeWidth="0.6"
      />
      {paths.map((d, i) => (
        <path
          key={i}
          d={d}
          fill="none"
          stroke={`url(#${uid}-gold)`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
    </svg>
  );
}
