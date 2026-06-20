"use client";

import ScrollReveal from "../ScrollReveal";
import type { HistoryData } from "@/lib/types";

function Shimmer() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-6 bg-cream/5 rounded w-3/4 mx-auto" />
      <div className="h-4 bg-cream/5 rounded w-1/2 mx-auto" />
      <div className="h-6 bg-cream/5 rounded w-2/3 mx-auto mt-8" />
      <div className="h-4 bg-cream/5 rounded w-1/2 mx-auto" />
    </div>
  );
}

export default function HistoryCard({
  history,
  loading,
}: {
  history: HistoryData | null;
  loading: boolean;
}) {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-24">
      <div className="max-w-2xl mx-auto text-center">
        <ScrollReveal>
          <p className="text-cream/40 uppercase tracking-[0.3em] text-xs mb-4 font-sans">
            The Record
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-cream mb-16">
            That Day in History
          </h2>
        </ScrollReveal>

        {loading ? (
          <ScrollReveal delay={0.2}>
            <Shimmer />
            <p className="text-cream/30 text-xs mt-8 font-sans">
              Searching the archives...
            </p>
          </ScrollReveal>
        ) : history ? (
          <>
            <ScrollReveal delay={0.2}>
              <div className="mb-16">
                <p className="text-cream/50 text-xs uppercase tracking-widest mb-4 font-sans">
                  Born on this day
                </p>
                <p className="font-serif text-2xl md:text-3xl text-gold">
                  {history.famousBirthday}
                </p>
                <p className="text-cream/50 text-sm mt-2 font-sans">
                  {history.famousBirthdayYear}
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="border-t border-cream/10 pt-12 mb-12">
                <p className="text-cream/50 text-xs uppercase tracking-widest mb-4 font-sans">
                  On this day in history
                </p>
                <p className="font-serif text-xl md:text-2xl text-cream leading-relaxed">
                  {history.historicalEvent}
                </p>
                <p className="text-cream/50 text-sm mt-2 font-sans">
                  {history.historicalEventYear}
                </p>
              </div>
            </ScrollReveal>

            {history.worldEventThatYear && history.worldEventThatYear !== "Unknown" && (
              <ScrollReveal delay={0.35}>
                <div className="border-t border-cream/10 pt-12 mb-12">
                  <p className="text-cream/50 text-xs uppercase tracking-widest mb-4 font-sans">
                    The world that year
                  </p>
                  <p className="font-serif text-lg md:text-xl text-cream/90 leading-relaxed">
                    {history.worldEventThatYear}
                  </p>
                </div>
              </ScrollReveal>
            )}

            {history.notableDeath && history.notableDeath !== "Unknown" && (
              <ScrollReveal delay={0.4}>
                <div className="border-t border-cream/10 pt-12">
                  <p className="text-cream/50 text-xs uppercase tracking-widest mb-4 font-sans">
                    Lost on this day
                  </p>
                  <p className="font-serif text-xl md:text-2xl text-cream/80">
                    {history.notableDeath}
                  </p>
                  <p className="text-cream/50 text-sm mt-2 font-sans">
                    {history.notableDeathYear}
                  </p>
                </div>
              </ScrollReveal>
            )}
          </>
        ) : (
          <ScrollReveal delay={0.2}>
            <p className="text-cream/30 font-sans">
              Could not retrieve historical data for this date.
            </p>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
