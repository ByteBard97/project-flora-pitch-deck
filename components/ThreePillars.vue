<script setup lang="ts">
import { ref } from "vue";

const currentPillar = ref(0);
const pillars = [
  {
    emoji: "🌿",
    title: "A Deep, Curated Native Plant Database",
    subtitle: "The Data Moat",
    description: "Comprehensive, regional plant data with ecological relationships, soil preferences, and companion planting information.",
    color: "var(--flora-green)"
  },
  {
    emoji: "✨",
    title: "An Intuitive, Beginner-Focused Design Experience",
    subtitle: "The Accessibility Moat",
    description: "Powerful design tools that feel as simple as sketching on paper, with intelligent guidance every step of the way.",
    color: "var(--gold)"
  },
  {
    emoji: "🤝",
    title: "A Community-Driven Knowledge Platform",
    subtitle: "The Network Effect Moat",
    description: "Real user experiences, photos, and reviews create an ever-growing knowledge base that benefits everyone.",
    color: "var(--digital-teal)"
  }
];

const showNext = () => {
  if (currentPillar.value < pillars.length) {
    currentPillar.value++;
  }
};

const reset = () => {
  currentPillar.value = 0;
};
</script>

<template>
  <div>
    <!-- Header -->
    <div class="text-center mb-8">
      <h2>Built on Three Foundational Pillars</h2>
      <p v-if="currentPillar === 0" class="text-muted">Click to reveal each pillar</p>
      <button
        v-if="currentPillar === pillars.length"
        @click="reset"
        class="reset-btn"
      >
        🔄 Show Again
      </button>
    </div>

    <!-- Pillars Grid -->
    <div class="grid-3 gap-6" @click="showNext">
      <div
        v-for="(pillar, index) in pillars"
        :key="index"
        class="pillar-card"
        :class="{
          visible: currentPillar > index,
          current: currentPillar === index + 1
        }"
        :style="{ '--pillar-color': pillar.color }"
      >
        <div class="emoji">{{ pillar.emoji }}</div>
        <h4>{{ pillar.title }}</h4>
        <p class="pillar-subtitle">{{ pillar.subtitle }}</p>
        <p>{{ pillar.description }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  cursor: pointer;
}

.pillar-card {
  background: var(--surface-1);
  border: 2px solid var(--line-1);
  border-left: 4px solid var(--pillar-color);
  border-radius: 12px;
  padding: 2rem 1.5rem;
  text-align: center;
  opacity: 0.3;
  transform: translateY(20px) scale(0.95);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.pillar-card.visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.pillar-card.current {
  border-color: var(--pillar-color);
  box-shadow: 0 8px 32px rgba(103, 196, 113, 0.15);
  transform: translateY(-4px) scale(1.02);
}

.emoji {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.pillar-subtitle {
  color: var(--pillar-color);
  font-weight: 600;
  margin: 0.5rem 0;
  font-size: 0.9rem;
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

@media (max-width: 768px) {
  .grid-3 {
    grid-template-columns: 1fr;
  }
}
</style>