import * as Astronomy from "astronomy-engine";
import { BRIGHT_STARS } from "./brightStars";
import type { MoonData, SunData, ConstellationData, EclipseData } from "./types";

function makeTime(date: string, time: string | null): Date {
  const [year, month, day] = date.split("-").map(Number);
  const [hours, minutes] = time ? time.split(":").map(Number) : [12, 0];
  return new Date(Date.UTC(year, month - 1, day, hours, minutes, 0));
}

export function computeMoon(date: string, time: string | null): MoonData {
  const dt = makeTime(date, time);
  const illum = Astronomy.Illumination(Astronomy.Body.Moon, dt);
  const dist = Astronomy.GeoVector(Astronomy.Body.Moon, dt, true);

  const distKm = Math.sqrt(dist.x ** 2 + dist.y ** 2 + dist.z ** 2) * 149597870.7;
  const avgDist = 384400;
  const distPercent = ((distKm - avgDist) / avgDist) * 100;

  const moonPhaseValue = Astronomy.MoonPhase(dt);

  let phaseName: string;
  if (moonPhaseValue < 11.25) phaseName = "New Moon";
  else if (moonPhaseValue < 78.75) phaseName = "Waxing Crescent";
  else if (moonPhaseValue < 101.25) phaseName = "First Quarter";
  else if (moonPhaseValue < 168.75) phaseName = "Waxing Gibbous";
  else if (moonPhaseValue < 191.25) phaseName = "Full Moon";
  else if (moonPhaseValue < 258.75) phaseName = "Waning Gibbous";
  else if (moonPhaseValue < 281.25) phaseName = "Third Quarter";
  else if (moonPhaseValue < 348.75) phaseName = "Waning Crescent";
  else phaseName = "New Moon";

  return {
    phase: phaseName,
    illumination: Math.round(illum.phase_fraction * 100),
    phaseAngle: moonPhaseValue,
    distanceKm: Math.round(distKm),
    averageDistanceKm: avgDist,
    distancePercent: Math.round(distPercent * 10) / 10,
  };
}

export function computeSun(
  date: string,
  lat: number,
  lng: number
): SunData {
  const [year, month, day] = date.split("-").map(Number);
  const observer = new Astronomy.Observer(lat, lng, 0);
  const dt = new Date(Date.UTC(year, month - 1, day, 0, 0, 0));

  let sunrise = "N/A";
  let sunset = "N/A";
  let dayLengthMinutes = 0;

  try {
    const riseResult = Astronomy.SearchRiseSet(Astronomy.Body.Sun, observer, +1, dt, 1);

    if (riseResult) {
      const setResult = Astronomy.SearchRiseSet(Astronomy.Body.Sun, observer, -1, riseResult.date, 1);

      if (setResult) {
        const riseDate = riseResult.date;
        const setDate = setResult.date;
        sunrise = formatTimeLocal(riseDate, lng);
        sunset = formatTimeLocal(setDate, lng);
        dayLengthMinutes = Math.round((setDate.getTime() - riseDate.getTime()) / 60000);
      }
    }
  } catch {
    // polar regions may not have sunrise/sunset
  }

  return { sunrise, sunset, dayLengthMinutes };
}

export function computeConstellations(
  date: string,
  time: string | null,
  lat: number,
  lng: number
): ConstellationData {
  const hasExactTime = time !== null;
  const dt = makeTime(date, time);

  const visible: Set<string> = new Set();
  let zenithConstellation: string | null = null;
  let zenithStar: string | null = null;

  try {
    const st = Astronomy.SiderealTime(dt);
    const raZenith = (st + lng / 15 + 24) % 24;
    const decZenith = lat;

    const zenithConst = Astronomy.Constellation(raZenith, decZenith);
    visible.add(zenithConst.name);
    zenithConstellation = zenithConst.name;

    const brightest = findBrightestNearZenith(dt, lat, lng);
    zenithStar = brightest?.name ?? null;

    const offsets = [
      { dRA: 0, dDec: 30 }, { dRA: 0, dDec: -30 },
      { dRA: 2, dDec: 0 }, { dRA: -2, dDec: 0 },
      { dRA: 2, dDec: 20 }, { dRA: -2, dDec: 20 },
      { dRA: 2, dDec: -20 }, { dRA: -2, dDec: -20 },
      { dRA: 1, dDec: 15 }, { dRA: -1, dDec: -15 },
    ];

    for (const off of offsets) {
      const ra = ((raZenith + off.dRA) % 24 + 24) % 24;
      const dec = Math.max(-90, Math.min(90, decZenith + off.dDec));
      try {
        const c = Astronomy.Constellation(ra, dec);
        visible.add(c.name);
      } catch {
        // skip
      }
    }
  } catch {
    // fallback
  }

  return {
    overhead: Array.from(visible).slice(0, 6),
    prominentStar: zenithStar ?? zenithConstellation,
    zenithStar,
    zenithConstellation,
    hasExactTime,
  };
}

function findBrightestNearZenith(
  dt: Date,
  lat: number,
  lng: number
): { name: string; constellation: string; altitude: number } | null {
  const observer = new Astronomy.Observer(lat, lng, 0);
  let best: { name: string; constellation: string; altitude: number } | null = null;

  for (const star of BRIGHT_STARS) {
    try {
      const hor = Astronomy.Horizon(dt, observer, star.ra, star.dec, "normal");
      const altitude = hor.altitude * (180 / Math.PI);
      if (!best || altitude > best.altitude) {
        best = { name: star.name, constellation: star.constellation, altitude };
      }
    } catch {
      // skip invalid coordinates
    }
  }

  return best;
}

function eclipseKindToString(kind: Astronomy.EclipseKind): string {
  switch (kind) {
    case Astronomy.EclipseKind.Penumbral: return "Penumbral";
    case Astronomy.EclipseKind.Partial: return "Partial";
    case Astronomy.EclipseKind.Annular: return "Annular";
    case Astronomy.EclipseKind.Total: return "Total";
    default: return "Unknown";
  }
}

function formatEclipseDate(d: Date): string {
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function computeEclipses(date: string): EclipseData {
  const [year, month, day] = date.split("-").map(Number);
  const birthDate = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));

  let previousSolar: EclipseData["previousSolar"] = null;
  let nextSolar: EclipseData["nextSolar"] = null;
  let previousLunar: EclipseData["previousLunar"] = null;
  let nextLunar: EclipseData["nextLunar"] = null;

  try {
    // Next solar eclipse after birth
    const nextSolarResult = Astronomy.SearchGlobalSolarEclipse(birthDate);
    if (nextSolarResult) {
      nextSolar = {
        date: formatEclipseDate(nextSolarResult.peak.date),
        type: eclipseKindToString(nextSolarResult.kind),
      };
    }

    // Previous solar: search backwards by searching from 2 years before, walking forward
    const twoYearsBefore = new Date(birthDate.getTime() - 2 * 365.25 * 86400000);
    let solarSearch = Astronomy.SearchGlobalSolarEclipse(twoYearsBefore);
    let lastSolarBefore = solarSearch;
    for (let i = 0; i < 20; i++) {
      if (solarSearch.peak.date.getTime() >= birthDate.getTime()) break;
      lastSolarBefore = solarSearch;
      solarSearch = Astronomy.NextGlobalSolarEclipse(solarSearch.peak.date);
    }
    if (lastSolarBefore.peak.date.getTime() < birthDate.getTime()) {
      previousSolar = {
        date: formatEclipseDate(lastSolarBefore.peak.date),
        type: eclipseKindToString(lastSolarBefore.kind),
      };
    }

    // Next lunar eclipse after birth
    const nextLunarResult = Astronomy.SearchLunarEclipse(birthDate);
    if (nextLunarResult) {
      nextLunar = {
        date: formatEclipseDate(nextLunarResult.peak.date),
        type: eclipseKindToString(nextLunarResult.kind),
      };
    }

    // Previous lunar
    const lunarSearch0 = new Date(birthDate.getTime() - 2 * 365.25 * 86400000);
    let lunarSearch = Astronomy.SearchLunarEclipse(lunarSearch0);
    let lastLunarBefore = lunarSearch;
    for (let i = 0; i < 20; i++) {
      if (lunarSearch.peak.date.getTime() >= birthDate.getTime()) break;
      lastLunarBefore = lunarSearch;
      lunarSearch = Astronomy.NextLunarEclipse(lunarSearch.peak.date);
    }
    if (lastLunarBefore.peak.date.getTime() < birthDate.getTime()) {
      previousLunar = {
        date: formatEclipseDate(lastLunarBefore.peak.date),
        type: eclipseKindToString(lastLunarBefore.kind),
      };
    }
  } catch {
    // eclipse computation failed
  }

  return { previousSolar, nextSolar, previousLunar, nextLunar };
}

export function countEclipsesSinceBirth(date: string): {
  solar: number;
  lunar: number;
} {
  const [year, month, day] = date.split("-").map(Number);
  const birthDate = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
  const now = new Date();

  let solar = 0;
  let lunar = 0;

  try {
    let solarEclipse = Astronomy.SearchGlobalSolarEclipse(birthDate);
    for (let i = 0; i < 150 && solarEclipse.peak.date.getTime() <= now.getTime(); i++) {
      solar++;
      solarEclipse = Astronomy.NextGlobalSolarEclipse(solarEclipse.peak.date);
    }
  } catch {
    // eclipse count unavailable
  }

  try {
    let lunarEclipse = Astronomy.SearchLunarEclipse(birthDate);
    for (let i = 0; i < 150 && lunarEclipse.peak.date.getTime() <= now.getTime(); i++) {
      lunar++;
      lunarEclipse = Astronomy.NextLunarEclipse(lunarEclipse.peak.date);
    }
  } catch {
    // eclipse count unavailable
  }

  return { solar, lunar };
}

function formatTimeLocal(d: Date, lng: number): string {
  const offsetHours = lng / 15;
  const localMs = d.getTime() + offsetHours * 3600000;
  const local = new Date(localMs);
  const h = local.getUTCHours();
  const m = local.getUTCMinutes();
  const period = h >= 12 ? "PM" : "AM";
  const displayH = h % 12 || 12;
  return `${displayH}:${m.toString().padStart(2, "0")} ${period}`;
}
