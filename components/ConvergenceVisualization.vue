<template>
  <div class="convergence-area" :class="{ visible: visible }">
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
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  showLines: {
    type: Boolean,
    default: false
  },
  startSpinning: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
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
</style>