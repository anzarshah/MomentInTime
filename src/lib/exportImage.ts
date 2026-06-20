const ALLOWED_HOST_SUFFIXES = [
  ".media-amazon.com",
  ".mzstatic.com",
  "covers.openlibrary.org",
];

export function isAllowedImageUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:") {
      return false;
    }
    return ALLOWED_HOST_SUFFIXES.some(
      (suffix) =>
        parsed.hostname === suffix.replace(/^\./, "") ||
        parsed.hostname.endsWith(suffix)
    );
  } catch {
    return false;
  }
}

export function proxiedImageUrl(url: string): string {
  return `/api/image?url=${encodeURIComponent(url)}`;
}

export function absoluteProxiedImageUrl(url: string): string {
  const path = proxiedImageUrl(url);
  if (typeof window === "undefined") {
    return path;
  }
  return `${window.location.origin}${path}`;
}

function toAbsoluteUrl(src: string): string {
  if (src.startsWith("http://") || src.startsWith("https://") || src.startsWith("data:")) {
    return src;
  }
  if (src.startsWith("/") && typeof window !== "undefined") {
    return `${window.location.origin}${src}`;
  }
  return src;
}

function waitForSingleImage(img: HTMLImageElement): Promise<void> {
  return new Promise((resolve) => {
    if (img.complete && img.naturalWidth > 0) {
      resolve();
      return;
    }
    const done = () => resolve();
    img.addEventListener("load", done, { once: true });
    img.addEventListener("error", done, { once: true });
  });
}

export async function waitForImages(container: HTMLElement): Promise<void> {
  const images = Array.from(container.querySelectorAll("img"));
  await Promise.all(images.map((img) => waitForSingleImage(img)));
}

/** Inline poster/cover images as data URLs so html-to-image captures them reliably. */
export async function embedImagesForExport(container: HTMLElement): Promise<void> {
  const images = Array.from(container.querySelectorAll("img"));

  await Promise.all(
    images.map(async (img) => {
      const rawSrc = img.getAttribute("src") ?? img.src;
      if (!rawSrc || rawSrc.startsWith("data:")) {
        return;
      }

      const absolute = toAbsoluteUrl(rawSrc);

      try {
        const res = await fetch(absolute, { cache: "no-store" });
        if (!res.ok) {
          img.src = absolute;
          await waitForSingleImage(img);
          return;
        }

        const blob = await res.blob();
        const dataUrl = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
        img.src = dataUrl;
        await waitForSingleImage(img);
      } catch {
        img.src = absolute;
        await waitForSingleImage(img);
      }
    })
  );
}

export function bentoExportDimensions(container: HTMLElement): { width: number; height: number } {
  const width = 1080;
  const height = Math.max(1680, container.scrollHeight);
  return { width, height };
}

function nextPaint(): Promise<void> {
  return new Promise((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
  });
}

/** Clone the bento into a visible staging node so html-to-image never captures a hidden tree. */
export async function captureBentoPng(bentoEl: HTMLElement): Promise<string> {
  await embedImagesForExport(bentoEl);
  await waitForImages(bentoEl);

  const clone = bentoEl.cloneNode(true) as HTMLElement;
  clone.removeAttribute("id");

  const stage = document.createElement("div");
  stage.setAttribute("aria-hidden", "true");
  stage.style.cssText =
    "position:fixed;left:100vw;top:0;z-index:0;pointer-events:none;width:1080px;background:#08040f;opacity:1;visibility:visible;";
  stage.appendChild(clone);
  document.body.appendChild(stage);

  try {
    await nextPaint();
    void clone.offsetHeight;

    const { width, height } = bentoExportDimensions(clone);
    const { toPng } = await import("html-to-image");

    return await toPng(clone, {
      cacheBust: true,
      pixelRatio: 2,
      width,
      height,
      backgroundColor: "#08040f",
      skipFonts: true,
    });
  } finally {
    document.body.removeChild(stage);
  }
}
