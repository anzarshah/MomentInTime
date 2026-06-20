export interface BirthInput {
  name: string;
  date: string; // YYYY-MM-DD
  time: string | null; // HH:MM (24h) or null
  city: string;
  lat: number;
  lng: number;
  timezone: string;
}

export interface MoonData {
  phase: string;
  illumination: number;
  phaseAngle: number; // 0-360 for SVG rendering
  distanceKm: number;
  averageDistanceKm: number;
  distancePercent: number; // positive = farther, negative = closer
}

export interface SunData {
  sunrise: string;
  sunset: string;
  dayLengthMinutes: number;
}

export interface ConstellationData {
  overhead: string[];
  /** Brightest catalog star nearest the zenith at birth time */
  prominentStar: string | null;
  zenithStar: string | null;
  zenithConstellation: string | null;
  hasExactTime: boolean;
}

export interface CultureAlternateSong {
  song: string;
  songArtist: string;
}

export interface EclipseData {
  previousSolar: { date: string; type: string } | null;
  nextSolar: { date: string; type: string } | null;
  previousLunar: { date: string; type: string } | null;
  nextLunar: { date: string; type: string } | null;
}

export interface ZodiacData {
  sunSign: string;
  moonSign: string | null;
  risingSign: string | null;
  chineseZodiac: string;
  chineseElement: string;
  hasExactTime: boolean;
}

export interface CultureData {
  song: string;
  songArtist: string;
  bollywoodMovie: string;
  hollywoodMovie: string;
  hollywoodPosterUrl?: string | null;
  bollywoodPosterUrl?: string | null;
  songArtworkUrl?: string | null;
  bookCoverUrl?: string | null;
  hollywoodAlternates?: string[];
  bollywoodAlternates?: string[];
  songAlternates?: CultureAlternateSong[];
  bookAlternates?: string[];
  bestsellingBook: string;
  bestsellingBookAuthor: string;
  ghazal: string;
  ghazalPoet: string;
}

export interface HistoryData {
  famousBirthday: string;
  famousBirthdayYear: string;
  historicalEvent: string;
  historicalEventYear: string;
  worldEventThatYear: string;
  notableDeath: string;
  notableDeathYear: string;
}

export interface BirthSymbol {
  name: string;
  meaning: string;
}

export interface BirthSymbolsData {
  stone: BirthSymbol;
  flower: BirthSymbol;
  tree: BirthSymbol;
}

export interface NumbersData {
  dayOfWeek: string;
  ageYears: number;
  ageDays: number;
  ageHours: number;
  ageHeartbeats: number;
  ageBreaths: number;
  seasonsLived: number;
  leapYearsLived: number;
  solarEclipsesSinceBirth: number;
  lunarEclipsesSinceBirth: number;
  fullMoonsSince: number;
  worldPopulationThen: string;
  worldPopulationNow: string;
  worldPopulationAdded: string;
}

export interface EconomyData {
  oilPriceUSD: string;
  usdToINR: string;
}

export interface PlaceData {
  weather: string;
  headline: string;
  cityPopulationThen: string;
  cityPopulationNow: string;
}
