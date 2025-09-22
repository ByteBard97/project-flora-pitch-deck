import { ref, onMounted, onUpdated, nextTick } from 'vue'

export function useAutoScale(containerRef, options = {}) {
  const {
    padding = 16,           // Internal padding to account for
    maxScale = 1.0,         // Don't scale up beyond original size
    minScale = 0.1,         // Minimum scale factor
    scaleStep = 0.95,       // How much to reduce scale each iteration
    maxIterations = 20      // Prevent infinite loops
  } = options

  const scale = ref(1.0)
  const isOverflowing = ref(false)

  const measureAndScale = async () => {
    if (!containerRef.value) return

    await nextTick() // Ensure DOM is updated

    const container = containerRef.value
    const containerRect = container.getBoundingClientRect()
    const availableWidth = containerRect.width - (padding * 2)
    const availableHeight = containerRect.height - (padding * 2)

    // Get all child elements
    const children = Array.from(container.children)
    if (children.length === 0) return

    let currentScale = maxScale
    let iteration = 0

    while (iteration < maxIterations) {
      // Apply current scale
      container.style.transform = `scale(${currentScale})`
      container.style.transformOrigin = 'center'

      await nextTick() // Let the DOM update

      // Measure total content size
      let totalContentWidth = 0
      let totalContentHeight = 0

      children.forEach(child => {
        const childRect = child.getBoundingClientRect()
        totalContentWidth = Math.max(totalContentWidth, childRect.width)
        totalContentHeight += childRect.height
      })

      // Check if content fits
      const widthFits = totalContentWidth <= availableWidth
      const heightFits = totalContentHeight <= availableHeight

      if (widthFits && heightFits) {
        // Content fits, we're done
        scale.value = currentScale
        isOverflowing.value = false
        break
      }

      // Content doesn't fit, reduce scale
      currentScale *= scaleStep
      iteration++

      if (currentScale < minScale) {
        // Hit minimum scale, stop here
        scale.value = minScale
        isOverflowing.value = true
        container.style.transform = `scale(${minScale})`
        break
      }
    }

    // Log results for debugging
    console.log(`AutoScale: ${container.className} scaled to ${scale.value.toFixed(3)}`, {
      availableWidth,
      availableHeight,
      iterations: iteration,
      overflowing: isOverflowing.value
    })
  }

  const resetScale = () => {
    if (containerRef.value) {
      containerRef.value.style.transform = 'scale(1)'
      scale.value = 1.0
      isOverflowing.value = false
    }
  }

  // Run scaling on mount and updates
  onMounted(measureAndScale)
  onUpdated(measureAndScale)

  return {
    scale,
    isOverflowing,
    measureAndScale,
    resetScale
  }
}