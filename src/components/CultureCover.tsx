"use client";

import { absoluteProxiedImageUrl } from "@/lib/exportImage";

interface CultureCoverProps {
  title: string;
  coverUrl: string | null | undefined;
  label: string;
  size?: "sm" | "lg";
  exportMode?: boolean;
}

export default function CultureCover({
  title,
  coverUrl,
  label,
  size = "sm",
  exportMode = false,
}: CultureCoverProps) {
  const src = coverUrl
    ? exportMode
      ? absoluteProxiedImageUrl(coverUrl)
      : coverUrl
    : null;
  const isLarge = size === "lg";

  return (
    <figure className={`culture-cover-card ${isLarge ? "culture-cover-card-lg" : ""}`}>
      <div
        className={`culture-cover-frame ${isLarge ? "culture-cover-frame-lg" : ""} ${
          exportMode ? "culture-cover-frame-export" : ""
        }`}
      >
        {src ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={`${title} cover`}
              className={`culture-cover-image ${exportMode ? "culture-cover-image-export" : ""}`}
              loading={exportMode ? "eager" : "lazy"}
              decoding="async"
            />
            {!exportMode && (
              <>
                <div className="culture-cover-tint" aria-hidden="true" />
                <div className="culture-cover-shine" aria-hidden="true" />
              </>
            )}
          </>
        ) : (
          <div className="culture-cover-placeholder" aria-hidden="true">
            <span>✦</span>
          </div>
        )}
      </div>
      <figcaption className={`culture-cover-caption ${isLarge ? "culture-cover-caption-lg" : ""}`}>
        <p
          className={`uppercase tracking-[0.18em] text-lavender/65 font-sans ${
            isLarge ? "text-[10px] md:text-xs" : "text-[9px] md:text-[10px]"
          }`}
        >
          {label}
        </p>
        <p className="culture-cover-title font-serif leading-snug">
          {title}
        </p>
      </figcaption>
    </figure>
  );
}
