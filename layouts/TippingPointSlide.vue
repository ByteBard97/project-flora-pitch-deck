<template>
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
              <div class="label">searches ↑</div>
            </div>
            <div class="stat">
              <div class="number">2.7x</div>
              <div class="label">growth</div>
            </div>
          </div>
          <p>The yard is the new frontier for climate action</p>
        </div>

        <div class="wave wave-2" :class="{ visible: showWave2 }">
          <div class="wave-icon">🦅</div>
          <h3>The Native Plant Movement Matures</h3>
          <div class="wave-content">
            <p><strong>Audubon</strong> and <strong>NWF</strong> mainstreaming movement</p>
            <div class="pain-point">
              <span class="quote">"mired in complexity"</span>
              <span class="solution">Need simplification tool</span>
            </div>
          </div>
        </div>

        <div class="wave wave-3" :class="{ visible: showWave3 }">
          <div class="wave-icon">🎨</div>
          <h3>The Democratization of Design</h3>
          <div class="wave-content">
            <p><strong>Proven playbook:</strong> Billion-dollar design platforms</p>
            <div class="analogy">
              <div class="comparison">
                <span class="company">Canva</span>
                <span class="arrow">→</span>
                <span class="domain">Graphics</span>
              </div>
              <div class="comparison">
                <span class="company">Figma</span>
                <span class="arrow">→</span>
                <span class="domain">UI/UX</span>
              </div>
              <div class="comparison opportunity">
                <span class="company">Flora</span>
                <span class="arrow">→</span>
                <span class="domain">Landscapes</span>
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
.tipping-point-slide {
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
  margin-bottom: 0.5rem;
}

.slide-header h1 {
  font-size: 1.4rem;
  font-weight: bold;
  margin-bottom: 0.3rem;
  line-height: 1.1;
}

.subtitle {
  font-size: 0.8rem;
  color: #a0c4c7;
  font-style: italic;
  margin: 0;
}

.waves-visualization {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 0.8rem;
  align-items: start;
  height: 85%;
}

.wave-container {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  height: 100%;
}

.wave {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  padding: 0.4rem;
  backdrop-filter: blur(10px);
  opacity: 0;
  transform: translateX(-30px);
  transition: all 0.8s ease-out;
}

.wave.visible {
  opacity: 1;
  transform: translateX(0);
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
  font-size: 0.8rem;
  margin-bottom: 0.2rem;
}

.wave h3 {
  font-size: 0.7rem;
  color: white;
  margin-bottom: 0.3rem;
}

.wave-stats {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.3rem;
}

.stat {
  text-align: center;
}

.stat .number {
  font-size: 0.7rem;
  font-weight: bold;
  color: #fbbf24;
}

.stat .label {
  font-size: 0.4rem;
  color: #a0c4c7;
  line-height: 1.1;
}

.wave-content p {
  color: #a0c4c7;
  line-height: 1.2;
  margin-bottom: 0.3rem;
  font-size: 0.5rem;
}

.pain-point {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  padding: 0.3rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

.quote {
  font-style: italic;
  color: #f87171;
  font-size: 0.4rem;
}

.solution {
  color: white;
  font-weight: 600;
  font-size: 0.4rem;
}

.analogy {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  padding: 0.3rem;
}

.comparison {
  display: flex;
  align-items: center;
  gap: 0.2rem;
  margin-bottom: 0.1rem;
  font-size: 0.4rem;
}

.comparison:last-child {
  margin-bottom: 0;
}

.company {
  font-weight: bold;
  color: white;
  min-width: 40px;
}

.arrow {
  color: #a0c4c7;
}

.domain {
  color: #a0c4c7;
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
  width: 150px;
  height: 150px;
}

.meeting-point {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90px;
  height: 90px;
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
  font-size: 0.8rem;
  margin-bottom: 0.2rem;
}

.timing {
  font-size: 0.6rem;
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
  border-radius: 1px;
  opacity: 0;
  transition: all 1s ease-out;
}

.line.animate {
  width: 45px;
  opacity: 0.7;
}

.line-1 {
  background: #10b981;
  top: 20%;
  left: 10%;
  transform: rotate(-30deg);
}

.line-2 {
  background: #06b6d4;
  top: 50%;
  left: 5%;
  transform: rotate(0deg);
}

.line-3 {
  background: #fbbf24;
  bottom: 20%;
  left: 10%;
  transform: rotate(30deg);
}
</style>