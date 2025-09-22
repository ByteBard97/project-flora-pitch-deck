<template>
  <div class="flora-convergence-container">
    <!-- Background particle field -->
    <canvas ref="particleCanvas" class="particle-canvas"></canvas>

    <!-- Main convergence area -->
    <div class="convergence-center">
      <!-- Ripple effects behind logo -->
      <div class="ripple-container">
        <div class="ripple ripple-1"></div>
        <div class="ripple ripple-2"></div>
        <div class="ripple ripple-3"></div>
      </div>

      <!-- Energy streams converging -->
      <svg class="energy-streams" viewBox="0 0 800 800">
        <defs>
          <linearGradient id="stream1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color: #10b981; stop-opacity: 0" />
            <stop offset="50%" style="stop-color: #10b981; stop-opacity: 1" />
            <stop offset="100%" style="stop-color: #10b981; stop-opacity: 0" />
          </linearGradient>
          <linearGradient id="stream2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color: #06b6d4; stop-opacity: 0" />
            <stop offset="50%" style="stop-color: #06b6d4; stop-opacity: 1" />
            <stop offset="100%" style="stop-color: #06b6d4; stop-opacity: 0" />
          </linearGradient>
          <linearGradient id="stream3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color: #fbbf24; stop-opacity: 0" />
            <stop offset="50%" style="stop-color: #fbbf24; stop-opacity: 1" />
            <stop offset="100%" style="stop-color: #fbbf24; stop-opacity: 0" />
          </linearGradient>

          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <!-- Animated energy streams -->
        <path
          class="energy-stream stream-1"
          d="M 100 400 Q 300 300 400 400"
          stroke="url(#stream1)"
          stroke-width="3"
          fill="none"
          filter="url(#glow)"
        />
        <path
          class="energy-stream stream-2"
          d="M 700 400 Q 500 300 400 400"
          stroke="url(#stream2)"
          stroke-width="3"
          fill="none"
          filter="url(#glow)"
        />
        <path
          class="energy-stream stream-3"
          d="M 400 700 Q 400 500 400 400"
          stroke="url(#stream3)"
          stroke-width="3"
          fill="none"
          filter="url(#glow)"
        />
      </svg>

      <!-- Flora Logo Container -->
      <div class="logo-container" :class="{ active: logoActive }">
        <div class="logo-glow"></div>
        <div class="logo-wrapper">
          <img
            src="/flora-tree.webp"
            alt="Flora Logo"
            class="flora-logo"
            @load="onLogoLoad"
          />
          <!-- Overlay effects -->
          <div class="logo-overlay"></div>
        </div>

        <!-- Orbiting elements -->
        <div class="orbit-system">
          <div class="orbit orbit-1">
            <span class="orbit-dot"></span>
          </div>
          <div class="orbit orbit-2">
            <span class="orbit-dot"></span>
          </div>
          <div class="orbit orbit-3">
            <span class="orbit-dot"></span>
          </div>
        </div>

        <!-- Digital roots growing -->
        <svg class="digital-roots" viewBox="0 0 400 200">
          <path
            class="root root-1"
            d="M200,100 Q180,120 170,150"
            stroke="#00997e"
            stroke-width="2"
            fill="none"
          />
          <circle class="root-node" cx="170" cy="150" r="4" fill="#8fdab7" />

          <path
            class="root root-2"
            d="M200,100 Q220,120 230,150"
            stroke="#00997e"
            stroke-width="2"
            fill="none"
          />
          <circle class="root-node" cx="230" cy="150" r="4" fill="#8fdab7" />

          <path
            class="root root-3"
            d="M200,100 Q200,125 200,160"
            stroke="#00997e"
            stroke-width="2"
            fill="none"
          />
          <circle class="root-node" cx="200" cy="160" r="4" fill="#8fdab7" />
        </svg>
      </div>

      <!-- Labels -->
      <div class="convergence-labels" :class="{ visible: labelsVisible }">
        <h3 class="main-label">Project Flora</h3>
        <p class="sub-label">Where All Waves Meet</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const particleCanvas = ref(null);
const logoActive = ref(false);
const labelsVisible = ref(false);
let ctx = null;
let particles = [];
let animationFrame = null;
let mouseX = 0;
let mouseY = 0;

class Particle {
  constructor(canvasWidth, canvasHeight) {
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) * 0.5;
    this.color = ["#67c471", "#8fdab7", "#00997e"][
      Math.floor(Math.random() * 3)
    ];
    this.opacity = Math.random() * 0.5 + 0.2;
    this.pulse = Math.random() * Math.PI * 2;
  }

  update(canvasWidth, canvasHeight, mouseX, mouseY) {
    // Natural drift
    this.x += this.speedX;
    this.y += this.speedY;

    // Mouse influence (subtle)
    const dx = mouseX - this.x;
    const dy = mouseY - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < 150) {
      const force = (150 - distance) / 150;
      this.x -= (dx / distance) * force * 0.5;
      this.y -= (dy / distance) * force * 0.5;
    }

    // Wrap around edges
    if (this.x < 0) this.x = canvasWidth;
    if (this.x > canvasWidth) this.x = 0;
    if (this.y < 0) this.y = canvasHeight;
    if (this.y > canvasHeight) this.y = 0;

    // Pulse animation
    this.pulse += 0.02;
    this.currentOpacity = this.opacity + Math.sin(this.pulse) * 0.1;
  }

  draw(ctx) {
    ctx.globalAlpha = this.currentOpacity;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();

    // Add glow
    ctx.shadowBlur = 10;
    ctx.shadowColor = this.color;
    ctx.fill();
    ctx.shadowBlur = 0;
  }
}

function initCanvas() {
  if (!particleCanvas.value) return;

  const canvas = particleCanvas.value;
  ctx = canvas.getContext("2d");

  // Set canvas size
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  // Create particles
  const particleCount = 80;
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle(canvas.width, canvas.height));
  }

  // Mouse tracking
  canvas.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  });
}

function animate() {
  if (!ctx || !particleCanvas.value) return;

  const canvas = particleCanvas.value;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw connections between nearby particles
  particles.forEach((particle, i) => {
    particles.slice(i + 1).forEach((other) => {
      const dx = particle.x - other.x;
      const dy = particle.y - other.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 100) {
        ctx.globalAlpha = (1 - distance / 100) * 0.1;
        ctx.strokeStyle = "#00997e";
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(other.x, other.y);
        ctx.stroke();
      }
    });
  });

  // Update and draw particles
  particles.forEach((particle) => {
    particle.update(canvas.width, canvas.height, mouseX, mouseY);
    particle.draw(ctx);
  });

  animationFrame = requestAnimationFrame(animate);
}

function onLogoLoad() {
  // Trigger animations once logo is loaded
  setTimeout(() => {
    logoActive.value = true;
  }, 300);

  setTimeout(() => {
    labelsVisible.value = true;
  }, 1000);
}

function handleResize() {
  if (particleCanvas.value) {
    particleCanvas.value.width = particleCanvas.value.offsetWidth;
    particleCanvas.value.height = particleCanvas.value.offsetHeight;
  }
}

onMounted(() => {
  initCanvas();
  animate();
  window.addEventListener("resize", handleResize);

  // Start animation even if logo doesn't load
  setTimeout(() => {
    logoActive.value = true;
    labelsVisible.value = true;
  }, 1500);
});

onUnmounted(() => {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame);
  }
  window.removeEventListener("resize", handleResize);
});
</script>

<style scoped>
.flora-convergence-container {
  position: relative;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    ellipse at center,
    rgba(15, 74, 60, 0.9) 0%,
    rgba(0, 42, 41, 1) 60%
  );
  overflow: hidden;
}

.particle-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.6;
}

.convergence-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* Ripple effects */
.ripple-container {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.ripple {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  transform: translate(-50%, -50%);
  border: 2px solid #67c471;
  border-radius: 50%;
  opacity: 0;
  animation: ripple-expand 4s ease-out infinite;
}

.ripple-1 {
  animation-delay: 0s;
}

.ripple-2 {
  animation-delay: 1.3s;
  border-color: #8fdab7;
}

.ripple-3 {
  animation-delay: 2.6s;
  border-color: #00997e;
}

@keyframes ripple-expand {
  0% {
    width: 0%;
    height: 0%;
    opacity: 0.8;
  }
  100% {
    width: 200%;
    height: 200%;
    opacity: 0;
  }
}

/* Energy streams */
.energy-streams {
  position: absolute;
  width: 200%;
  height: 200%;
  top: -50%;
  left: -50%;
  pointer-events: none;
}

.energy-stream {
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
  animation: stream-flow 3s ease-in-out infinite;
  opacity: 0.7;
}

.stream-1 {
  animation-delay: 0s;
}

.stream-2 {
  animation-delay: 0.5s;
}

.stream-3 {
  animation-delay: 1s;
}

@keyframes stream-flow {
  0% {
    stroke-dashoffset: 100;
    opacity: 0;
  }
  50% {
    stroke-dashoffset: 0;
    opacity: 0.7;
  }
  100% {
    stroke-dashoffset: -100;
    opacity: 0;
  }
}

/* Logo container */
.logo-container {
  position: relative;
  width: 200px;
  height: 200px;
  transform: scale(0.5) rotate(-180deg);
  opacity: 0;
  transition: all 2s cubic-bezier(0.4, 0, 0.2, 1);
}

.logo-container.active {
  transform: scale(1) rotate(0deg);
  opacity: 1;
}

.logo-glow {
  position: absolute;
  width: 150%;
  height: 150%;
  top: -25%;
  left: -25%;
  background: radial-gradient(
    circle,
    rgba(103, 196, 113, 0.4) 0%,
    rgba(103, 196, 113, 0.2) 40%,
    transparent 70%
  );
  border-radius: 50%;
  animation: glow-pulse 3s ease-in-out infinite;
}

@keyframes glow-pulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.6;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.3;
  }
}

.logo-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
  box-shadow:
    0 0 40px rgba(103, 196, 113, 0.5),
    inset 0 0 20px rgba(0, 42, 41, 0.3);
}

.flora-logo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  animation: logo-float 6s ease-in-out infinite;
}

@keyframes logo-float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.logo-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    circle,
    transparent 30%,
    rgba(103, 196, 113, 0.1) 70%
  );
  pointer-events: none;
  animation: overlay-rotate 10s linear infinite;
}

@keyframes overlay-rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Orbit system */
.orbit-system {
  position: absolute;
  width: 100%;
  height: 100%;
  animation: orbit-spin 20s linear infinite;
}

.orbit {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 1px dotted rgba(103, 196, 113, 0.2);
  border-radius: 50%;
}

.orbit-1 {
  width: 120%;
  height: 120%;
  top: -10%;
  left: -10%;
}

.orbit-2 {
  width: 140%;
  height: 140%;
  top: -20%;
  left: -20%;
  animation-delay: -7s;
}

.orbit-3 {
  width: 160%;
  height: 160%;
  top: -30%;
  left: -30%;
  animation-delay: -14s;
}

.orbit-dot {
  position: absolute;
  width: 8px;
  height: 8px;
  background: #67c471;
  border-radius: 50%;
  top: -4px;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0 0 10px rgba(103, 196, 113, 0.8);
}

@keyframes orbit-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Digital roots */
.digital-roots {
  position: absolute;
  width: 100%;
  height: 50%;
  bottom: -25%;
  left: 0;
}

.root {
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
  animation: root-grow 2s ease-out forwards;
  animation-delay: 1.5s;
}

.root-2 {
  animation-delay: 1.7s;
}

.root-3 {
  animation-delay: 1.9s;
}

@keyframes root-grow {
  to {
    stroke-dashoffset: 0;
  }
}

.root-node {
  opacity: 0;
  animation: node-appear 0.5s ease-out forwards;
  animation-delay: 2.5s;
}

@keyframes node-appear {
  to {
    opacity: 1;
    transform: scale(1.2);
  }
}

/* Labels */
.convergence-labels {
  position: absolute;
  bottom: -80px;
  text-align: center;
  opacity: 0;
  transform: translateY(20px);
  transition: all 1s ease-out;
}

.convergence-labels.visible {
  opacity: 1;
  transform: translateY(0);
}

.main-label {
  font-size: 24px;
  color: white;
  font-weight: bold;
  margin: 0 0 8px 0;
  letter-spacing: 2px;
  text-shadow: 0 2px 10px rgba(103, 196, 113, 0.5);
}

.sub-label {
  font-size: 14px;
  color: #a0c4c7;
  margin: 0;
  font-style: italic;
}

/* Responsive */
@media (max-width: 768px) {
  .convergence-center {
    width: 300px;
    height: 300px;
  }

  .logo-container {
    width: 150px;
    height: 150px;
  }
}
</style>
