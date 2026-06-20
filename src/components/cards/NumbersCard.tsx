"use client";

import { useState, useEffect } from "react";
import ScrollReveal from "../ScrollReveal";
import type { NumbersData } from "@/lib/types";

function countInWords(n: number): string {
  const parts: string[] = [];
  const billions = Math.floor(n / 1_000_000_000);
  const millions = Math.floor((n % 1_000_000_000) / 1_000_000);
  const thousands = Math.floor((n % 1_000_000) / 1_000);

  if (billions > 0) parts.push(`${numberWord(billions)} billion`);
  if (millions > 0) parts.push(`${numberWord(millions)} million`);
  if (thousands > 0) parts.push(`${numberWord(thousands)} thousand`);

  return parts.join(", ") || "zero";
}

function numberWord(n: number): string {
  const ones = [
    "", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
    "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen",
    "seventeen", "eighteen", "nineteen",
  ];
  const tens = [
    "", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety",
  ];
  if (n === 0) return "zero";
  if (n < 20) return ones[n];
  if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? "-" + ones[n % 10] : "");
  if (n < 1000) {
    return (
      ones[Math.floor(n / 100)] +
      " hundred" +
      (n % 100 ? " and " + numberWord(n % 100) : "")
    );
  }
  return n.toLocaleString();
}

export default function NumbersCard({
  numbers,
  birthDate,
}: {
  numbers: NumbersData;
  birthDate: string;
}) {
  const [liveHours, setLiveHours] = useState(numbers.ageHours);
  const [liveDays, setLiveDays] = useState(numbers.ageDays);
  const [liveHeartbeats, setLiveHeartbeats] = useState(numbers.ageHeartbeats);
  const [liveBreaths, setLiveBreaths] = useState(numbers.ageBreaths);

  useEffect(() => {
    const birth = new Date(birthDate + "T00:00:00");
    const interval = setInterval(() => {
      const now = new Date();
      const diffMs = now.getTime() - birth.getTime();
      setLiveHours(Math.floor(diffMs / 3600000));
      setLiveDays(Math.floor(diffMs / 86400000));
      setLiveHeartbeats(Math.floor((diffMs / 1000) * 72 / 60));
      setLiveBreaths(Math.floor((diffMs / 1000) * 16 / 60));
    }, 1000);
    return () => clearInterval(interval);
  }, [birthDate]);

  const totalEclipses =
    numbers.solarEclipsesSinceBirth + numbers.lunarEclipsesSinceBirth;

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-24">
      <div className="max-w-2xl mx-auto text-center">
        <ScrollReveal>
          <p className="text-cream/40 uppercase tracking-[0.3em] text-xs mb-4 font-sans">
            Since you&apos;ve been here
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-cream mb-4">
            A life in numbers
          </h2>
          <p className="text-cream/35 text-sm font-serif italic mb-16">
            quietly adding up, one day at a time
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="mb-12">
            <p className="text-cream/50 text-xs uppercase tracking-widest mb-2 font-sans">
              You arrived on a
            </p>
            <p className="font-serif text-3xl md:text-4xl text-gold">
              {numbers.dayOfWeek}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-cream/10 pt-12 mb-12">
            <div>
              <p className="font-serif text-4xl md:text-5xl text-cream">
                {numbers.ageYears}
              </p>
              <p className="text-cream/50 text-xs uppercase tracking-widest mt-2 font-sans">
                Years
              </p>
            </div>
            <div>
              <p className="font-serif text-4xl md:text-5xl text-cream tabular-nums">
                {liveDays.toLocaleString()}
              </p>
              <p className="text-cream/50 text-xs uppercase tracking-widest mt-2 font-sans">
                Days
              </p>
            </div>
            <div>
              <p className="font-serif text-4xl md:text-5xl text-cream tabular-nums">
                {liveHours.toLocaleString()}
              </p>
              <p className="text-cream/50 text-xs uppercase tracking-widest mt-2 font-sans">
                Hours
              </p>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.35}>
          <div className="grid grid-cols-2 gap-8 border-t border-cream/10 pt-12 mb-12">
            <div>
              <p className="font-serif text-3xl md:text-4xl text-cream">
                {numbers.seasonsLived.toLocaleString()}
              </p>
              <p className="text-cream/50 text-xs uppercase tracking-widest mt-2 font-sans">
                Seasons lived
              </p>
              <p className="text-cream/25 text-xs mt-1 font-serif italic">
                springs, summers, autumns, winters
              </p>
            </div>
            <div>
              <p className="font-serif text-3xl md:text-4xl text-cream">
                {numbers.leapYearsLived}
              </p>
              <p className="text-cream/50 text-xs uppercase tracking-widest mt-2 font-sans">
                Leap years
              </p>
              <p className="text-cream/25 text-xs mt-1 font-serif italic">
                extra days the calendar tucked in
              </p>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <div className="border-t border-cream/10 pt-12 mb-12">
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="text-4xl md:text-5xl animate-heartbeat" aria-hidden="true">
                💗
              </span>
              <p className="font-serif text-3xl md:text-4xl text-cream tabular-nums">
                {liveHeartbeats.toLocaleString()}
              </p>
            </div>
            <p className="text-cream/40 text-sm italic mt-3 font-serif">
              {countInWords(liveHeartbeats)} heartbeats
            </p>
            <p className="text-cream/25 text-xs mt-2 font-sans">
              and counting
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.45}>
          <div className="border-t border-cream/10 pt-12 mb-12">
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="text-4xl md:text-5xl animate-breathe" aria-hidden="true">
                🫁
              </span>
              <p className="font-serif text-3xl md:text-4xl text-gold tabular-nums">
                {liveBreaths.toLocaleString()}
              </p>
            </div>
            <p className="text-cream/40 text-sm italic mt-3 font-serif">
              {countInWords(liveBreaths)} breaths of air
            </p>
            <p className="text-cream/25 text-xs mt-2 font-sans">
              soft, steady, yours
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.5}>
          <div className="border-t border-cream/10 pt-12 mb-12">
            <p className="font-serif text-4xl md:text-5xl text-gold">
              {numbers.fullMoonsSince.toLocaleString()}
            </p>
            <p className="text-cream/50 text-xs uppercase tracking-widest mt-2 font-sans">
              Full moons since your birth
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.55}>
          <div className="border-t border-cream/10 pt-12 mb-12">
            <p className="font-serif text-3xl md:text-4xl text-cream">
              {totalEclipses}
            </p>
            <p className="text-cream/50 text-xs uppercase tracking-widest mt-2 font-sans">
              Eclipses in your lifetime
            </p>
            <p className="text-cream/35 text-sm mt-3 font-sans">
              {numbers.solarEclipsesSinceBirth} solar ·{" "}
              {numbers.lunarEclipsesSinceBirth} lunar
            </p>
            <p className="text-cream/25 text-xs mt-1 font-serif italic">
              the sky putting on a show while you&apos;ve been here
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.6}>
          <div className="border-t border-cream/10 pt-12">
            <p className="text-cream/50 text-xs uppercase tracking-widest mb-4 font-sans">
              The world has grown
            </p>
            <p className="font-serif text-2xl md:text-3xl text-gold leading-relaxed">
              by {numbers.worldPopulationAdded} people
            </p>
            <p className="text-cream/35 text-sm mt-4 font-serif italic leading-relaxed">
              since the day you arrived — and somehow, out of all of them,
              <br className="hidden md:block" />
              the universe made you.
            </p>
            <div className="grid grid-cols-2 gap-8 mt-12 pt-8 border-t border-cream/5">
              <div>
                <p className="text-cream/40 text-xs uppercase tracking-widest mb-2 font-sans">
                  Then
                </p>
                <p className="font-serif text-lg md:text-xl text-cream/70">
                  {numbers.worldPopulationThen}
                </p>
              </div>
              <div>
                <p className="text-cream/40 text-xs uppercase tracking-widest mb-2 font-sans">
                  Now
                </p>
                <p className="font-serif text-lg md:text-xl text-cream">
                  {numbers.worldPopulationNow}
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
