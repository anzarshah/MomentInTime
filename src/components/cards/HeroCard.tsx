"use client";

import ScrollReveal from "../ScrollReveal";
import type { BirthInput } from "@/lib/types";

export default function HeroCard({ input }: { input: BirthInput }) {
  const d = new Date(input.date + "T12:00:00");
  const monthDay = d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });

  const timeStr = input.time
    ? new Date(`2000-01-01T${input.time}`).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      })
    : "12:00 PM";

  const approx = !input.time;

  return (
    <section className="min-h-screen flex items-center justify-center px-6">
      <ScrollReveal>
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-pink/70 font-display tracking-widest text-sm mb-8">
            ✨ once upon a birth ✨
          </p>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-tight text-cream">
            On {monthDay},
            <br />
            at {timeStr}
            {approx && <span className="text-lavender/50 text-2xl md:text-3xl">*</span>}
            <br />
            in {input.city}...
          </h1>
          {approx && (
            <p className="text-cream/30 text-sm mt-6 font-sans italic">
              * we guessed noon — add a birth time for extra magic
            </p>
          )}
          <p className="text-gold font-display text-xl md:text-2xl mt-12">
            {input.name} arrived, and the stars noticed.
          </p>
          <div className="mt-16 animate-pulse text-2xl text-lavender/40">✦</div>
        </div>
      </ScrollReveal>
    </section>
  );
}
