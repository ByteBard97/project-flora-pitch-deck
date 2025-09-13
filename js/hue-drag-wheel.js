function initHueDragWheel() {
  // Get reference to the SVG element
  const svg = document.getElementById("dwSVG");
  if (!svg) {
    console.error("Could not find hue drag wheel SVG element");
    return;
  }

  const lineNaive = svg.querySelector("#lineNaive");
  const hA = svg.querySelector("#handleA");
  const hB = svg.querySelector("#handleB");
  const hMid = svg.querySelector("#handleMid");
  const hNaive = svg.querySelector("#handleNaive");
  const labA = svg.querySelector("#labelA");
  const labB = svg.querySelector("#labelB");
  const labMid = svg.querySelector("#labelMid");
  const labNaive = svg.querySelector("#labelNaive");
  const arc = svg.querySelector("#dwArc");

  const degA = document.getElementById("degA");
  const degB = document.getElementById("degB");
  const degMid = document.getElementById("degMid");
  const degNaive = document.getElementById("degNaive");
  const dotA = document.getElementById("dotA");
  const dotB = document.getElementById("dotB");
  const dotMid = document.getElementById("dotMid");
  const dotNaive = document.getElementById("dotNaive");
  const barCircular = document.getElementById("barCircular");
  const barNaive = document.getElementById("barNaive");

  // Helpers
  const clamp360 = (h) => ((h % 360) + 360) % 360;
  const deg2rad = (d) => (d * Math.PI) / 180;
  const rad2deg = (r) => (r * 180) / Math.PI;

  // Wheel uses conic-gradient from -90deg, i.e., hue 0 at the TOP; hue increases clockwise.
  function posOnRing(h) {
    const a = deg2rad(h - 90);
    return [200 + R * Math.cos(a), 200 + R * Math.sin(a)];
  }
  function hueFromPoint(x, y) {
    const a = Math.atan2(y - 200, x - 200);
    return clamp360(rad2deg(a) + 90);
  }
  function shortestDelta(a, b) {
    return ((b - a + 540) % 360) - 180;
  } // [-180,180)
  function circularMid(h1, h2) {
    return clamp360(h1 + 0.5 * shortestDelta(h1, h2));
  }
  function naiveMid(h1, h2) {
    return clamp360((h1 + h2) / 2);
  }

  function setVector(elLine, elHandle, elLabel, hue, width = 7, dash = null) {
    const [x, y] = posOnRing(hue);
    elLine.setAttribute("x2", x);
    elLine.setAttribute("y2", y);
    elLine.setAttribute("stroke", `hsl(${hue} ${S}% ${L}%)`);
    elLine.setAttribute("stroke-width", width);
    if (dash) {
      elLine.setAttribute("stroke-dasharray", dash);
    } else {
      elLine.removeAttribute("stroke-dasharray");
    }
    elHandle.setAttribute("cx", x);
    elHandle.setAttribute("cy", y);
    elHandle.setAttribute(
      "fill",
      `hsl(${hue} ${S}% ${Math.max(20, Math.min(80, L))}%)`
    );
    elLabel.setAttribute("x", x);
    elLabel.setAttribute("y", y - 14);
  }
  function setChip(dot, degree, hue) {
    dot.style.background = `hsl(${hue} ${S}% ${L}%)`;
    degree.textContent = `${Math.round(hue)}°`;
  }
  function setArc(h1, h2) {
    const dShort = shortestDelta(h1, h2);
    const useLong = false;
    const large = useLong
      ? Math.abs(dShort) < 180
        ? 1
        : 0
      : Math.abs(dShort) > 180
      ? 1
      : 0;
    const sweepFlag = (h2 - h1 + 360) % 360 < 180 ? 1 : 0;
    const [ax, ay] = posOnRing(h1);
    const [bx, by] = posOnRing(h2);
    arc.setAttribute(
      "d",
      `M ${ax} ${ay} A ${R} ${R} 0 ${large} ${sweepFlag} ${bx} ${by}`
    );
  }
  function setBars(h1, h2) {
    const steps = 30;
    const colsCirc = [],
      colsNaive = [];
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const hm = clamp360(h1 + shortestDelta(h1, h2) * t);
      const hn = clamp360(h1 + (h2 - h1) * t);
      colsCirc.push(`hsl(${hm} ${S}% ${L}%)`);
      colsNaive.push(`hsl(${hn} ${S}% ${L}%)`);
    }
    barCircular.style.background = `linear-gradient(90deg, ${colsCirc.join(
      ","
    )})`;
    barNaive.style.background = `linear-gradient(90deg, ${colsNaive.join(
      ","
    )})`;
  }

  // State
  let H1 = 10,
    H2 = 350; // defaults
  function render() {
    const Hmid = circularMid(H1, H2);
    const Hnaive = naiveMid(H1, H2);
    setVector(lineA, hA, labA, H1, 7, null);
    setVector(lineB, hB, labB, H2, 7, null);
    setVector(lineMid, hMid, labMid, Hmid, 7, null);
    setVector(lineNaive, hNaive, labNaive, Hnaive, 5, "4,6");
    setChip(dotA, degA, H1);
    setChip(dotB, degB, H2);
    setChip(dotMid, degMid, Hmid);
    setChip(dotNaive, degNaive, Hnaive);
    setArc(H1, H2);
    setBars(H1, H2);
  }

  // Dragging
  function makeDraggable(handle, which) {
    let dragging = false;
    function onDown(e) {
      dragging = true;
      e.preventDefault();
      handle.setPointerCapture?.(e.pointerId);
    }
    function onMove(e) {
      if (!dragging) return;
      const r = svg.getBoundingClientRect();
      const x = e.clientX - r.left,
        y = e.clientY - r.top;
      const hue = hueFromPoint(x, y);
      if (which === "A") H1 = hue;
      else H2 = hue;
      render();
    }
    function onUp(e) {
      dragging = false;
      handle.releasePointerCapture?.(e.pointerId);
    }
    handle.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  }
  makeDraggable(hA, "A");
  makeDraggable(hB, "B");

  // Click on ring to set nearest handle
  svg.addEventListener("pointerdown", (e) => {
    const r = svg.getBoundingClientRect();
    const x = e.clientX - r.left,
      y = e.clientY - r.top;
    const hue = hueFromPoint(x, y);
    const dA = Math.abs(shortestDelta(hue, H1)),
      dB = Math.abs(shortestDelta(hue, H2));
    if (dA <= dB) H1 = hue;
    else H2 = hue;
    render();
  });

  render();
}
