/** Bright stars with J2000 equatorial coordinates (RA in hours, Dec in degrees). */
export interface BrightStarEntry {
  name: string;
  constellation: string;
  ra: number;
  dec: number;
}

export const BRIGHT_STARS: BrightStarEntry[] = [
  { name: "Sirius", constellation: "Canis Major", ra: 6.752, dec: -16.716 },
  { name: "Canopus", constellation: "Carina", ra: 6.399, dec: -52.696 },
  { name: "Arcturus", constellation: "Boötes", ra: 14.261, dec: 19.182 },
  { name: "Vega", constellation: "Lyra", ra: 18.615, dec: 38.783 },
  { name: "Capella", constellation: "Auriga", ra: 5.278, dec: 45.998 },
  { name: "Rigel", constellation: "Orion", ra: 5.242, dec: -8.202 },
  { name: "Procyon", constellation: "Canis Minor", ra: 7.655, dec: 5.225 },
  { name: "Betelgeuse", constellation: "Orion", ra: 5.919, dec: 7.407 },
  { name: "Altair", constellation: "Aquila", ra: 19.846, dec: 8.868 },
  { name: "Aldebaran", constellation: "Taurus", ra: 4.599, dec: 16.509 },
  { name: "Spica", constellation: "Virgo", ra: 13.42, dec: -11.161 },
  { name: "Antares", constellation: "Scorpius", ra: 16.49, dec: -26.432 },
  { name: "Pollux", constellation: "Gemini", ra: 7.755, dec: 28.026 },
  { name: "Fomalhaut", constellation: "Piscis Austrinus", ra: 22.96, dec: -29.622 },
  { name: "Deneb", constellation: "Cygnus", ra: 20.69, dec: 45.28 },
  { name: "Regulus", constellation: "Leo", ra: 10.139, dec: 11.967 },
  { name: "Castor", constellation: "Gemini", ra: 7.576, dec: 31.888 },
  { name: "Bellatrix", constellation: "Orion", ra: 5.418, dec: 6.35 },
  { name: "Alnilam", constellation: "Orion", ra: 5.603, dec: -1.202 },
  { name: "Alioth", constellation: "Ursa Major", ra: 12.9, dec: 55.96 },
  { name: "Mirach", constellation: "Andromeda", ra: 1.162, dec: 35.62 },
  { name: "Hamal", constellation: "Aries", ra: 2.119, dec: 23.462 },
  { name: "Menkar", constellation: "Cetus", ra: 3.038, dec: 4.089 },
  { name: "Alpheratz", constellation: "Andromeda", ra: 0.139, dec: 29.09 },
];
