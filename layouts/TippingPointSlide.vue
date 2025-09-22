<template>
  <div class="slide-root">
    <div class="tipping-point-slide">
      <div class="slide-header">
        <h1>Three Powerful Waves are Converging</h1>
        <p class="subtitle">Why Now?</p>
      </div>

      <div class="content-container">
        <!-- Left Half: Three Wave Cards -->
        <div class="left-half">
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
            <p class="wave-text">The yard is the new frontier for personal climate action</p>
          </div>

          <div class="wave wave-2" :class="{ visible: showWave2 }">
            <div class="wave-icon">🦅</div>
            <h3>The Native Plant Movement Matures</h3>
            <div class="wave-content">
              <p>Organizations like <strong>Audubon and NWF</strong> are mainstreaming the movement</p>
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

        <!-- Right Half: Convergence Visualization -->
        <div class="right-half">
          <div class="convergence-area" :class="{ visible: showConvergence }">
            <div class="convergence-title">The Perfect Storm</div>

            <!-- Flowing energy lines from left to center -->
            <div class="energy-flows">
              <div class="energy-line energy-1" :class="{ flowing: showLines }"></div>
              <div class="energy-line energy-2" :class="{ flowing: showLines }"></div>
              <div class="energy-line energy-3" :class="{ flowing: showLines }"></div>
            </div>

            <!-- Central convergence orb -->
            <div class="convergence-orb" :class="{ spinning: startSpinning }">
              <div class="orb-container">
                <div class="sphere-3d">
                  <!-- Multiple faces to create a more spherical appearance -->
                  <div class="sphere-face front">
                    <img src="/flora-tree.webp" alt="Flora Tree" class="flora-texture" />
                  </div>
                  <div class="sphere-face back">
                    <img src="/flora-tree.webp" alt="Flora Tree" class="flora-texture" />
                  </div>
                  <div class="sphere-face left">
                    <img src="/flora-tree.webp" alt="Flora Tree" class="flora-texture" />
                  </div>
                  <div class="sphere-face right">
                    <img src="/flora-tree.webp" alt="Flora Tree" class="flora-texture" />
                  </div>
                </div>
                <div class="orb-glow"></div>
                <div class="orb-particles">
                  <span class="particle" v-for="i in 8" :key="i"></span>
                </div>
              </div>
              <div class="orb-label">
                <div class="main-text">Project Flora</div>
                <div class="sub-text">Where All Waves Meet</div>
              </div>
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
const startSpinning = ref(false)

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

  // Start the 3D spinning animation
  setTimeout(() => {
    startSpinning.value = true
  }, 2000)
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
  padding: clamp(8px, 2cqh, 24px) clamp(16px, 2cqw, 24px);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.slide-header {
  flex: 0 0 auto;
  text-align: center;
  margin-bottom: clamp(8px, 1.5cqh, 16px);
}

.slide-header h1 {
  font-size: clamp(20px, 4cqw, 38px);
  font-weight: bold;
  color: white;
  margin-bottom: clamp(4px, 0.5cqh, 8px);
}

.subtitle {
  font-family: "Lora", Georgia, "Times New Roman", serif;
  font-size: clamp(12px, 2cqw, 20px);
  color: #a0c4c7;
  font-style: italic;
  margin: 0;
  margin-bottom: clamp(8px, 1cqh, 16px);
}

.content-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(20px, 3cqw, 40px);
  flex: 1 1 auto;
  min-height: 0;
  overflow: hidden;
}

.left-half {
  display: flex;
  flex-direction: column;
  gap: clamp(10px, 2cqh, 20px);
  justify-content: space-evenly;
  padding-right: clamp(10px, 2cqw, 20px);
}

.right-half {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.wave {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: clamp(12px, 2cqh, 20px) clamp(16px, 2cqw, 24px);
  position: relative;
  transition: all 0.8s ease-out;
  backdrop-filter: blur(10px);
  opacity: 0;
  transform: translateX(-30px);
  flex: 1 1 0;
  min-height: 0;
  display: flex;
  flex-direction: column;
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
  font-size: clamp(28px, 5cqw, 48px);
  margin-bottom: clamp(8px, 1.5cqh, 16px);
  flex-shrink: 0;
}

.wave h3 {
  font-size: clamp(16px, 3cqw, 24px);
  color: white;
  margin-bottom: clamp(8px, 1.5cqh, 16px);
  font-weight: bold;
  line-height: 1.2;
  flex-shrink: 0;
}

.wave-stats {
  display: flex;
  gap: clamp(20px, 3cqw, 40px);
  margin-bottom: clamp(8px, 1.5cqh, 16px);
  flex-wrap: wrap;
}

.stat {
  text-align: center;
}

.stat .number {
  font-size: clamp(24px, 4cqw, 36px);
  font-weight: bold;
  color: #fbbf24;
  line-height: 1;
}

.stat .label {
  font-size: clamp(10px, 1.8cqw, 14px);
  color: #a0c4c7;
  line-height: 1.2;
  margin-top: 4px;
}

.wave-text {
  font-size: clamp(11px, 2cqw, 15px);
  line-height: 1.4;
  margin: 0;
  color: #e5e5e5;
}

.wave-content {
  flex: 1;
  overflow: hidden;
}

.wave-content p {
  color: #e5e5e5;
  line-height: 1.4;
  margin-bottom: clamp(6px, 1cqh, 10px);
  font-size: clamp(11px, 2cqw, 15px);
}

.pain-point {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: clamp(6px, 1.5cqh, 10px);
  background: rgba(255, 255, 255, 0.1);
  border-radius: 6px;
}

.quote {
  font-style: italic;
  color: #ff6b6b;
  font-size: clamp(10px, 1.8cqw, 13px);
  line-height: 1.3;
}

.solution {
  color: white;
  font-weight: 600;
  font-size: clamp(10px, 1.8cqw, 13px);
  line-height: 1.3;
}

.analogy {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  padding: clamp(6px, 1.5cqh, 10px);
}

.comparison {
  display: flex;
  align-items: center;
  gap: clamp(6px, 1cqw, 10px);
  margin-bottom: clamp(4px, 0.8cqh, 8px);
  font-size: clamp(10px, 1.8cqw, 13px);
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

/* Right Half - Convergence Area */
.convergence-area {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  opacity: 0;
  transform: scale(0.8);
  transition: all 0.8s ease-out;
}

.convergence-area.visible {
  opacity: 1;
  transform: scale(1);
}

.convergence-title {
  position: absolute;
  top: 10%;
  font-size: clamp(16px, 3cqw, 24px);
  color: #fbbf24;
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 2px;
}

/* Convergence Orb */
.convergence-orb {
  position: relative;
  width: clamp(150px, 25cqw, 250px);
  height: clamp(150px, 25cqw, 250px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(20px, 3cqh, 30px);
}

.orb-container {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  perspective: 1000px;
  animation: orbFloat 6s ease-in-out infinite;
}

.sphere-3d {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transform: rotateX(-10deg);
}

.convergence-orb.spinning .sphere-3d {
  animation: orbSpin 12s linear infinite;
}

@keyframes orbSpin {
  0% {
    transform: rotateX(-10deg) rotateY(0deg);
  }
  100% {
    transform: rotateX(-10deg) rotateY(360deg);
  }
}

@keyframes orbFloat {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

.sphere-face {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
  backface-visibility: hidden;
  /* Use Flora's deep background color */
  background: #002a29;
  box-shadow:
    0 0 60px rgba(103, 196, 113, 0.6),  /* Flora leaf green glow */
    0 0 100px rgba(0, 153, 126, 0.4),    /* Flora tree teal glow */
    inset 0 0 40px rgba(143, 218, 183, 0.2); /* Flora circuit light glow */
}

.sphere-face.front {
  transform: translateZ(0px);
}

.sphere-face.back {
  transform: rotateY(180deg) translateZ(0px);
}

.sphere-face.left {
  transform: rotateY(-90deg) translateZ(0px);
}

.sphere-face.right {
  transform: rotateY(90deg) translateZ(0px);
}

.flora-texture {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.9;
  mix-blend-mode: screen;
  filter: brightness(1.2) contrast(1.1);
  animation: texturePulse 4s ease-in-out infinite;
}

@keyframes texturePulse {
  0%, 100% {
    opacity: 0.9;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
}

.orb-glow {
  position: absolute;
  width: 150%;
  height: 150%;
  top: -25%;
  left: -25%;
  border-radius: 50%;
  background: radial-gradient(circle,
    rgba(103, 196, 113, 0.4),  /* Flora leaf green */
    rgba(0, 153, 126, 0.3),     /* Flora tree teal */
    transparent 70%);
  animation: glowPulse 3s ease-in-out infinite;
  pointer-events: none;
}

@keyframes glowPulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.6;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.3;
  }
}

.orb-particles {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: #67c471; /* Flora leaf green */
  border-radius: 50%;
  animation: particleFloat 8s ease-in-out infinite;
  box-shadow: 0 0 6px rgba(103, 196, 113, 0.8);
}

.particle:nth-child(1) { top: 10%; left: 50%; animation-delay: 0s; }
.particle:nth-child(2) { top: 30%; left: 80%; animation-delay: 1s; }
.particle:nth-child(3) { top: 50%; left: 90%; animation-delay: 2s; }
.particle:nth-child(4) { top: 70%; left: 80%; animation-delay: 3s; }
.particle:nth-child(5) { top: 90%; left: 50%; animation-delay: 4s; }
.particle:nth-child(6) { top: 70%; left: 20%; animation-delay: 5s; }
.particle:nth-child(7) { top: 50%; left: 10%; animation-delay: 6s; }
.particle:nth-child(8) { top: 30%; left: 20%; animation-delay: 7s; }

@keyframes particleFloat {
  0%, 100% {
    transform: translate(0, 0) scale(1);
    opacity: 0;
  }
  25% {
    transform: translate(-20px, -20px) scale(1.5);
    opacity: 1;
  }
  50% {
    transform: translate(-40px, 0) scale(1);
    opacity: 0.5;
  }
  75% {
    transform: translate(-20px, 20px) scale(0.5);
    opacity: 0.3;
  }
}

.orb-label {
  text-align: center;
}

.main-text {
  font-size: clamp(14px, 2.5cqw, 20px);
  font-weight: bold;
  color: white;
  margin-bottom: 4px;
}

.sub-text {
  font-size: clamp(10px, 1.8cqw, 14px);
  color: #a0c4c7;
  font-style: italic;
}

/* Energy Flow Lines */
.energy-flows {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.energy-line {
  position: absolute;
  left: -50%;
  height: 3px;
  width: 50%;
  opacity: 0;
  border-radius: 2px;
  background: linear-gradient(90deg, transparent, currentColor, transparent);
}

.energy-1 {
  top: 25%;
  color: #10b981;
  transform: rotate(-15deg);
}

.energy-2 {
  top: 50%;
  color: #06b6d4;
}

.energy-3 {
  top: 75%;
  color: #fbbf24;
  transform: rotate(15deg);
}

.energy-line.flowing {
  animation: energyFlow 3s ease-in-out infinite;
}

.energy-1.flowing { animation-delay: 0s; }
.energy-2.flowing { animation-delay: 0.5s; }
.energy-3.flowing { animation-delay: 1s; }

@keyframes energyFlow {
  0% {
    left: -50%;
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  50% {
    left: 25%;
    opacity: 1;
  }
  80% {
    opacity: 0;
  }
  100% {
    left: 50%;
    opacity: 0;
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