<template>
  <div class="slide-root">
    <div class="tipping-point-slide">
      <div class="slide-header">
        <h1>Three Powerful Waves are Converging</h1>
        <p class="subtitle">Why Now?</p>
      </div>

      <div class="waves-visualization">
        <div class="wave-container">
          <div class="wave wave-1" :class="{ visible: showWave1 }">
            <div class="wave-icon">🌱</div>
            <h3>The Eco-Conscious Consumer</h3>
            <div class="wave-stats">
              <div class="stat">
                <div class="number">71%</div>
                <div class="label">increase in searches for sustainable goods</div>
              </div>
              <div class="stat">
                <div class="number">2.7x</div>
                <div class="label">faster growth for sustainable products</div>
              </div>
            </div>
            <p>The yard is the new frontier for personal climate action</p>
          </div>

          <div class="wave wave-2" :class="{ visible: showWave2 }">
            <div class="wave-icon">🦅</div>
            <h3>The Native Plant Movement Matures</h3>
            <div class="wave-content">
              <p>Organizations like <strong>Audubon and the National Wildlife Federation</strong> are mainstreaming the movement</p>
              <div class="pain-point">
                <span class="quote">"mired in complexity"</span>
                <span class="solution">They need a tool to simplify the process</span>
              </div>
            </div>
          </div>

          <div class="wave wave-3" :class="{ visible: showWave3 }">
            <div class="wave-icon">🎨</div>
            <h3>The Democratization of Design</h3>
            <div class="wave-content">
              <p><strong>Proven playbook:</strong> Platforms like Canva and Figma have built billion-dollar companies</p>
              <div class="analogy">
                <div class="comparison">
                  <span class="company">Canva</span>
                  <span class="arrow">→</span>
                  <span class="domain">Graphic Design</span>
                </div>
                <div class="comparison">
                  <span class="company">Figma</span>
                  <span class="arrow">→</span>
                  <span class="domain">UI/UX Design</span>
                </div>
                <div class="comparison opportunity">
                  <span class="company">Project Flora</span>
                  <span class="arrow">→</span>
                  <span class="domain">Ecological Landscape Design</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="convergence-point" :class="{ visible: showConvergence }">
          <div class="convergence-visual">
            <div class="meeting-point">
              <div class="logo-placeholder">Project Flora</div>
              <div class="timing">Perfect Timing</div>
            </div>
            <div class="wave-lines">
              <div class="line line-1" :class="{ animate: showLines }"></div>
              <div class="line line-2" :class="{ animate: showLines }"></div>
              <div class="line line-3" :class="{ animate: showLines }"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const showWave1 = ref(false)
const showWave2 = ref(false)
const showWave3 = ref(false)
const showConvergence = ref(false)
const showLines = ref(false)

onMounted(() => {
  setTimeout(() => {
    showWave1.value = true
  }, 300)

  setTimeout(() => {
    showWave2.value = true
  }, 600)

  setTimeout(() => {
    showWave3.value = true
  }, 900)

  setTimeout(() => {
    showConvergence.value = true
  }, 1200)

  setTimeout(() => {
    showLines.value = true
  }, 1500)
})
</script>

<style scoped>
/* The slide is the size container */
.slide-root {
  container-type: size;
  width: 100%;
  height: 100%;
}

.tipping-point-slide {
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
  margin-bottom: 1.5rem;
}

.slide-header h1 {
  font-size: clamp(1.2rem, 4cqw, 2.4rem);
  font-weight: bold;
  color: white;
  margin-bottom: 0.3rem;
}

.subtitle {
  font-family: "Lora", Georgia, "Times New Roman", serif;
  font-size: clamp(0.8rem, 2cqw, 1.3rem);
  color: #a0c4c7;
  font-style: italic;
  margin: 0;
  margin-bottom: 1rem;
}

.waves-visualization {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  align-items: center;
  flex: 1 1 auto;
  overflow: hidden;
}

.wave-container {
  display: grid;
  gap: 1rem;
  max-height: 100%;
  overflow-y: auto;
}

.wave {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 1rem;
  position: relative;
  transition: all 0.8s ease-out;
  backdrop-filter: blur(10px);
  opacity: 0;
  transform: translateX(-30px);
}

.wave.visible {
  opacity: 1;
  transform: translateX(0);
}

.wave:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.15);
}

.wave-1 {
  border-left: 4px solid #10b981;
}

.wave-2 {
  border-left: 4px solid #06b6d4;
}

.wave-3 {
  border-left: 4px solid #fbbf24;
}

.wave-icon {
  font-size: clamp(1.5rem, 4cqw, 2.5rem);
  margin-bottom: 0.5rem;
}

.wave h3 {
  font-size: clamp(0.9rem, 2.5cqw, 1.3rem);
  color: white;
  margin-bottom: 0.8rem;
  font-weight: bold;
}

.wave-stats {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 0.8rem;
  flex-wrap: wrap;
}

.stat {
  text-align: center;
}

.stat .number {
  font-size: clamp(1rem, 3cqw, 1.8rem);
  font-weight: bold;
  color: #fbbf24;
}

.stat .label {
  font-size: clamp(0.6rem, 1.5cqw, 0.8rem);
  color: #a0c4c7;
  line-height: 1.2;
}

.wave-content p {
  color: #e5e5e5;
  line-height: 1.4;
  margin-bottom: 0.8rem;
  font-size: clamp(0.7rem, 1.8cqw, 0.9rem);
}

.pain-point {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  padding: 0.8rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 6px;
}

.quote {
  font-style: italic;
  color: #ff6b6b;
  font-size: clamp(0.6rem, 1.5cqw, 0.8rem);
}

.solution {
  color: white;
  font-weight: 600;
  font-size: clamp(0.6rem, 1.5cqw, 0.8rem);
}

.analogy {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  padding: 0.8rem;
}

.comparison {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 0.5rem;
  font-size: clamp(0.6rem, 1.5cqw, 0.8rem);
}

.comparison:last-child {
  margin-bottom: 0;
}

.company {
  font-weight: bold;
  color: white;
  min-width: 60px;
}

.arrow {
  color: #a0c4c7;
}

.domain {
  color: #e5e5e5;
}

.opportunity .company {
  color: #fbbf24;
}

.opportunity .domain {
  color: #fbbf24;
  font-weight: 600;
}

.convergence-point {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: scale(0.8);
  transition: all 0.8s ease-out;
}

.convergence-point.visible {
  opacity: 1;
  transform: scale(1);
}

.convergence-visual {
  position: relative;
  width: clamp(120px, 20cqw, 200px);
  height: clamp(120px, 20cqw, 200px);
}

.meeting-point {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: clamp(80px, 15cqw, 120px);
  height: clamp(80px, 15cqw, 120px);
  background: linear-gradient(135deg, #fbbf24, #10b981);
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #0f4a3c;
  text-align: center;
  box-shadow: 0 8px 32px rgba(255, 193, 7, 0.3);
}

.logo-placeholder {
  font-weight: bold;
  font-size: clamp(0.7rem, 2cqw, 1rem);
  margin-bottom: 0.2rem;
}

.timing {
  font-size: clamp(0.5rem, 1.5cqw, 0.8rem);
  opacity: 0.9;
}

.wave-lines {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.line {
  position: absolute;
  width: 0;
  height: 2px;
  border-radius: 2px;
  opacity: 0;
  transition: all 1s ease-out;
}

.line.animate {
  width: clamp(30px, 8cqw, 60px);
  opacity: 0.7;
}

.line-1 {
  background: #10b981;
  top: 20%;
  left: 10%;
  transform: rotate(-30deg);
  animation: flowIn 2s ease-out 0.5s both;
}

.line-2 {
  background: #06b6d4;
  top: 50%;
  left: 5%;
  transform: rotate(0deg);
  animation: flowIn 2s ease-out 1s both;
}

.line-3 {
  background: #fbbf24;
  bottom: 20%;
  left: 10%;
  transform: rotate(30deg);
  animation: flowIn 2s ease-out 1.5s both;
}

@keyframes flowIn {
  from {
    width: 0;
    opacity: 0;
  }
  to {
    width: clamp(30px, 8cqw, 60px);
    opacity: 0.7;
  }
}

@media (max-width: 768px) {
  .waves-visualization {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .wave-stats {
    flex-direction: column;
    gap: 0.8rem;
  }
}
</style>