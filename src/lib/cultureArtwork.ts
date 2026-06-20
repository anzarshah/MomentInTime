import type Anthropic from "@anthropic-ai/sdk";
import type { CultureAlternateSong, CultureData } from "./types";
import { LLM_MODEL, textFromMessage } from "./llmClient";
import { fetchMovieForYear, type MovieMatch } from "./omdb";
import { fetchBookCover } from "./openLibrary";
import { fetchSongArtwork } from "./itunes";

function uniqueTitles(titles: string[]): string[] {
  const seen = new Set<string>();
  const result: string[] = [];
  for (const title of titles) {
    const trimmed = title?.trim();
    if (!trimmed || trimmed === "Unknown") continue;
    const key = trimmed.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(trimmed);
  }
  return result;
}

async function firstMovieWithPoster(
  titles: string[],
  year: string
): Promise<MovieMatch | null> {
  const candidates = uniqueTitles(titles);

  for (const title of candidates) {
    const match = await fetchMovieForYear(title, year);
    if (match?.posterUrl) return match;
  }

  for (const title of candidates) {
    const match = await fetchMovieForYear(title, year);
    if (match) return match;
  }

  return null;
}

async function firstSongArtwork(
  primary: CultureAlternateSong,
  alternates: CultureAlternateSong[] | undefined,
  year: string
): Promise<string | null> {
  const candidates = [primary, ...(alternates ?? [])].filter(
    (entry) => entry.song && entry.song !== "Unknown"
  );

  for (const entry of candidates) {
    const url = await fetchSongArtwork(entry.song, entry.songArtist, year);
    if (url) return url;
  }

  return null;
}

async function firstBookCover(
  titles: string[],
  author: string
): Promise<string | null> {
  for (const title of uniqueTitles(titles)) {
    const url = await fetchBookCover(title, author);
    if (url) return url;
  }
  return null;
}

export async function enrichCultureWithArtwork(
  culture: CultureData,
  year: string
): Promise<CultureData> {
  const hollywoodTitles = [
    culture.hollywoodMovie,
    ...(culture.hollywoodAlternates ?? []),
  ];
  const bollywoodTitles = [
    culture.bollywoodMovie,
    ...(culture.bollywoodAlternates ?? []),
  ];
  const bookTitles = [
    culture.bestsellingBook,
    ...(culture.bookAlternates ?? []),
  ];

  const [hollywood, bollywood, songArtworkUrl, bookCoverUrl] = await Promise.all([
    firstMovieWithPoster(hollywoodTitles, year),
    firstMovieWithPoster(bollywoodTitles, year),
    firstSongArtwork(
      { song: culture.song, songArtist: culture.songArtist },
      culture.songAlternates,
      year
    ),
    firstBookCover(bookTitles, culture.bestsellingBookAuthor),
  ]);

  return {
    ...culture,
    hollywoodMovie: hollywood?.title ?? culture.hollywoodMovie,
    bollywoodMovie: bollywood?.title ?? culture.bollywoodMovie,
    hollywoodPosterUrl: hollywood?.posterUrl ?? null,
    bollywoodPosterUrl: bollywood?.posterUrl ?? null,
    songArtworkUrl,
    bookCoverUrl,
  };
}

export function cultureHasArtwork(culture: CultureData | null | undefined): boolean {
  if (!culture) return false;
  return Boolean(
    culture.songArtworkUrl ||
      culture.hollywoodPosterUrl ||
      culture.bollywoodPosterUrl ||
      culture.bookCoverUrl
  );
}

export async function ensureMoviesMatchYear(
  client: Anthropic,
  culture: CultureData,
  monthName: string,
  day: string,
  year: string
): Promise<CultureData> {
  const [hollywoodOk, bollywoodOk] = await Promise.all([
    movieMatchesYear(culture.hollywoodMovie, year),
    movieMatchesYear(culture.bollywoodMovie, year),
  ]);

  if (hollywoodOk && bollywoodOk) {
    return culture;
  }

  const refined = await refineCultureMovies(
    client,
    culture,
    monthName,
    day,
    year,
    { hollywoodOk, bollywoodOk }
  );

  return refined ?? culture;
}

async function movieMatchesYear(title: string, year: string): Promise<boolean> {
  if (!title || title === "Unknown") return true;
  return (await fetchMovieForYear(title, year)) !== null;
}

async function refineCultureMovies(
  client: Anthropic,
  culture: CultureData,
  monthName: string,
  day: string,
  year: string,
  status: { hollywoodOk: boolean; bollywoodOk: boolean }
): Promise<CultureData | null> {
  const issues: string[] = [];
  if (!status.hollywoodOk && culture.hollywoodMovie !== "Unknown") {
    issues.push(
      `"${culture.hollywoodMovie}" could not be verified for the ${year} chart week (OMDb tried ${year} and ${+year - 1} release years).`
    );
  }
  if (!status.bollywoodOk && culture.bollywoodMovie !== "Unknown") {
    issues.push(
      `"${culture.bollywoodMovie}" could not be verified for the ${year} chart week (OMDb tried ${year} and ${+year - 1} release years).`
    );
  }
  if (issues.length === 0) {
    return culture;
  }

  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const response = await client.messages.create({
        model: LLM_MODEL,
        max_tokens: 768,
        messages: [
          {
            role: "user",
            content: `Fix the box-office movies for the calendar week containing ${monthName} ${day}, ${year}.

Problems with the previous answer:
${issues.map((issue) => `- ${issue}`).join("\n")}

Requirements:
1. hollywoodMovie: #1 film at the US weekend box office that week. Can be a late ${+year - 1} release still topping charts in ${year} (e.g. Titanic for Jan–Mar 1998 weeks).
2. bollywoodMovie: #1 Hindi film in Indian theaters that week. Can be a late ${+year - 1} release if still #1.
3. Use exact theatrical titles from your knowledge of chart history.

Return ONLY JSON:
{"hollywoodMovie":"...","bollywoodMovie":"..."}

If you cannot verify the #1 film for that week, use "Unknown" for that field.`,
          },
        ],
      });

      const parsed = extractMoviesJSON(response);
      if (!parsed) continue;

      const hollywoodMovie = parsed.hollywoodMovie || culture.hollywoodMovie;
      const bollywoodMovie = parsed.bollywoodMovie || culture.bollywoodMovie;

      const [hollywoodOk, bollywoodOk] = await Promise.all([
        movieMatchesYear(hollywoodMovie, year),
        movieMatchesYear(bollywoodMovie, year),
      ]);

      return {
        ...culture,
        hollywoodMovie:
          hollywoodOk || hollywoodMovie === "Unknown" ? hollywoodMovie : "Unknown",
        bollywoodMovie:
          bollywoodOk || bollywoodMovie === "Unknown" ? bollywoodMovie : "Unknown",
      };
    } catch {
      // retry
    }
  }

  return {
    ...culture,
    hollywoodMovie: status.hollywoodOk ? culture.hollywoodMovie : "Unknown",
    bollywoodMovie: status.bollywoodOk ? culture.bollywoodMovie : "Unknown",
  };
}

function extractMoviesJSON(
  response: Anthropic.Messages.Message
): { hollywoodMovie: string; bollywoodMovie: string } | null {
  const fullText = textFromMessage(response);
  const start = fullText.indexOf("{");
  const end = fullText.lastIndexOf("}");
  if (start === -1 || end <= start) return null;

  try {
    return JSON.parse(fullText.slice(start, end + 1)) as {
      hollywoodMovie: string;
      bollywoodMovie: string;
    };
  } catch {
    return null;
  }
}
