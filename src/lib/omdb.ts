interface OmdbMovieResponse {
  Response: string;
  Title?: string;
  Year?: string;
  Poster?: string;
  Error?: string;
}

interface OmdbSearchResponse {
  Response: string;
  Search?: Array<{
    Title: string;
    Year: string;
    Poster: string;
  }>;
}

export interface MovieMatch {
  title: string;
  year: string;
  posterUrl: string | null;
}

function normalizeTitle(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function titlesMatch(requested: string, found: string): boolean {
  const requestedNorm = normalizeTitle(requested);
  const foundNorm = normalizeTitle(found);

  if (requestedNorm === foundNorm) {
    return true;
  }

  const requestedWords = requestedNorm.split(" ").filter(Boolean);
  const foundWords = foundNorm.split(" ").filter(Boolean);

  if (requestedWords.length === 1) {
    return foundWords.length === 1 && requestedWords[0] === foundWords[0];
  }

  if (foundWords.length === 1) {
    return false;
  }

  const [shortWords, longWords] =
    requestedWords.length <= foundWords.length
      ? [requestedWords, foundWords]
      : [foundWords, requestedWords];
  const longText = longWords.join(" ");

  return shortWords
    .filter((word) => word.length > 2)
    .every((word) => longText.includes(word));
}

function omdbLookupYears(chartYear: string, allowPriorYear = true): string[] {
  if (!allowPriorYear) {
    return [chartYear];
  }
  // Prior year first — late-year releases (e.g. Titanic Dec 1997) still #1 in early 1998
  return [String(Number(chartYear) - 1), chartYear];
}

async function omdbGet(params: Record<string, string>): Promise<OmdbMovieResponse | OmdbSearchResponse> {
  const apiKey = process.env.OMDB_API_KEY;
  if (!apiKey) {
    throw new Error("OMDB_API_KEY not configured");
  }

  const query = new URLSearchParams({ ...params, apikey: apiKey, r: "json" });
  const res = await fetch(`https://www.omdbapi.com/?${query.toString()}`, {
    cache: "force-cache",
    next: { revalidate: 60 * 60 * 24 * 7 },
  });
  if (!res.ok) {
    throw new Error(`OMDb HTTP ${res.status}`);
  }
  return res.json() as Promise<OmdbMovieResponse | OmdbSearchResponse>;
}

function movieFromResponse(
  data: OmdbMovieResponse,
  allowedYears: string[],
  requestedTitle: string
): MovieMatch | null {
  if (data.Response !== "True" || !data.Title) {
    return null;
  }

  const movieYear = data.Year?.slice(0, 4);
  if (!movieYear || !allowedYears.includes(movieYear) || !titlesMatch(requestedTitle, data.Title)) {
    return null;
  }

  return {
    title: data.Title,
    year: movieYear,
    posterUrl: data.Poster && data.Poster !== "N/A" ? data.Poster : null,
  };
}

async function lookupMovieWithOmdbYear(
  title: string,
  omdbYear: string,
  allowedYears: string[]
): Promise<MovieMatch | null> {
  const byTitle = (await omdbGet({
    t: title.trim(),
    y: omdbYear,
    type: "movie",
  })) as OmdbMovieResponse;

  const exact = movieFromResponse(byTitle, allowedYears, title);
  if (exact) {
    return exact;
  }

  const bySearch = (await omdbGet({
    s: title.trim(),
    y: omdbYear,
    type: "movie",
    page: "1",
  })) as OmdbSearchResponse;

  const candidates =
    bySearch.Search?.filter((item) => allowedYears.includes(item.Year?.slice(0, 4) ?? "")) ?? [];
  const best = candidates.find((item) => titlesMatch(item.Title, title)) ?? candidates[0];

  if (!best) {
    return null;
  }

  return {
    title: best.Title,
    year: best.Year.slice(0, 4),
    posterUrl: best.Poster && best.Poster !== "N/A" ? best.Poster : null,
  };
}

/**
 * Resolve a movie for a chart week in `chartYear`.
 * Tries OMDb with chartYear first, then chartYear - 1 (e.g. Titanic 1997 still #1 in early 1998).
 */
export async function fetchMovieForYear(
  title: string,
  chartYear: string,
  options?: { allowPriorYear?: boolean }
): Promise<MovieMatch | null> {
  if (!title?.trim() || title === "Unknown" || !chartYear) {
    return null;
  }

  const allowPriorYear = options?.allowPriorYear ?? true;
  const allowedYears = omdbLookupYears(chartYear, allowPriorYear);

  try {
    for (const omdbYear of allowedYears) {
      const match = await lookupMovieWithOmdbYear(title, omdbYear, allowedYears);
      if (match && titlesMatch(title, match.title)) {
        return match;
      }
    }
    return null;
  } catch {
    return null;
  }
}

export async function fetchMoviePoster(
  title: string,
  year?: string
): Promise<string | null> {
  if (!year) return null;
  const match = await fetchMovieForYear(title, year);
  return match?.posterUrl ?? null;
}

export async function movieMatchesYear(title: string, chartYear: string): Promise<boolean> {
  const match = await fetchMovieForYear(title, chartYear);
  return match !== null;
}
