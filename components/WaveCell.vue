<template>
  <article class="wave" :class="waveClass" :style="{ '--border-color': borderColor }" ref="root">
    <header class="head">
      <slot name="icon"/>
      <h3 class="title"><slot name="title"/></h3>
    </header>

    <section class="body">
      <!-- auto-shrink only if needed; safe to leave on -->
      <div ref="fitBox" class="fit-box">
        <div ref="fitInner" class="fit-inner" :style="{ '--s': scale }">
          <div class="metrics"><slot name="metrics"/></div>
          <p class="copy"><slot/></p>
          <div class="badges"><slot name="badges"/></div>
        </div>
      </div>
    </section>

    <footer class="foot"><slot name="foot"/></footer>
  </article>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, computed } from 'vue'

const props = defineProps({
  borderColor: {
    type: String,
    default: '#10b981'
  },
  waveNumber: {
    type: Number,
    default: 1
  },
  visible: {
    type: Boolean,
    default: false
  },
  maxScale: {
    type: Number,
    default: 1.5  // Allow growing up to 1.5x
  },
  minScale: {
    type: Number,
    default: 0.5  // Don't shrink below 0.5x
  }
})

const root = ref(null)
const fitBox = ref(null)
const fitInner = ref(null)
const scale = ref(1)

const waveClass = computed(() => ({
  [`wave-${props.waveNumber}`]: true,
  'visible': props.visible
}))

let ro = null

function fit() {
  if (!fitBox.value || !fitInner.value) return

  const box = fitBox.value
  const inner = fitInner.value

  scale.value = 1 // measure natural size

  const s = Math.min(
    box.clientWidth / Math.max(inner.scrollWidth, 1),
    box.clientHeight / Math.max(inner.scrollHeight, 1),
    props.maxScale
  )

  scale.value = Number.isFinite(s) ? Math.max(s, props.minScale) : 1 // can grow or shrink within bounds
}

onMounted(() => {
  if (fitBox.value && fitInner.value) {
    ro = new ResizeObserver(fit)
    ro.observe(fitBox.value)
    ro.observe(fitInner.value)
    fit()
  }
})

onBeforeUnmount(() => {
  if (ro) {
    ro.disconnect()
  }
})
</script>

<style scoped>
.wave {
  /* This makes cqw/cqh relative to THIS card */
  container-type: size;

  box-sizing: border-box;
  display: grid;
  grid-template-rows: min-content 1fr min-content; /* head | body | foot */
  gap: clamp(8px, 1.2cqh, 18px);
  padding: clamp(12px, 2cqh, 28px);
  border-radius: clamp(8px, 1.2cqh, 16px);

  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-left: 4px solid var(--border-color, #10b981);

  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0; /* allow shrinking in grid */

  /* Animation */
  opacity: 0;
  transform: translateX(-30px);
  transition: all 0.8s ease-out;
  backdrop-filter: blur(10px);
}

.wave.visible {
  opacity: 1;
  transform: translateX(0);
}

.wave:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.1);
}

.head {
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  gap: clamp(8px, 1cqw, 16px);
  justify-content: start;
}

.title {
  margin: 0;
  font-size: clamp(14px, 2.8cqw, 20px);
  line-height: 1.15;
  text-wrap: balance;
  color: white;
  font-weight: bold;
}

.body {
  min-height: 0; /* allow the middle area to shrink */
}

/* Auto-shrink container (only scales down if content too tall) */
.fit-box {
  position: relative;
  width: 100%;
  height: 100%;
  /* overflow: hidden; -- Removed to prevent clipping scaled content */
}

.fit-inner {
  transform: scale(var(--s, 1));
  transform-origin: top left;
  width: 100%; /* Force content to wrap within container */
  box-sizing: border-box;
}

/* Content that should wrap instead of overflow */
.copy {
  margin: clamp(8px, 1cqh, 14px) 0 0 0;
  font-size: clamp(11px, 1.8cqw, 16px);
  line-height: 1.35;
  overflow-wrap: anywhere;
  color: #e5e5e5;
}

/* Metrics: stay in a row when spacious, wrap gracefully when tight */
.metrics {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(22cqw, 220px), 1fr));
  gap: clamp(8px, 1cqw, 16px);
  align-items: baseline;
  min-width: 0;
}

/* Badges row */
.badges {
  display: grid;
  grid-auto-flow: column;
  gap: clamp(6px, 0.8cqw, 12px);
  margin-top: clamp(8px, 1cqh, 14px);
  justify-content: start;
  min-width: 0;
}

/* Media should never burst the card */
img, svg, canvas {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

/* Make *everything* shrinkable inside the card */
.wave :where(*) {
  min-width: 0;
  min-height: 0;
}

/* Icon styling */
.wave :deep(template[#icon] + *) {
  font-size: clamp(20px, 4cqw, 32px);
  flex-shrink: 0;
}

/* Stats styling */
.stat {
  text-align: center;
  min-width: 0;
}

.stat .number {
  font-size: clamp(18px, 3.2cqw, 24px);
  font-weight: bold;
  color: #fbbf24;
  line-height: 1;
  display: block;
}

.stat .label {
  font-size: clamp(9px, 1.4cqw, 12px);
  color: #a0c4c7;
  line-height: 1.1;
  margin-top: 4px;
  display: block;
}

/* Pain point styling */
.pain-point {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: clamp(6px, 1cqh, 8px);
  background: rgba(255, 255, 255, 0.1);
  border-radius: 6px;
}

.quote {
  font-style: italic;
  color: #ff6b6b;
  font-size: clamp(10px, 1.6cqw, 12px);
  line-height: 1.2;
}

.solution {
  color: white;
  font-weight: 600;
  font-size: clamp(10px, 1.6cqw, 12px);
  line-height: 1.2;
}

/* Analogy styling */
.analogy {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  padding: clamp(6px, 1cqh, 8px);
  font-size: clamp(10px, 1.6cqw, 12px);
}

.comparison {
  display: flex;
  align-items: center;
  gap: clamp(4px, 0.8cqw, 8px);
  margin-bottom: 4px;
}

.comparison:last-child {
  margin-bottom: 0;
}

.company {
  font-weight: bold;
  color: white;
  min-width: clamp(40px, 8cqw, 60px);
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

/* Wave-specific styles for backwards compatibility */
.wave-1 {
  --border-color: #10b981;
}

.wave-2 {
  --border-color: #06b6d4;
}

.wave-3 {
  --border-color: #fbbf24;
}
</style>