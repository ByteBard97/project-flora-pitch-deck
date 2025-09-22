<template>
  <div class="opportunity-slide">
    <div class="slide-header">
      <h1>This Frustration Represents a Multi-Billion Dollar Opportunity</h1>
      <p class="subtitle">A Massive, Growing, and Underserved Market</p>
    </div>

    <div class="main-content">
      <div class="left-column">
        <h3>📈 GLOBAL LANDSCAPE SOFTWARE MARKET</h3>
        <div class="chart-section">
          <div class="bar-container">
            <div class="bar-2024" :style="{ height: bar2024Height }">$2.95B</div>
            <div class="year">2024</div>
          </div>
          <div class="bar-container">
            <div class="bar-2030" :style="{ height: bar2030Height }">$5.45B</div>
            <div class="year">2030</div>
          </div>
        </div>
        <div class="growth-rate" :class="{ visible: showGrowthRate }">10.8% CAGR</div>
      </div>

      <div class="right-column">
        <div class="insight-container" :class="{ visible: showInsights }">
          <div class="insight-item foundation">
            <div class="icon">🏗️</div>
            <h4>Parent Industry Foundation</h4>
            <div class="big-number">$264.7B</div>
            <p>Global landscaping services market provides massive foundation</p>
          </div>

          <div class="insight-item adoption">
            <div class="icon">💻</div>
            <h4>High Digital Adoption</h4>
            <div class="big-number">93%</div>
            <p>of landscape businesses already use software</p>
          </div>

          <div class="insight-item opportunity">
            <div class="icon">🎯</div>
            <h4>The Real Opportunity</h4>
            <p class="key-insight">The question isn't <em>if</em> they'll use software, but <strong>which</strong> integrated platform will finally solve their workflow</p>
          </div>
        </div>
      </div>
    </div>

    <div class="signals-section" :class="{ visible: showSignals }">
      <h3>MARKET READINESS SIGNALS</h3>
      <div class="signals">
        <div class="ready">✅ Market is mature and ready</div>
        <div class="ready">✅ Users already paying for software</div>
        <div class="ready">✅ Pain points are well-documented</div>
        <div class="hot">🔥 No integrated solution exists</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const bar2024Height = ref('0px')
const bar2030Height = ref('0px')
const showGrowthRate = ref(false)
const showInsights = ref(false)
const showSignals = ref(false)

onMounted(() => {
  // Animate bars
  setTimeout(() => {
    bar2024Height.value = '60px'
  }, 500)

  setTimeout(() => {
    bar2030Height.value = '100px'
  }, 800)

  setTimeout(() => {
    showGrowthRate.value = true
  }, 1200)

  // Animate insights container
  setTimeout(() => {
    showInsights.value = true
  }, 1500)

  setTimeout(() => {
    showSignals.value = true
  }, 2400)
})
</script>

<style scoped>
.opportunity-slide {
  background: linear-gradient(135deg, #0f4a3c 0%, #1e6b5a 100%);
  color: white;
  padding: 1.5rem;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.slide-header {
  text-align: center;
  margin-bottom: 0.8rem;
}

.slide-header h1 {
  font-size: 1.6rem;
  font-weight: bold;
  margin-bottom: 0.2rem;
  line-height: 1.1;
}

.subtitle {
  font-size: 0.9rem;
  color: #a0c4c7;
  font-style: italic;
  margin: 0;
}

.main-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  flex: 1;
  align-items: stretch;
  min-height: 0;
  height: 65%;
}

.left-column {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.left-column h3 {
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  text-align: center;
}

.chart-section {
  display: flex;
  justify-content: center;
  align-items: end;
  gap: 2rem;
  height: 120px;
  margin: 1rem 0;
}

.bar-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.bar-2024, .bar-2030 {
  width: 60px;
  border-radius: 8px 8px 0 0;
  display: flex;
  align-items: start;
  justify-content: center;
  padding-top: 0.5rem;
  margin-bottom: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  color: white;
  font-weight: bold;
  font-size: 0.9rem;
  text-shadow: 0 1px 2px rgba(0,0,0,0.5);
  transition: height 0.8s ease-out;
}

.bar-2024 {
  background: linear-gradient(180deg, #fbbf24 0%, #f59e0b 100%);
}

.bar-2030 {
  background: linear-gradient(180deg, #10b981 0%, #059669 100%);
}

.year {
  font-size: 0.9rem;
  color: #a0c4c7;
  font-weight: 600;
}

.growth-rate {
  text-align: center;
  color: #10b981;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 0.8rem 1.5rem;
  margin-top: 1rem;
  border: 2px solid rgba(16, 185, 129, 0.3);
  font-weight: 600;
  font-size: 1.1rem;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s ease-out;
}

.growth-rate.visible {
  opacity: 1;
  transform: translateY(0);
}

.right-column {
  display: flex;
  align-items: start;
}

.insight-container {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1rem;
  width: 100%;
  backdrop-filter: blur(10px);
  opacity: 0;
  transform: translateX(30px);
  transition: all 0.8s ease-out;
  height: fit-content;
}

.insight-container.visible {
  opacity: 1;
  transform: translateX(0);
}

.insight-item {
  text-align: center;
  margin-bottom: 0.8rem;
}

.insight-item:last-child {
  margin-bottom: 0;
}

.insight-item .icon {
  font-size: 1.3rem;
  margin-bottom: 0.3rem;
}

.insight-item h4 {
  font-size: 0.85rem;
  color: white;
  margin-bottom: 0.3rem;
  font-weight: 600;
}

.insight-item p {
  font-size: 0.75rem;
  color: #a0c4c7;
  margin: 0;
  line-height: 1.2;
}

.insight-item.opportunity {
  border-top: 2px solid #fbbf24;
  padding-top: 0.8rem;
  text-align: left;
}

.key-insight {
  font-size: 0.8rem !important;
  color: white !important;
  line-height: 1.3 !important;
}

.key-insight em {
  color: #a0c4c7;
}

.key-insight strong {
  color: #fbbf24;
}

.big-number {
  font-size: 1.6rem;
  font-weight: bold;
  color: #fbbf24;
  display: block;
  margin: 0.3rem 0;
}

.signals-section {
  margin-top: 1rem;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s ease-out;
}

.signals-section.visible {
  opacity: 1;
  transform: translateY(0);
}

.signals-section h3 {
  font-size: 0.9rem;
  margin-bottom: 0.6rem;
  text-align: center;
}

.signals {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.ready, .hot {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 1rem;
  font-size: 0.9rem;
  color: #a0c4c7;
  backdrop-filter: blur(5px);
}

.hot {
  color: #fbbf24;
  border-color: rgba(251, 191, 36, 0.3);
  background: rgba(251, 191, 36, 0.1);
}
</style>