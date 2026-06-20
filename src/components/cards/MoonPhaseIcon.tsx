"use client";

import { useId } from "react";

/** Realistic moon with surface detail, earthshine, and accurate phase terminator. */
export default function MoonPhaseIcon({
  phaseAngle,
  size = "md",
}: {
  phaseAngle: number;
  size?: "md" | "lg" | "xl";
}) {
  const scale = size === "xl" ? 1.55 : size === "lg" ? 1.25 : 1;
  const r = 72 * scale;
  const cx = 90 * scale;
  const cy = 90 * scale;
  const vb = 180 * scale;
  const viewBox = `0 0 ${vb} ${vb}`;
  const uid = useId().replace(/:/g, "");

  const sizeClass =
    size === "xl"
      ? "w-48 h-48 md:w-56 md:h-56 mx-auto"
      : size === "lg"
        ? "w-44 h-44 md:w-56 md:h-56 mx-auto"
        : "w-32 h-32 md:w-40 md:h-40 shrink-0";

  const angle = ((phaseAngle % 360) + 360) % 360;
  const waxing = angle <= 180;
  const cosPhase = Math.cos((angle * Math.PI) / 180);
  const tx = Math.abs(cosPhase) * r;

  const top = `${cx} ${cy - r}`;
  const bot = `${cx} ${cy + r}`;

  let litPath = "";
  if (angle < 0.5 || angle > 359.5) {
    litPath = "";
  } else if (angle > 179.5 && angle < 180.5) {
    litPath = `M ${cx} ${cy - r} A ${r} ${r} 0 1 1 ${cx} ${cy + r} A ${r} ${r} 0 1 1 ${cx} ${cy - r} Z`;
  } else if (waxing) {
    const sweep = cosPhase > 0 ? 0 : 1;
    litPath = `M ${top} A ${r} ${r} 0 0 1 ${bot} A ${tx} ${r} 0 0 ${sweep} ${top} Z`;
  } else {
    const sweep = cosPhase > 0 ? 1 : 0;
    litPath = `M ${top} A ${r} ${r} 0 0 0 ${bot} A ${tx} ${r} 0 0 ${sweep} ${top} Z`;
  }

  const craters = [
    { cx: cx - 22 * scale, cy: cy - 28 * scale, rx: 14 * scale, ry: 12 * scale, maria: true },
    { cx: cx + 24 * scale, cy: cy - 8 * scale, rx: 18 * scale, ry: 16 * scale, maria: true },
    { cx: cx + 8 * scale, cy: cy + 26 * scale, rx: 11 * scale, ry: 10 * scale, maria: false },
    { cx: cx - 30 * scale, cy: cy + 12 * scale, rx: 9 * scale, ry: 8 * scale, maria: false },
    { cx: cx + 32 * scale, cy: cy + 22 * scale, rx: 7 * scale, ry: 6 * scale, maria: false },
    { cx: cx - 8 * scale, cy: cy - 8 * scale, rx: 6 * scale, ry: 5 * scale, maria: false },
    { cx: cx + 14 * scale, cy: cy + 8 * scale, rx: 5 * scale, ry: 4 * scale, maria: false },
    { cx: cx - 18 * scale, cy: cy + 32 * scale, rx: 8 * scale, ry: 7 * scale, maria: false },
    { cx: cx + 4 * scale, cy: cy - 32 * scale, rx: 5 * scale, ry: 4 * scale, maria: false },
  ];

  const isNewMoon = angle < 0.5 || angle > 359.5;
  const isFullMoon = angle > 179.5 && angle < 180.5;

  return (
    <svg viewBox={viewBox} className={sizeClass} aria-hidden="true">
      <defs>
        <radialGradient id={`${uid}-glow`} cx="45%" cy="40%">
          <stop offset="0%" stopColor="#fff8fc" stopOpacity="0.2" />
          <stop offset="70%" stopColor="#c9b8ff" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#08040f" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${uid}-surface`} cx="38%" cy="32%">
          <stop offset="0%" stopColor="#faf6ee" />
          <stop offset="55%" stopColor="#ddd4c8" />
          <stop offset="100%" stopColor="#a89e94" />
        </radialGradient>
        <radialGradient id={`${uid}-maria`} cx="50%" cy="50%">
          <stop offset="0%" stopColor="#b8aea4" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#8a8078" stopOpacity="0.35" />
        </radialGradient>
        <radialGradient id={`${uid}-shadow`} cx="65%" cy="50%">
          <stop offset="0%" stopColor="#1a1428" />
          <stop offset="100%" stopColor="#08040f" />
        </radialGradient>
        <radialGradient id={`${uid}-earthshine`} cx="35%" cy="45%">
          <stop offset="0%" stopColor="#3d3550" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#120820" stopOpacity="0.85" />
        </radialGradient>
        {litPath && (
          <clipPath id={`${uid}-lit`}>
            <path d={litPath} />
          </clipPath>
        )}
        <filter id={`${uid}-crater`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="0.4" />
        </filter>
      </defs>

      {/* Outer glow */}
      <circle cx={cx} cy={cy} r={r + 14 * scale} fill={`url(#${uid}-glow)`} />

      {/* Shadow hemisphere (full disk) */}
      <circle cx={cx} cy={cy} r={r} fill={`url(#${uid}-shadow)`} />

      {/* Earthshine on dark side when not full */}
      {!isFullMoon && (
        <circle cx={cx} cy={cy} r={r - 1} fill={`url(#${uid}-earthshine)`} opacity={isNewMoon ? 0.95 : 0.55} />
      )}

      {/* Lit surface with texture */}
      {litPath && (
        <g clipPath={`url(#${uid}-lit)`}>
          <circle cx={cx} cy={cy} r={r} fill={`url(#${uid}-surface)`} />
          {craters.map((c, i) => (
            <g key={i}>
              {c.maria ? (
                <ellipse
                  cx={c.cx}
                  cy={c.cy}
                  rx={c.rx}
                  ry={c.ry}
                  fill={`url(#${uid}-maria)`}
                  filter={`url(#${uid}-crater)`}
                />
              ) : (
                <>
                  <ellipse
                    cx={c.cx + 1.5 * scale}
                    cy={c.cy + 1.5 * scale}
                    rx={c.rx}
                    ry={c.ry}
                    fill="#6a6258"
                    opacity="0.35"
                  />
                  <ellipse
                    cx={c.cx}
                    cy={c.cy}
                    rx={c.rx}
                    ry={c.ry}
                    fill="#c8beb2"
                    opacity="0.45"
                  />
                  <ellipse
                    cx={c.cx - 1 * scale}
                    cy={c.cy - 1 * scale}
                    rx={c.rx * 0.55}
                    ry={c.ry * 0.55}
                    fill="#f0ebe3"
                    opacity="0.35"
                  />
                </>
              )}
            </g>
          ))}
          {/* Subtle limb brightening */}
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke="rgba(255, 248, 252, 0.25)"
            strokeWidth={2 * scale}
          />
        </g>
      )}

      {/* Terminator soft edge */}
      {litPath && !isFullMoon && !isNewMoon && (
        <path
          d={litPath}
          fill="none"
          stroke="rgba(255, 240, 212, 0.15)"
          strokeWidth={1.5 * scale}
        />
      )}

      {/* Atmospheric rim */}
      <circle
        cx={cx}
        cy={cy}
        r={r + 2 * scale}
        fill="none"
        stroke="rgba(255, 200, 87, 0.35)"
        strokeWidth={1 * scale}
      />
      <circle
        cx={cx}
        cy={cy}
        r={r + 5 * scale}
        fill="none"
        stroke="rgba(201, 184, 255, 0.15)"
        strokeWidth={0.5 * scale}
      />
    </svg>
  );
}
