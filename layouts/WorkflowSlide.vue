<template>
  <div class="workflow-slide">
    <div class="slide-header">
      <h1>From Hours of Research to Minutes of Creation</h1>
      <p class="subtitle">The Workflow Reimagined</p>
    </div>

    <div class="workflow-steps">
      <div class="step" data-step="1" :class="{ visible: showStep1 }">
        <div class="step-number">1</div>
        <div class="step-icon">📍</div>
        <h3>Automated Site Setup</h3>
        <p><strong>Enter an address.</strong> We pull in property lines (GIS), high-resolution satellite imagery (Mapbox), and elevation data (USGS) to create an accurate 3D-ready base map in seconds.</p>
        <div class="time-saved">Saves: 2-3 hours</div>
      </div>

      <div class="step" data-step="2" :class="{ visible: showStep2 }">
        <div class="step-number">2</div>
        <div class="step-icon">💡</div>
        <h3>Guided, Intelligent Design</h3>
        <p>Our 2D-first canvas is simple and intuitive. As you design, our <strong>"Eco-CoPilot"</strong> suggests appropriate native plants based on your site's specific ecoregion, soil type, and sun exposure.</p>
        <div class="time-saved">Saves: 4-6 hours</div>
      </div>

      <div class="step" data-step="3" :class="{ visible: showStep3 }">
        <div class="step-number">3</div>
        <div class="step-icon">👥</div>
        <h3>Community-Sourced Inspiration</h3>
        <p>See real-world photos and design templates from other users in your exact region. Filter by <em>"full sun clay slope"</em> and see what has <strong>actually worked</strong> for your neighbors.</p>
        <div class="time-saved">Saves: 2-4 hours</div>
      </div>

      <div class="step" data-step="4" :class="{ visible: showStep4 }">
        <div class="step-number">4</div>
        <div class="step-icon">🛒</div>
        <h3>Confident Execution</h3>
        <p>With one click, generate a professional design document, a curated plant shopping list, and a phased implementation plan.</p>
        <div class="time-saved">Saves: 1-2 hours</div>
      </div>
    </div>

    <div class="workflow-comparison" :class="{ visible: showComparison }">
      <div class="old-way">
        <h4>❌ Old Way</h4>
        <div class="time-estimate">8-15 hours</div>
        <p>Fragmented research across multiple tools</p>
      </div>
      <div class="arrow">→</div>
      <div class="new-way">
        <h4>✅ Project Flora</h4>
        <div class="time-estimate">30-60 minutes</div>
        <p>Integrated, intelligent workflow</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const showStep1 = ref(false)
const showStep2 = ref(false)
const showStep3 = ref(false)
const showStep4 = ref(false)
const showComparison = ref(false)

onMounted(() => {
  setTimeout(() => {
    showStep1.value = true
  }, 300)

  setTimeout(() => {
    showStep2.value = true
  }, 600)

  setTimeout(() => {
    showStep3.value = true
  }, 900)

  setTimeout(() => {
    showStep4.value = true
  }, 1200)

  setTimeout(() => {
    showComparison.value = true
  }, 1500)
})
</script>

<style scoped>
.workflow-slide {
  background: linear-gradient(135deg, #0f4a3c 0%, #1e6b5a 100%);
  color: white;
  padding: 1rem;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.slide-header {
  text-align: center;
  margin-bottom: 1rem;
}

.slide-header h1 {
  font-size: 1.6rem;
  font-weight: bold;
  margin-bottom: 0.3rem;
  line-height: 1.1;
}

.subtitle {
  font-size: 0.9rem;
  color: #a0c4c7;
  font-style: italic;
  margin: 0;
}

.workflow-steps {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.8rem;
  margin-bottom: 1.5rem;
}

.step {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1rem 0.8rem;
  text-align: center;
  position: relative;
  transition: all 0.6s ease-out;
  opacity: 0;
  transform: translateY(30px);
  backdrop-filter: blur(10px);
}

.step.visible {
  opacity: 1;
  transform: translateY(0);
}

.step-number {
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 20px;
  background: #fbbf24;
  color: #0f4a3c;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 0.7rem;
}

.step-icon {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.step h3 {
  font-size: 0.8rem;
  color: white;
  margin-bottom: 0.5rem;
  line-height: 1.2;
}

.step p {
  font-size: 0.6rem;
  color: #a0c4c7;
  line-height: 1.3;
  margin-bottom: 0.5rem;
}

.step strong {
  color: white;
}

.step em {
  color: #fbbf24;
  font-style: italic;
}

.time-saved {
  background: rgba(16, 185, 129, 0.2);
  color: #10b981;
  padding: 0.3rem 0.6rem;
  border-radius: 20px;
  font-size: 0.5rem;
  font-weight: 600;
  border: 1px solid rgba(16, 185, 129, 0.3);
}

.workflow-comparison {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 1.5rem;
  align-items: center;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s ease-out;
}

.workflow-comparison.visible {
  opacity: 1;
  transform: translateY(0);
}

.old-way, .new-way {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  backdrop-filter: blur(10px);
}

.old-way {
  border: 2px solid #f87171;
  background: rgba(248, 113, 113, 0.15);
}

.new-way {
  border: 2px solid #10b981;
  background: rgba(16, 185, 129, 0.15);
}

.old-way h4 {
  font-size: 1rem;
  margin-bottom: 0.8rem;
  color: white;
}

.new-way h4 {
  font-size: 1rem;
  margin-bottom: 0.8rem;
  color: white;
}

.time-estimate {
  font-size: 1.4rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
}

.old-way .time-estimate {
  color: #f87171;
}

.new-way .time-estimate {
  color: #10b981;
}

.old-way p, .new-way p {
  font-size: 0.8rem;
  color: #a0c4c7;
  margin: 0;
}

.arrow {
  font-size: 2rem;
  color: #a0c4c7;
  text-align: center;
}
</style>