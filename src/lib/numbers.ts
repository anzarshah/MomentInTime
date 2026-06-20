import { countEclipsesSinceBirth } from "./astronomy";
import type { NumbersData } from "./types";

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const POPULATION_DATA: Array<[number, number]> = [
  [1950, 2536431000], [1955, 2773020000], [1960, 3034950000],
  [1965, 3339584000], [1970, 3700437000], [1975, 4079480000],
  [1980, 4458003000], [1985, 4870922000], [1990, 5327231000],
  [1995, 5744213000], [2000, 6143494000], [2005, 6541907000],
  [2010, 6956824000], [2015, 7379797000], [2020, 7794799000],
  [2025, 8184437000], [2026, 8263000000],
];

function interpolatePopulationValue(year: number): number {
  if (year <= POPULATION_DATA[0][0]) return POPULATION_DATA[0][1];
  if (year >= POPULATION_DATA[POPULATION_DATA.length - 1][0]) {
    return POPULATION_DATA[POPULATION_DATA.length - 1][1];
  }

  for (let i = 0; i < POPULATION_DATA.length - 1; i++) {
    const [y1, p1] = POPULATION_DATA[i];
    const [y2, p2] = POPULATION_DATA[i + 1];
    if (year >= y1 && year <= y2) {
      const frac = (year - y1) / (y2 - y1);
      return Math.round(p1 + frac * (p2 - p1));
    }
  }
  return POPULATION_DATA[POPULATION_DATA.length - 1][1];
}

function interpolatePopulation(year: number): string {
  return formatBillions(interpolatePopulationValue(year));
}

function formatBillions(n: number): string {
  return (n / 1e9).toFixed(2) + " billion";
}

function formatPopulationAdded(delta: number): string {
  const billions = delta / 1e9;
  if (billions >= 1) return `~${billions.toFixed(2)} billion`;
  return `~${Math.round(billions * 1000)} million`;
}

function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function countLeapYearsSinceBirth(year: number, month: number, day: number): number {
  const birth = new Date(year, month - 1, day);
  const now = new Date();
  let count = 0;

  for (let y = year; y <= now.getFullYear(); y++) {
    if (!isLeapYear(y)) continue;
    const leapDay = new Date(y, 1, 29);
    if (leapDay >= birth && leapDay <= now) count++;
  }

  return count;
}

const SYNODIC_MONTH = 29.53059;

export function computeNumbers(date: string): NumbersData {
  const [year, month, day] = date.split("-").map(Number);
  const birthDate = new Date(year, month - 1, day);
  const now = new Date();

  const dayOfWeek = DAYS[birthDate.getDay()];

  let ageYears = now.getFullYear() - year;
  const monthDiff = now.getMonth() - (month - 1);
  const dayDiff = now.getDate() - day;
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) ageYears--;

  const diffMs = now.getTime() - birthDate.getTime();
  const ageDays = Math.floor(diffMs / 86400000);
  const ageHours = Math.floor(diffMs / 3600000);

  const fullMoonsSince = Math.floor(ageDays / SYNODIC_MONTH);
  const seasonsLived = Math.floor(ageDays / (365.2422 / 4));

  const ageHeartbeats = Math.floor((diffMs / 1000) * 72 / 60);
  const ageBreaths = Math.floor((diffMs / 1000) * 16 / 60);

  const leapYearsLived = countLeapYearsSinceBirth(year, month, day);
  const { solar, lunar } = countEclipsesSinceBirth(date);

  const populationThen = interpolatePopulationValue(year);
  const populationNow = interpolatePopulationValue(new Date().getFullYear());
  const worldPopulationAdded = formatPopulationAdded(populationNow - populationThen);

  return {
    dayOfWeek,
    ageYears,
    ageDays,
    ageHours,
    ageHeartbeats,
    ageBreaths,
    seasonsLived,
    leapYearsLived,
    solarEclipsesSinceBirth: solar,
    lunarEclipsesSinceBirth: lunar,
    fullMoonsSince,
    worldPopulationThen: interpolatePopulation(year),
    worldPopulationNow: interpolatePopulation(new Date().getFullYear()),
    worldPopulationAdded,
  };
}
