"use client";

export default function FlyingHoneyBee() {
  return (
    <div className="flying-bee" aria-hidden="true">
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Wings */}
        <ellipse
          className="bee-wing-left"
          cx="16"
          cy="20"
          rx="10"
          ry="6"
          fill="rgba(255, 248, 252, 0.55)"
          stroke="rgba(201, 184, 255, 0.6)"
          strokeWidth="0.8"
        />
        <ellipse
          className="bee-wing-right"
          cx="32"
          cy="20"
          rx="10"
          ry="6"
          fill="rgba(255, 248, 252, 0.55)"
          stroke="rgba(201, 184, 255, 0.6)"
          strokeWidth="0.8"
        />
        {/* Body stripes */}
        <ellipse cx="24" cy="26" rx="9" ry="11" fill="#ffc857" />
        <rect x="15" y="22" width="18" height="3.5" rx="1.5" fill="#2a1445" opacity="0.85" />
        <rect x="15" y="28" width="18" height="3.5" rx="1.5" fill="#2a1445" opacity="0.85" />
        <rect x="15" y="34" width="18" height="3" rx="1.5" fill="#2a1445" opacity="0.7" />
        {/* Head */}
        <circle cx="24" cy="14" r="7" fill="#ffc857" />
        <circle cx="21.5" cy="13" r="1.8" fill="#2a1445" />
        <circle cx="26.5" cy="13" r="1.8" fill="#2a1445" />
        <circle cx="21.8" cy="12.5" r="0.6" fill="#fff8fc" />
        <circle cx="26.8" cy="12.5" r="0.6" fill="#fff8fc" />
        {/* Cheek blush */}
        <circle cx="18" cy="15.5" r="2" fill="#ffb8d9" opacity="0.45" />
        <circle cx="30" cy="15.5" r="2" fill="#ffb8d9" opacity="0.45" />
        {/* Smile */}
        <path
          d="M21 16.5 Q24 18.5 27 16.5"
          stroke="#2a1445"
          strokeWidth="0.9"
          strokeLinecap="round"
          fill="none"
        />
        {/* Antennae */}
        <path
          d="M20 8 Q18 4 16 2"
          stroke="#2a1445"
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M28 8 Q30 4 32 2"
          stroke="#2a1445"
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="16" cy="2" r="1.2" fill="#ffb8d9" />
        <circle cx="32" cy="2" r="1.2" fill="#ffb8d9" />
        {/* Stinger */}
        <path d="M24 37 L24 42" stroke="#2a1445" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    </div>
  );
}
