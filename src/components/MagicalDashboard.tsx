"use client";

import { useCallback, useState, useEffect } from "react";
import { motion } from "framer-motion";
import MagicalBentoGrid, { type MagicalBentoProps } from "./MagicalBentoGrid";
import MagicalScrollStory from "./MagicalScrollStory";
import { captureBentoPng } from "@/lib/exportImage";
import type { BirthInput } from "@/lib/types";

interface Props extends MagicalBentoProps {
  input: BirthInput;
}

export default function MagicalDashboard({
  input,
  numbers,
  apiLoading = false,
  ...bentoProps
}: Props) {
  const [liveNumbers, setLiveNumbers] = useState(numbers);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    const birth = new Date(input.date + "T00:00:00");
    const interval = setInterval(() => {
      const now = new Date();
      const diffMs = now.getTime() - birth.getTime();
      setLiveNumbers((prev) => ({
        ...prev,
        ageBreaths: Math.floor((diffMs / 1000) * 16 / 60),
        ageHeartbeats: Math.floor((diffMs / 1000) * 72 / 60),
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, [input.date]);

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
        // cancelled
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert("Link copied!");
    }
  }, [input.name, formatted]);

  const handleDownload = useCallback(async () => {
    const bentoEl = document.getElementById("bento-summary");
    if (!bentoEl) return;
    if (apiLoading) {
      alert("Still loading your culture & history — give it a moment, then try again.");
      return;
    }

    setExporting(true);
    try {
      const dataUrl = await captureBentoPng(bentoEl);
      const link = document.createElement("a");
      link.download = `${input.name.replace(/\s+/g, "-")}-moment-in-time.png`;
      link.href = dataUrl;
      link.click();
    } catch {
      alert("Download failed — please try again.");
    } finally {
      setExporting(false);
    }
  }, [input.name, apiLoading]);

  const sharedProps = {
    input,
    numbers: liveNumbers,
    apiLoading,
    ...bentoProps,
  };

  return (
    <motion.div
      id="moment-story"
      className="relative z-10 w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <MagicalScrollStory {...sharedProps} />

      <div className="sticky bottom-0 z-20 px-4 sm:px-8 lg:px-12 pb-6 pt-8 w-full pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-[#08040f] from-40% via-[#08040f]/80 to-transparent pointer-events-none" />
        <div className="relative w-full flex flex-col sm:flex-row gap-3 justify-center items-center pointer-events-auto">
          <button onClick={handleShare} className="magic-btn-secondary px-8 py-3 w-full sm:w-auto">
            Share ✿
          </button>
          <button
            onClick={handleDownload}
            disabled={apiLoading || exporting}
            className="magic-btn px-8 py-3 w-full sm:w-auto"
          >
            {apiLoading ? "Loading card…" : exporting ? "Saving card…" : "Save bento card ✨"}
          </button>
        </div>
        <p className="relative text-center text-cream/40 text-xs mt-3 font-sans pointer-events-auto">
          scroll to explore · download saves your bento summary
        </p>
      </div>

      <div className="bento-export-root">
        <MagicalBentoGrid {...sharedProps} variant="export" />
      </div>
    </motion.div>
  );
}
