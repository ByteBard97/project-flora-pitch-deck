<template>
  <div class="slide-root">
    <div class="competitive-gap-slide">
    <div class="slide-header">
      <h1>No One is Serving the Eco-Conscious Designer</h1>
      <p class="subtitle">A Vast White Space</p>
    </div>

    <div class="competitive-matrix" :class="{ visible: showMatrix }">
      <div class="matrix-container">
        <div class="axis-labels">
          <div class="y-axis-label">
            <span>Deep Native Data</span>
            <div class="axis-arrow">↑</div>
            <span>Ecological Intelligence</span>
            <div class="axis-arrow">↓</div>
            <span>Generic Objects</span>
          </div>
          <div class="x-axis-label">
            <span>Pro-Grade Complexity</span>
            <div class="axis-arrow">→</div>
            <span>User Accessibility</span>
            <div class="axis-arrow">→</div>
            <span>Beginner Friendly</span>
          </div>
        </div>

        <div class="matrix-grid">
          <!-- Top Left: Professional CAD/BIM -->
          <div class="competitor-bubble professional" :class="{ visible: showProfessional }">
            <div class="logo">CAD/BIM</div>
            <div class="names">Vectorworks<br>AutoCAD</div>
          </div>

          <!-- Top Right: Our Opportunity -->
          <div class="opportunity-space" :class="{ visible: showOpportunity }">
            <div class="star">⭐</div>
            <div class="label">Project Flora</div>
          </div>

          <!-- Bottom Left: Empty -->
          <div class="empty-space"></div>

          <!-- Bottom Right: Consumer Apps -->
          <div class="competitor-bubble consumer" :class="{ visible: showConsumer }">
            <div class="logo">Apps</div>
            <div class="names">iScape<br>SketchUp</div>
          </div>

          <!-- Middle Right: Niche Specialists -->
          <div class="competitor-bubble niche" :class="{ visible: showNiche }">
            <div class="logo">DB</div>
            <div class="names">NativeScape<br>Calscape</div>
          </div>
        </div>
      </div>
    </div>

    <div class="competitor-analysis" :class="{ visible: showAnalysis }">
      <div class="competitor-card">
        <h3>🏗️ Professional CAD/BIM</h3>
        <div class="pros-cons">
          <div class="cons">
            <strong>Issues:</strong>
            <ul>
              <li>Too complex and expensive</li>
              <li>Treat plants as generic objects</li>
              <li>No ecological data integration</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="competitor-card">
        <h3>📱 Consumer Apps</h3>
        <div class="pros-cons">
          <div class="cons">
            <strong>Issues:</strong>
            <ul>
              <li>Hit an "aesthetic ceiling"</li>
              <li>Lack region-specific data</li>
              <li>Can't answer the "why"</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="competitor-card">
        <h3>📊 Niche Specialists</h3>
        <div class="pros-cons">
          <div class="pros">
            <strong>Good:</strong> Right data focus
          </div>
          <div class="cons">
            <strong>Issues:</strong>
            <ul>
              <li>More databases than design tools</li>
              <li>Haven't solved the design problem</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const showMatrix = ref(false)
const showProfessional = ref(false)
const showConsumer = ref(false)
const showNiche = ref(false)
const showOpportunity = ref(false)
const showAnalysis = ref(false)

onMounted(() => {
  setTimeout(() => {
    showMatrix.value = true
  }, 300)

  setTimeout(() => {
    showProfessional.value = true
  }, 600)

  setTimeout(() => {
    showConsumer.value = true
  }, 900)

  setTimeout(() => {
    showNiche.value = true
  }, 1200)

  setTimeout(() => {
    showOpportunity.value = true
  }, 1500)

  setTimeout(() => {
    showAnalysis.value = true
  }, 1800)
})
</script>

<style scoped>
.competitive-gap-slide {
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
  margin-bottom: 0.8rem;
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

.competitive-matrix {
  margin-bottom: 1rem;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s ease-out;
}

.competitive-matrix.visible {
  opacity: 1;
  transform: translateY(0);
}

.matrix-container {
  position: relative;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  padding: 2rem;
  min-height: 200px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.axis-labels {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.y-axis-label {
  position: absolute;
  left: -1.5rem;
  top: 50%;
  transform: translateY(-50%) rotate(-90deg);
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.6rem;
  color: #a0c4c7;
  white-space: nowrap;
}

.x-axis-label {
  position: absolute;
  bottom: -1.5rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.6rem;
  color: #a0c4c7;
  white-space: nowrap;
}

.axis-arrow {
  font-size: 0.8rem;
  color: #a0c4c7;
}

.matrix-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  height: 160px;
  gap: 0.5rem;
  position: relative;
}

.competitor-bubble {
  border-radius: 8px;
  padding: 0.6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  border: 2px solid;
  opacity: 0;
  transform: scale(0.8);
  transition: all 0.6s ease-out;
}

.competitor-bubble.visible {
  opacity: 1;
  transform: scale(1);
}

.professional {
  background: rgba(6, 182, 212, 0.2);
  border-color: #06b6d4;
}

.consumer {
  background: rgba(255, 152, 0, 0.2);
  border-color: #ff9800;
}

.niche {
  background: rgba(16, 185, 129, 0.2);
  border-color: #10b981;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 80px;
  height: 60px;
}

.niche.visible {
  transform: translateY(-50%) scale(1);
}

.logo {
  font-size: 0.8rem;
  font-weight: bold;
  margin-bottom: 0.3rem;
  color: white;
}

.names {
  font-size: 0.5rem;
  color: #a0c4c7;
  line-height: 1.2;
}

.opportunity-space {
  background: linear-gradient(135deg, #fbbf24, #10b981);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #0f4a3c;
  opacity: 0;
  transform: scale(0.8);
  transition: all 0.8s ease-out;
  animation: pulse 2s ease-in-out infinite;
}

.opportunity-space.visible {
  opacity: 1;
  transform: scale(1);
}

.star {
  font-size: 1.5rem;
  margin-bottom: 0.2rem;
}

.label {
  font-size: 0.7rem;
  font-weight: bold;
}

.empty-space {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  border: 1px dashed #a0c4c7;
}

@keyframes pulse {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(255, 193, 7, 0.7);
  }
  50% {
    box-shadow: 0 0 0 8px rgba(255, 193, 7, 0);
  }
}

.competitor-analysis {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.8rem;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s ease-out;
}

.competitor-analysis.visible {
  opacity: 1;
  transform: translateY(0);
}

.competitor-card {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 0.8rem;
  backdrop-filter: blur(10px);
}

.competitor-card h3 {
  font-size: 0.8rem;
  color: white;
  margin-bottom: 0.6rem;
}

.pros-cons {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.pros strong, .cons strong {
  display: block;
  margin-bottom: 0.3rem;
  font-size: 0.6rem;
}

.pros strong {
  color: #10b981;
}

.cons strong {
  color: #f87171;
}

.pros-cons ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.pros-cons li {
  font-size: 0.5rem;
  color: #a0c4c7;
  margin-bottom: 0.2rem;
  line-height: 1.3;
}

.pros-cons li::before {
  content: "• ";
  color: #a0c4c7;
  margin-right: 0.3rem;
}
</style>