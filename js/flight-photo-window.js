// This function contains all the logic for the aerial photography scheduling slide
// Shows why vector embedding matters for "time to optimal window" calculations

function initFlightPhotoWindow() {
  try {
    console.log("📸 Initializing Flight Photo Window demo...");

    // Get DOM elements
    const departureSlider = document.getElementById("departure-time");
    const durationSlider = document.getElementById("flight-duration");
    const timezonesSlider = document.getElementById("timezones");

    const departureValue = document.getElementById("departure-value");
    const durationValue = document.getElementById("duration-value");
    const timezoneValue = document.getElementById("timezone-value");

    const depClock = document.getElementById("departure-clock");
    const arrClock = document.getElementById("arrival-clock");
    const depHand = document.getElementById("dep-hand");
    const arrHand = document.getElementById("arr-hand");

    const vectorSpace = document.getElementById("vector-space");
    const depVector = document.getElementById("dep-vector");
    const arrVector = document.getElementById("arr-vector");
    const depPoint = document.getElementById("dep-point");
    const arrPoint = document.getElementById("arr-point");
    const depLabel = document.getElementById("dep-label");
    const arrLabel = document.getElementById("arr-label");

    const distanceArc = document.getElementById("distance-arc");
    const distanceLabel = document.getElementById("distance-label");

    const naiveDistance = document.getElementById("naive-distance");
    const vectorDistance = document.getElementById("vector-distance");
    const morningDistance = document.getElementById("morning-distance");
    const photoQuality = document.getElementById("photo-quality");

    const naiveResult = document.getElementById("naive-result");
    const vectorResult = document.getElementById("vector-result");
    const morningResult = document.getElementById("morning-result");
    const photoReady = document.getElementById("photo-ready");

    // Pedagogical elements
    const hintButton = document.getElementById("hint-button");
    const hintContent = document.getElementById("hint-content");
    const methodDifference = document.getElementById("method-difference");
    const differenceExplanation = document.getElementById(
      "difference-explanation"
    );
    const explanationText = document.getElementById("explanation-text");

    // Photo windows (in 24h format)
    const MORNING_START = 9; // 9 AM
    const MORNING_END = 11; // 11 AM
    const AFTERNOON_START = 14; // 2 PM
    const AFTERNOON_END = 16; // 4 PM

    // THE KEY FUNCTION: Embed time-of-day as 2D vector
    function embedTimeAsVector(hours) {
      const theta = (2 * Math.PI * hours) / 24;
      return {
        x: Math.cos(theta),
        y: Math.sin(theta),
        angle: theta,
      };
    }

    // Compute circular distance between two times (in hours)
    function circularDistance(hours1, hours2) {
      const vec1 = embedTimeAsVector(hours1);
      const vec2 = embedTimeAsVector(hours2);

      // Dot product gives us cos(angle between)
      const dotProduct = vec1.x * vec2.x + vec1.y * vec2.y;
      const angleDistance = Math.acos(Math.max(-1, Math.min(1, dotProduct)));

      // Convert radians to hours
      return (angleDistance * 12) / Math.PI;
    }

    // NAIVE distance calculation (what most systems do wrong)
    function naiveTimeDistance(currentTime, targetWindow) {
      // Most flight planning software does this simple subtraction
      let distance = targetWindow - currentTime;

      // Handle negative by adding 24 (but this is where it goes wrong!)
      if (distance < 0) {
        distance += 24;
      }

      // This gives you "hours until next occurrence" but not shortest distance!
      return distance;
    }

    // Find OPTIMAL photo window - this is where embedding shines!
    function findOptimalWindow(arrivalTime) {
      // Check all windows and find the best one
      const windows = [
        { start: MORNING_START, end: MORNING_END, name: "Morning" },
        { start: AFTERNOON_START, end: AFTERNOON_END, name: "Afternoon" },
      ];

      let bestWindow = null;
      let shortestWait = 24;
      let naiveChoice = null;
      let naiveWait = 24;

      for (const window of windows) {
        const windowCenter = (window.start + window.end) / 2;

        // Vector embedding approach - finds TRUE shortest distance
        const vectorDist = circularDistance(arrivalTime, windowCenter);

        // Naive approach - just looks for "next" window
        const naiveDist = naiveTimeDistance(arrivalTime, windowCenter);

        if (vectorDist < shortestWait) {
          shortestWait = vectorDist;
          bestWindow = window;
        }

        if (naiveDist < naiveWait) {
          naiveWait = naiveDist;
          naiveChoice = window;
        }
      }

      return {
        optimal: bestWindow,
        optimalWait: shortestWait,
        naive: naiveChoice,
        naiveWait: naiveWait,
        differentChoice: bestWindow.name !== naiveChoice.name,
      };
    }

    // Draw photo windows on clock
    function drawPhotoWindows(svg) {
      const windows = svg.querySelector(".photo-windows");
      windows.innerHTML = "";

      // Morning window arc
      const morningStart = (MORNING_START * 360) / 24 - 90;
      const morningEnd = (MORNING_END * 360) / 24 - 90;
      const morningArc = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      const morningPath = describeArc(100, 100, 80, morningStart, morningEnd);
      morningArc.setAttribute("d", morningPath);
      morningArc.setAttribute("fill", "none");
      morningArc.setAttribute("stroke", "#4CAF50");
      morningArc.setAttribute("stroke-width", "8");
      morningArc.setAttribute("opacity", "0.3");
      windows.appendChild(morningArc);

      // Afternoon window arc
      const afternoonStart = (AFTERNOON_START * 360) / 24 - 90;
      const afternoonEnd = (AFTERNOON_END * 360) / 24 - 90;
      const afternoonArc = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      const afternoonPath = describeArc(
        100,
        100,
        80,
        afternoonStart,
        afternoonEnd
      );
      afternoonArc.setAttribute("d", afternoonPath);
      afternoonArc.setAttribute("fill", "none");
      afternoonArc.setAttribute("stroke", "#4CAF50");
      afternoonArc.setAttribute("stroke-width", "8");
      afternoonArc.setAttribute("opacity", "0.3");
      windows.appendChild(afternoonArc);
    }

    // Helper to create SVG arc path
    function describeArc(x, y, radius, startAngle, endAngle) {
      const start = polarToCartesian(x, y, radius, endAngle);
      const end = polarToCartesian(x, y, radius, startAngle);
      const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
      return [
        "M",
        start.x,
        start.y,
        "A",
        radius,
        radius,
        0,
        largeArcFlag,
        0,
        end.x,
        end.y,
      ].join(" ");
    }

    function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
      const angleInRadians = (angleInDegrees * Math.PI) / 180;
      return {
        x: centerX + radius * Math.cos(angleInRadians),
        y: centerY + radius * Math.sin(angleInRadians),
      };
    }

    // Draw vector space visualization
    function drawVectorSpace() {
      // Draw photo window sectors in vector space
      const morningStartVec = embedTimeAsVector(MORNING_START);
      const morningEndVec = embedTimeAsVector(MORNING_END);
      const morningArc = document.getElementById("morning-arc");

      const morningPath = [
        "M",
        200,
        120,
        "L",
        200 + morningStartVec.x * 80,
        120 - morningStartVec.y * 80,
        "A",
        80,
        80,
        0,
        0,
        0,
        200 + morningEndVec.x * 80,
        120 - morningEndVec.y * 80,
        "Z",
      ].join(" ");
      morningArc.setAttribute("d", morningPath);

      const afternoonStartVec = embedTimeAsVector(AFTERNOON_START);
      const afternoonEndVec = embedTimeAsVector(AFTERNOON_END);
      const afternoonArc = document.getElementById("afternoon-arc");

      const afternoonPath = [
        "M",
        200,
        120,
        "L",
        200 + afternoonStartVec.x * 80,
        120 - afternoonStartVec.y * 80,
        "A",
        80,
        80,
        0,
        0,
        0,
        200 + afternoonEndVec.x * 80,
        120 - afternoonEndVec.y * 80,
        "Z",
      ].join(" ");
      afternoonArc.setAttribute("d", afternoonPath);
    }

    // Update visualization
    function update() {
      const departureHours = parseFloat(departureSlider.value);
      const flightDuration = parseFloat(durationSlider.value);
      const timezoneCrossed = parseFloat(timezonesSlider.value);

      // Calculate arrival time (with timezone change)
      const arrivalHours =
        (departureHours + flightDuration + timezoneCrossed + 24) % 24;

      // Update displays
      const formatTime = (h) => {
        const hours = Math.floor(h);
        const minutes = Math.round((h - hours) * 60);
        return `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}`;
      };

      departureValue.textContent = formatTime(departureHours);
      durationValue.textContent = `${flightDuration.toFixed(1)}h`;
      timezoneValue.textContent =
        timezoneCrossed > 0 ? `+${timezoneCrossed}h` : `${timezoneCrossed}h`;

      // Update clock hands
      const depAngle = (departureHours * 360) / 24 - 90;
      const arrAngle = (arrivalHours * 360) / 24 - 90;

      depHand.setAttribute(
        "x2",
        100 + 70 * Math.cos((depAngle * Math.PI) / 180)
      );
      depHand.setAttribute(
        "y2",
        100 + 70 * Math.sin((depAngle * Math.PI) / 180)
      );

      arrHand.setAttribute(
        "x2",
        100 + 70 * Math.cos((arrAngle * Math.PI) / 180)
      );
      arrHand.setAttribute(
        "y2",
        100 + 70 * Math.sin((arrAngle * Math.PI) / 180)
      );

      // VECTOR EMBEDDING
      const depVec = embedTimeAsVector(departureHours);
      const arrVec = embedTimeAsVector(arrivalHours);

      // Update vector visualization
      const depX = 200 + depVec.x * 80;
      const depY = 120 - depVec.y * 80;
      const arrX = 200 + arrVec.x * 80;
      const arrY = 120 - arrVec.y * 80;

      depVector.setAttribute("x2", depX);
      depVector.setAttribute("y2", depY);
      depPoint.setAttribute("cx", depX);
      depPoint.setAttribute("cy", depY);
      depLabel.setAttribute("x", depX);
      depLabel.setAttribute("y", depY - 10);

      arrVector.setAttribute("x2", arrX);
      arrVector.setAttribute("y2", arrY);
      arrPoint.setAttribute("cx", arrX);
      arrPoint.setAttribute("cy", arrY);
      arrLabel.setAttribute("x", arrX);
      arrLabel.setAttribute("y", arrY - 10);

      // Draw arc between vectors
      const crossProduct = depVec.x * arrVec.y - depVec.y * arrVec.x;
      const largeArcFlag = crossProduct > 0 ? 0 : 1;

      const arcPath = [
        "M",
        depX,
        depY,
        "A",
        80,
        80,
        0,
        largeArcFlag,
        crossProduct > 0 ? 1 : 0,
        arrX,
        arrY,
      ].join(" ");
      distanceArc.setAttribute("d", arcPath);

      // THIS IS THE KEY COMPARISON!
      const windowAnalysis = findOptimalWindow(arrivalHours);

      // Show pedagogical explanation when methods disagree
      if (
        windowAnalysis.differentChoice ||
        Math.abs(windowAnalysis.naiveWait - windowAnalysis.optimalWait) > 2
      ) {
        // Methods disagree significantly - explain why!
        methodDifference.style.display = "block";

        const formatTime = (h) => {
          const hours = Math.floor(h);
          const minutes = Math.round((h - hours) * 60);
          return `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}`;
        };

        differenceExplanation.innerHTML = `
          <strong>Arrival time: ${formatTime(arrivalHours)}</strong><br>
          <strong>Naive method:</strong> Looks forward chronologically and says "wait ${windowAnalysis.naiveWait.toFixed(
            1
          )} hours until ${windowAnalysis.naive.name} window"<br>
          <strong>Vector method:</strong> Checks ALL directions on the clock and finds "${
            windowAnalysis.optimal.name
          } window is only ${windowAnalysis.optimalWait.toFixed(
          1
        )} hours away"<br>
          <br>
          <strong>Why it breaks:</strong> The naive method doesn't understand that time is circular! 
          It treats 23:00 and 01:00 as 22 hours apart instead of just 2 hours. 
          Vector embedding treats time as a circle where midnight connects back to itself.
        `;

        explanationText.textContent =
          "⚠️ The methods disagree! See explanation below.";
      } else {
        methodDifference.style.display = "none";
        explanationText.textContent =
          "Try different settings to see when naive calculation fails.";
      }

      // Show which window each approach recommends
      if (windowAnalysis.differentChoice) {
        naiveDistance.textContent = `${
          windowAnalysis.naive.name
        } (${windowAnalysis.naiveWait.toFixed(1)}h)`;
        vectorDistance.textContent = `${
          windowAnalysis.optimal.name
        } (${windowAnalysis.optimalWait.toFixed(1)}h)`;

        naiveResult.className = "result-card bad";
        vectorResult.className = "result-card good";
      } else {
        naiveDistance.textContent = `${windowAnalysis.naiveWait.toFixed(
          1
        )}h wait`;
        vectorDistance.textContent = `${windowAnalysis.optimalWait.toFixed(
          1
        )}h wait`;

        naiveResult.className =
          Math.abs(windowAnalysis.naiveWait - windowAnalysis.optimalWait) > 1
            ? "result-card bad"
            : "result-card";
        vectorResult.className = "result-card good";
      }

      // Show to nearest window
      morningDistance.textContent = `${windowAnalysis.optimalWait.toFixed(1)}h`;

      // Photo quality assessment
      let quality = "";
      let qualityClass = "";
      const inMorningWindow =
        arrivalHours >= MORNING_START && arrivalHours < MORNING_END;
      const inAfternoonWindow =
        arrivalHours >= AFTERNOON_START && arrivalHours < AFTERNOON_END;

      if (inMorningWindow || inAfternoonWindow) {
        quality = "In window! 🟢";
        qualityClass = "good";
      } else if (windowAnalysis.optimalWait < 1) {
        quality = "< 1h wait 🟡";
        qualityClass = "good";
      } else if (windowAnalysis.optimalWait < 3) {
        quality = `${windowAnalysis.optimalWait.toFixed(1)}h wait 🟠`;
        qualityClass = "";
      } else {
        quality = "Long wait 🔴";
        qualityClass = "bad";
      }

      photoQuality.textContent = quality;
      morningResult.className = `result-card ${
        windowAnalysis.optimalWait < 2 ? "good" : ""
      }`;
      photoReady.className = `result-card ${qualityClass}`;

      // Update distance label
      const flightTime = circularDistance(departureHours, arrivalHours);
      distanceLabel.textContent = `Flight spans: ${flightTime.toFixed(
        1
      )}h on clock`;
    }

    // Initialize photo windows
    drawPhotoWindows(depClock);
    drawPhotoWindows(arrClock);
    drawVectorSpace();

    // Event listeners
    departureSlider.addEventListener("input", update);
    durationSlider.addEventListener("input", update);
    timezonesSlider.addEventListener("input", update);

    // Hint button toggle
    if (hintButton) {
      hintButton.addEventListener("click", () => {
        const isHidden = hintContent.style.display === "none";
        hintContent.style.display = isHidden ? "block" : "none";
        hintButton.textContent = isHidden
          ? "💡 Hide Hint"
          : "💡 How to Break Naive Calculation";
      });
    }

    // Set initial values that show a subtle difference
    // Start with something that works, let users discover the breaking case
    departureSlider.value = "14"; // 2 PM departure
    durationSlider.value = "3"; // 3 hour flight
    timezonesSlider.value = "-1"; // Cross 1 timezone west

    // Initial update
    update();

    console.log("✅ Flight Photo Window demo initialized");
  } catch (error) {
    console.error("Error initializing Flight Photo Window demo:", error);
  }
}
