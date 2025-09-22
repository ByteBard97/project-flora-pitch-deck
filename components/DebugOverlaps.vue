<template>
  <div v-if="debugMode" class="debug-overlay">
    <div class="debug-controls">
      <button @click="toggleOutlines" class="debug-btn">
        {{ showOutlines ? 'Hide' : 'Show' }} Outlines
      </button>
      <button @click="detectOverlaps" class="debug-btn">
        Detect Overlaps
      </button>
      <button @click="clearHighlights" class="debug-btn">
        Clear Highlights
      </button>
    </div>
    <div v-if="overlaps.length > 0" class="overlap-report">
      <h4>⚠️ Overlapping Elements Found:</h4>
      <ul>
        <li v-for="(overlap, index) in overlaps" :key="index">
          {{ overlap.element1 }} overlaps with {{ overlap.element2 }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const debugMode = ref(false)
const showOutlines = ref(false)
const overlaps = ref([])

// Enable debug mode with Ctrl+Shift+D
onMounted(() => {
  window.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === 'D') {
      debugMode.value = !debugMode.value
      if (!debugMode.value) {
        clearHighlights()
      }
    }
  })
})

function toggleOutlines() {
  showOutlines.value = !showOutlines.value

  if (showOutlines.value) {
    // Add outline styles to all elements
    const style = document.createElement('style')
    style.id = 'debug-outlines'
    style.textContent = `
      * {
        outline: 1px solid rgba(255, 0, 0, 0.3) !important;
        background: rgba(0, 255, 0, 0.05) !important;
      }
      .debug-overlay * {
        outline: none !important;
        background: none !important;
      }
    `
    document.head.appendChild(style)
  } else {
    // Remove outline styles
    const style = document.getElementById('debug-outlines')
    if (style) style.remove()
  }
}

function detectOverlaps() {
  overlaps.value = []
  const elements = document.querySelectorAll('*:not(.debug-overlay *)')
  const elementsArray = Array.from(elements)

  for (let i = 0; i < elementsArray.length; i++) {
    for (let j = i + 1; j < elementsArray.length; j++) {
      const rect1 = elementsArray[i].getBoundingClientRect()
      const rect2 = elementsArray[j].getBoundingClientRect()

      // Skip if elements are too small or likely to be containers
      if (rect1.width < 10 || rect1.height < 10 ||
          rect2.width < 10 || rect2.height < 10) continue

      // Check if rectangles overlap
      if (isOverlapping(rect1, rect2)) {
        // Skip parent-child relationships
        if (!elementsArray[i].contains(elementsArray[j]) &&
            !elementsArray[j].contains(elementsArray[i])) {

          overlaps.value.push({
            element1: getElementDescription(elementsArray[i]),
            element2: getElementDescription(elementsArray[j])
          })

          // Highlight overlapping elements
          elementsArray[i].style.outline = '3px solid red'
          elementsArray[j].style.outline = '3px solid red'
        }
      }
    }
  }
}

function isOverlapping(rect1, rect2) {
  return !(rect1.right < rect2.left ||
           rect2.right < rect1.left ||
           rect1.bottom < rect2.top ||
           rect2.bottom < rect1.top)
}

function getElementDescription(element) {
  const tag = element.tagName.toLowerCase()
  const className = element.className ? `.${element.className.split(' ')[0]}` : ''
  const id = element.id ? `#${element.id}` : ''
  return `${tag}${id}${className}`
}

function clearHighlights() {
  const elements = document.querySelectorAll('*')
  elements.forEach(el => {
    el.style.outline = ''
  })
  overlaps.value = []
}
</script>

<style scoped>
.debug-overlay {
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 1rem;
  border-radius: 8px;
  font-family: monospace;
  font-size: 12px;
  max-width: 300px;
}

.debug-controls {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.debug-btn {
  background: #333;
  color: white;
  border: 1px solid #666;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 11px;
}

.debug-btn:hover {
  background: #555;
}

.overlap-report {
  background: rgba(255, 0, 0, 0.1);
  border: 1px solid red;
  padding: 0.5rem;
  border-radius: 4px;
  max-height: 200px;
  overflow-y: auto;
}

.overlap-report h4 {
  margin: 0 0 0.5rem 0;
  font-size: 12px;
}

.overlap-report ul {
  margin: 0;
  padding-left: 1rem;
  font-size: 10px;
}

.overlap-report li {
  margin-bottom: 0.2rem;
}
</style>