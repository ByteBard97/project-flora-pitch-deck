<template>
  <div class="flora-orb-container">
    <!-- Interactive particle canvas background -->
    <canvas ref="particleCanvas" class="particle-canvas"></canvas>

    <!-- Organic field particles from first animation -->
    <div class="organic-field">
      <div
        v-for="i in 15"
        :key="`field-${i}`"
        class="field-particle"
        :style="`--delay: ${i * 0.3}s; --duration: ${8 + i * 0.5}s`"
      ></div>
    </div>

    <!-- Main orb wrapper -->
    <div class="orb-wrapper" :class="{ active: isActive }">
      <!-- Pulsing rings -->
      <div class="pulse-ring pulse-ring-1"></div>
      <div class="pulse-ring pulse-ring-2"></div>
      <div class="pulse-ring pulse-ring-3"></div>

      <!-- Central orb with logo -->
      <div class="central-orb">
        <!-- Logo image with special effects -->
        <div class="logo-container">
          <div class="logo-glow"></div>
          <img
            :src="props.logoImage"
            alt="Flora Logo"
            class="flora-logo"
            @load="onLogoLoad"
          />
          <div class="logo-overlay"></div>
        </div>

        <!-- SVG overlay for organic animations -->
        <svg
          class="organic-overlay"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <!-- Animated leaves growing -->
          <g class="growing-leaves">
            <ellipse
              class="leaf leaf-1"
              cx="50"
              cy="50"
              rx="8"
              ry="12"
              fill="#67c471"
              transform="rotate(-45 50 50)"
            />
            <ellipse
              class="leaf leaf-2"
              cx="150"
              cy="50"
              rx="8"
              ry="12"
              fill="#8fda87"
              transform="rotate(45 150 50)"
            />
            <ellipse
              class="leaf leaf-3"
              cx="40"
              cy="100"
              rx="8"
              ry="12"
              fill="#67c471"
              transform="rotate(-60 40 100)"
            />
            <ellipse
              class="leaf leaf-4"
              cx="160"
              cy="100"
              rx="8"
              ry="12"
              fill="#8fda87"
              transform="rotate(60 160 100)"
            />
            <ellipse
              class="leaf leaf-5"
              cx="70"
              cy="140"
              rx="8"
              ry="12"
              fill="#7ed580"
              transform="rotate(-30 70 140)"
            />
            <ellipse
              class="leaf leaf-6"
              cx="130"
              cy="140"
              rx="8"
              ry="12"
              fill="#7ed580"
              transform="rotate(30 130 140)"
            />
          </g>

          <!-- Energy particles -->
          <g class="energy-particles">
            <circle r="2" fill="#a0e4a5" class="energy-dot energy-1">
              <animateMotion dur="4s" repeatCount="indefinite">
                <mpath href="#energy-path-1" />
              </animateMotion>
            </circle>
            <circle r="2" fill="#67c471" class="energy-dot energy-2">
              <animateMotion dur="5s" repeatCount="indefinite">
                <mpath href="#energy-path-2" />
              </animateMotion>
            </circle>
            <circle r="1.5" fill="#fbbf24" class="energy-dot energy-3">
              <animateMotion dur="6s" repeatCount="indefinite">
                <mpath href="#energy-path-3" />
              </animateMotion>
            </circle>
          </g>

          <!-- Hidden paths for particle animation -->
          <defs>
            <path
              id="energy-path-1"
              d="M100,180 Q50,100 100,20 T100,180"
              fill="none"
            />
            <path
              id="energy-path-2"
              d="M20,100 Q100,50 180,100 T20,100"
              fill="none"
            />
            <path
              id="energy-path-3"
              d="M50,150 Q100,100 150,50 T50,150"
              fill="none"
            />
          </defs>
        </svg>

        <!-- Inner glow effect -->
        <div class="orb-inner-glow"></div>
      </div>

      <!-- Orbiting elements with nature icons -->
      <div class="orbit-container">
        <div class="orbiting-element orbit-1">
          <span class="orbit-icon">🌱</span>
        </div>
        <div class="orbiting-element orbit-2">
          <span class="orbit-icon">🦋</span>
        </div>
        <div class="orbiting-element orbit-3">
          <span class="orbit-icon">🌿</span>
        </div>
        <div class="orbiting-element orbit-4">
          <span class="orbit-icon">🐝</span>
        </div>
      </div>
    </div>

    <!-- Growing vines animation -->
    <svg
      class="vines-svg"
      viewBox="0 0 800 600"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="vineGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color: #67c471; stop-opacity: 0.2" />
          <stop offset="100%" style="stop-color: #67c471; stop-opacity: 0.8" />
        </linearGradient>
        <linearGradient id="vineGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color: #8fda87; stop-opacity: 0.2" />
          <stop offset="100%" style="stop-color: #8fda87; stop-opacity: 0.8" />
        </linearGradient>
      </defs>

      <path
        class="vine vine-left"
        d="M200,500 Q100,400 150,300 T100,100"
        stroke="url(#vineGradient1)"
        stroke-width="3"
        fill="none"
      />
      <path
        class="vine vine-right"
        d="M600,500 Q700,400 650,300 T700,100"
        stroke="url(#vineGradient2)"
        stroke-width="3"
        fill="none"
      />
      <path
        class="vine vine-center"
        d="M400,550 Q380,400 400,250"
        stroke="#00997e"
        stroke-width="2"
        fill="none"
        opacity="0.5"
      />
    </svg>

    <!-- Digital roots with circuit nodes -->
    <svg
      class="digital-roots"
      viewBox="0 0 800 300"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g class="roots-group">
        <!-- Main root paths -->
        <path
          class="root root-main"
          d="M400,150 L400,250"
          stroke="#00997e"
          stroke-width="3"
          fill="none"
        />
        <path
          class="root root-left"
          d="M400,180 L350,230 L320,280"
          stroke="#00997e"
          stroke-width="2"
          fill="none"
        />
        <path
          class="root root-right"
          d="M400,180 L450,230 L480,280"
          stroke="#00997e"
          stroke-width="2"
          fill="none"
        />
        <path
          class="root root-far-left"
          d="M400,200 L300,250 L250,300"
          stroke="#00997e"
          stroke-width="1.5"
          fill="none"
        />
        <path
          class="root root-far-right"
          d="M400,200 L500,250 L550,300"
          stroke="#00997e"
          stroke-width="1.5"
          fill="none"
        />

        <!-- Circuit nodes -->
        <circle
          class="circuit-node node-1"
          cx="400"
          cy="250"
          r="5"
          fill="#8fdab7"
        />
        <circle
          class="circuit-node node-2"
          cx="320"
          cy="280"
          r="4"
          fill="#8fdab7"
        />
        <circle
          class="circuit-node node-3"
          cx="480"
          cy="280"
          r="4"
          fill="#8fdab7"
        />
        <circle
          class="circuit-node node-4"
          cx="250"
          cy="300"
          r="3"
          fill="#67c471"
        />
        <circle
          class="circuit-node node-5"
          cx="550"
          cy="300"
          r="3"
          fill="#67c471"
        />

        <!-- Connecting circuits -->
        <line
          class="circuit-connection"
          x1="320"
          y1="280"
          x2="480"
          y2="280"
          stroke="#00997e"
          stroke-width="0.5"
          opacity="0.3"
        />
        <line
          class="circuit-connection"
          x1="250"
          y1="300"
          x2="550"
          y2="300"
          stroke="#00997e"
          stroke-width="0.5"
          opacity="0.3"
        />
      </g>
    </svg>

    <!-- Labels -->
    <div class="convergence-labels" :class="{ visible: labelsVisible }">
      <h3 class="main-label">Project Flora</h3>
      <p class="sub-label">Where Nature Meets Technology</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const particleCanvas = ref(null);
const isActive = ref(false);
const labelsVisible = ref(false);
let ctx = null;
let particles = [];
let animationFrame = null;
let mouseX = 0;
let mouseY = 0;

const props = defineProps({
  startAnimation: {
    type: Boolean,
    default: false,
  },
  logoImage: {
    type: String,
    default: "/flora-tree.webp",
  },
});

// Enhanced Particle class with organic movement
class Particle {
  constructor(canvasWidth, canvasHeight) {
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    this.baseX = this.x;
    this.baseY = this.y;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.3;
    this.speedY = (Math.random() - 0.5) * 0.3;
    this.color = ["#67c471", "#8fdab7", "#00997e", "#a0e4a5"][
      Math.floor(Math.random() * 4)
    ];
    this.opacity = Math.random() * 0.4 + 0.1;
    this.pulse = Math.random() * Math.PI * 2;
    this.orbitRadius = Math.random() * 50 + 20;
    this.orbitSpeed = Math.random() * 0.02 + 0.01;
    this.angle = Math.random() * Math.PI * 2;
  }

  update(canvasWidth, canvasHeight, mouseX, mouseY, time) {
    // Orbital movement around base position
    this.angle += this.orbitSpeed;
    const orbitX = Math.cos(this.angle) * this.orbitRadius * 0.3;
    const orbitY = Math.sin(this.angle) * this.orbitRadius * 0.3;

    // Natural drift
    this.baseX += this.speedX;
    this.baseY += this.speedY;

    // Apply orbital movement
    this.x = this.baseX + orbitX;
    this.y = this.baseY + orbitY;

    // Mouse influence - particles flow around cursor
    const dx = mouseX - this.x;
    const dy = mouseY - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < 150 && distance > 0) {
      const force = (150 - distance) / 150;
      const angle = Math.atan2(dy, dx);
      // Create swirl effect
      this.x -= Math.cos(angle + Math.PI / 2) * force * 2;
      this.y -= Math.sin(angle + Math.PI / 2) * force * 2;
    }

    // Wrap around edges
    if (this.baseX < -50) this.baseX = canvasWidth + 50;
    if (this.baseX > canvasWidth + 50) this.baseX = -50;
    if (this.baseY < -50) this.baseY = canvasHeight + 50;
    if (this.baseY > canvasHeight + 50) this.baseY = -50;

    // Pulse animation
    this.pulse += 0.03;
    this.currentOpacity = this.opacity + Math.sin(this.pulse) * 0.1;
    this.currentSize = this.size + Math.sin(this.pulse * 2) * 0.5;
  }

  draw(ctx) {
    ctx.globalAlpha = this.currentOpacity;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.currentSize, 0, Math.PI * 2);
    ctx.fill();

    // Add subtle glow
    ctx.shadowBlur = 8;
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

  // Create more particles for richer effect
  const particleCount = 100;
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

function animate(time = 0) {
  if (!ctx || !particleCanvas.value) return;

  const canvas = particleCanvas.value;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw organic connections between nearby particles
  particles.forEach((particle, i) => {
    particles.slice(i + 1).forEach((other) => {
      const dx = particle.x - other.x;
      const dy = particle.y - other.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 80) {
        ctx.globalAlpha = (1 - distance / 80) * 0.15;
        // Use gradient for connections
        const gradient = ctx.createLinearGradient(
          particle.x,
          particle.y,
          other.x,
          other.y
        );
        gradient.addColorStop(0, particle.color);
        gradient.addColorStop(1, other.color);
        ctx.strokeStyle = gradient;
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
    particle.update(canvas.width, canvas.height, mouseX, mouseY, time * 0.001);
    particle.draw(ctx);
  });

  animationFrame = requestAnimationFrame(animate);
}

function onLogoLoad() {
  // Logo loaded successfully
  console.log("Flora logo loaded");
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

  // Staggered activation for dramatic effect
  setTimeout(() => {
    isActive.value = true;
  }, 300);

  setTimeout(() => {
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
/* Container */
.flora-orb-container {
  position: relative;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    rgba(15, 74, 60, 0.95) 0%,
    rgba(0, 42, 41, 1) 50%,
    rgba(15, 74, 60, 0.95) 100%
  );
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Particle canvas background */
.particle-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  z-index: 1;
}

/* Organic field from first animation */
.organic-field {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0.3;
  z-index: 2;
}

.field-particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: radial-gradient(circle, #67c471, transparent);
  border-radius: 50%;
  animation: float-particle var(--duration) ease-in-out var(--delay) infinite;
}

.field-particle:nth-child(odd) {
  width: 3px;
  height: 3px;
  background: radial-gradient(circle, #8fdab7, transparent);
}

.field-particle:nth-child(1) {
  top: 10%;
  left: 15%;
}
.field-particle:nth-child(2) {
  top: 20%;
  left: 80%;
}
.field-particle:nth-child(3) {
  top: 70%;
  left: 25%;
}
.field-particle:nth-child(4) {
  top: 40%;
  left: 90%;
}
.field-particle:nth-child(5) {
  top: 80%;
  left: 70%;
}
.field-particle:nth-child(6) {
  top: 30%;
  left: 40%;
}
.field-particle:nth-child(7) {
  top: 60%;
  left: 10%;
}
.field-particle:nth-child(8) {
  top: 90%;
  left: 50%;
}
.field-particle:nth-child(9) {
  top: 15%;
  left: 60%;
}
.field-particle:nth-child(10) {
  top: 50%;
  left: 30%;
}
.field-particle:nth-child(11) {
  top: 25%;
  left: 20%;
}
.field-particle:nth-child(12) {
  top: 75%;
  left: 85%;
}
.field-particle:nth-child(13) {
  top: 35%;
  left: 70%;
}
.field-particle:nth-child(14) {
  top: 85%;
  left: 35%;
}
.field-particle:nth-child(15) {
  top: 45%;
  left: 55%;
}

@keyframes float-particle {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
    opacity: 0.3;
  }
  25% {
    transform: translate(30px, -30px) scale(1.5);
    opacity: 0.6;
  }
  50% {
    transform: translate(-20px, -50px) scale(1.2);
    opacity: 0.4;
  }
  75% {
    transform: translate(-40px, -20px) scale(0.8);
    opacity: 0.5;
  }
}

/* Main orb wrapper */
.orb-wrapper {
  position: relative;
  width: 300px;
  height: 300px;
  transform: scale(0.7) rotate(-20deg);
  opacity: 0;
  transition: all 2s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 10;
}

.orb-wrapper.active {
  transform: scale(1) rotate(0deg);
  opacity: 1;
}

/* Pulsing rings */
.pulse-ring {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 2px solid;
  border-radius: 50%;
  opacity: 0;
  animation: pulse-expand 3s ease-out infinite;
}

.pulse-ring-1 {
  border-color: #67c471;
  animation-delay: 0s;
}

.pulse-ring-2 {
  border-color: #8fdab7;
  animation-delay: 1s;
}

.pulse-ring-3 {
  border-color: #00997e;
  animation-delay: 2s;
}

@keyframes pulse-expand {
  0% {
    transform: scale(0.8);
    opacity: 0.8;
  }
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
}

/* Central orb */
.central-orb {
  position: absolute;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    circle,
    rgba(0, 42, 41, 0.9) 0%,
    rgba(0, 42, 41, 0.7) 40%,
    rgba(0, 153, 126, 0.3) 70%,
    transparent 100%
  );
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: orb-breathe 4s ease-in-out infinite;
  box-shadow:
    0 0 60px rgba(103, 196, 113, 0.5),
    inset 0 0 40px rgba(143, 218, 183, 0.2);
}

@keyframes orb-breathe {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

/* Logo container */
.logo-container {
  position: relative;
  width: 70%;
  height: 70%;
  border-radius: 50%;
  overflow: hidden;
  z-index: 2;
}

.logo-glow {
  position: absolute;
  width: 120%;
  height: 120%;
  top: -10%;
  left: -10%;
  background: radial-gradient(
    circle,
    rgba(103, 196, 113, 0.4) 0%,
    rgba(103, 196, 113, 0.2) 40%,
    transparent 70%
  );
  border-radius: 50%;
  animation: glow-pulse 3s ease-in-out infinite;
  z-index: -1;
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

.flora-logo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  animation: logo-float 6s ease-in-out infinite;
  filter: brightness(1.1) contrast(1.1);
}

@keyframes logo-float {
  0%,
  100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-5px) scale(1.02);
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
    rgba(103, 196, 113, 0.2) 70%
  );
  pointer-events: none;
  mix-blend-mode: screen;
}

/* Organic SVG overlay */
.organic-overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 3;
  pointer-events: none;
}

.growing-leaves .leaf {
  opacity: 0;
  animation: leaf-grow 2s ease-out forwards;
  transform-origin: center;
}

.leaf-1 {
  animation-delay: 0.5s;
}
.leaf-2 {
  animation-delay: 0.7s;
}
.leaf-3 {
  animation-delay: 0.9s;
}
.leaf-4 {
  animation-delay: 1.1s;
}
.leaf-5 {
  animation-delay: 1.3s;
}
.leaf-6 {
  animation-delay: 1.5s;
}

@keyframes leaf-grow {
  0% {
    opacity: 0;
    transform: scale(0) rotate(0deg);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.2) rotate(10deg);
  }
  100% {
    opacity: 0.6;
    transform: scale(1) rotate(0deg);
  }
}

.energy-dot {
  filter: blur(0.5px);
  opacity: 0.8;
}

.orb-inner-glow {
  position: absolute;
  width: 80%;
  height: 80%;
  top: 10%;
  left: 10%;
  background: radial-gradient(
    circle,
    rgba(103, 196, 113, 0.2),
    transparent 60%
  );
  border-radius: 50%;
  animation: inner-glow-pulse 4s ease-in-out infinite;
}

@keyframes inner-glow-pulse {
  0%,
  100% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.6;
  }
}

/* Orbit system */
.orbit-container {
  position: absolute;
  width: 120%;
  height: 120%;
  top: -10%;
  left: -10%;
  animation: orbit-rotate 20s linear infinite;
}

@keyframes orbit-rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.orbiting-element {
  position: absolute;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.orbit-1 {
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  animation: orbit-counter-rotate 20s linear infinite;
}

.orbit-2 {
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  animation: orbit-counter-rotate 20s linear infinite;
  animation-delay: -5s;
}

.orbit-3 {
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  animation: orbit-counter-rotate 20s linear infinite;
  animation-delay: -10s;
}

.orbit-4 {
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  animation: orbit-counter-rotate 20s linear infinite;
  animation-delay: -15s;
}

@keyframes orbit-counter-rotate {
  0% {
    transform: rotate(0deg) translateX(-50%);
  }
  100% {
    transform: rotate(-360deg) translateX(-50%);
  }
}

.orbit-icon {
  font-size: 24px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
  animation: icon-bob 2s ease-in-out infinite;
}

.orbit-1 .orbit-icon {
  animation-delay: 0s;
}
.orbit-2 .orbit-icon {
  animation-delay: 0.5s;
}
.orbit-3 .orbit-icon {
  animation-delay: 1s;
}
.orbit-4 .orbit-icon {
  animation-delay: 1.5s;
}

@keyframes icon-bob {
  0%,
  100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-3px) scale(1.1);
  }
}

/* Growing vines */
.vines-svg {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 3;
}

.vine {
  stroke-dasharray: 500;
  stroke-dashoffset: 500;
  animation: vine-grow 4s ease-out forwards;
  opacity: 0.6;
}

.vine-left {
  animation-delay: 1s;
}

.vine-right {
  animation-delay: 1.5s;
}

.vine-center {
  animation-delay: 2s;
}

@keyframes vine-grow {
  to {
    stroke-dashoffset: 0;
  }
}

/* Digital roots */
.digital-roots {
  position: absolute;
  width: 100%;
  height: 50%;
  bottom: -10%;
  left: 0;
  z-index: 5;
}

.root {
  stroke-dasharray: 200;
  stroke-dashoffset: 200;
  animation: root-grow 2s ease-out forwards;
}

.root-main {
  animation-delay: 1.5s;
}
.root-left {
  animation-delay: 1.7s;
}
.root-right {
  animation-delay: 1.9s;
}
.root-far-left {
  animation-delay: 2.1s;
}
.root-far-right {
  animation-delay: 2.3s;
}

@keyframes root-grow {
  to {
    stroke-dashoffset: 0;
  }
}

.circuit-node {
  opacity: 0;
  animation: node-pulse 2s ease-in-out infinite;
}

.node-1 {
  animation-delay: 2.5s;
}
.node-2 {
  animation-delay: 2.7s;
}
.node-3 {
  animation-delay: 2.9s;
}
.node-4 {
  animation-delay: 3.1s;
}
.node-5 {
  animation-delay: 3.3s;
}

@keyframes node-pulse {
  0% {
    opacity: 0;
    transform: scale(0);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
  100% {
    opacity: 0.6;
    transform: scale(1);
  }
}

.circuit-connection {
  stroke-dasharray: 300;
  stroke-dashoffset: 300;
  animation: connection-flow 3s ease-out forwards;
  animation-delay: 3.5s;
}

@keyframes connection-flow {
  to {
    stroke-dashoffset: 0;
  }
}

/* Labels */
.convergence-labels {
  position: absolute;
  bottom: 50px;
  text-align: center;
  opacity: 0;
  transform: translateY(20px);
  transition: all 1s ease-out;
  z-index: 20;
}

.convergence-labels.visible {
  opacity: 1;
  transform: translateY(0);
}

.main-label {
  font-size: 28px;
  color: white;
  font-weight: bold;
  margin: 0 0 8px 0;
  letter-spacing: 3px;
  text-shadow:
    0 2px 20px rgba(103, 196, 113, 0.5),
    0 0 40px rgba(103, 196, 113, 0.3);
  text-transform: uppercase;
}

.sub-label {
  font-size: 16px;
  color: #a0c4c7;
  margin: 0;
  font-style: italic;
  letter-spacing: 1px;
}

/* Responsive */
@media (max-width: 768px) {
  .orb-wrapper {
    width: 250px;
    height: 250px;
  }

  .main-label {
    font-size: 22px;
  }

  .sub-label {
    font-size: 14px;
  }
}
</style>
