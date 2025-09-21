<script setup lang="ts">
defineProps<{
  width?: string;
  height?: string;
}>();
</script>

<template>
  <div class="platform-mockup" :style="{ maxWidth: width || '600px', height: height || 'auto' }">
    <div class="mockup-screen">
      <div class="mockup-header">
        <div class="mockup-logo">🌿 Project Flora</div>
        <div class="mockup-nav">
          <span>Design</span>
          <span>Plants</span>
          <span>Community</span>
        </div>
      </div>

      <div class="mockup-main">
        <div class="mockup-canvas">
          <div class="property-outline"></div>
          <div class="plant-dot plant-1"></div>
          <div class="plant-dot plant-2"></div>
          <div class="plant-dot plant-3"></div>
        </div>

        <div class="mockup-sidebar">
          <div class="plant-suggestion">
            <div class="plant-thumb"></div>
            <div class="plant-info">
              <div class="plant-name">Purple Coneflower</div>
              <div class="plant-details">Native • Full Sun • Clay Soil</div>
            </div>
          </div>
          <div class="plant-suggestion">
            <div class="plant-thumb"></div>
            <div class="plant-info">
              <div class="plant-name">Wild Bergamot</div>
              <div class="plant-details">Native • Part Sun • Drought Tolerant</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.platform-mockup {
  margin: 0 auto;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  background: var(--surface-2);
  border: 1px solid var(--line-1);
}

.mockup-screen {
  background: var(--surface-1);
  border-radius: 8px;
  overflow: hidden;
}

.mockup-header {
  background: var(--surface-2);
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--line-1);
}

.mockup-logo {
  font-weight: 600;
  font-size: 1.1rem;
  color: var(--text-hi);
}

.mockup-nav {
  display: flex;
  gap: 1.5rem;
  font-size: 0.9rem;
  color: var(--text);
}

.mockup-main {
  display: grid;
  grid-template-columns: 2fr 1fr;
  height: 240px;
}

.mockup-canvas {
  background: rgba(103, 196, 113, 0.08);
  position: relative;
  padding: 1rem;
}

.property-outline {
  border: 2px dashed var(--text-muted);
  width: 80%;
  height: 70%;
  position: absolute;
  top: 15%;
  left: 10%;
  border-radius: 8px;
}

.plant-dot {
  position: absolute;
  width: 16px;
  height: 16px;
  background: #67c471;
  border-radius: 50%;
  border: 2px solid #00997e;
}

.plant-1 { top: 30%; left: 25%; }
.plant-2 { top: 50%; left: 45%; }
.plant-3 { top: 70%; left: 30%; }

.mockup-sidebar {
  background: var(--surface-1);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  border-left: 1px solid var(--line-1);
}

.plant-suggestion {
  display: flex;
  gap: 0.8rem;
  padding: 0.8rem;
  background: rgba(103, 196, 113, 0.06);
  border-radius: 8px;
  border: 1px solid rgba(103, 196, 113, 0.2);
}

.plant-thumb {
  width: 36px;
  height: 36px;
  background: #67c471;
  border-radius: 6px;
  flex-shrink: 0;
}

.plant-info {
  flex: 1;
}

.plant-name {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-hi);
  margin-bottom: 0.2rem;
}

.plant-details {
  font-size: 0.75rem;
  color: var(--text-muted);
}

@media (max-width: 768px) {
  .mockup-main {
    grid-template-columns: 1fr;
    height: 300px;
  }

  .mockup-nav {
    gap: 1rem;
    font-size: 0.8rem;
  }
}
</style>