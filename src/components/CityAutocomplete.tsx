"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface GeoResult {
  display_name: string;
  lat: string;
  lon: string;
}

interface Props {
  value: string;
  onChange: (city: string, lat: number, lng: number) => void;
}

export default function CityAutocomplete({ value, onChange }: Props) {
  const [query, setQuery] = useState(value);
  const [results, setResults] = useState<GeoResult[]>([]);
  const [open, setOpen] = useState(false);
  const debounce = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const search = useCallback(async (q: string) => {
    if (q.length < 3) {
      setResults([]);
      return;
    }
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}&limit=5&addressdetails=0`,
        { headers: { "Accept-Language": "en" } }
      );
      const data: GeoResult[] = await res.json();
      setResults(data);
      setOpen(data.length > 0);
    } catch {
      setResults([]);
    }
  }, []);

  const handleInput = (val: string) => {
    setQuery(val);
    if (debounce.current) clearTimeout(debounce.current);
    debounce.current = setTimeout(() => search(val), 300);
  };

  const handleSelect = (r: GeoResult) => {
    const parts = r.display_name.split(",").map((s) => s.trim());
    const shortName = parts.length > 2 ? `${parts[0]}, ${parts[parts.length - 1]}` : parts[0];
    setQuery(shortName);
    setOpen(false);
    onChange(shortName, parseFloat(r.lat), parseFloat(r.lon));
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <label className="text-lavender/60 text-xs uppercase tracking-widest mb-1.5 block font-sans">
        City
      </label>
      <input
        type="text"
        value={query}
        onChange={(e) => handleInput(e.target.value)}
        className="magic-input"
        autoComplete="off"
        name="city-search"
        data-1p-ignore
        data-lpignore="true"
      />
      {open && results.length > 0 && (
        <ul className="absolute z-50 top-full left-0 right-0 mt-1 rounded-magic border border-lavender/25 bg-[#2a1850]/95 backdrop-blur-md max-h-48 overflow-y-auto shadow-glow">
          {results.map((r, i) => (
            <li
              key={i}
              onClick={() => handleSelect(r)}
              className="px-4 py-2.5 text-cream/70 hover:text-cream hover:bg-pink/10 cursor-pointer text-sm font-sans truncate first:rounded-t-magic last:rounded-b-magic"
            >
              {r.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
