"use client";

import { useMemo } from "react";

const STAR_COUNT = 280;

export default function Starfield() {
  const stars = useMemo(
    () =>
      Array.from({ length: STAR_COUNT }, (_, i) => ({
        id: i,
        left: `${((i * 17 + 7) % 97) + 1}%`,
        top: `${((i * 23 + 11) % 97) + 1}%`,
        size: i % 11 === 0 ? 3 : i % 5 === 0 ? 2 : 1,
        delay: (i % 12) * 0.35,
        duration: 2.5 + (i % 6),
        opacity: 0.2 + (i % 5) * 0.12,
      })),
    []
  );

  return (
    <div className="starfield-layer" aria-hidden="true">
      {stars.map((star) => (
        <span
          key={star.id}
          className="star-dot"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
            opacity: star.opacity,
          }}
        />
      ))}
    </div>
  );
}
