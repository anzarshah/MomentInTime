"use client";

import { useState, useEffect } from "react";
import type {
  BirthInput,
  CultureData,
  HistoryData,
  PlaceData,
} from "@/lib/types";
import { computeMoon, computeSun, computeConstellations, computeEclipses } from "@/lib/astronomy";
import { computeZodiac } from "@/lib/zodiac";
import { computeNumbers } from "@/lib/numbers";
import { computeBirthSymbols } from "@/lib/birthSymbols";
import MagicalDashboard from "./MagicalDashboard";

function hasArchiveData(data: {
  culture?: CultureData | null;
  history?: HistoryData | null;
  place?: PlaceData | null;
}) {
  return Boolean(
    data.culture?.song || data.history?.famousBirthday || data.place?.weather
  );
}

export default function MomentStory({ input }: { input: BirthInput }) {
  const [culture, setCulture] = useState<CultureData | null>(null);
  const [history, setHistory] = useState<HistoryData | null>(null);
  const [place, setPlace] = useState<PlaceData | null>(null);
  const [apiLoading, setApiLoading] = useState(true);
  const [apiFailed, setApiFailed] = useState(false);

  const moon = computeMoon(input.date, input.time);
  const sun = computeSun(input.date, input.lat, input.lng);
  const constellations = computeConstellations(input.date, input.time, input.lat, input.lng);
  const eclipses = computeEclipses(input.date);
  const zodiac = computeZodiac(input.date, input.time, input.lat, input.lng);
  const numbers = computeNumbers(input.date);
  const symbols = computeBirthSymbols(input.date);

  useEffect(() => {
    const cacheKey = `moment:v8:${input.date}:${input.city}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (hasArchiveData(parsed)) {
          if (parsed.culture) setCulture(parsed.culture);
          if (parsed.history) setHistory(parsed.history);
          if (parsed.place) setPlace(parsed.place);
          setApiLoading(false);
          return;
        }
        localStorage.removeItem(cacheKey);
      } catch {
        localStorage.removeItem(cacheKey);
      }
    }

    fetch("/api/moment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date: input.date, city: input.city }),
    })
      .then((r) => {
        if (!r.ok) throw new Error(`API ${r.status}`);
        return r.json();
      })
      .then((data) => {
        if (data.error) {
          setApiFailed(true);
          return;
        }
        if (data.culture) setCulture(data.culture);
        if (data.history) setHistory(data.history);
        if (data.place) setPlace(data.place);
        if (hasArchiveData(data)) {
          localStorage.setItem(cacheKey, JSON.stringify(data));
        } else {
          setApiFailed(true);
        }
      })
      .catch(() => setApiFailed(true))
      .finally(() => setApiLoading(false));
  }, [input.date, input.city]);

  return (
    <MagicalDashboard
      input={input}
      moon={moon}
      sun={sun}
      zodiac={zodiac}
      symbols={symbols}
      numbers={numbers}
      constellations={constellations}
      eclipses={eclipses}
      culture={culture}
      history={history}
      place={place}
      apiLoading={apiLoading}
      apiFailed={apiFailed}
    />
  );
}
