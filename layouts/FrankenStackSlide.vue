<template>
  <div class="slide-root">
    <div class="franken-stack-slide">
      <div class="slide-header">
        <h1>The "Franken-Stack": Our Industry's Inefficient Reality</h1>
        <p class="subtitle">We're Wasting Time and Money on a Disconnected Workflow</p>
      </div>

      <div class="workflow-section">
        <div class="workflow-chain">
          <div class="tool-node">
            <div class="tool-name">
              <div class="tooltip-container">
                <a
                  href="https://www.autodesk.com/products/autocad/overview"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="tool-link"
                  @mouseenter="showTooltip = 'autocad'"
                  @mouseleave="delayHideTooltip"
                >
                  AutoCAD
                </a>
                <div
                  v-if="showTooltip === 'autocad'"
                  class="preview-card"
                  @mouseenter="cancelHideTooltip"
                  @mouseleave="hideTooltip"
                >
                  <div class="preview-header">
                    <span class="tool-icon">🏗️</span>
                    <strong>AutoCAD + Land F/X</strong>
                  </div>
                  <div class="preview-content">
                    <p>Industry standard CAD software for technical drafting, but treats plants as generic objects with no ecological intelligence.</p>
                    <p class="context">💸 <strong>$1,600/year</strong> + steep learning curve</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="tool-cost">$1600/year</div>
          </div>

          <div class="workflow-arrow">
            <div class="error-label">Manual Data Entry</div>
            <div class="arrow">→</div>
          </div>

          <div class="tool-node">
            <div class="tool-name">
              <div class="tooltip-container">
                <a
                  href="https://www.adobe.com/products/illustrator.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="tool-link"
                  @mouseenter="showTooltip = 'illustrator'"
                  @mouseleave="delayHideTooltip"
                >
                  Illustrator
                </a>
                <div
                  v-if="showTooltip === 'illustrator'"
                  class="preview-card"
                  @mouseenter="cancelHideTooltip"
                  @mouseleave="hideTooltip"
                >
                  <div class="preview-header">
                    <span class="tool-icon">🎨</span>
                    <strong>Adobe Illustrator</strong>
                  </div>
                  <div class="preview-content">
                    <p>Vector graphics software used for creating presentation visuals and client-facing materials from CAD exports.</p>
                    <p class="context">🔄 Requires manual import/export from CAD</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="tool-cost">$240/year</div>
          </div>

          <div class="workflow-arrow">
            <div class="error-label">Risk of Error</div>
            <div class="arrow">→</div>
          </div>

          <div class="tool-node">
            <div class="tool-name">
              <div class="tooltip-container">
                <span class="tool-link-plain" @mouseenter="showTooltip = 'excel'" @mouseleave="delayHideTooltip">
                  Excel
                </span>
                <div
                  v-if="showTooltip === 'excel'"
                  class="preview-card"
                  @mouseenter="cancelHideTooltip"
                  @mouseleave="hideTooltip"
                >
                  <div class="preview-header">
                    <span class="tool-icon">📊</span>
                    <strong>Microsoft Excel</strong>
                  </div>
                  <div class="preview-content">
                    <p>Manual takeoffs and quantity calculations - "time-consuming and prone to human error" on razor-thin margins.</p>
                    <p class="context">⏱️ Countless hours of manual calculations</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="tool-cost">$70/year</div>
          </div>

          <div class="workflow-arrow">
            <div class="error-label">Wasted Hours</div>
            <div class="arrow">→</div>
          </div>

          <div class="tool-node">
            <div class="tool-name">
              <div class="tooltip-container">
                <a
                  href="https://www.nwf.org/nativeplantfinder"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="tool-link"
                  @mouseenter="showTooltip = 'nwf'"
                  @mouseleave="delayHideTooltip"
                >
                  NWF Website
                </a>
                <div
                  v-if="showTooltip === 'nwf'"
                  class="preview-card"
                  @mouseenter="cancelHideTooltip"
                  @mouseleave="hideTooltip"
                >
                  <div class="preview-header">
                    <span class="tool-icon">🌿</span>
                    <strong>National Wildlife Federation</strong>
                  </div>
                  <div class="preview-content">
                    <p>Native Plant Finder - external research tool for plant selection, but disconnected from design workflow.</p>
                    <p class="context">🐌 Free but slow, manual research process</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="tool-cost">Free but slow</div>
          </div>
        </div>
      </div>

      <div class="content-grid">
        <div class="hidden-costs-panel">
          <h3>💸 THE HIDDEN COSTS</h3>
          <div class="cost-item">
            <div class="cost-icon">🔄</div>
            <div class="cost-content">
              <h4>Data Loss & Risk</h4>
              <p>Every import/export between programs risks data corruption and requires manual cleanup</p>
            </div>
          </div>
          <div class="cost-item">
            <div class="cost-icon">⏱️</div>
            <div class="cost-content">
              <h4>Time Sink</h4>
              <p>Manual takeoffs are "time-consuming and prone to human error," which can "make or break success" on razor-thin margins</p>
            </div>
          </div>
          <div class="cost-item">
            <div class="cost-icon">💳</div>
            <div class="cost-content">
              <h4>Financial Drain</h4>
              <p>Multiple expensive subscriptions to build a complete, yet inefficient, toolbox</p>
            </div>
          </div>
        </div>

        <div class="cost-breakdown-panel">
          <h3>ANNUAL SOFTWARE COST</h3>
          <div class="cost-line">AutoCAD: $1,600</div>
          <div class="cost-line">Adobe Suite: $600</div>
          <div class="cost-line">Plugins: $500</div>
          <div class="cost-line">Other Tools: $300</div>
          <div class="total-cost">Total: $3,000+/year</div>
          <div class="lost-hours">+ Countless lost hours</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showTooltip = ref(null)
let hideTimeout = null

// Tooltip logic (same as MarketChart)
const delayHideTooltip = () => {
  hideTimeout = setTimeout(() => {
    showTooltip.value = null
  }, 300)
}

const cancelHideTooltip = () => {
  if (hideTimeout) {
    clearTimeout(hideTimeout)
    hideTimeout = null
  }
}

const hideTooltip = () => {
  delayHideTooltip()
}
</script>

<style scoped>
/* The slide is the size container */
.slide-root {
  container-type: size;
  width: 100%;
  height: 100%;
}

.franken-stack-slide {
  background: linear-gradient(135deg, #0f4a3c 0%, #1e6b5a 100%);
  color: white;
  padding: 1.5rem 1.5rem 3rem 1.5rem;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.slide-header {
  text-align: center;
  margin-bottom: 1rem;
}

.slide-header h1 {
  font-size: 1.6rem;
  font-weight: bold;
  color: white;
  margin-bottom: 0.1rem;
}

.subtitle {
  font-family: "Lora", Georgia, "Times New Roman", serif;
  font-size: 0.9rem;
  color: #a0c4c7;
  font-style: italic;
  margin: 0;
}

.workflow-section {
  margin: 0.8rem 0;
  display: flex;
  justify-content: center;
  flex: 0 0 auto;
}

.workflow-chain {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  flex-wrap: wrap;
  justify-content: center;
}

.tool-node {
  background: rgba(255, 255, 255, 0.15);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  padding: 0.6rem;
  min-width: 90px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.tool-name {
  font-weight: bold;
  color: white;
  font-size: 0.8rem;
  margin-bottom: 0.1rem;
}

.tool-link, .tool-link-plain {
  color: white;
  text-decoration: underline;
  cursor: pointer;
}

.tool-link-plain {
  text-decoration: none;
  cursor: help;
}

.tool-cost {
  font-size: 0.7rem;
  color: #a0c4c7;
}

.workflow-arrow {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
}

.error-label {
  font-size: 0.65rem;
  color: #ff6b6b;
  background: rgba(255, 107, 107, 0.2);
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  white-space: nowrap;
  border: 1px solid rgba(255, 107, 107, 0.3);
}

.arrow {
  color: #ff6b6b;
  font-size: 1.3rem;
  font-weight: bold;
}

.content-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.2rem;
  margin-top: 0.8rem;
  flex: 1 1 auto;
}

.hidden-costs-panel,
.cost-breakdown-panel {
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 0.8rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-height: 320px;
  overflow-y: auto;
}

.hidden-costs-panel h3,
.cost-breakdown-panel h3 {
  font-size: 1rem;
  font-weight: bold;
  color: white;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.cost-item {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.6rem;
  align-items: flex-start;
  background: rgba(255, 255, 255, 0.05);
  padding: 0.5rem;
  border-radius: 8px;
  border-left: 4px solid #10b981;
}

.cost-icon {
  font-size: 1rem;
  margin-top: 0.1rem;
}

.cost-content h4 {
  font-size: 0.9rem;
  font-weight: bold;
  color: white;
  margin: 0 0 0.3rem 0;
}

.cost-content p {
  font-size: 0.75rem;
  color: #a0c4c7;
  margin: 0;
  line-height: 1.2;
}

.cost-line {
  color: #a0c4c7;
  margin-bottom: 0.4rem;
  font-size: 0.85rem;
  padding: 0.2rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.total-cost {
  border-top: 2px solid #10b981;
  padding-top: 0.6rem;
  margin-top: 0.6rem;
  font-weight: bold;
  color: #10b981;
  font-size: 1rem;
  text-align: center;
}

.lost-hours {
  color: #ff6b6b;
  font-style: italic;
  margin-top: 0.4rem;
  font-size: 0.85rem;
  text-align: center;
}

/* Tooltip styles (same as MarketChart) */
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
  padding: 12px;
  width: 280px;
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
  font-size: 14px;
  margin-bottom: 8px;
}

.tool-icon {
  font-size: 16px;
}

.preview-content p {
  color: #e5e5e5;
  font-size: 12px;
  line-height: 1.4;
  margin: 0 0 6px 0;
}

.preview-content .context {
  color: #a0c4c7;
  font-size: 11px;
  font-style: italic;
}

@media (max-width: 768px) {
  .content-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .workflow-chain {
    flex-direction: column;
    gap: 0.5rem;
  }

  .workflow-arrow .arrow {
    transform: rotate(90deg);
  }

  .preview-card {
    width: 240px;
  }
}
</style>