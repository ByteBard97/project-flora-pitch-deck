<template>
  <div class="slide-root">
    <div class="opportunity-slide">
      <!-- Header Section with container -->
      <header class="slide-header">
        <div class="header-content">
          <h1 class="slide-title">This Frustration Represents a Multi-Billion Dollar Opportunity</h1>
          <p class="subtitle">A Massive, Growing, and Underserved Market</p>
        </div>
      </header>

      <!-- Main content section with weighted flex -->
      <main class="slide-main">
        <div class="main-section">
          <div class="left-column">
            <MarketChart />
          </div>

          <div class="right-column">
            <InsightCard
              icon="🏗"
              title="Parent Industry Foundation"
              bigNumber="$264.7B"
              description="Global landscaping services market provides massive foundation"
            />

            <InsightCard
              icon="💻"
              title="High Digital Adoption"
              bigNumber="93%"
              description="of landscape businesses already use software"
            />

            <InsightCard
              icon="🎯"
              title="The Real Opportunity"
              cardType="opportunity"
            >
              The question isn't <em>if</em> they'll use software, but <strong>which</strong> integrated platform will finally solve their workflow
            </InsightCard>
          </div>
        </div>
      </main>

      <!-- Bottom section for signals -->
      <footer class="slide-footer">
        <div class="signals-container">
          <MarketSignals />
        </div>
      </footer>

      <DebugOverlaps />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

// Overlap detection to catch layout issues
onMounted(() => {
  setTimeout(() => {
    const elements = document.querySelectorAll('.insight-card, .market-card, .signals-section')
    const overlaps = []

    for (let i = 0; i < elements.length; i++) {
      for (let j = i + 1; j < elements.length; j++) {
        const rect1 = elements[i].getBoundingClientRect()
        const rect2 = elements[j].getBoundingClientRect()

        // Check if rectangles overlap
        if (!(rect1.right <= rect2.left || rect2.right <= rect1.left ||
              rect1.bottom <= rect2.top || rect2.bottom <= rect1.top)) {

          const overlap = {
            el1: elements[i].className || elements[i].tagName,
            el2: elements[j].className || elements[j].tagName,
            el1Bounds: `${rect1.left.toFixed(0)},${rect1.top.toFixed(0)} ${rect1.width.toFixed(0)}×${rect1.height.toFixed(0)}`,
            el2Bounds: `${rect2.left.toFixed(0)},${rect2.top.toFixed(0)} ${rect2.width.toFixed(0)}×${rect2.height.toFixed(0)}`
          }
          overlaps.push(overlap)

          // Highlight overlapping elements
          elements[i].style.outline = '3px solid red'
          elements[j].style.outline = '3px solid red'
        }
      }
    }

    if (overlaps.length > 0) {
      console.warn('🚨 OVERLAPPING ELEMENTS DETECTED:')
      overlaps.forEach((overlap, index) => {
        console.warn(`  ${index + 1}. ${overlap.el1} overlaps ${overlap.el2}`)
        console.warn(`     Element 1: ${overlap.el1Bounds}`)
        console.warn(`     Element 2: ${overlap.el2Bounds}`)
      })
    } else {
      console.log('✅ No overlaps detected - layout is clean')
    }
  }, 2000) // Wait for animations and layout to settle
})
</script>

<style scoped>
/* The slide is the size container: cqw/cqh now mean "% of slide". */
.slide-root {
  container-type: size;
  width: 100%;
  height: 100%;
}

.opportunity-slide {
  background: linear-gradient(135deg, #0f4a3c 0%, #1e6b5a 100%);
  color: white;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  /* Scale tokens once; everything reads these. */
  --gutter: clamp(16px, 3cqw, 44px); /* left/right gutters */
  --col-gap: clamp(12px, 2cqw, 32px); /* space between columns */
  --stack-gap: clamp(12px, 1.8cqh, 28px);
  --radius: clamp(8px, 1.2cqh, 16px);
  --pad: clamp(10px, 1.4cqh, 22px);
  --title: clamp(18px, 3.4cqw, 40px);
  --body: clamp(12px, 2cqw, 18px);
}

/* Header section - takes only what it needs */
.slide-header {
  flex: 0 0 auto;
  padding: var(--pad) var(--gutter);
  text-align: center;
}

.header-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: calc(var(--stack-gap) * 0.5);
}

.slide-title {
  font-size: var(--title);
  line-height: 1.15;
  margin: 0;
  font-weight: bold;
}

.subtitle {
  font-family: "Lora", Georgia, "Times New Roman", serif;
  font-size: clamp(14px, 2.4cqw, 24px);
  color: rgba(255, 255, 255, 0.75);
  font-style: italic;
  margin: 0;
  letter-spacing: 0.01em;
  font-weight: 400;
}

/* Main content section - takes most space */
.slide-main {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  min-height: 0; /* allow shrinking without overflow */
  padding: 0 var(--gutter);
}

.main-section {
  flex: 1 1 auto;
  display: grid;
  grid-template-columns: minmax(0, 1fr) var(--col-gap) minmax(0, 1fr);
  gap: var(--col-gap);
  min-height: 0;
}

.left-column {
  grid-column: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 0;
}

.right-column {
  grid-column: 3;
  display: flex;
  flex-direction: column;
  gap: var(--stack-gap);
  justify-content: space-between;
  min-height: 0;
}

/* Footer section - takes only what it needs */
.slide-footer {
  flex: 0 0 auto;
  padding: var(--pad) var(--gutter);
}

.signals-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Make sure insight cards don't overflow */
:deep(.insight-card) {
  min-height: 0;
  flex: 1 1 0%;
}

/* Ensure no components overflow their containers */
:deep(.market-card),
:deep(.signals-section) {
  min-height: 0;
  max-height: 100%;
  overflow: hidden;
}
</style>