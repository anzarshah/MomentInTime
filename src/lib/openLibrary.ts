interface OpenLibrarySearchDoc {
  cover_i?: number;
  isbn?: string[];
}

interface OpenLibrarySearchResponse {
  docs?: OpenLibrarySearchDoc[];
}

export async function fetchBookCover(
  title: string,
  author?: string
): Promise<string | null> {
  if (!title?.trim() || title === "Unknown") {
    return null;
  }

  const params = new URLSearchParams({
    title: title.trim(),
    limit: "1",
    fields: "cover_i,isbn,title",
  });
  if (author?.trim() && author !== "Unknown") {
    params.set("author", author.trim());
  }

  try {
    const res = await fetch(
      `https://openlibrary.org/search.json?${params.toString()}`,
      {
        cache: "force-cache",
        next: { revalidate: 60 * 60 * 24 * 7 },
      }
    );
    if (!res.ok) return null;

    const data = (await res.json()) as OpenLibrarySearchResponse;
    const doc = data.docs?.[0];
    if (!doc) return null;

    if (doc.cover_i) {
      return `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`;
    }

    const isbn = doc.isbn?.[0];
    if (isbn) {
      return `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`;
    }

    return null;
  } catch {
    return null;
  }
}
