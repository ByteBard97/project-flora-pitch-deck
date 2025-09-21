<script setup lang="ts">
// Define props with defaults
const props = withDefaults(defineProps<{
  size?: 'small' | 'medium' | 'large' | 'xl'
  layout?: 'horizontal' | 'vertical'
  showText?: boolean
  showBounds?: boolean
}>(), {
  size: 'medium',
  layout: 'vertical',
  showText: true,
  showBounds: false
})
</script>

<template>
  <div
    class="flora-logo"
    :class="[
      `flora-logo--${size}`,
      `flora-logo--${layout}`,
      { 'flora-logo--text-only': !showText },
      { 'flora-logo--debug': showBounds }
    ]"
  >
    <!-- Tree Image -->
    <img
      src="/flora-tree.webp"
      alt="Flora Tree Logo"
      class="flora-logo__tree"
    />

    <!-- Flora Text -->
    <div
      v-if="showText"
      class="flora-logo__text"
    >
      Flora
    </div>
  </div>
</template>

<style scoped>
.flora-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--flora-logo-gap);
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

/* Layout Variants */
.flora-logo--vertical {
  flex-direction: column;
  --flora-logo-gap: 0.5rem;
}

.flora-logo--horizontal {
  flex-direction: row;
  --flora-logo-gap: 1rem;
}

/* Tree Image Styling */
.flora-logo__tree {
  width: var(--flora-logo-tree-size);
  height: var(--flora-logo-tree-size);
  max-width: 100%;
  max-height: 60%;
  object-fit: contain;
  filter: drop-shadow(0 8px 24px rgba(0, 0, 0, 0.3));
  transition: all 0.3s ease;
}

.flora-logo__tree:hover {
  filter: drop-shadow(0 12px 32px rgba(0, 0, 0, 0.4));
  transform: translateY(-2px);
}

/* Flora Text Styling */
.flora-logo__text {
  background: linear-gradient(135deg, #67c471, #00997e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-family: system-ui, -apple-system, sans-serif;
  font-weight: 800;
  font-size: var(--flora-logo-text-size);
  line-height: 1;
  letter-spacing: -0.02em;
  filter: drop-shadow(0 2px 8px rgba(0, 153, 126, 0.25));
  transition: all 0.3s ease;
  user-select: none;
  white-space: nowrap;
  flex-shrink: 0;
}

.flora-logo__text:hover {
  filter: drop-shadow(0 4px 12px rgba(0, 153, 126, 0.35));
  transform: scale(1.02);
}

/* Size Variants - now container-relative */
.flora-logo--small {
  --flora-logo-tree-size: min(48px, 50%);
  --flora-logo-text-size: clamp(1rem, 3vw, 1.5rem);
}

.flora-logo--medium {
  --flora-logo-tree-size: min(80px, 60%);
  --flora-logo-text-size: clamp(1.5rem, 4vw, 2.5rem);
}

.flora-logo--large {
  --flora-logo-tree-size: min(120px, 70%);
  --flora-logo-text-size: clamp(2rem, 5vw, 3.5rem);
}

.flora-logo--xl {
  --flora-logo-tree-size: min(160px, 80%);
  --flora-logo-text-size: clamp(2.5rem, 6vw, 4.5rem);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .flora-logo--large {
    --flora-logo-tree-size: 100px;
    --flora-logo-text-size: 3rem;
  }

  .flora-logo--xl {
    --flora-logo-tree-size: 120px;
    --flora-logo-text-size: 3.5rem;
  }
}

@media (max-width: 480px) {
  .flora-logo--medium {
    --flora-logo-tree-size: 60px;
    --flora-logo-text-size: 2rem;
  }

  .flora-logo--large {
    --flora-logo-tree-size: 80px;
    --flora-logo-text-size: 2.5rem;
  }

  .flora-logo--xl {
    --flora-logo-tree-size: 100px;
    --flora-logo-text-size: 3rem;
  }
}

/* Animation for entrance */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.flora-logo {
  animation: fadeInUp 0.6s ease-out;
}

/* Hover effect for the whole logo */
.flora-logo:hover .flora-logo__tree {
  transform: translateY(-2px) scale(1.02);
}

.flora-logo:hover .flora-logo__text {
  transform: scale(1.03);
}

/* Debug mode - show bounding box */
.flora-logo--debug {
  border: 2px solid #ffff00;
  background: rgba(255, 255, 0, 0.1);
  position: relative;
}

.flora-logo--debug::before {
  content: 'FLORA LOGO';
  position: absolute;
  top: -20px;
  left: 0;
  font-size: 10px;
  color: #ffff00;
  font-weight: bold;
  background: rgba(0, 0, 0, 0.8);
  padding: 2px 4px;
  border-radius: 2px;
  z-index: 1000;
}
</style>