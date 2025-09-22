<template>
  <div class="solution-slide">
    <div class="slide-header">
      <h1>An Intelligent, Intuitive Platform for Sustainable Landscape Design</h1>
      <p class="subtitle">Introducing Project Flora</p>
    </div>

    <div class="vision-statement" :class="{ visible: showVision }">
      <div class="vision-text">
        <h2>Our Vision</h2>
        <p>To empower <strong>anyone</strong> to create beautiful, sustainable, and ecologically functional landscapes with <strong>confidence</strong>.</p>
      </div>
    </div>

    <div class="three-pillars" :class="{ visible: showPillars }">
      <h3>Built on Three Foundational Pillars</h3>
      <div class="pillars-container">
        <div class="pillar" data-pillar="data" :class="{ visible: showPillar1 }">
          <div class="pillar-number">1</div>
          <div class="pillar-icon">🌿</div>
          <h4>A Deep, Curated Native Plant Database</h4>
          <p class="pillar-subtitle">The Data Moat</p>
          <p>Comprehensive, regional plant data with ecological relationships, soil preferences, and companion planting information.</p>
        </div>

        <div class="pillar" data-pillar="ux" :class="{ visible: showPillar2 }">
          <div class="pillar-number">2</div>
          <div class="pillar-icon">✨</div>
          <h4>An Intuitive, Beginner-Focused Design Experience</h4>
          <p class="pillar-subtitle">The Accessibility Moat</p>
          <p>Powerful design tools that feel as simple as sketching on paper, with intelligent guidance every step of the way.</p>
        </div>

        <div class="pillar" data-pillar="community" :class="{ visible: showPillar3 }">
          <div class="pillar-number">3</div>
          <div class="pillar-icon">🤝</div>
          <h4>A Community-Driven Knowledge Platform</h4>
          <p class="pillar-subtitle">The Network Effect Moat</p>
          <p>Real user experiences, photos, and reviews create an ever-growing knowledge base that benefits everyone.</p>
        </div>
      </div>
    </div>

    <div class="platform-preview" :class="{ visible: showPreview }">
      <div class="preview-container">
        <div class="mockup-placeholder">
          <div class="screen">
            <div class="header">
              <div class="logo">🌿 Project Flora</div>
              <div class="nav-items">
                <span>Design</span>
                <span>Plants</span>
                <span>Community</span>
              </div>
            </div>
            <div class="main-area">
              <div class="canvas-area">
                <div class="property-outline"></div>
                <div class="plant-placement plant-1"></div>
                <div class="plant-placement plant-2"></div>
                <div class="plant-placement plant-3"></div>
              </div>
              <div class="sidebar">
                <div class="plant-suggestion">
                  <div class="plant-thumb"></div>
                  <div class="plant-info">
                    <div class="plant-name">Purple Coneflower</div>
                    <div class="plant-details">Native • Full Sun • Clay Soil</div>
                  </div>
                </div>
                <div class="plant-suggestion">
                  <div class="plant-thumb"></div>
                  <div class="plant-info">
                    <div class="plant-name">Wild Bergamot</div>
                    <div class="plant-details">Native • Part Sun • Drought Tolerant</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="preview-caption">
          <em>Beautiful, sustainable, and ecologically functional landscapes</em>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const showVision = ref(false)
const showPillars = ref(false)
const showPillar1 = ref(false)
const showPillar2 = ref(false)
const showPillar3 = ref(false)
const showPreview = ref(false)

onMounted(() => {
  setTimeout(() => {
    showVision.value = true
  }, 300)

  setTimeout(() => {
    showPillars.value = true
  }, 600)

  setTimeout(() => {
    showPillar1.value = true
  }, 900)

  setTimeout(() => {
    showPillar2.value = true
  }, 1200)

  setTimeout(() => {
    showPillar3.value = true
  }, 1500)

  setTimeout(() => {
    showPreview.value = true
  }, 1800)
})
</script>

<style scoped>
.solution-slide {
  background: linear-gradient(135deg, #0f4a3c 0%, #1e6b5a 100%);
  color: white;
  padding: 0.8rem;
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
  font-size: 1.4rem;
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

.vision-statement {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(6, 182, 212, 0.2));
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 1rem;
  text-align: center;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s ease-out;
}

.vision-statement.visible {
  opacity: 1;
  transform: translateY(0);
}

.vision-text h2 {
  font-size: 1rem;
  color: white;
  margin-bottom: 0.5rem;
}

.vision-text p {
  font-size: 0.8rem;
  color: #a0c4c7;
  line-height: 1.4;
  margin: 0;
}

.vision-text strong {
  color: #fbbf24;
}

.three-pillars {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s ease-out;
  margin-bottom: 1rem;
}

.three-pillars.visible {
  opacity: 1;
  transform: translateY(0);
}

.three-pillars h3 {
  font-size: 1rem;
  color: white;
  margin-bottom: 1rem;
  text-align: center;
}

.pillars-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.8rem;
}

.pillar {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 0.8rem 0.6rem;
  text-align: center;
  position: relative;
  transition: all 0.6s ease-out;
  opacity: 0;
  transform: translateY(30px);
  backdrop-filter: blur(10px);
}

.pillar.visible {
  opacity: 1;
  transform: translateY(0);
}

.pillar[data-pillar="data"] {
  border-left: 3px solid #10b981;
}

.pillar[data-pillar="ux"] {
  border-left: 3px solid #fbbf24;
}

.pillar[data-pillar="community"] {
  border-left: 3px solid #06b6d4;
}

.pillar-number {
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

.pillar-icon {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.pillar h4 {
  font-size: 0.7rem;
  color: white;
  margin-bottom: 0.3rem;
  line-height: 1.2;
}

.pillar-subtitle {
  font-size: 0.6rem;
  color: #fbbf24;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.pillar p {
  font-size: 0.5rem;
  color: #a0c4c7;
  line-height: 1.3;
  margin: 0;
}

.platform-preview {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  padding: 1rem;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s ease-out;
  flex: 1;
  min-height: 0;
}

.platform-preview.visible {
  opacity: 1;
  transform: translateY(0);
}

.preview-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  height: 100%;
}

.mockup-placeholder {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 0.6rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
  max-width: 500px;
  width: 100%;
  flex: 1;
  min-height: 0;
}

.screen {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 6px;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.header {
  background: #1e293b;
  color: white;
  padding: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-weight: bold;
  font-size: 0.7rem;
}

.nav-items {
  display: flex;
  gap: 0.8rem;
  font-size: 0.6rem;
}

.main-area {
  display: grid;
  grid-template-columns: 2fr 1fr;
  flex: 1;
  min-height: 0;
}

.canvas-area {
  background: rgba(44, 122, 90, 0.1);
  position: relative;
  padding: 0.5rem;
}

.property-outline {
  border: 1px dashed #374151;
  width: 80%;
  height: 70%;
  position: absolute;
  top: 15%;
  left: 10%;
  border-radius: 4px;
}

.plant-placement {
  position: absolute;
  width: 8px;
  height: 8px;
  background: #10b981;
  border-radius: 50%;
  border: 1px solid #10b981;
}

.plant-1 { top: 30%; left: 25%; }
.plant-2 { top: 50%; left: 45%; }
.plant-3 { top: 70%; left: 30%; }

.sidebar {
  background: #f9fafb;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.plant-suggestion {
  display: flex;
  gap: 0.4rem;
  padding: 0.4rem;
  background: rgba(142, 209, 198, 0.2);
  border-radius: 4px;
}

.plant-thumb {
  width: 20px;
  height: 20px;
  background: #10b981;
  border-radius: 3px;
  flex-shrink: 0;
}

.plant-name {
  font-size: 0.5rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.1rem;
}

.plant-details {
  font-size: 0.4rem;
  color: #6b7280;
}

.preview-caption {
  font-size: 0.7rem;
  color: #a0c4c7;
  text-align: center;
  font-style: italic;
}
</style>