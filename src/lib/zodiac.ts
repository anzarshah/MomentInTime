import * as Astronomy from "astronomy-engine";
import type { ZodiacData } from "./types";

const ZODIAC_SIGNS = [
  "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces",
];

function eclipticLongitudeToSign(longitude: number): string {
  const index = Math.floor(longitude / 30) % 12;
  return ZODIAC_SIGNS[index];
}

const SUN_SIGN_DATES: Array<[number, number, string]> = [
  // [month, startDay, sign]
  [1, 20, "Aquarius"], [2, 19, "Pisces"], [3, 21, "Aries"],
  [4, 20, "Taurus"], [5, 21, "Gemini"], [6, 21, "Cancer"],
  [7, 23, "Leo"], [8, 23, "Virgo"], [9, 23, "Libra"],
  [10, 23, "Scorpio"], [11, 22, "Sagittarius"], [12, 22, "Capricorn"],
];

function getSunSignSimple(month: number, day: number): string {
  for (let i = SUN_SIGN_DATES.length - 1; i >= 0; i--) {
    const [m, d, sign] = SUN_SIGN_DATES[i];
    if (month > m || (month === m && day >= d)) return sign;
  }
  return "Capricorn";
}

const CHINESE_ZODIAC_ANIMALS = [
  "Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake",
  "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig",
];

const CHINESE_ELEMENTS = ["Wood", "Fire", "Earth", "Metal", "Water"];

function getChineseZodiac(year: number): { animal: string; element: string } {
  const animal = CHINESE_ZODIAC_ANIMALS[(year - 4) % 12];
  const element = CHINESE_ELEMENTS[Math.floor(((year - 4) % 10) / 2)];
  return { animal, element };
}

function computeRisingSign(
  date: string,
  time: string,
  lat: number,
  lng: number
): string {
  const [year, month, day] = date.split("-").map(Number);
  const [hours, minutes] = time.split(":").map(Number);
  const dt = new Date(Date.UTC(year, month - 1, day, hours, minutes, 0));

  const lst = Astronomy.SiderealTime(dt);
  const localSiderealHours = (lst + lng / 15 + 24) % 24;
  const ascendantDegrees = (localSiderealHours * 15) % 360;

  return eclipticLongitudeToSign(ascendantDegrees);
}

export function computeZodiac(
  date: string,
  time: string | null,
  lat: number,
  lng: number
): ZodiacData {
  const [year, month, day] = date.split("-").map(Number);
  const sunSign = getSunSignSimple(month, day);
  const chinese = getChineseZodiac(year);

  let moonSign: string | null = null;
  let risingSign: string | null = null;

  if (time) {
    const [hours, minutes] = time.split(":").map(Number);
    const dt = new Date(Date.UTC(year, month - 1, day, hours, minutes, 0));

    const eclMoon = Astronomy.EclipticGeoMoon(dt);
    moonSign = eclipticLongitudeToSign(eclMoon.lon);
    risingSign = computeRisingSign(date, time, lat, lng);
  }

  return {
    sunSign,
    moonSign,
    risingSign,
    chineseZodiac: chinese.animal,
    chineseElement: chinese.element,
    hasExactTime: time !== null,
  };
}
