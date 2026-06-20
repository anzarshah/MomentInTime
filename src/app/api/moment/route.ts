import { NextRequest, NextResponse } from "next/server";
import type Anthropic from "@anthropic-ai/sdk";
import type { CultureData, HistoryData, EconomyData, PlaceData } from "@/lib/types";
import { enrichCultureWithArtwork, ensureMoviesMatchYear } from "@/lib/cultureArtwork";
import { createLlmClient, LLM_MODEL, llmApiKeyConfigured, textFromMessage } from "@/lib/llmClient";

interface CacheEntry {
  culture: CultureData | null;
  history: HistoryData | null;
  economy: EconomyData | null;
  place: PlaceData | null;
}

const cache = new Map<string, CacheEntry>();

export async function POST(req: NextRequest) {
  const { date, city } = await req.json();

  const [month, day, year] = [
    date.slice(5, 7),
    date.slice(8, 10),
    date.slice(0, 4),
  ];

  const cacheKey = `${date}:${city}:v8`;
  if (cache.has(cacheKey)) {
    const cached = cache.get(cacheKey)!;
    const enriched = await withCulturePosters(cached, year);
    return NextResponse.json(enriched);
  }

  if (!llmApiKeyConfigured()) {
    return NextResponse.json(
      { error: "MINIMAX_API_KEY not configured" },
      { status: 500 }
    );
  }

  const client = createLlmClient();

  const monthName = new Date(+year, +month - 1, +day).toLocaleDateString("en-US", { month: "long" });

  try {
    const [culture, history, economy, place] = await Promise.all([
      fetchSection<CultureData>(client, {
        model: LLM_MODEL,
        max_tokens: 1536,
        messages: [
          {
            role: "user",
            content: `Research culture for the calendar week containing ${monthName} ${day}, ${year} (the 7-day period around that date).

1. #1 song on the Billboard Hot 100 for that exact chart week
2. #1 Bollywood/Hindi film in Indian theaters that week (or the closest verifiable week in ${year})
3. #1 Hollywood film at the US weekend box office that exact week
4. Bestselling or most notable book in ${monthName} ${year}
5. A famous Urdu ghazal or sher popularized around the ${Math.floor(+year / 10) * 10}s — romanized text + English meaning

CRITICAL movie rules:
- hollywoodMovie and bollywoodMovie must have been #1 that specific chart week.
- A film released in late ${+year - 1} can still be #1 in early ${year} (e.g. Titanic opened Dec 1997 and was #1 for many weeks in 1998 — list it for 1998 weeks if it was actually #1 that week).
- Prefer titles released in ${year}, but allow ${+year - 1} releases when they dominated that week's box office.
- Do NOT pick a famous film from ${+year - 2} or earlier unless it was genuinely #1 that week.
- Use exact theatrical titles. If you cannot verify the #1 film for that week, use "Unknown".

Your final reply must be ONLY a JSON object with no markdown or commentary:
{"song": "...", "songArtist": "...", "bollywoodMovie": "...", "hollywoodMovie": "...", "bestsellingBook": "...", "bestsellingBookAuthor": "...", "ghazal": "...", "ghazalPoet": "...", "hollywoodAlternates": ["...", "..."], "bollywoodAlternates": ["...", "..."], "songAlternates": [{"song":"...","songArtist":"..."}], "bookAlternates": ["...", "..."]}

For alternates: list 2–3 other plausible #1 chart picks from that same week (different titles) for each category — used only if poster/cover lookup fails. songAlternates are other songs that topped or were #2 that week.

For ghazal, format as the romanized couplet text. If uncertain on any field, use "Unknown". Omit alternate arrays only if truly unavailable — prefer empty arrays [].`,
          },
        ],
      }),

      fetchSection<HistoryData>(client, {
        model: LLM_MODEL,
        max_tokens: 1536,
        messages: [
          {
            role: "user",
            content: `Research these facts about ${monthName} ${day} and the year ${year}:
1. One famous person born on ${monthName} ${day} (any year, not ${year})
2. One major historical event on ${monthName} ${day} (any year, not ${year})
3. One major world event or headline from the year ${year} (not specific to ${monthName} ${day})
4. One notable/famous person who died on ${monthName} ${day} (any year)

Your final reply must be ONLY a JSON object with no markdown or commentary:
{"famousBirthday": "...", "famousBirthdayYear": "...", "historicalEvent": "...", "historicalEventYear": "...", "worldEventThatYear": "...", "notableDeath": "...", "notableDeathYear": "..."}

If uncertain, use "Unknown".`,
          },
        ],
      }),

      fetchSection<EconomyData>(client, {
        model: LLM_MODEL,
        max_tokens: 768,
        messages: [
          {
            role: "user",
            content: `Research these economic facts for ${monthName} ${day}, ${year} (or the closest available date):
1. Crude oil price in USD per barrel (Brent or WTI)
2. USD to INR exchange rate

Your final reply must be ONLY a JSON object with no markdown or commentary:
{"oilPriceUSD": "...", "usdToINR": "..."}

Format values like "$25.50/barrel" and "₹43.50". If uncertain, use "Unknown".`,
          },
        ],
      }),

      fetchSection<PlaceData>(client, {
        model: LLM_MODEL,
        max_tokens: 1536,
        messages: [
          {
            role: "user",
            content: `Research these place-specific facts for ${city} on ${monthName} ${day}, ${year}:
1. What was the weather likely like in ${city} on ${monthName} ${day}, ${year}? (typical weather for that city in ${monthName} — temperature range, conditions)
2. What was a major local or national newspaper headline from around ${monthName} ${day}, ${year}? (from a newspaper in the country where ${city} is located)
3. Approximate population of ${city} in the year ${year}
4. Current approximate population of ${city}

Your final reply must be ONLY a JSON object with no markdown or commentary:
{"weather": "...", "headline": "...", "cityPopulationThen": "...", "cityPopulationNow": "..."}

For weather, describe briefly like "Clear skies, 18-28°C". For populations, format like "12.4 million". If uncertain, use "Unknown".`,
          },
        ],
      }),
    ]);

    if (!culture && !history && !place) {
      return NextResponse.json(
        { error: "Failed to fetch data" },
        { status: 500 }
      );
    }

    let verifiedCulture = culture;
    if (culture) {
      verifiedCulture = await ensureMoviesMatchYear(
        client,
        culture,
        monthName,
        day,
        year
      );
    }

    const enrichedCulture = verifiedCulture
      ? await enrichCultureWithArtwork(verifiedCulture, year)
      : null;

    const result = { culture: enrichedCulture, history, economy, place };
    cache.set(cacheKey, result);

    return NextResponse.json(result);
  } catch (error) {
    console.error("LLM API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}

async function fetchSection<T>(
  client: Anthropic,
  params: Anthropic.Messages.MessageCreateParamsNonStreaming
): Promise<T | null> {
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const response = await client.messages.create(params);
      return extractJSON<T>(response);
    } catch (error) {
      console.error(`LLM section failed (attempt ${attempt + 1}):`, error);
    }
  }
  return null;
}

function extractJSON<T>(response: Anthropic.Messages.Message): T {
  const fullText = textFromMessage(response);

  if (!fullText.trim()) {
    throw new Error("No text content in response");
  }

  const fenced = fullText.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenced?.[1]) {
    return JSON.parse(fenced[1].trim()) as T;
  }

  const start = fullText.indexOf("{");
  const end = fullText.lastIndexOf("}");
  if (start !== -1 && end > start) {
    return JSON.parse(fullText.slice(start, end + 1)) as T;
  }

  throw new Error("No JSON found in response");
}

async function withCulturePosters(entry: CacheEntry, year: string): Promise<CacheEntry> {
  if (!entry.culture) return entry;
  if (hasArtworkFields(entry.culture)) {
    return entry;
  }
  return {
    ...entry,
    culture: await enrichCultureWithArtwork(entry.culture, year),
  };
}

function hasArtworkFields(culture: CultureData): boolean {
  return (
    culture.hollywoodPosterUrl !== undefined &&
    culture.bollywoodPosterUrl !== undefined &&
    culture.songArtworkUrl !== undefined &&
    culture.bookCoverUrl !== undefined
  );
}
