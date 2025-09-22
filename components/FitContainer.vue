<template>
  <div ref="containerRef" class="fit-container">
    <div ref="contentRef" class="fit-content" :style="contentStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'

const props = defineProps({
  maxScale: {
    type: Number,
    default: 2  // Allow content to scale up to 2x
  },
  minScale: {
    type: Number,
    default: 0.1
  },
  padding: {
    type: Number,
    default: 0
  },
  align: {
    type: String,
    default: 'left'  // left, center, or right
  }
})

const containerRef = ref(null)
const contentRef = ref(null)
const scale = ref(1)

const contentStyle = computed(() => {
  const origins = {
    left: 'left center',
    center: 'center center',
    right: 'right center'
  }
  return {
    transform: `scale(${scale.value})`,
    transformOrigin: origins[props.align] || 'left center'
  }
})

const calculateScale = () => {
  if (!containerRef.value || !contentRef.value) return

  // Reset scale to measure true size
  scale.value = 1

  nextTick(() => {
    const container = containerRef.value
    const content = contentRef.value

    // Get dimensions
    const containerWidth = container.clientWidth - (props.padding * 2)
    const containerHeight = container.clientHeight - (props.padding * 2)
    const contentWidth = content.scrollWidth
    const contentHeight = content.scrollHeight

    // Calculate scale to fit
    const scaleX = containerWidth / contentWidth
    const scaleY = containerHeight / contentHeight
    const newScale = Math.min(scaleX, scaleY, props.maxScale)

    scale.value = Math.max(newScale, props.minScale)

    console.log('FitContainer scaling:', {
      container: `${containerWidth}x${containerHeight}`,
      content: `${contentWidth}x${contentHeight}`,
      scale: scale.value
    })
  })
}

let resizeObserver = null

onMounted(() => {
  calculateScale()

  // Watch for container size changes
  if (window.ResizeObserver && containerRef.value) {
    resizeObserver = new ResizeObserver(() => {
      calculateScale()
    })
    resizeObserver.observe(containerRef.value)
  }

  // Also recalculate on window resize
  window.addEventListener('resize', calculateScale)
})

onUnmounted(() => {
  if (resizeObserver) {
    resizeObserver.disconnect()
  }
  window.removeEventListener('resize', calculateScale)
})
</script>

<style scoped>
.fit-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: flex-start;  /* Left align by default */
}

.fit-content {
  position: relative;  /* Changed from absolute for better alignment */
  white-space: normal;  /* Allow text to wrap naturally */
  transition: transform 0.3s ease-out;
}
</style>