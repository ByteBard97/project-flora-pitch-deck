<template>
  <div class="market-card">
    <div ref="chartContentRef" class="chart-content">
      <h3 title="GLOBAL LANDSCAPE SOFTWARE MARKET">📈 GLOBAL LANDSCAPE SOFTWARE MARKET</h3>
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
        10.8% CAGR
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const bar2024Height = ref('0px')
const bar2030Height = ref('0px')
const showGrowthRate = ref(false)

onMounted(() => {
  // Animate bars after mount
  setTimeout(() => {
    bar2024Height.value = 'clamp(40px, 15cqh, 100px)' // Responsive height
  }, 500)

  setTimeout(() => {
    bar2030Height.value = 'clamp(60px, 25cqh, 150px)' // Responsive height
  }, 800)

  setTimeout(() => {
    showGrowthRate.value = true
  }, 1200)
})
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
  gap: clamp(8px, 2cqh, 16px);
  width: 100%;
  height: 100%;
  justify-content: space-between;
}

.market-card h3 {
  font-size: clamp(9px, 2.5cqw, 16px);
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
  gap: clamp(12px, 4cqw, 32px);
  height: clamp(80px, 25cqh, 150px);
  margin: 0;
  flex: 1;
}

.bar-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;
  height: 100%;
}

.bar {
  width: clamp(40px, 10cqw, 70px);
  height: 0px;
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
</style>