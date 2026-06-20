"use client";

import ScrollReveal from "../ScrollReveal";
import { ZodiacBadge } from "../art/MagicalDecor";
import type { ZodiacData } from "@/lib/types";

export default function ZodiacCard({ zodiac }: { zodiac: ZodiacData }) {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-24">
      <div className="max-w-2xl mx-auto text-center">
        <ScrollReveal>
          <p className="text-cream/40 uppercase tracking-[0.3em] text-xs mb-4 font-sans">
            The Stars
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-cream mb-16">
            Your Place in the Stars
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="mb-12 flex flex-col items-center">
            <ZodiacBadge sign={zodiac.sunSign} size="lg" className="mb-4" />
            <p className="text-cream/50 text-xs uppercase tracking-widest mb-2 font-sans">
              Sun Sign
            </p>
            <p className="font-serif text-3xl md:text-4xl text-gold">
              {zodiac.sunSign}
            </p>
          </div>
        </ScrollReveal>

        {zodiac.hasExactTime && zodiac.moonSign && zodiac.risingSign ? (
          <ScrollReveal delay={0.3}>
            <div className="grid grid-cols-2 gap-12 border-t border-cream/10 pt-12">
              <div className="flex flex-col items-center">
                <ZodiacBadge sign={zodiac.moonSign} size="md" className="mb-3" />
                <p className="text-cream/50 text-xs uppercase tracking-widest mb-2 font-sans">
                  Moon Sign
                </p>
                <p className="font-serif text-xl md:text-2xl text-cream">
                  {zodiac.moonSign}
                </p>
              </div>
              <div className="flex flex-col items-center">
                <ZodiacBadge sign={zodiac.risingSign} size="md" className="mb-3" />
                <p className="text-cream/50 text-xs uppercase tracking-widest mb-2 font-sans">
                  Rising Sign
                </p>
                <p className="font-serif text-xl md:text-2xl text-cream">
                  {zodiac.risingSign}
                </p>
              </div>
            </div>
          </ScrollReveal>
        ) : (
          <ScrollReveal delay={0.3}>
            <p className="text-cream/30 text-sm font-sans border-t border-cream/10 pt-8">
              Provide your exact birth time to unlock Moon sign & Rising sign
            </p>
          </ScrollReveal>
        )}

        <ScrollReveal delay={0.4}>
          <div className="mt-16 border-t border-cream/10 pt-12">
            <p className="text-cream/50 text-xs uppercase tracking-widest mb-4 font-sans">
              Chinese Zodiac
            </p>
            <p className="font-serif text-2xl md:text-3xl text-cream">
              Year of the{" "}
              <span className="text-gold">{zodiac.chineseZodiac}</span>
            </p>
            <p className="text-cream/50 text-lg mt-2 font-sans">
              {zodiac.chineseElement} element
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
