"use client";

import { useCallback } from "react";
import ScrollReveal from "../ScrollReveal";
import BentoSummary, { type BentoSummaryProps } from "../BentoSummary";
import type { BirthInput } from "@/lib/types";

interface Props extends BentoSummaryProps {
  input: BirthInput;
}

export default function ClosingCard({
  input,
  ...summaryProps
}: Props) {
  const d = new Date(input.date + "T12:00:00");
  const formatted = d.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

  const handleShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${input.name}'s Moment in Time`,
          text: `A little snapshot of the universe on ${formatted}`,
          url: window.location.href,
        });
      } catch {
        // user cancelled share
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  }, [input.name, formatted]);

  const handleDownload = useCallback(async () => {
    const bentoEl = document.getElementById("bento-summary");
    if (!bentoEl) return;

    const { toPng } = await import("html-to-image");

    try {
      const dataUrl = await toPng(bentoEl, {
        cacheBust: true,
        pixelRatio: 2,
        width: 1080,
        height: 1350,
      });
      const link = document.createElement("a");
      link.download = `${input.name.replace(/\s+/g, "-")}-moment-bento.png`;
      link.href = dataUrl;
      link.click();
    } catch {
      alert("Download failed — please try again.");
    }
  }, [input.name]);

  return (
    <>
      <BentoSummary input={input} {...summaryProps} />

      <section className="min-h-screen flex items-center justify-center px-6 py-24">
        <div className="max-w-2xl mx-auto text-center">
          <ScrollReveal>
            <p className="font-display text-pink/70 text-sm tracking-widest mb-4">
              ✦ the end, but also the beginning ✦
            </p>
            <p className="font-serif text-2xl md:text-4xl text-cream leading-relaxed">
              {formatted}
            </p>
            <p className="text-lavender/60 text-sm mt-8 font-sans italic">
              the day the world got a little brighter — hello, {input.name}.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="mt-16 flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={handleShare} className="magic-btn-secondary px-8 py-3">
                Share ✿
              </button>
              <button onClick={handleDownload} className="magic-btn px-8 py-3">
                Download bento summary ✨
              </button>
            </div>
            <p className="text-cream/30 text-xs mt-6 font-sans">
              a cute little card with all your stats — perfect to save or send
            </p>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
