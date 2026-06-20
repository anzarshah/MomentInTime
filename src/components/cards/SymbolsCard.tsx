"use client";

import type { ReactNode } from "react";
import ScrollReveal from "../ScrollReveal";
import { FlowerArt, GemArt, TreeArt } from "../art/MagicalDecor";
import type { BirthSymbolsData } from "@/lib/types";

function SymbolItem({
  label,
  name,
  meaning,
  delay,
  art,
}: {
  label: string;
  name: string;
  meaning: string;
  delay: number;
  art: ReactNode;
}) {
  return (
    <ScrollReveal delay={delay}>
      <div className="py-10 px-6">
        <div className="flex justify-center mb-4">{art}</div>
        <p className="text-cream/40 text-xs uppercase tracking-[0.25em] mb-3 font-sans">
          {label}
        </p>
        <p className="font-serif text-2xl md:text-3xl text-gold mb-3">{name}</p>
        <p className="text-cream/50 text-sm italic font-serif leading-relaxed max-w-xs mx-auto">
          {meaning}
        </p>
      </div>
    </ScrollReveal>
  );
}

export default function SymbolsCard({ symbols }: { symbols: BirthSymbolsData }) {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-24">
      <div className="max-w-2xl mx-auto text-center">
        <ScrollReveal>
          <p className="text-cream/40 uppercase tracking-[0.3em] text-xs mb-4 font-sans">
            Yours from the start
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-cream mb-4">
            Little gifts of your day
          </h2>
          <p className="text-cream/35 text-sm font-serif italic mb-16">
            the quiet things the calendar already knew about you
          </p>
        </ScrollReveal>

        <div className="divide-y divide-cream/10 border-y border-cream/10">
          <SymbolItem
            label="Birthstone"
            name={symbols.stone.name}
            meaning={symbols.stone.meaning}
            delay={0.15}
            art={<GemArt className="w-16 h-16 md:w-20 md:h-20 opacity-90" />}
          />
          <SymbolItem
            label="Birth flower"
            name={symbols.flower.name}
            meaning={symbols.flower.meaning}
            delay={0.25}
            art={<FlowerArt className="w-16 h-16 md:w-20 md:h-20" />}
          />
          <SymbolItem
            label="Birth tree"
            name={symbols.tree.name}
            meaning={symbols.tree.meaning}
            delay={0.35}
            art={<TreeArt className="w-16 h-16 md:w-20 md:h-20" />}
          />
        </div>
      </div>
    </section>
  );
}
