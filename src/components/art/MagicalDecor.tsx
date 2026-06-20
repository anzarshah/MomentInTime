"use client";

import ZodiacSymbolArt from "./ZodiacSymbolArt";

export function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0l1.8 6.2L20 8l-6.2 1.8L12 16l-1.8-6.2L4 8l6.2-1.8L12 0z" />
    </svg>
  );
}

export function MagicalInitial({
  initial,
  exportMode = false,
}: {
  initial: string;
  exportMode?: boolean;
}) {
  if (!initial) return null;

  return (
    <div
      className={`magical-initial pointer-events-none select-none ${
        exportMode ? "magical-initial-export" : ""
      }`}
      aria-hidden="true"
    >
      <div className="magical-initial-ring" />
      <div className="magical-initial-glow" />
      <Sparkle className="magical-initial-spark magical-initial-spark-a text-gold/80" />
      <Sparkle className="magical-initial-spark magical-initial-spark-b text-pink/70" />
      <span
        className={`magical-initial-letter font-serif italic ${
          exportMode ? "magical-initial-letter-export" : "text-gradient-magic magic-title-glow"
        }`}
      >
        {initial}
      </span>
    </div>
  );
}

export function CornerOrnaments() {
  return (
    <>
      <Sparkle className="absolute top-3 right-3 w-3 h-3 text-gold/50" />
      <Sparkle className="absolute bottom-3 left-3 w-2 h-2 text-pink/40" />
    </>
  );
}

export function FlowerArt({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <circle cx="32" cy="32" r="6" fill="#ffc857" opacity="0.9" />
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <ellipse
          key={deg}
          cx="32"
          cy="18"
          rx="8"
          ry="14"
          fill="#ffb8d9"
          opacity="0.55"
          transform={`rotate(${deg} 32 32)`}
        />
      ))}
    </svg>
  );
}

export function GemArt({ className = "w-14 h-14" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 56 56" fill="none" aria-hidden="true">
      <path d="M28 4L48 20L28 52L8 20L28 4Z" fill="url(#gem)" stroke="#ffc857" strokeWidth="1" opacity="0.85" />
      <path d="M8 20H48L28 52L8 20Z" fill="#c9b8ff" opacity="0.35" />
      <defs>
        <linearGradient id="gem" x1="8" y1="4" x2="48" y2="52">
          <stop stopColor="#ffb8d9" />
          <stop offset="1" stopColor="#7b5ea7" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function TreeArt({ className = "w-14 h-14" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 56 56" fill="none" aria-hidden="true">
      <rect x="25" y="36" width="6" height="14" rx="1" fill="#5c3d2e" opacity="0.8" />
      <circle cx="28" cy="24" r="16" fill="#7b5ea7" opacity="0.5" />
      <circle cx="22" cy="20" r="10" fill="#c9b8ff" opacity="0.35" />
      <circle cx="34" cy="22" r="9" fill="#ffb8d9" opacity="0.25" />
    </svg>
  );
}

export function ConstellationArt({ className = "w-28 h-20" }: { className?: string }) {
  const star = "#fff8fc";
  const line = "rgba(255, 248, 252, 0.45)";

  return (
    <svg className={className} viewBox="0 0 120 72" fill="none" aria-hidden="true">
      {/* Big Dipper asterism — white stars & connective lines */}
      <polyline
        points="32,38 48,42 62,28 78,34 88,52"
        stroke={line}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <polyline
        points="32,38 48,54 72,58 88,52"
        stroke={line}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <line x1="62" y1="28" x2="68" y2="16" stroke={line} strokeWidth="1" strokeLinecap="round" opacity="0.55" />

      {[
        [32, 38, 2.6],
        [48, 42, 2.4],
        [62, 28, 3.2],
        [78, 34, 2.5],
        [88, 52, 2.4],
        [72, 58, 2.3],
        [48, 54, 2.2],
        [68, 16, 1.9],
      ].map(([cx, cy, r], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r={Number(r) + 3} fill={star} opacity={0.08} />
          <circle cx={cx} cy={cy} r={Number(r)} fill={star} opacity={i === 3 ? 1 : 0.85} />
          {i === 3 && (
            <circle cx={cx} cy={cy} r={1} fill="#ffffff" opacity={0.95} />
          )}
        </g>
      ))}
    </svg>
  );
}

export function ZodiacBadge({
  sign,
  size = "lg",
  className = "",
}: {
  sign: string;
  size?: "lg" | "md" | "sm";
  className?: string;
}) {
  const dim =
    size === "lg"
      ? "w-24 h-24 md:w-28 md:h-28 p-3"
      : size === "md"
        ? "w-16 h-16 md:w-[4.5rem] md:h-[4.5rem] p-2"
        : "w-12 h-12 p-1.5";

  return (
    <div
      className={`zodiac-badge inline-flex items-center justify-center rounded-2xl ${dim} ${className}`}
      aria-hidden="true"
    >
      <ZodiacSymbolArt
        sign={sign}
        variant={size === "lg" ? "hero" : "badge"}
        className="w-full h-full"
      />
    </div>
  );
}

export function BeatingHeartArt({ className = "w-14 h-14 md:w-20 md:h-20" }: { className?: string }) {
  return (
    <div className={`animate-heartbeat shrink-0 ${className}`} aria-hidden="true">
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full drop-shadow-[0_0_14px_rgba(255,100,130,0.55)]">
        <path
          d="M32 54 C32 54 8 38 8 22 C8 14 14 8 22 8 C26 8 30 10 32 14 C34 10 38 8 42 8 C50 8 56 14 56 22 C56 38 32 54 32 54Z"
          fill="url(#heartGrad)"
          stroke="#ffb8d9"
          strokeWidth="1.2"
        />
        <path
          d="M32 20 C28 14 18 14 18 22 C18 30 32 42 32 42 C32 42 46 30 46 22 C46 14 36 14 32 20Z"
          fill="white"
          opacity="0.15"
        />
        <defs>
          <linearGradient id="heartGrad" x1="8" y1="8" x2="56" y2="54">
            <stop stopColor="#ff6b8a" />
            <stop offset="1" stopColor="#c94b6a" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export function LungsArt({ className = "w-14 h-14 md:w-20 md:h-20" }: { className?: string }) {
  return (
    <div className={`animate-breathe shrink-0 ${className}`} aria-hidden="true">
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full drop-shadow-[0_0_12px_rgba(201,184,255,0.45)]">
        <rect x="30" y="6" width="4" height="14" rx="2" fill="#c9b8ff" opacity="0.9" />
        <path
          d="M30 20 C30 20 10 22 8 38 C6 50 14 58 22 56 C28 54 30 44 30 44 L30 20Z"
          fill="url(#lungLeft)"
          stroke="#c9b8ff"
          strokeWidth="1"
          opacity="0.9"
        />
        <path
          d="M34 20 C34 20 54 22 56 38 C58 50 50 58 42 56 C36 54 34 44 34 44 L34 20Z"
          fill="url(#lungRight)"
          stroke="#c9b8ff"
          strokeWidth="1"
          opacity="0.9"
        />
        <path d="M26 20 H38" stroke="#ffb8d9" strokeWidth="1.5" strokeLinecap="round" />
        <defs>
          <linearGradient id="lungLeft" x1="8" y1="20" x2="30" y2="56">
            <stop stopColor="#e8d4ff" />
            <stop offset="1" stopColor="#9b7ec8" />
          </linearGradient>
          <linearGradient id="lungRight" x1="34" y1="20" x2="56" y2="56">
            <stop stopColor="#e8d4ff" />
            <stop offset="1" stopColor="#9b7ec8" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export function BentoBackground({ exportMode = false }: { exportMode?: boolean }) {
  return (
    <>
      <div
        className="absolute inset-0"
        style={{
          background: exportMode
            ? "linear-gradient(165deg, #08040f 0%, #120820 30%, #1a0e32 55%, #0a0512 100%)"
            : undefined,
        }}
      />
      {!exportMode && <div className="absolute inset-0 bento-bg-gradient" />}
      <div className="absolute inset-0 bento-bg-glow" />
      <div className="absolute inset-0 bento-bg-stars" />
    </>
  );
}
