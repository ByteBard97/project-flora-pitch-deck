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
        <div class="card foundation" :class="{ visible: showCard1 }">
          🏗️ <strong>Parent Industry Foundation</strong><br>
          <span class="big-number">$264.7B</span><br>
          <em>Global landscaping services market</em>
        </div>
        <div class="card adoption" :class="{ visible: showCard2 }">
          💻 <strong>High Digital Adoption</strong><br>
          <span class="big-number">93%</span><br>
          <em>of landscape businesses use software</em>
        </div>
        <div class="card opportunity" :class="{ visible: showCard3 }">
          🎯 <strong>The Real Opportunity</strong><br>
          <em>The question isn't if they'll use software, but which integrated platform will solve their workflow</em>
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
const showCard1 = ref(false)
const showCard2 = ref(false)
const showCard3 = ref(false)
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

  // Animate cards
  setTimeout(() => {
    showCard1.value = true
  }, 1500)

  setTimeout(() => {
    showCard2.value = true
  }, 1800)

  setTimeout(() => {
    showCard3.value = true
  }, 2100)

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
  margin-bottom: 1.2rem;
}

.slide-header h1 {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 0.3rem;
  line-height: 1.1;
}

.subtitle {
  font-size: 1rem;
  color: #a0c4c7;
  font-style: italic;
  margin: 0;
}

.main-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  flex: 1;
  align-items: start;
  min-height: 0;
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
  display: grid;
  gap: 0.6rem;
  align-content: start;
}

.card {
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 0.8rem;
  text-align: center;
  font-size: 0.85rem;
  backdrop-filter: blur(10px);
  opacity: 0;
  transform: translateX(30px);
  transition: all 0.6s ease-out;
}

.card.visible {
  opacity: 1;
  transform: translateX(0);
}

.card.opportunity {
  border-left: 4px solid #fbbf24;
  text-align: left;
}

.big-number {
  font-size: 2rem;
  font-weight: bold;
  color: #fbbf24;
  display: block;
  margin: 0.5rem 0;
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
  grid-template-columns: repeat(4, 1fr);
  gap: 0.6rem;
}

.ready, .hot {
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  padding: 0.5rem;
  font-size: 0.75rem;
  color: #a0c4c7;
  text-align: center;
  backdrop-filter: blur(5px);
}

.hot {
  color: #fbbf24;
  border-color: rgba(251, 191, 36, 0.3);
  background: rgba(251, 191, 36, 0.1);
}
</style>