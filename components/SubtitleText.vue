<script setup lang="ts">
// Define props with defaults
const props = withDefaults(defineProps<{
  text?: string
  showBounds?: boolean
}>(), {
  text: 'Seeding the Future of Landscape Design',
  showBounds: false
})
</script>

<template>
  <div
    class="subtitle-text"
    :class="{ 'subtitle-text--debug': showBounds }"
  >
    {{ text }}
  </div>
</template>

<style scoped>
.subtitle-text {
  color: #d6fff5;
  font-size: 16px;
  line-height: 1.2;
  font-family: system-ui, -apple-system, sans-serif;
  text-align: center;
  font-weight: 500;
  letter-spacing: 0.01em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}

/* Debug mode - show bounding box */
.subtitle-text--debug {
  border: 2px solid #00ffff;
  background: rgba(0, 255, 255, 0.1);
}

.subtitle-text--debug::before {
  content: 'SUBTITLE';
  position: absolute;
  top: -20px;
  left: 0;
  font-size: 10px;
  color: #00ffff;
  font-weight: bold;
  background: rgba(0, 0, 0, 0.8);
  padding: 2px 4px;
  border-radius: 2px;
}
</style>