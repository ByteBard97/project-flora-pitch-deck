<template>
  <div ref="cardRef" class="insight-card" :class="cardType">
    <div class="card-content">
      <div class="icon">{{ icon }}</div>
      <h4>{{ title }}</h4>
      <div v-if="bigNumber" class="big-number">{{ bigNumber }}</div>
      <p :class="{ 'key-insight': cardType === 'opportunity' }">
        <slot>{{ description }}</slot>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  icon: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  bigNumber: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  cardType: {
    type: String,
    default: 'default'
  }
})

const cardRef = ref()
</script>

<style scoped>
.insight-card {
  /* Make this card its own size container */
  container-type: size;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: clamp(4px, 2cqw, 12px);
  padding: clamp(8px, 3cqw, 20px);
  backdrop-filter: blur(10px);
  text-align: center;
  flex: 1 1 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: clamp(80px, 15cqh, 120px);
  overflow: hidden;
}

.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(2px, 1cqh, 6px);
  width: 100%;
  height: 100%;
  justify-content: center;
}

/* Cards with big numbers - make numbers more prominent */
.insight-card .icon {
  font-size: clamp(14px, 5cqw, 24px);
  margin: 0;
  line-height: 1;
}

.insight-card h4 {
  font-size: clamp(9px, 3cqw, 16px);
  color: white;
  margin: 0;
  font-weight: 600;
  line-height: 1.1;
}

.insight-card p {
  font-size: clamp(8px, 2.5cqw, 14px);
  color: #b8d4d7;
  margin: 0;
  line-height: 1.25;
  text-align: center;
  padding: 0;
}

/* All cards have consistent styling now */

/* Opportunity card - optimize for longer text */
.key-insight {
  font-size: clamp(8px, 2.8cqw, 15px) !important;
  color: white !important;
  line-height: 1.3 !important;
  text-align: center !important;
  padding: 0 !important;
  margin: 0 !important;
}

.key-insight em {
  color: #a0c4c7;
}

.key-insight strong {
  color: #fbbf24;
}

/* Big numbers - make them the focal point */
.big-number {
  font-size: clamp(16px, 6cqw, 32px);
  font-weight: bold;
  color: #fbbf24;
  display: block;
  margin: 0;
  line-height: 0.9;
}
</style>