<template>
  <div ref="marketCardRef" class="market-card">
    <div ref="chartContentRef" class="chart-content">
      <h3 ref="titleRef" title="GLOBAL LANDSCAPE SOFTWARE MARKET">📈 GLOBAL LANDSCAPE SOFTWARE MARKET</h3>
      <div class="chart-section">
        <div class="bar-container">
          <div
            class="bar bar-2024"
            :style="{ height: bar2024Height }"
          >
            <span class="bar-text">$2.95B</span>
          </div>
          <div class="year">2024</div>
        </div>
        <div class="bar-container">
          <div
            class="bar bar-2030"
            :style="{ height: bar2030Height }"
          >
            <span class="bar-text">$5.45B</span>
          </div>
          <div class="year">2030</div>
        </div>
      </div>
      <div class="growth-rate" :class="{ visible: showGrowthRate }">
        <div class="tooltip-container">
          <a
            href="https://en.wikipedia.org/wiki/Compound_annual_growth_rate"
            target="_blank"
            rel="noopener noreferrer"
            class="growth-link"
            @mouseenter="showPreview = true"
            @mouseleave="delayHidePreview"
          >
            10.8% CAGR
          </a>

          <div
            v-if="showPreview"
            class="preview-card"
            @mouseenter="cancelHidePreview"
            @mouseleave="hidePreview"
          >
            <div class="preview-header">
              <span class="wiki-icon">📖</span>
              <strong>Compound Annual Growth Rate</strong>
            </div>
            <div class="preview-content">
              <p>The compound annual growth rate (CAGR) is the rate of return required for an investment to grow from its beginning balance to its ending balance.</p>
              <p class="context">📊 In this case: <strong>10.8% CAGR</strong> represents the annual growth rate from $2.95B (2024) to $5.45B (2030).</p>
            </div>
            <div class="preview-footer">
              <span class="read-more">Click to read on Wikipedia →</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const bar2024Height = ref('0px')
const bar2030Height = ref('0px')
const showGrowthRate = ref(false)
const titleRef = ref()
const chartContentRef = ref()
const marketCardRef = ref()
const showPreview = ref(false)
let hideTimeout = null

const scaleTextToFit = () => {
  if (!titleRef.value || !marketCardRef.value) return

  const title = titleRef.value
  const container = marketCardRef.value

  // Reset any previous scaling
  title.style.transform = 'scale(1)'
  title.style.transformOrigin = 'center'

  // Get dimensions
  const titleWidth = title.scrollWidth
  const containerWidth = container.clientWidth
  const containerHeight = container.clientHeight
  const targetWidth = containerWidth * 0.9 // 90% of MarketChart component width

  // Print dimensions for debugging
  console.log('🔍 MarketChart Dimensions:')
  console.log(`  Container Width: ${containerWidth}px`)
  console.log(`  Container Height: ${containerHeight}px`)
  console.log(`  Title Text Width: ${titleWidth}px`)
  console.log(`  Target Width (90%): ${targetWidth}px`)

  // Always scale to exactly 90% of container width
  const scale = targetWidth / titleWidth
  console.log(`  Scaling factor: ${scale.toFixed(3)}`)
  title.style.transform = `scale(${scale})`
  console.log(`  Final text width will be: ${(titleWidth * scale).toFixed(1)}px`)

  // Calculate available height for bars
  const titleRect = title.getBoundingClientRect()
  const containerRect = container.getBoundingClientRect()
  const titleBottom = titleRect.bottom
  const containerBottom = containerRect.bottom
  const availableHeight = containerBottom - titleBottom - 60 // Leave some margin for growth rate text

  console.log(`  Title bottom: ${titleBottom}px`)
  console.log(`  Container bottom: ${containerBottom}px`)
  console.log(`  Available height for bars: ${availableHeight}px`)

  // Store available height for bar scaling
  window.marketChartAvailableHeight = availableHeight
}

onMounted(() => {
  // Scale text to fit first
  setTimeout(() => {
    scaleTextToFit()
  }, 100)

  // Animate bars after mount with proper proportions
  setTimeout(() => {
    // $2.95B vs $5.45B ratio = 2.95/5.45 = 0.541
    bar2024Height.value = '54.1%' // Proportional to $2.95B
    console.log(`🟡 2024 bar height: 54.1% ($2.95B)`)
  }, 600)

  setTimeout(() => {
    // 2030 is the larger value, so it gets the full height
    bar2030Height.value = '100%' // Full height for $5.45B
    console.log(`🟢 2030 bar height: 100% ($5.45B)`)
    console.log(`📊 Ratio: 2030 is 1.85x taller than 2024 (100% vs 54.1%)`)
  }, 900)

  setTimeout(() => {
    showGrowthRate.value = true
    // Final verification after all animations complete
    console.log(`✅ Final state: 2024 = ${bar2024Height.value}, 2030 = ${bar2030Height.value}`)
  }, 1500)

  // Re-scale on window resize
  window.addEventListener('resize', scaleTextToFit)
})

// Preview card hover logic
const delayHidePreview = () => {
  hideTimeout = setTimeout(() => {
    showPreview.value = false
  }, 300) // 300ms delay before hiding
}

const cancelHidePreview = () => {
  if (hideTimeout) {
    clearTimeout(hideTimeout)
    hideTimeout = null
  }
}

const hidePreview = () => {
  delayHidePreview()
}

const openLink = () => {
  showPreview.value = false
}
</script>

<style scoped>
.market-card {
  /* Make this card its own size container */
  container-type: size;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1rem;
  backdrop-filter: blur(10px);
  text-align: center;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
}

.chart-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(1cqh, 2cqh, 4cqh);
  width: 100%;
  height: 100%;
  justify-content: space-between;
}

.market-card h3 {
  font-size: clamp(8px, 3.5cqw, 5cqw);
  margin: 0;
  text-align: center;
  color: #fbbf24;
  line-height: 1.15;
  padding: 0 clamp(2px, 1cqw, 4px);
}

.chart-section {
  display: flex;
  justify-content: center;
  align-items: end;
  gap: clamp(2cqw, 4cqw, 8cqw);
  height: clamp(20cqh, 35cqh, 50cqh);
  margin: 0;
  flex: 1;
}

.bar-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  position: relative;
}

.bar {
  width: clamp(8cqw, 10cqw, 15cqw);
  height: 0px;
  max-height: 100%;
  border-radius: 6px 6px 0 0;
  display: flex;
  align-items: start;
  justify-content: center;
  padding-top: clamp(4px, 1.2cqh, 6px);
  margin-bottom: clamp(2px, 1cqh, 4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  color: white;
  font-weight: bold;
  font-size: clamp(10px, 3cqw, 16px);
  text-shadow: 0 1px 2px rgba(0,0,0,0.5);
  transition: height 0.8s ease-out;
  overflow: visible;
}

.bar-2024 {
  background: linear-gradient(180deg, #fbbf24 0%, #f59e0b 100%);
}

.bar-2030 {
  background: linear-gradient(180deg, #10b981 0%, #059669 100%);
}

.bar-text {
  white-space: nowrap;
  margin-top: clamp(-2px, -0.5cqh, -4px);
}

.year {
  font-size: clamp(10px, 3cqw, 16px);
  color: #a0c4c7;
  font-weight: 600;
  margin: 0;
}

.growth-rate {
  text-align: center;
  color: #10b981;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  padding: clamp(4px, 2cqh, 10px) clamp(8px, 3cqw, 16px);
  margin: 0;
  border: 2px solid rgba(16, 185, 129, 0.3);
  font-weight: 600;
  font-size: clamp(10px, 3cqw, 16px);
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.6s ease-out;
}

.growth-rate.visible {
  opacity: 1;
  transform: translateY(0);
}

.growth-link {
  color: inherit;
  text-decoration: underline;
  cursor: pointer;
}

.tooltip-container {
  position: relative;
  display: inline-block;
}

.preview-card {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 16px;
  width: 320px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  z-index: 1000;
  margin-bottom: 8px;
}

.preview-header {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #fbbf24;
  font-size: 16px;
  margin-bottom: 12px;
}

.wiki-icon {
  font-size: 18px;
}

.preview-content p {
  color: #e5e5e5;
  font-size: 14px;
  line-height: 1.4;
  margin: 0 0 8px 0;
}

.preview-content .context {
  color: #a0c4c7;
  font-size: 13px;
  font-style: italic;
}

.preview-footer {
  margin-top: 12px;
  padding-top: 8px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.read-more {
  color: #10b981;
  font-size: 12px;
  font-weight: 500;
}
</style>