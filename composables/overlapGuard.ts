import { onMounted, onBeforeUnmount, watchEffect } from "vue";

type GuardOptions = {
  root: () => HTMLElement | null; // container per slide
  selectors?: string; // which elements to check
  tolerance?: number; // px slack to ignore hairline overlaps
  highlight?: boolean; // draw red overlays for violations
  log?: boolean; // console.warn violations
};

function rectsOverlap(a: DOMRect, b: DOMRect, tol = 0) {
  return !(
    a.right <= b.left + tol ||
    a.left >= b.right - tol ||
    a.bottom <= b.top + tol ||
    a.top >= b.bottom - tol
  );
}

function visible(el: Element) {
  const s = getComputedStyle(el as HTMLElement);
  if (
    s.display === "none" ||
    s.visibility === "hidden" ||
    (el as HTMLElement).offsetParent === null
  )
    return false;
  const r = (el as HTMLElement).getBoundingClientRect();
  return r.width > 0 && r.height > 0;
}

function allowedToOverlap(a: HTMLElement, b: HTMLElement) {
  // Opt-in: same overlap group OR either explicitly allowed
  const gA = a.getAttribute("data-overlap-group");
  const gB = b.getAttribute("data-overlap-group");
  if (gA && gB && gA === gB) return true;
  if (a.hasAttribute("data-allow-overlap")) return true;
  if (b.hasAttribute("data-allow-overlap")) return true;
  return false;
}

function ensureOverlayHost(root: HTMLElement) {
  let host = root.querySelector<HTMLElement>(":scope > .overlap-debug-host");
  if (!host) {
    host = document.createElement("div");
    host.className = "overlap-debug-host";
    Object.assign(host.style, {
      position: "absolute",
      inset: "0",
      pointerEvents: "none",
      zIndex: "2147483647",
    });
    root.style.position ||= "relative";
    root.appendChild(host);
  }
  return host;
}

function clearOverlays(host: HTMLElement) {
  host.innerHTML = "";
}

function drawOverlay(host: HTMLElement, rect: DOMRect) {
  const d = document.createElement("div");
  Object.assign(d.style, {
    position: "absolute",
    left: `${rect.left + window.scrollX}px`,
    top: `${rect.top + window.scrollY}px`,
    width: `${rect.width}px`,
    height: `${rect.height}px`,
    outline: "2px solid red",
    background: "rgba(255,0,0,0.08)",
  });
  // Use fixed to avoid scroll offset jumpiness within slide canvases
  d.style.position = "fixed";
  host.appendChild(d);
}

export function useOverlapGuard(opts: GuardOptions) {
  const {
    root,
    selectors = "*", // check everything by default
    tolerance = 1,
    highlight = true,
    log = true,
  } = opts;

  let ro: ResizeObserver | null = null;
  let mo: MutationObserver | null = null;
  let raf = 0;

  const run = () => {
    const container = root();
    if (!container) return;

    const host = highlight ? ensureOverlayHost(container) : null;
    if (host) clearOverlays(host);

    const nodes = Array.from(container.querySelectorAll<HTMLElement>(selectors))
      .filter((n) => n.closest(".overlap-debug-host") === null) // skip overlay host
      .filter(visible);

    const rects = nodes.map((n) => ({
      el: n,
      rect: n.getBoundingClientRect(),
    }));
    const badPairs: Array<{ a: HTMLElement; b: HTMLElement }> = [];

    for (let i = 0; i < rects.length; i++) {
      for (let j = i + 1; j < rects.length; j++) {
        const A = rects[i],
          B = rects[j];
        if (!rectsOverlap(A.rect, B.rect, tolerance)) continue;
        if (allowedToOverlap(A.el, B.el)) continue;
        badPairs.push({ a: A.el, b: B.el });

        if (host) {
          drawOverlay(host, A.rect);
          drawOverlay(host, B.rect);
        }
      }
    }

    if (log && badPairs.length) {
      // Helpful, de-noised console output
      // eslint-disable-next-line no-console
      console.warn(
        `[OverlapGuard] ${badPairs.length} overlapping pair(s) found`,
        badPairs.map((p) => ({
          a:
            p.a.tagName.toLowerCase() +
            (p.a.className
              ? "." + String(p.a.className).replace(/\s+/g, ".")
              : ""),
          b:
            p.b.tagName.toLowerCase() +
            (p.b.className
              ? "." + String(p.b.className).replace(/\s+/g, ".")
              : ""),
        }))
      );
    }
  };

  const schedule = () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(run);
  };

  onMounted(() => {
    const container = root();
    if (!container) return;

    // Re-check on resize (Slidev scales slides)
    ro = new ResizeObserver(schedule);
    ro.observe(container);

    // Re-check on DOM changes (component re-renders, async loads)
    mo = new MutationObserver(schedule);
    mo.observe(container, { childList: true, subtree: true, attributes: true });

    // Initial
    schedule();

    // Also re-check a moment later to catch late async images/fonts
    setTimeout(schedule, 100);
  });

  onBeforeUnmount(() => {
    cancelAnimationFrame(raf);
    if (ro) ro.disconnect();
    if (mo) mo.disconnect();
  });

  // If the root ref changes across slides
  watchEffect(schedule);

  return { rerun: schedule };
}
