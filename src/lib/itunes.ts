interface ItunesSongResult {
  trackName?: string;
  artistName?: string;
  artworkUrl100?: string;
  releaseDate?: string;
}

interface ItunesSearchResponse {
  resultCount: number;
  results?: ItunesSongResult[];
}

function upscaleArtwork(url: string): string {
  return url.replace(/100x100bb(\.jpg)?$/i, "600x600bb$1");
}

function releaseYear(releaseDate?: string): number | null {
  if (!releaseDate) return null;
  const year = Number.parseInt(releaseDate.slice(0, 4), 10);
  return Number.isFinite(year) ? year : null;
}

export async function fetchSongArtwork(
  song: string,
  artist: string,
  year?: string
): Promise<string | null> {
  if (!song?.trim() || song === "Unknown") {
    return null;
  }

  const term = [artist, song].filter((part) => part && part !== "Unknown").join(" ").trim();
  if (!term) return null;

  const params = new URLSearchParams({
    term,
    entity: "song",
    limit: "8",
  });

  try {
    const res = await fetch(`https://itunes.apple.com/search?${params.toString()}`, {
      cache: "force-cache",
      next: { revalidate: 60 * 60 * 24 * 7 },
    });
    if (!res.ok) return null;

    const data = (await res.json()) as ItunesSearchResponse;
    const results = data.results?.filter((r) => r.artworkUrl100) ?? [];
    if (results.length === 0) return null;

    const targetYear = year ? Number.parseInt(year, 10) : null;
    const normalizedSong = song.toLowerCase();
    const normalizedArtist = artist.toLowerCase();

    const ranked = results
      .map((result) => {
        let score = 0;
        const track = result.trackName?.toLowerCase() ?? "";
        const resultArtist = result.artistName?.toLowerCase() ?? "";

        if (track.includes(normalizedSong) || normalizedSong.includes(track)) score += 3;
        if (
          normalizedArtist &&
          (resultArtist.includes(normalizedArtist) || normalizedArtist.includes(resultArtist))
        ) {
          score += 2;
        }

        const resultYear = releaseYear(result.releaseDate);
        if (targetYear && resultYear) {
          const diff = Math.abs(resultYear - targetYear);
          if (diff === 0) score += 4;
          else if (diff === 1) score += 2;
          else if (diff <= 3) score += 1;
        }

        return { result, score };
      })
      .sort((a, b) => b.score - a.score);

    const best = ranked[0]?.result;
    if (!best?.artworkUrl100) return null;

    return upscaleArtwork(best.artworkUrl100);
  } catch {
    return null;
  }
}
