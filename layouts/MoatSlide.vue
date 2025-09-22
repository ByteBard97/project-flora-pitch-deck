<template>
  <div class="moat-slide">
    <div class="slide-header">
      <h1>Our Three-Layer Moat</h1>
      <p class="subtitle">Why We Will Win</p>
    </div>

    <div class="moat-visualization" :class="{ visible: showVisualization }">
      <div class="moat-layers">
        <div class="layer layer-core" :class="{ visible: showCore }">
          <div class="layer-content">
            <h3>1. The Data Asset</h3>
            <p>Proprietary, relational native plant database</p>
          </div>
        </div>
        <div class="layer layer-middle" :class="{ visible: showMiddle }">
          <div class="layer-content">
            <h3>2. The Accessible UX</h3>
            <p>Smarter, fundamentally better tool</p>
          </div>
        </div>
        <div class="layer layer-outer" :class="{ visible: showOuter }">
          <div class="layer-content">
            <h3>3. The Community Flywheel</h3>
            <p>Network effect that's impossible to replicate</p>
          </div>
        </div>
      </div>
    </div>

    <div class="moat-details" :class="{ visible: showDetails }">
      <div class="detail-card">
        <div class="card-icon">🗄️</div>
        <h4>The Data Asset</h4>
        <p>Building and curating our proprietary, relational native plant database is a <strong>massive undertaking</strong>. Generalist competitors are strategically disincentivized from making this deep, niche investment. This is our foundation.</p>
        <div class="competitive-advantage">Defensible: High barrier to entry</div>
      </div>

      <div class="detail-card">
        <div class="card-icon">✨</div>
        <h4>The Accessible UX</h4>
        <p>Like Canva, we are not building a "dumber" version of CAD. We are building a <strong>smarter</strong>, fundamentally <strong>better</strong> tool for a different "job to be done"—empowering confident, ecological decision-making.</p>
        <div class="competitive-advantage">Sustainable: Different approach entirely</div>
      </div>

      <div class="detail-card">
        <div class="card-icon">🔄</div>
        <h4>The Community Flywheel</h4>
        <p>This is our most powerful, long-term advantage. We're using the <strong>AllTrails playbook</strong>. Every user who shares a photo or a plant review makes the platform more valuable for the next user, creating a network effect that's nearly impossible for a competitor to replicate from scratch.</p>
        <div class="competitive-advantage">Exponential: Network effects</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const showVisualization = ref(false)
const showCore = ref(false)
const showMiddle = ref(false)
const showOuter = ref(false)
const showDetails = ref(false)

onMounted(() => {
  setTimeout(() => {
    showVisualization.value = true
  }, 300)

  setTimeout(() => {
    showCore.value = true
  }, 600)

  setTimeout(() => {
    showMiddle.value = true
  }, 900)

  setTimeout(() => {
    showOuter.value = true
  }, 1200)

  setTimeout(() => {
    showDetails.value = true
  }, 1500)
})
</script>

<style scoped>
.moat-slide {
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

.moat-visualization {
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
  opacity: 0;
  transform: scale(0.8);
  transition: all 0.8s ease-out;
}

.moat-visualization.visible {
  opacity: 1;
  transform: scale(1);
}

.moat-layers {
  position: relative;
  width: 200px;
  height: 200px;
}

.layer {
  position: absolute;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  opacity: 0;
  transform: scale(0.5);
  transition: all 0.8s ease-out;
}

.layer.visible {
  opacity: 1;
  transform: scale(1);
}

.layer-core {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #fbbf24, #06b6d4);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.5);
  z-index: 3;
}

.layer-core.visible {
  transform: translate(-50%, -50%) scale(1);
}

.layer-middle {
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.7), rgba(16, 185, 129, 0.7));
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.5);
  z-index: 2;
  border: 2px solid #10b981;
}

.layer-middle.visible {
  transform: translate(-50%, -50%) scale(1);
}

.layer-outer {
  width: 180px;
  height: 180px;
  background: linear-gradient(135deg, rgba(6, 182, 212, 0.5), rgba(6, 182, 212, 0.5));
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.5);
  z-index: 1;
  border: 2px solid #06b6d4;
}

.layer-outer.visible {
  transform: translate(-50%, -50%) scale(1);
}

.layer-content h3 {
  font-size: 0.6rem;
  margin-bottom: 0.2rem;
  color: white;
  line-height: 1.1;
}

.layer-content p {
  font-size: 0.4rem;
  color: white;
  margin: 0;
  line-height: 1.2;
}

.moat-details {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.8rem;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s ease-out;
}

.moat-details.visible {
  opacity: 1;
  transform: translateY(0);
}

.detail-card {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
  backdrop-filter: blur(10px);
}

.card-icon {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.detail-card h4 {
  font-size: 0.8rem;
  color: white;
  margin-bottom: 0.5rem;
}

.detail-card p {
  font-size: 0.6rem;
  color: #a0c4c7;
  line-height: 1.3;
  margin-bottom: 0.5rem;
}

.detail-card strong {
  color: white;
}

.competitive-advantage {
  background: rgba(16, 185, 129, 0.2);
  color: #10b981;
  padding: 0.3rem 0.6rem;
  border-radius: 15px;
  font-size: 0.5rem;
  font-weight: 600;
  border: 1px solid rgba(16, 185, 129, 0.3);
  display: inline-block;
}
</style>