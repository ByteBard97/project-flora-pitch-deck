<template>
  <article
    class="wave"
    :class="waveClass"
    :style="{ '--border-color': borderColor }"
    ref="root"
  >
    <div class="wave-content">
      <!-- Icon and Title -->
      <div class="wave-header">
        <div class="wave-icon">
          <slot name="icon" />
        </div>
        <h3 class="wave-title">
          <slot name="title" />
        </h3>
      </div>

      <!-- Body content -->
      <div class="wave-body">
        <!-- Metrics if provided -->
        <div v-if="$slots.metrics" class="wave-metrics">
          <slot name="metrics" />
        </div>

        <!-- Main text content -->
        <div class="wave-text">
          <slot />
        </div>

        <!-- Badges/Additional content if provided -->
        <div v-if="$slots.badges" class="wave-badges">
          <slot name="badges" />
        </div>
      </div>
    </div>
  </article>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  borderColor: {
    type: String,
    default: "#10b981",
  },
  waveNumber: {
    type: Number,
    default: 1,
  },
  visible: {
    type: Boolean,
    default: false,
  },
});

const root = ref(null);

const waveClass = computed(() => ({
  [`wave-${props.waveNumber}`]: true,
  visible: props.visible,
}));
</script>

<style scoped>
.wave {
  /* Container setup */
  container-type: size;
  width: 100%;
  height: 100%;
  box-sizing: border-box;

  /* Visual styling */
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-left: 4px solid var(--border-color, #10b981);
  border-radius: 12px;
  padding: clamp(16px, 3%, 24px);
  backdrop-filter: blur(10px);

  /* Animation */
  opacity: 0;
  transform: translateX(-30px);
  transition: all 0.8s ease-out;

  /* Flexbox for content */
  display: flex;
  flex-direction: column;
}

.wave.visible {
  opacity: 1;
  transform: translateX(0);
}

.wave:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.12);
}

/* Content wrapper - fills available space */
.wave-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: clamp(8px, 1.5cqh, 16px);
  min-height: 0; /* Allow shrinking */
  overflow: hidden; /* Prevent overflow */
}

/* Header section with icon and title */
.wave-header {
  display: flex;
  align-items: center;
  gap: clamp(12px, 2cqw, 16px);
  flex-shrink: 0; /* Don't shrink header */
}

.wave-icon {
  font-size: clamp(24px, 6cqh, 40px);
  line-height: 1;
  flex-shrink: 0;
}

.wave-title {
  margin: 0;
  font-size: clamp(14px, 3.5cqh, 22px);
  line-height: 1.15;
  color: white;
  font-weight: bold;
  flex: 1;
}

/* Body section - takes remaining space */
.wave-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: clamp(8px, 1.5cqh, 16px);
  min-height: 0; /* Allow shrinking */
}

/* Metrics section */
.wave-metrics {
  display: flex;
  gap: clamp(16px, 3cqw, 24px);
  justify-content: space-around;
  flex-shrink: 0;
}

.wave-metrics :deep(.stat) {
  text-align: center;
  flex: 1;
}

.wave-metrics :deep(.stat .number) {
  font-size: clamp(20px, 5cqh, 32px);
  font-weight: bold;
  color: #fbbf24;
  line-height: 1;
  display: block;
  margin-bottom: 2px;
}

.wave-metrics :deep(.stat .label) {
  font-size: clamp(11px, 2.5cqh, 14px);
  color: #a0c4c7;
  line-height: 1.2;
  display: block;
}

/* Main text content - expands to fill space */
.wave-text {
  flex: 1;
  font-size: clamp(13px, 2.8cqh, 18px);
  line-height: 1.3;
  color: #e5e5e5;
  min-height: 0;
  overflow: hidden;
}

/* Badges section */
.wave-badges {
  flex-shrink: 0;
}

/* Pain point box */
.wave-badges :deep(.pain-point) {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  padding: clamp(6px, 1.2cqh, 10px);
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.wave-badges :deep(.quote) {
  font-style: italic;
  color: #ff6b6b;
  font-size: clamp(11px, 2.2cqh, 14px);
  line-height: 1.15;
}

.wave-badges :deep(.solution) {
  color: white;
  font-weight: 600;
  font-size: clamp(11px, 2.2cqh, 14px);
  line-height: 1.15;
}

/* Analogy box */
.wave-badges :deep(.analogy) {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  padding: clamp(6px, 1.2cqh, 10px);
}

.wave-badges :deep(.comparison) {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 4px;
  font-size: clamp(11px, 2.2cqh, 14px);
}

.wave-badges :deep(.comparison:last-child) {
  margin-bottom: 0;
}

.wave-badges :deep(.company) {
  font-weight: bold;
  color: white;
  min-width: 50px;
  font-size: clamp(10px, 2cqh, 13px);
}

.wave-badges :deep(.arrow) {
  color: #a0c4c7;
  font-size: clamp(10px, 2cqh, 13px);
}

.wave-badges :deep(.domain) {
  color: #e5e5e5;
  flex: 1;
  font-size: clamp(10px, 2cqh, 13px);
}

.wave-badges :deep(.opportunity .company) {
  color: #fbbf24;
}

.wave-badges :deep(.opportunity .domain) {
  color: #fbbf24;
  font-weight: 600;
}

/* Wave-specific border colors */
.wave-1 {
  --border-color: #10b981;
}

.wave-2 {
  --border-color: #06b6d4;
}

.wave-3 {
  --border-color: #fbbf24;
}

/* Responsive adjustments */
@media (max-height: 600px) {
  .wave {
    padding: 12px;
  }

  .wave-content {
    gap: 8px;
  }

  .wave-icon {
    font-size: 24px;
  }
}
</style>
