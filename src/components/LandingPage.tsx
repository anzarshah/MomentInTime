"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import CityAutocomplete from "./CityAutocomplete";
import { getTimezone } from "@/lib/timezone";
import type { BirthInput } from "@/lib/types";

interface Props {
  onSubmit: (input: BirthInput) => void;
}

function pad2(n: string) {
  return n.padStart(2, "0");
}

function isValidDate(y: number, m: number, d: number) {
  const dt = new Date(y, m - 1, d);
  return dt.getFullYear() === y && dt.getMonth() === m - 1 && dt.getDate() === d;
}

export default function LandingPage({ onSubmit }: Props) {
  const [name, setName] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [city, setCity] = useState("");
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [dateError, setDateError] = useState("");

  const y = parseInt(year, 10);
  const m = parseInt(month, 10);
  const d = parseInt(day, 10);
  const dateValid =
    year.length === 4 &&
    month.length >= 1 &&
    day.length >= 1 &&
    isValidDate(y, m, d);

  const timeFilled = hour.length > 0 || minute.length > 0;
  const timeValid =
    !timeFilled ||
    (hour.length >= 1 &&
      minute.length >= 1 &&
      parseInt(hour, 10) >= 0 &&
      parseInt(hour, 10) <= 23 &&
      parseInt(minute, 10) >= 0 &&
      parseInt(minute, 10) <= 59);

  const canSubmit =
    name.trim() && dateValid && timeValid && city && lat !== null && lng !== null;

  const handleSubmit = () => {
    if (!canSubmit || lat === null || lng === null) return;

    if (!dateValid) {
      setDateError("Please enter a valid date.");
      return;
    }
    setDateError("");

    const date = `${year}-${pad2(month)}-${pad2(day)}`;
    const time =
      hour.length > 0 && minute.length > 0
        ? `${pad2(hour)}:${pad2(minute)}`
        : null;

    onSubmit({
      name: name.trim(),
      date,
      time,
      city,
      lat,
      lng,
      timezone: getTimezone(lat, lng),
    });
  };

  const restrictDigits = (val: string, maxLen: number) =>
    val.replace(/\D/g, "").slice(0, maxLen);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-8 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="w-full max-w-xl relative z-10"
      >
        <div className="text-center mb-10">
          <p className="font-display text-pink/80 text-sm tracking-widest mb-2">
            ✨ a little magic ✨
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-cream mb-3">
            Moment in Time
          </h1>
          <p className="text-lavender/70 font-sans text-sm md:text-base">
            peek at the universe the day someone special arrived
          </p>
        </div>

        <div className="space-y-5 rounded-magic border border-lavender/20 bg-[#120820]/60 p-6 md:p-8 backdrop-blur-md shadow-glow w-full">
          <div>
            <label className="text-lavender/60 text-xs uppercase tracking-widest mb-1.5 block font-sans">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="magic-input"
              autoComplete="off"
            />
          </div>

          <div>
            <label className="text-lavender/60 text-xs uppercase tracking-widest mb-1.5 block font-sans">
              Birthday
            </label>
            <div className="grid grid-cols-3 gap-3">
              <input
                type="text"
                inputMode="numeric"
                value={month}
                onChange={(e) => setMonth(restrictDigits(e.target.value, 2))}
                className="magic-input text-center"
                autoComplete="off"
                aria-label="Month"
              />
              <input
                type="text"
                inputMode="numeric"
                value={day}
                onChange={(e) => setDay(restrictDigits(e.target.value, 2))}
                className="magic-input text-center"
                autoComplete="off"
                aria-label="Day"
              />
              <input
                type="text"
                inputMode="numeric"
                value={year}
                onChange={(e) => setYear(restrictDigits(e.target.value, 4))}
                className="magic-input text-center"
                autoComplete="off"
                aria-label="Year"
              />
            </div>
            <div className="grid grid-cols-3 gap-3 mt-1">
              <span className="text-cream/25 text-[10px] uppercase tracking-widest text-center font-sans">
                MM
              </span>
              <span className="text-cream/25 text-[10px] uppercase tracking-widest text-center font-sans">
                DD
              </span>
              <span className="text-cream/25 text-[10px] uppercase tracking-widest text-center font-sans">
                YYYY
              </span>
            </div>
            {dateError && (
              <p className="text-pink/80 text-xs mt-2 font-sans">{dateError}</p>
            )}
          </div>

          <div>
            <label className="text-lavender/60 text-xs uppercase tracking-widest mb-1.5 block font-sans">
              Time <span className="text-cream/25">(optional)</span>
            </label>
            <div className="grid grid-cols-2 gap-3 max-w-[50%]">
              <input
                type="text"
                inputMode="numeric"
                value={hour}
                onChange={(e) => setHour(restrictDigits(e.target.value, 2))}
                className="magic-input text-center"
                autoComplete="off"
                aria-label="Hour"
              />
              <input
                type="text"
                inputMode="numeric"
                value={minute}
                onChange={(e) => setMinute(restrictDigits(e.target.value, 2))}
                className="magic-input text-center"
                autoComplete="off"
                aria-label="Minute"
              />
            </div>
            <div className="grid grid-cols-2 gap-3 max-w-[50%] mt-1">
              <span className="text-cream/25 text-[10px] uppercase tracking-widest text-center font-sans">
                HH
              </span>
              <span className="text-cream/25 text-[10px] uppercase tracking-widest text-center font-sans">
                MM
              </span>
            </div>
          </div>

          <CityAutocomplete
            value={city}
            onChange={(c, la, ln) => {
              setCity(c);
              setLat(la);
              setLng(ln);
            }}
          />

          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="magic-btn w-full mt-2 py-4 text-base"
          >
            Reveal the magic ✦
          </button>
        </div>
      </motion.div>
    </div>
  );
}
