<script setup lang="ts">
// Define props with defaults
const props = withDefaults(defineProps<{
  text?: string
  showBounds?: boolean
}>(), {
  text: 'Landscape design software • tech + nature',
  showBounds: false
})
</script>

<template>
  <div
    class="tagline-text"
    :class="{ 'tagline-text--debug': showBounds }"
  >
    {{ text }}
  </div>
</template>

<style scoped>
.tagline-text {
  color: #bfe9de;
  font-size: 14px;
  line-height: 1.2;
  font-family: system-ui, -apple-system, sans-serif;
  text-align: center;
  font-weight: 400;
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
.tagline-text--debug {
  border: 2px solid #ff00ff;
  background: rgba(255, 0, 255, 0.1);
}

.tagline-text--debug::before {
  content: 'TAGLINE';
  position: absolute;
  top: -20px;
  left: 0;
  font-size: 10px;
  color: #ff00ff;
  font-weight: bold;
  background: rgba(0, 0, 0, 0.8);
  padding: 2px 4px;
  border-radius: 2px;
}
</style>