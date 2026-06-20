"use client";

import ScrollReveal from "../ScrollReveal";
import type { EclipseData } from "@/lib/types";

export default function EclipseCard({ eclipses }: { eclipses: EclipseData }) {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-24">
      <div className="max-w-2xl mx-auto text-center">
        <ScrollReveal>
          <h2 className="font-serif text-3xl md:text-5xl text-cream mb-16">
            Eclipses Around Your Birth
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <ScrollReveal delay={0.2}>
              <p className="text-cream/50 text-xs uppercase tracking-widest mb-6 font-sans">
                Solar Eclipses
              </p>
            </ScrollReveal>
            {eclipses.previousSolar && (
              <ScrollReveal delay={0.25}>
                <div className="mb-8">
                  <p className="text-cream/40 text-xs uppercase tracking-widest mb-1 font-sans">
                    Before
                  </p>
                  <p className="font-serif text-lg text-cream">
                    {eclipses.previousSolar.date}
                  </p>
                  <p className="text-gold/70 text-sm font-sans mt-1">
                    {eclipses.previousSolar.type}
                  </p>
                </div>
              </ScrollReveal>
            )}
            {eclipses.nextSolar && (
              <ScrollReveal delay={0.3}>
                <div>
                  <p className="text-cream/40 text-xs uppercase tracking-widest mb-1 font-sans">
                    After
                  </p>
                  <p className="font-serif text-lg text-cream">
                    {eclipses.nextSolar.date}
                  </p>
                  <p className="text-gold/70 text-sm font-sans mt-1">
                    {eclipses.nextSolar.type}
                  </p>
                </div>
              </ScrollReveal>
            )}
          </div>

          <div>
            <ScrollReveal delay={0.35}>
              <p className="text-cream/50 text-xs uppercase tracking-widest mb-6 font-sans">
                Lunar Eclipses
              </p>
            </ScrollReveal>
            {eclipses.previousLunar && (
              <ScrollReveal delay={0.4}>
                <div className="mb-8">
                  <p className="text-cream/40 text-xs uppercase tracking-widest mb-1 font-sans">
                    Before
                  </p>
                  <p className="font-serif text-lg text-cream">
                    {eclipses.previousLunar.date}
                  </p>
                  <p className="text-gold/70 text-sm font-sans mt-1">
                    {eclipses.previousLunar.type}
                  </p>
                </div>
              </ScrollReveal>
            )}
            {eclipses.nextLunar && (
              <ScrollReveal delay={0.45}>
                <div>
                  <p className="text-cream/40 text-xs uppercase tracking-widest mb-1 font-sans">
                    After
                  </p>
                  <p className="font-serif text-lg text-cream">
                    {eclipses.nextLunar.date}
                  </p>
                  <p className="text-gold/70 text-sm font-sans mt-1">
                    {eclipses.nextLunar.type}
                  </p>
                </div>
              </ScrollReveal>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
