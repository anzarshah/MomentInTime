/** Normalized star positions (0–100) and line pairs for mini constellation charts. */
export interface PatternStar {
  id: string;
  name: string;
  x: number;
  y: number;
}

export interface ConstellationPattern {
  stars: PatternStar[];
  lines: [string, string][];
}

export const CONSTELLATION_PATTERNS: Record<string, ConstellationPattern> = {
  Auriga: {
    stars: [
      { id: "capella", name: "Capella", x: 50, y: 18 },
      { id: "a", name: "", x: 28, y: 42 },
      { id: "b", name: "", x: 72, y: 42 },
      { id: "c", name: "", x: 38, y: 68 },
      { id: "d", name: "", x: 62, y: 68 },
    ],
    lines: [
      ["capella", "a"],
      ["capella", "b"],
      ["a", "c"],
      ["b", "d"],
      ["c", "d"],
    ],
  },
  Lyra: {
    stars: [
      { id: "vega", name: "Vega", x: 50, y: 15 },
      { id: "a", name: "", x: 35, y: 55 },
      { id: "b", name: "", x: 65, y: 55 },
      { id: "c", name: "", x: 50, y: 82 },
    ],
    lines: [
      ["vega", "a"],
      ["vega", "b"],
      ["a", "c"],
      ["b", "c"],
    ],
  },
  Orion: {
    stars: [
      { id: "betelgeuse", name: "Betelgeuse", x: 22, y: 22 },
      { id: "bellatrix", name: "Bellatrix", x: 78, y: 28 },
      { id: "alnilam", name: "Alnilam", x: 50, y: 52 },
      { id: "rigel", name: "Rigel", x: 62, y: 82 },
    ],
    lines: [
      ["betelgeuse", "bellatrix"],
      ["betelgeuse", "alnilam"],
      ["bellatrix", "alnilam"],
      ["alnilam", "rigel"],
    ],
  },
  Gemini: {
    stars: [
      { id: "pollux", name: "Pollux", x: 38, y: 25 },
      { id: "castor", name: "Castor", x: 62, y: 20 },
      { id: "a", name: "", x: 30, y: 55 },
      { id: "b", name: "", x: 70, y: 55 },
      { id: "c", name: "", x: 35, y: 85 },
      { id: "d", name: "", x: 65, y: 85 },
    ],
    lines: [
      ["pollux", "a"],
      ["castor", "b"],
      ["a", "c"],
      ["b", "d"],
    ],
  },
  "Canis Major": {
    stars: [
      { id: "sirius", name: "Sirius", x: 50, y: 75 },
      { id: "a", name: "", x: 35, y: 45 },
      { id: "b", name: "", x: 65, y: 35 },
      { id: "c", name: "", x: 72, y: 58 },
    ],
    lines: [
      ["sirius", "a"],
      ["sirius", "c"],
      ["a", "b"],
      ["b", "c"],
    ],
  },
  Leo: {
    stars: [
      { id: "regulus", name: "Regulus", x: 25, y: 70 },
      { id: "a", name: "", x: 45, y: 45 },
      { id: "b", name: "", x: 68, y: 30 },
      { id: "c", name: "", x: 82, y: 50 },
    ],
    lines: [
      ["regulus", "a"],
      ["a", "b"],
      ["b", "c"],
    ],
  },
  "Ursa Major": {
    stars: [
      { id: "a", name: "", x: 15, y: 35 },
      { id: "b", name: "", x: 30, y: 28 },
      { id: "c", name: "", x: 45, y: 32 },
      { id: "d", name: "", x: 58, y: 42 },
      { id: "e", name: "", x: 72, y: 38 },
      { id: "f", name: "", x: 85, y: 48 },
      { id: "alioth", name: "Alioth", x: 58, y: 42 },
    ],
    lines: [
      ["a", "b"],
      ["b", "c"],
      ["c", "d"],
      ["d", "e"],
      ["e", "f"],
    ],
  },
  Cygnus: {
    stars: [
      { id: "deneb", name: "Deneb", x: 50, y: 12 },
      { id: "a", name: "", x: 50, y: 45 },
      { id: "b", name: "", x: 28, y: 72 },
      { id: "c", name: "", x: 72, y: 72 },
    ],
    lines: [
      ["deneb", "a"],
      ["a", "b"],
      ["a", "c"],
    ],
  },
  Taurus: {
    stars: [
      { id: "aldebaran", name: "Aldebaran", x: 45, y: 55 },
      { id: "a", name: "", x: 25, y: 30 },
      { id: "b", name: "", x: 70, y: 28 },
      { id: "c", name: "", x: 55, y: 82 },
    ],
    lines: [
      ["aldebaran", "a"],
      ["aldebaran", "b"],
      ["aldebaran", "c"],
    ],
  },
  Boötes: {
    stars: [
      { id: "arcturus", name: "Arcturus", x: 48, y: 55 },
      { id: "a", name: "", x: 30, y: 35 },
      { id: "b", name: "", x: 68, y: 38 },
      { id: "c", name: "", x: 55, y: 82 },
    ],
    lines: [
      ["arcturus", "a"],
      ["arcturus", "b"],
      ["arcturus", "c"],
    ],
  },
  Bootes: {
    stars: [
      { id: "arcturus", name: "Arcturus", x: 48, y: 55 },
      { id: "a", name: "", x: 30, y: 35 },
      { id: "b", name: "", x: 68, y: 38 },
      { id: "c", name: "", x: 55, y: 82 },
    ],
    lines: [
      ["arcturus", "a"],
      ["arcturus", "b"],
      ["arcturus", "c"],
    ],
  },
  Virgo: {
    stars: [
      { id: "spica", name: "Spica", x: 52, y: 72 },
      { id: "a", name: "", x: 38, y: 45 },
      { id: "b", name: "", x: 62, y: 38 },
      { id: "c", name: "", x: 48, y: 22 },
      { id: "d", name: "", x: 72, y: 55 },
    ],
    lines: [
      ["c", "b"],
      ["b", "a"],
      ["a", "spica"],
      ["b", "d"],
    ],
  },
  Draco: {
    stars: [
      { id: "a", name: "", x: 18, y: 55 },
      { id: "b", name: "", x: 32, y: 42 },
      { id: "c", name: "", x: 48, y: 35 },
      { id: "d", name: "", x: 62, y: 28 },
      { id: "e", name: "", x: 78, y: 22 },
      { id: "f", name: "", x: 85, y: 38 },
    ],
    lines: [
      ["a", "b"],
      ["b", "c"],
      ["c", "d"],
      ["d", "e"],
      ["e", "f"],
    ],
  },
  "Canes Venatici": {
    stars: [
      { id: "a", name: "", x: 35, y: 42 },
      { id: "b", name: "", x: 55, y: 38 },
      { id: "c", name: "", x: 68, y: 52 },
    ],
    lines: [
      ["a", "b"],
      ["b", "c"],
    ],
  },
};

export function patternForStar(starName: string, constellation: string): ConstellationPattern | null {
  const byConstellation = CONSTELLATION_PATTERNS[constellation];
  if (byConstellation) return byConstellation;

  const normalized = starName.toLowerCase().replace(/\s+/g, "");
  for (const pattern of Object.values(CONSTELLATION_PATTERNS)) {
    if (pattern.stars.some((s) => s.name.toLowerCase().replace(/\s+/g, "") === normalized)) {
      return pattern;
    }
  }
  return null;
}

export function highlightStarId(starName: string, pattern: ConstellationPattern): string | null {
  const normalized = starName.toLowerCase();
  const match = pattern.stars.find(
    (s) => s.name && s.name.toLowerCase() === normalized
  );
  return match?.id ?? null;
}
