// This function contains all the logic for the interactive "Flight vs Now" timezone slide.
// It should be loaded by the main presentation when slide 18 is displayed.

function initFlightVsNow() {
  try {
    console.log("Initializing Flight vs Now timezone demo...");

    // Get DOM elements
    const sydDate = document.getElementById("syd-date");
    const sydTime = document.getElementById("syd-time");
    const sfNowBtn = document.getElementById("sf-now");
    const sfNowReadout = document.getElementById("sf-now-readout");
    const dstDemoBtn = document.getElementById("dst-demo");
    const utcTimeline = document.getElementById("utc-timeline");
    const dtCorrect = document.getElementById("dt-correct");
    const dtNaive = document.getElementById("dt-naive");
    const offsetDiff = document.getElementById("offset-diff");
    const sydReadout = document.getElementById("syd-readout");
    const sfReadout = document.getElementById("sf-readout");
    const dstControls = document.getElementById("dst-controls");
    const dstMessage = document.getElementById("dst-message");

    if (!sydDate || !sydTime || !sfNowBtn) {
      console.error("Required DOM elements for FlightVsNow demo not found");
      return;
    }

    let sfNowInstant = null; // UTC instant for SF "now"
    let sydFlightInstant = null; // UTC instant for Sydney flight

    // Helper to get timezone offset in hours for a specific instant and timezone
    function getTimezoneOffsetHours(epochMs, timeZone) {
      const date = new Date(epochMs);
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZoneName: "longOffset",
      });

      const formatted = formatter.format(date);
      const offsetMatch = formatted.match(/GMT([+-]\d{1,2}):?(\d{2})?/);
      if (offsetMatch) {
        const hours = parseInt(offsetMatch[1]);
        const minutes = offsetMatch[2] ? parseInt(offsetMatch[2]) : 0;
        return hours + (hours < 0 ? -minutes / 60 : minutes / 60);
      }
      return 0;
    }

    // Convert local Sydney date/time to UTC instant, handling DST gaps and folds
    function localSydneyToInstant(dateStr, timeStr) {
      const [year, month, day] = dateStr.split("-").map(Number);
      const [hour, minute] = timeStr.split(":").map(Number);
      const searchStart = Date.UTC(year, month - 1, day - 1, 0, 0);
      const searchEnd = Date.UTC(year, month - 1, day + 2, 0, 0);
      const matches = [];

      for (let utc = searchStart; utc <= searchEnd; utc += 15 * 60 * 1000) {
        const formatter = new Intl.DateTimeFormat("en-AU", {
          timeZone: "Australia/Sydney",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });
        const parts = formatter.formatToParts(new Date(utc));
        const formatted = {};
        parts.forEach((p) => (formatted[p.type] = p.value));
        if (
          `${formatted.year}-${formatted.month}-${formatted.day}` === dateStr &&
          `${formatted.hour}:${formatted.minute}` === timeStr
        ) {
          matches.push(utc);
        }
      }

      if (matches.length === 0) {
        // Spring-forward gap
        for (let utc = searchStart; utc <= searchEnd; utc += 15 * 60 * 1000) {
          const formatter = new Intl.DateTimeFormat("en-AU", {
            timeZone: "Australia/Sydney",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          });
          const parts = formatter.formatToParts(new Date(utc));
          const formatted = {};
          parts.forEach((p) => (formatted[p.type] = p.value));
          if (
            `${formatted.year}-${formatted.month}-${formatted.day}` ===
              dateStr &&
            `${formatted.hour}:${formatted.minute}` > timeStr
          ) {
            return {
              instant: utc,
              status: "gap",
              adjustedTime: `${formatted.hour}:${formatted.minute}`,
            };
          }
        }
        return { instant: null, status: "gap" };
      } else if (matches.length === 1) {
        return { instant: matches[0], status: "valid" };
      } else {
        // Fall-back fold
        return { instant: matches[0], status: "fold" };
      }
    }

    function formatDuration(milliseconds) {
      const totalMinutes = Math.round(milliseconds / (1000 * 60));
      const absMinutes = Math.abs(totalMinutes);
      const hours = Math.floor(absMinutes / 60);
      const minutes = absMinutes % 60;
      const sign = totalMinutes >= 0 ? "+" : "-";
      return `${sign}${hours}h ${minutes}m`;
    }

    function formatLocalTime(epochMs, timeZone) {
      if (!epochMs) return "Invalid";
      const date = new Date(epochMs);
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        timeZoneName: "short",
      });
      const offset = getTimezoneOffsetHours(epochMs, timeZone);
      const offsetStr = offset >= 0 ? `+${offset}` : `${offset}`;
      return `${formatter.format(date)}, UTC${offsetStr}`;
    }

    function calculateNaiveDelta(sydDateStr, sydTimeStr, sfEpochMs) {
      const sfDate = new Date(sfEpochMs);
      const sfFormatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/Los_Angeles",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      const sfParts = sfFormatter.formatToParts(sfDate);
      const sfFormatted = {};
      sfParts.forEach((p) => (sfFormatted[p.type] = p.value));
      const sydLocal = new Date(`${sydDateStr}T${sydTimeStr}:00`);
      const sfLocal = new Date(
        `${sfFormatted.year}-${sfFormatted.month}-${sfFormatted.day}T${sfFormatted.hour}:${sfFormatted.minute}:00`
      );
      return sfLocal.getTime() - sydLocal.getTime();
    }

    function drawTimeline(sydInstant, sfInstant) {
      if (!utcTimeline || !sydInstant || !sfInstant) return;
      utcTimeline.innerHTML = "";
      utcTimeline.setAttribute("viewBox", "0 0 900 160");
      const width = 900,
        height = 160,
        margin = { left: 50, right: 50, top: 30, bottom: 50 },
        timelineY = height / 2;
      const minTime = Math.min(sydInstant, sfInstant),
        maxTime = Math.max(sydInstant, sfInstant);
      const padding = Math.max(3 * 60 * 60 * 1000, (maxTime - minTime) * 0.2);
      const startTime = minTime - padding,
        endTime = maxTime + padding;

      const timeToX = (ts) =>
        margin.left +
        ((ts - startTime) / (endTime - startTime)) *
          (width - margin.left - margin.right);

      const timeline = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
      );
      timeline.setAttribute("x1", margin.left);
      timeline.setAttribute("x2", width - margin.right);
      timeline.setAttribute("y1", timelineY);
      timeline.setAttribute("y2", timelineY);
      timeline.setAttribute("stroke", "#7d8590");
      timeline.setAttribute("stroke-width", "2");
      utcTimeline.appendChild(timeline);

      function drawPin(instant, color, label) {
        const x = timeToX(instant);
        const pin = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "line"
        );
        pin.setAttribute("x1", x);
        pin.setAttribute("x2", x);
        pin.setAttribute("y1", timelineY - 25);
        pin.setAttribute("y2", timelineY);
        pin.setAttribute("stroke", color);
        pin.setAttribute("stroke-width", "3");
        utcTimeline.appendChild(pin);
        const circle = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "circle"
        );
        circle.setAttribute("cx", x);
        circle.setAttribute("cy", timelineY);
        circle.setAttribute("r", "6");
        circle.setAttribute("fill", color);
        utcTimeline.appendChild(circle);
        const text = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "text"
        );
        text.setAttribute("x", x);
        text.setAttribute("y", timelineY - 35);
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("fill", color);
        text.setAttribute("font-size", "12");
        text.setAttribute("font-weight", "bold");
        text.textContent = label;
        utcTimeline.appendChild(text);
      }

      drawPin(sydInstant, "#ff6b6b", "Sydney Flight");
      drawPin(sfInstant, "#4ecdc4", "SF Now");
    }

    function updateCalculations() {
      const sydDateStr = sydDate.value;
      const sydTimeStr = sydTime.value;

      if (!sydDateStr || !sydTimeStr || !sfNowInstant) return;

      const sydResult = localSydneyToInstant(sydDateStr, sydTimeStr);
      dstControls.classList.remove("show");
      if (sydResult.status === "gap") {
        dstControls.classList.add("show");
        dstMessage.textContent = `Time ${sydTimeStr} doesn't exist. Auto-adjusted to ${
          sydResult.adjustedTime || "next valid"
        }.`;
      } else if (sydResult.status === "fold") {
        dstControls.classList.add("show");
        dstMessage.textContent = `Time ${sydTimeStr} occurs twice. Using earlier instance.`;
      }
      sydFlightInstant = sydResult.instant;

      if (!sydFlightInstant) return;

      dtCorrect.textContent = formatDuration(sfNowInstant - sydFlightInstant);
      dtNaive.textContent = formatDuration(
        calculateNaiveDelta(sydDateStr, sydTimeStr, sfNowInstant)
      );

      const sydOffset = getTimezoneOffsetHours(
        sydFlightInstant,
        "Australia/Sydney"
      );
      const sfOffset = getTimezoneOffsetHours(
        sfNowInstant,
        "America/Los_Angeles"
      );
      const offsetDifference = sfOffset - sydOffset;
      offsetDiff.textContent = `(${sfOffset}h) - (${sydOffset}h) = ${offsetDifference.toFixed(
        2
      )}h`;

      sydReadout.textContent = `Sydney: ${formatLocalTime(
        sydFlightInstant,
        "Australia/Sydney"
      )}`;
      sfReadout.textContent = `San Francisco: ${formatLocalTime(
        sfNowInstant,
        "America/Los_Angeles"
      )}`;
      drawTimeline(sydFlightInstant, sfNowInstant);
    }

    sfNowBtn.addEventListener("click", () => {
      sfNowInstant = Date.now();
      sfNowReadout.textContent = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/Los_Angeles",
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZoneName: "short",
      }).format(new Date(sfNowInstant));
      updateCalculations();
    });

    dstDemoBtn.addEventListener("click", () => {
      sydDate.value = "2025-10-05";
      sydTime.value = "02:30";
      updateCalculations();
    });

    sydDate.addEventListener("change", updateCalculations);
    sydTime.addEventListener("change", updateCalculations);

    console.log("Flight vs Now timezone demo initialized");
  } catch (error) {
    console.error("Error initializing Flight vs Now demo:", error);
  }
}
