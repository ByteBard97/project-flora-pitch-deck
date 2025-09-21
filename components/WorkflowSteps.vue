<script setup lang="ts">
import { ref } from "vue";

const currentStep = ref(0);
const steps = [
  {
    emoji: "📍",
    title: "Automated Site Setup",
    description: "Enter an address. We pull property lines (GIS), hi-res satellite (Mapbox), and elevation (USGS) to create an accurate 3D-ready base map in seconds.",
    savings: "Saves: 2–3 hours"
  },
  {
    emoji: "💡",
    title: "Guided, Intelligent Design",
    description: "Our 2D-first canvas is simple and intuitive. As you design, Eco-CoPilot suggests native plants by ecoregion, soil type, and sun exposure.",
    savings: "Saves: 4–6 hours"
  },
  {
    emoji: "👥",
    title: "Community-Sourced Inspiration",
    description: "See real photos and templates from your region. Filter by \"full sun clay slope\" and use what has actually worked for neighbors.",
    savings: "Saves: 2–4 hours"
  },
  {
    emoji: "🛒",
    title: "Confident Execution",
    description: "One click generates a pro design document, curated plant shopping list, and a phased implementation plan.",
    savings: "Saves: 1–2 hours"
  }
];

const showNext = () => {
  if (currentStep.value < steps.length) {
    currentStep.value++;
  }
};

const reset = () => {
  currentStep.value = 0;
};
</script>

<template>
  <div>
    <!-- Header -->
    <div class="text-center mb-8">
      <h2>The New Flow (4 Steps)</h2>
      <p v-if="currentStep === 0" class="text-muted">Click to see each step</p>
      <button
        v-if="currentStep === steps.length"
        @click="reset"
        class="reset-btn"
      >
        🔄 Show Again
      </button>
    </div>

    <!-- Steps Grid -->
    <div class="grid-4 gap-4" @click="showNext">
      <div
        v-for="(step, index) in steps"
        :key="index"
        class="step-card"
        :class="{
          visible: currentStep > index,
          current: currentStep === index + 1
        }"
      >
        <div class="emoji">{{ step.emoji }}</div>
        <h3>{{ step.title }}</h3>
        <p>{{ step.description }}</p>
        <div class="savings-btn">{{ step.savings }}</div>
      </div>
    </div>

    <!-- Progress indicator -->
    <div class="progress-bar" v-if="currentStep > 0">
      <div
        class="progress-fill"
        :style="{ width: (currentStep / steps.length) * 100 + '%' }"
      />
    </div>
  </div>
</template>

<style scoped>
.grid-4 {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  cursor: pointer;
  margin-bottom: 2rem;
}

.step-card {
  background: var(--surface-1);
  border: 2px solid var(--line-1);
  border-radius: 12px;
  padding: 1.5rem 1rem;
  text-align: center;
  opacity: 0.2;
  transform: translateY(30px) rotateX(15deg);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  transform-style: preserve-3d;
}

.step-card.visible {
  opacity: 1;
  transform: translateY(0) rotateX(0deg);
}

.step-card.current {
  border-color: var(--flora-tree);
  box-shadow:
    0 8px 32px rgba(0, 153, 126, 0.2),
    0 0 0 1px rgba(0, 153, 126, 0.1);
  transform: translateY(-8px) scale(1.05);
}

.emoji {
  font-size: 2.2rem;
  margin-bottom: 0.5rem;
  display: block;
}

.step-card h3 {
  font-size: 1rem;
  margin: 0.5rem 0;
  color: var(--text-hi);
}

.step-card p {
  font-size: 0.85rem;
  line-height: 1.4;
  margin: 0.8rem 0;
  color: var(--text);
}

.savings-btn {
  display: inline-block;
  font-size: 0.8rem;
  padding: 0.4rem 0.7rem;
  margin-top: 0.5rem;
  background: var(--flora-leaf);
  color: white;
  border-radius: 6px;
  font-weight: 600;
}

.progress-bar {
  height: 4px;
  background: var(--line-1);
  border-radius: 2px;
  overflow: hidden;
  margin-top: 1rem;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--flora-tree), var(--flora-leaf));
  border-radius: 2px;
  transition: width 0.6s ease;
}

.reset-btn {
  background: var(--flora-tree);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s ease;
}

.reset-btn:hover {
  background: var(--flora-leaf);
  transform: translateY(-1px);
}

@media (max-width: 1024px) {
  .grid-4 {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .grid-4 {
    grid-template-columns: 1fr;
  }
}
</style>