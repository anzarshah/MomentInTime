"use client";

import ScrollReveal from "../ScrollReveal";
import type { EconomyData } from "@/lib/types";

function Shimmer() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-6 bg-cream/5 rounded w-1/2 mx-auto" />
      <div className="h-4 bg-cream/5 rounded w-1/3 mx-auto" />
    </div>
  );
}

export default function EconomyCard({
  economy,
  loading,
}: {
  economy: EconomyData | null;
  loading: boolean;
}) {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-24">
      <div className="max-w-2xl mx-auto text-center">
        <ScrollReveal>
          <h2 className="font-serif text-3xl md:text-5xl text-cream mb-16">
            The Markets That Day
          </h2>
        </ScrollReveal>

        {loading ? (
          <ScrollReveal delay={0.2}>
            <Shimmer />
            <p className="text-cream/30 text-xs mt-8 font-sans">
              Checking the ticker...
            </p>
          </ScrollReveal>
        ) : economy ? (
          <ScrollReveal delay={0.2}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <p className="text-cream/50 text-xs uppercase tracking-widest mb-3 font-sans">
                  Crude Oil Price
                </p>
                <p className="font-serif text-2xl md:text-3xl text-gold">
                  {economy.oilPriceUSD}
                </p>
              </div>
              <div>
                <p className="text-cream/50 text-xs uppercase tracking-widest mb-3 font-sans">
                  USD to INR
                </p>
                <p className="font-serif text-2xl md:text-3xl text-cream">
                  {economy.usdToINR}
                </p>
              </div>
            </div>
          </ScrollReveal>
        ) : (
          <ScrollReveal delay={0.2}>
            <p className="text-cream/30 font-sans">
              Could not retrieve market data for this date.
            </p>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
