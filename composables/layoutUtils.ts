// composables/layoutUtils.ts

// ---- SSR guards ------------------------------------------------------------
export const isClient =
  typeof window !== "undefined" && typeof document !== "undefined";

// Safe no-op for SSR or if DOM not ready
export function safe(fn: () => void) {
  if (!isClient) return;
  try {
    fn();
  } catch (e) {
    /* keep app alive */ console.warn(e);
  }
}

// ---- helpers ---------------------------------------------------------------
export function getNearestScale(el: HTMLElement): number {
  let cur: HTMLElement | null = el;
  while (cur) {
    const t = getComputedStyle(cur).transform;
    if (t && t !== "none") {
      const m2 = t.match(/matrix\(([^)]+)\)/);
      if (m2) {
        const [a, b, , d] = m2[1].split(",").map((s) => parseFloat(s.trim()));
        const sy = Math.hypot(b, d || 0) || 1;
        return sy;
      }
      const m3 = t.match(/matrix3d\(([^)]+)\)/);
      if (m3) {
        const parts = m3[1].split(",").map((s) => parseFloat(s.trim()));
        const sy = Math.hypot(parts[1], parts[5]) || 1;
        return sy;
      }
    }
    cur = cur.parentElement;
  }
  return 1;
}

export function recalcLayout(opts?: {
  containerSelector?: string;
  contentSelector?: string | null;
}) {
  if (!isClient) return;
  const {
    containerSelector = ".title-slide-container",
    contentSelector = null,
  } = opts || {};

  const container = document.querySelector<HTMLElement>(containerSelector);
  if (!container) return;

  // reset to avoid compounding transforms
  container.style.transform = "none";

  const contentEl = (
    contentSelector
      ? document.querySelector<HTMLElement>(contentSelector)
      : container
  ) as HTMLElement | null;
  if (!contentEl) return;

  const viewportH = window.innerHeight;
  const offsetH = contentEl.offsetHeight;
  const scale = getNearestScale(contentEl);
  const contentH =
    (offsetH || contentEl.getBoundingClientRect().height) / (scale || 1);

  const startY = Math.max(0, (viewportH - contentH) / 2);
  if (!Number.isFinite(startY)) return;
  console.log("Layout calc:", {
    viewportH,
    offsetH,
    scale,
    contentH,
    startY,
    isNaN: Number.isNaN(startY),
    isFinite: Number.isFinite(startY),
  });
  container.style.transform = `translate3d(0, ${startY}px, 0)`;
}

export async function waitForFontsAndImages(
  rootSelector = ".title-slide-container"
) {
  if (!isClient) return;
  // Fonts
  // @ts-ignore
  if (document.fonts?.ready) {
    try {
      await (document as any).fonts.ready;
    } catch {}
  }
  // Images inside root
  const root = document.querySelector(rootSelector) ?? document;
  const imgs = Array.from(root.querySelectorAll("img")) as HTMLImageElement[];
  await Promise.all(
    imgs.map((img) =>
      img.complete && img.naturalWidth > 0
        ? Promise.resolve()
        : new Promise<void>((res) => {
            const done = () => {
              img.removeEventListener("load", done);
              img.removeEventListener("error", done);
              res();
            };
            img.addEventListener("load", done, { once: true });
            img.addEventListener("error", done, { once: true });
          })
    )
  );
}

export function wireResize(handler: () => void, debounceMs = 80) {
  if (!isClient) return () => {};
  let t: number | undefined;
  const debounced = () => {
    if (t) window.clearTimeout(t);
    t = window.setTimeout(() => handler(), debounceMs);
  };
  window.addEventListener("resize", debounced);
  window.addEventListener("orientationchange", debounced);
  window.addEventListener("load", debounced, { once: true });
  return () => {
    window.removeEventListener("resize", debounced);
    window.removeEventListener("orientationchange", debounced);
  };
}
