<template>
  <div class="flora-orb-container">
    <!-- Organic background particles -->
    <div class="organic-field">
      <div
        v-for="i in 15"
        :key="`field-${i}`"
        class="field-particle"
        :style="`--delay: ${i * 0.3}s; --duration: ${8 + i * 0.5}s`"
      ></div>
    </div>

    <!-- Main orb with Flora logo -->
    <div class="orb-wrapper" :class="{ active: isActive }">
      <!-- Pulsing rings -->
      <div class="pulse-ring pulse-ring-1"></div>
      <div class="pulse-ring pulse-ring-2"></div>
      <div class="pulse-ring pulse-ring-3"></div>

      <!-- Central orb -->
      <div class="central-orb">
        <!-- Flora Logo SVG -->
        <svg
          class="flora-logo"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <!-- Tree/Plant part -->
          <g class="tree-part">
            <!-- Central trunk -->
            <path
              d="M100 100 L100 70"
              stroke="#00997e"
              stroke-width="3"
              fill="none"
            />

            <!-- Branches with leaves -->
            <g class="branch branch-1">
              <path
                d="M100 85 L85 75"
                stroke="#00997e"
                stroke-width="2"
                fill="none"
              />
              <ellipse
                cx="82"
                cy="73"
                rx="8"
                ry="12"
                fill="#67c471"
                transform="rotate(-30 82 73)"
              />
            </g>

            <g class="branch branch-2">
              <path
                d="M100 85 L115 75"
                stroke="#00997e"
                stroke-width="2"
                fill="none"
              />
              <ellipse
                cx="118"
                cy="73"
                rx="8"
                ry="12"
                fill="#8fda87"
                transform="rotate(30 118 73)"
              />
            </g>

            <g class="branch branch-3">
              <path
                d="M100 75 L80 60"
                stroke="#00997e"
                stroke-width="2"
                fill="none"
              />
              <ellipse
                cx="77"
                cy="58"
                rx="8"
                ry="12"
                fill="#67c471"
                transform="rotate(-45 77 58)"
              />
            </g>

            <g class="branch branch-4">
              <path
                d="M100 75 L120 60"
                stroke="#00997e"
                stroke-width="2"
                fill="none"
              />
              <ellipse
                cx="123"
                cy="58"
                rx="8"
                ry="12"
                fill="#8fda87"
                transform="rotate(45 123 58)"
              />
            </g>

            <g class="branch branch-5">
              <path
                d="M100 70 L90 55"
                stroke="#00997e"
                stroke-width="2"
                fill="none"
              />
              <ellipse
                cx="87"
                cy="53"
                rx="8"
                ry="12"
                fill="#67c471"
                transform="rotate(-20 87 53)"
              />
            </g>

            <g class="branch branch-6">
              <path
                d="M100 70 L110 55"
                stroke="#00997e"
                stroke-width="2"
                fill="none"
              />
              <ellipse
                cx="113"
                cy="53"
                rx="8"
                ry="12"
                fill="#8fda87"
                transform="rotate(20 113 53)"
              />
            </g>

            <!-- Top leaf -->
            <ellipse cx="100" cy="65" rx="8" ry="12" fill="#7ed580" />
          </g>

          <!-- Root/Circuit part -->
          <g class="roots-part">
            <!-- Main roots -->
            <path
              d="M100 100 L100 130 M100 110 L85 125 M100 110 L115 125"
              stroke="#00997e"
              stroke-width="2.5"
              fill="none"
              stroke-linecap="round"
            />

            <!-- Circuit branches -->
            <g class="circuit-group">
              <path
                d="M85 125 L80 135 L82 145"
                stroke="#00997e"
                stroke-width="2"
                fill="none"
              />
              <circle
                cx="82"
                cy="145"
                r="3"
                fill="#8fdab7"
                class="circuit-node"
              />

              <path
                d="M115 125 L120 135 L118 145"
                stroke="#00997e"
                stroke-width="2"
                fill="none"
              />
              <circle
                cx="118"
                cy="145"
                r="3"
                fill="#8fdab7"
                class="circuit-node"
              />

              <path
                d="M100 130 L95 140 L97 150"
                stroke="#00997e"
                stroke-width="2"
                fill="none"
              />
              <circle
                cx="97"
                cy="150"
                r="3"
                fill="#8fdab7"
                class="circuit-node"
              />

              <path
                d="M100 130 L105 140 L103 150"
                stroke="#00997e"
                stroke-width="2"
                fill="none"
              />
              <circle
                cx="103"
                cy="150"
                r="3"
                fill="#8fdab7"
                class="circuit-node"
              />

              <!-- Additional circuit paths -->
              <path
                d="M85 125 L75 130 L73 140"
                stroke="#00997e"
                stroke-width="1.5"
                fill="none"
              />
              <circle
                cx="73"
                cy="140"
                r="2.5"
                fill="#8fdab7"
                class="circuit-node"
              />

              <path
                d="M115 125 L125 130 L127 140"
                stroke="#00997e"
                stroke-width="1.5"
                fill="none"
              />
              <circle
                cx="127"
                cy="140"
                r="2.5"
                fill="#8fdab7"
                class="circuit-node"
              />
            </g>
          </g>

          <!-- Energy particles -->
          <g class="energy-particles">
            <circle r="1.5" fill="#a0e4a5" class="energy-dot energy-1">
              <animateMotion dur="4s" repeatCount="indefinite">
                <mpath href="#energy-path-1" />
              </animateMotion>
            </circle>
            <circle r="1.5" fill="#67c471" class="energy-dot energy-2">
              <animateMotion dur="5s" repeatCount="indefinite">
                <mpath href="#energy-path-2" />
              </animateMotion>
            </circle>
          </g>

          <!-- Hidden paths for particle animation -->
          <defs>
            <path
              id="energy-path-1"
              d="M100,150 Q85,120 100,70 T100,150"
              fill="none"
            />
            <path
              id="energy-path-2"
              d="M70,100 Q100,85 130,100 T70,100"
              fill="none"
            />
          </defs>
        </svg>

        <!-- Glow effect -->
        <div class="orb-glow"></div>
      </div>

      <!-- Orbiting elements -->
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
      </div>
    </div>

    <!-- Growing vines animation -->
    <svg
      class="vines-svg"
      viewBox="0 0 400 400"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        class="vine vine-left"
        d="M100,300 Q50,250 80,200 T60,100"
        stroke="#67c471"
        stroke-width="2"
        fill="none"
        opacity="0.6"
      />
      <path
        class="vine vine-right"
        d="M300,300 Q350,250 320,200 T340,100"
        stroke="#8fda87"
        stroke-width="2"
        fill="none"
        opacity="0.6"
      />
    </svg>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const isActive = ref(false);

const props = defineProps({
  startAnimation: {
    type: Boolean,
    default: false,
  },
});

onMounted(() => {
  // Delay the activation for a smooth entrance
  setTimeout(() => {
    isActive.value = true;
  }, 500);
});
</script>

<style scoped>
.flora-orb-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

/* Organic field background */
.organic-field {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0.3;
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
  width: 250px;
  height: 250px;
  transform: scale(0.8);
  opacity: 0;
  transition: all 1.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.orb-wrapper.active {
  transform: scale(1);
  opacity: 1;
}

/* Pulsing rings */
.pulse-ring {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 2px solid #67c471;
  border-radius: 50%;
  opacity: 0;
  animation: pulse-expand 3s ease-out infinite;
}

.pulse-ring-1 {
  animation-delay: 0s;
}

.pulse-ring-2 {
  animation-delay: 1s;
  border-color: #8fdab7;
}

.pulse-ring-3 {
  animation-delay: 2s;
  border-color: #00997e;
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

/* Flora Logo */
.flora-logo {
  width: 60%;
  height: 60%;
  z-index: 2;
  filter: drop-shadow(0 0 10px rgba(103, 196, 113, 0.6));
  animation: logo-rotate 20s linear infinite;
}

@keyframes logo-rotate {
  0% {
    transform: rotate(0deg) scale(1);
  }
  25% {
    transform: rotate(5deg) scale(1.05);
  }
  50% {
    transform: rotate(0deg) scale(1);
  }
  75% {
    transform: rotate(-5deg) scale(1.05);
  }
  100% {
    transform: rotate(0deg) scale(1);
  }
}

/* Animate branches */
.branch {
  animation: branch-sway 3s ease-in-out infinite;
  transform-origin: center;
}

.branch-1,
.branch-3,
.branch-5 {
  animation-delay: 0.2s;
}

.branch-2,
.branch-4,
.branch-6 {
  animation-delay: 0.5s;
}

@keyframes branch-sway {
  0%,
  100% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(3deg);
  }
}

/* Circuit nodes animation */
.circuit-node {
  animation: node-pulse 2s ease-in-out infinite;
}

.circuit-node:nth-child(odd) {
  animation-delay: 0.5s;
}

@keyframes node-pulse {
  0%,
  100% {
    opacity: 0.4;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}

/* Energy dots */
.energy-dot {
  filter: blur(0.5px);
  opacity: 0.8;
}

/* Orb glow */
.orb-glow {
  position: absolute;
  width: 120%;
  height: 120%;
  top: -10%;
  left: -10%;
  background: radial-gradient(
    circle,
    rgba(103, 196, 113, 0.3),
    rgba(0, 153, 126, 0.2),
    transparent 60%
  );
  border-radius: 50%;
  animation: glow-pulse 3s ease-in-out infinite;
}

@keyframes glow-pulse {
  0%,
  100% {
    opacity: 0.6;
    transform: scale(1);
  }
  50% {
    opacity: 0.3;
    transform: scale(1.1);
  }
}

/* Orbiting elements */
.orbit-container {
  position: absolute;
  width: 120%;
  height: 120%;
  top: -10%;
  left: -10%;
  animation: orbit-rotate 15s linear infinite;
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
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.orbit-1 {
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  animation: orbit-counter-rotate 15s linear infinite;
}

.orbit-2 {
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  animation: orbit-counter-rotate 15s linear infinite;
  animation-delay: -5s;
}

.orbit-3 {
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  animation: orbit-counter-rotate 15s linear infinite;
  animation-delay: -10s;
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
  font-size: 20px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
  animation: icon-bob 2s ease-in-out infinite;
}

@keyframes icon-bob {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-3px);
  }
}

/* Growing vines */
.vines-svg {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.vine {
  stroke-dasharray: 300;
  stroke-dashoffset: 300;
  animation: vine-grow 6s ease-out forwards;
}

.vine-left {
  animation-delay: 1s;
}

.vine-right {
  animation-delay: 1.5s;
}

@keyframes vine-grow {
  to {
    stroke-dashoffset: 0;
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .orb-wrapper {
    width: 200px;
    height: 200px;
  }

  .flora-logo {
    width: 70%;
    height: 70%;
  }
}
</style>
