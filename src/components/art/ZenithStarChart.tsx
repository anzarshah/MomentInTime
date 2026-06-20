"use client";

import type { ConstellationPattern } from "@/lib/constellationPatterns";

const FIELD_STARS = [
  [12, 18, 0.4], [88, 12, 0.35], [72, 78, 0.3], [15, 82, 0.35],
  [45, 8, 0.25], [95, 45, 0.3], [8, 55, 0.25], [55, 92, 0.2],
  [78, 62, 0.25], [28, 68, 0.2], [62, 38, 0.3], [38, 48, 0.2],
];

function diffractionSpikes(x: number, y: number, len: number, opacity: number) {
  return (
    <g opacity={opacity}>
      <line x1={x - len} y1={y} x2={x + len} y2={y} stroke="#fff8fc" strokeWidth="0.15" />
      <line x1={x} y1={y - len} x2={x} y2={y + len} stroke="#fff8fc" strokeWidth="0.15" />
      <line x1={x - len * 0.7} y1={y - len * 0.7} x2={x + len * 0.7} y2={y + len * 0.7} stroke="#ffc857" strokeWidth="0.1" />
      <line x1={x + len * 0.7} y1={y - len * 0.7} x2={x - len * 0.7} y2={y + len * 0.7} stroke="#ffc857" strokeWidth="0.1" />
    </g>
  );
}

export default function ZenithStarChart({
  pattern,
  highlightId,
  className = "w-56 h-56 md:w-72 md:h-72",
  compact = false,
}: {
  pattern: ConstellationPattern;
  highlightId: string | null;
  className?: string;
  compact?: boolean;
}) {
  const starById = Object.fromEntries(pattern.stars.map((s) => [s.id, s]));
  const filterId = `zenith-glow-${highlightId ?? "default"}`;

  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <defs>
        <radialGradient id={`${filterId}-sky`} cx="50%" cy="40%">
          <stop offset="0%" stopColor="rgba(201, 184, 255, 0.08)" />
          <stop offset="100%" stopColor="rgba(8, 4, 15, 0)" />
        </radialGradient>
        <filter id={filterId} x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="1.8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id={`${filterId}-bright`} x="-150%" y="-150%" width="400%" height="400%">
          <feGaussianBlur stdDeviation="2.8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect width="100" height="100" fill={`url(#${filterId}-sky)`} rx="4" />

      {FIELD_STARS.map(([x, y, op], i) => (
        <circle
          key={`bg-${i}`}
          cx={x}
          cy={y}
          r={0.35 + (i % 3) * 0.15}
          fill="#fff8fc"
          opacity={op}
        />
      ))}

      {pattern.lines.map(([from, to], i) => {
        const a = starById[from];
        const b = starById[to];
        if (!a || !b) return null;
        return (
          <g key={`${from}-${to}-${i}`}>
            <line
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke="rgba(255, 200, 87, 0.12)"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            <line
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke="rgba(201, 184, 255, 0.65)"
              strokeWidth="0.45"
              strokeLinecap="round"
            />
          </g>
        );
      })}

      {pattern.stars.map((star) => {
        const isHighlight = star.id === highlightId;
        const hasName = Boolean(star.name);
        const r = isHighlight ? 2.8 : hasName ? 2 : 1.3;

        return (
          <g key={star.id}>
            {isHighlight && !compact && diffractionSpikes(star.x, star.y, 5.5, 0.55)}
            {isHighlight && (
              <>
                <circle cx={star.x} cy={star.y} r="8" fill="rgba(255, 200, 87, 0.12)" />
                <circle
                  cx={star.x}
                  cy={star.y}
                  r="5"
                  fill="rgba(255, 248, 252, 0.08)"
                  stroke="rgba(255, 200, 87, 0.35)"
                  strokeWidth="0.3"
                />
              </>
            )}
            <circle
              cx={star.x}
              cy={star.y}
              r={r + 1.2}
              fill={isHighlight ? "#ffc857" : "#c9b8ff"}
              opacity={isHighlight ? 0.25 : 0.12}
              filter={isHighlight ? `url(#${filterId}-bright)` : undefined}
            />
            <circle
              cx={star.x}
              cy={star.y}
              r={r}
              fill="#fff8fc"
              opacity={isHighlight ? 1 : hasName ? 0.9 : 0.65}
              filter={isHighlight ? `url(#${filterId}-bright)` : `url(#${filterId})`}
            />
            {isHighlight && (
              <circle cx={star.x} cy={star.y} r="0.8" fill="#ffffff" opacity="0.95" />
            )}
          </g>
        );
      })}
    </svg>
  );
}
