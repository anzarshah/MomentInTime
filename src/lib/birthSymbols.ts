import type { BirthSymbolsData } from "./types";

interface SymbolEntry {
  name: string;
  meaning: string;
}

const STONES: SymbolEntry[] = [
  { name: "Garnet", meaning: "warmth and quiet devotion" },
  { name: "Amethyst", meaning: "calm, clarity, and soft courage" },
  { name: "Aquamarine", meaning: "serenity and a gentle heart" },
  { name: "Diamond", meaning: "light that lasts" },
  { name: "Emerald", meaning: "hope and renewal" },
  { name: "Pearl", meaning: "grace and quiet radiance" },
  { name: "Ruby", meaning: "passion with a tender edge" },
  { name: "Peridot", meaning: "joy and good fortune" },
  { name: "Sapphire", meaning: "wisdom and loyalty" },
  { name: "Opal", meaning: "creativity and wonder" },
  { name: "Topaz", meaning: "friendship and affection" },
  { name: "Turquoise", meaning: "protection and peace" },
];

const FLOWERS: SymbolEntry[] = [
  { name: "Carnation", meaning: "love and admiration" },
  { name: "Violet", meaning: "modesty and faithfulness" },
  { name: "Daffodil", meaning: "new beginnings and sunshine" },
  { name: "Daisy", meaning: "innocence and cheer" },
  { name: "Lily of the Valley", meaning: "sweetness and happiness" },
  { name: "Rose", meaning: "gentleness that never goes out of style" },
  { name: "Larkspur", meaning: "an open, lighthearted spirit" },
  { name: "Gladiolus", meaning: "strength of character" },
  { name: "Aster", meaning: "patience and elegance" },
  { name: "Marigold", meaning: "warmth and creativity" },
  { name: "Chrysanthemum", meaning: "joy and long life" },
  { name: "Narcissus", meaning: "hope and good wishes" },
];

const TREES: Array<{ start: [number, number]; end: [number, number]; entry: SymbolEntry }> = [
  { start: [12, 24], end: [1, 20], entry: { name: "Birch", meaning: "new beginnings and fresh starts" } },
  { start: [1, 21], end: [2, 17], entry: { name: "Rowan", meaning: "intuition and quiet protection" } },
  { start: [2, 18], end: [3, 17], entry: { name: "Ash", meaning: "connection and grace" } },
  { start: [3, 18], end: [4, 14], entry: { name: "Alder", meaning: "courage and confidence" } },
  { start: [4, 15], end: [5, 12], entry: { name: "Willow", meaning: "dreaming and deep feeling" } },
  { start: [5, 13], end: [6, 9], entry: { name: "Hawthorn", meaning: "hope and happiness" } },
  { start: [6, 10], end: [7, 7], entry: { name: "Oak", meaning: "strength with a soft heart" } },
  { start: [7, 8], end: [8, 4], entry: { name: "Holly", meaning: "warmth and resilience" } },
  { start: [8, 5], end: [9, 1], entry: { name: "Hazel", meaning: "wisdom and creativity" } },
  { start: [9, 2], end: [9, 29], entry: { name: "Vine", meaning: "refinement and beauty" } },
  { start: [9, 30], end: [10, 27], entry: { name: "Ivy", meaning: "loyalty and friendship" } },
  { start: [10, 28], end: [11, 24], entry: { name: "Reed", meaning: "adaptability and harmony" } },
  { start: [11, 25], end: [12, 23], entry: { name: "Elder", meaning: "transformation and kindness" } },
];

function dayOfYear(month: number, day: number): number {
  const daysInMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let total = day;
  for (let m = 1; m < month; m++) total += daysInMonth[m];
  return total;
}

function isInRange(month: number, day: number, start: [number, number], end: [number, number]): boolean {
  const current = dayOfYear(month, day);
  const startDay = dayOfYear(start[0], start[1]);
  const endDay = dayOfYear(end[0], end[1]);

  if (startDay <= endDay) {
    return current >= startDay && current <= endDay;
  }
  return current >= startDay || current <= endDay;
}

function getBirthTree(month: number, day: number): SymbolEntry {
  for (const tree of TREES) {
    if (isInRange(month, day, tree.start, tree.end)) {
      return tree.entry;
    }
  }
  return TREES[0].entry;
}

export function computeBirthSymbols(date: string): BirthSymbolsData {
  const [, month, day] = date.split("-").map(Number);

  return {
    stone: STONES[month - 1],
    flower: FLOWERS[month - 1],
    tree: getBirthTree(month, day),
  };
}
