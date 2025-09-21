<script setup lang="ts">
import { onMounted, ref, nextTick } from 'vue'
import * as AL from '@lume/autolayout'

// Define props with defaults
const props = withDefaults(defineProps<{
  title?: string
  subtitle?: string
  year?: string | number
  tagline?: string
  variant?: 'default' | 'minimal' | 'accent'
  showBounds?: boolean
  containerWidth?: number
  containerHeight?: number
}>(), {
  title: 'Project Flora',
  subtitle: 'Pitch Presentation',
  year: '2025',
  tagline: 'Intelligent design for a living world',
  variant: 'default',
  showBounds: false,
  containerWidth: 450,
  containerHeight: 99
})

type Frame = { x: number; y: number; width: number; height: number }
const frames = ref<Record<string, Frame>>({})
const cardRef = ref<HTMLElement>()

onMounted(async () => {
  await nextTick()

  // Use props dimensions instead of trying to read DOM
  const W = props.containerWidth
  const H = props.containerHeight

  console.log('ProjectCard AutoLayout - Using passed dimensions:', W, 'x', H)

  // Calculate exact pixel heights that will fit
  const padding = 8
  const gap = 6
  const totalGaps = gap * 3  // 3 gaps between 4 elements
  const totalPadding = padding * 2  // top and bottom
  const availableHeight = H - totalGaps - totalPadding

  const titleHeight = Math.round(availableHeight * 0.35)    // 35% of available
  const subtitleHeight = Math.round(availableHeight * 0.25) // 25% of available
  const yearHeight = Math.round(availableHeight * 0.15)     // 15% of available
  const taglineHeight = availableHeight - titleHeight - subtitleHeight - yearHeight // remainder

  console.log('Card height breakdown:', {
    container: H,
    available: availableHeight,
    title: titleHeight,
    subtitle: subtitleHeight,
    year: yearHeight,
    tagline: taglineHeight
  })

  const vfl = [
    `V:|-(${padding})-[title(${titleHeight})]-${gap}-[subtitle(${subtitleHeight})]-${gap}-[year(${yearHeight})]-${gap}-[tagline(${taglineHeight})]-(${padding})-|`,
    `H:|-(${padding})-[title]-(${padding})-|`,
    `H:|-(${padding})-[subtitle]-(${padding})-|`,
    `H:|-(${padding})-[year]-(${padding})-|`,
    `H:|-(${padding})-[tagline]-(${padding})-|`
  ].join('\n')

  try {
    console.log('Parsing VFL:', vfl)
    const constraints = AL.VisualFormat.parse(vfl, { extended: true })
    const view = new AL.View({ width: W, height: H, constraints })

    frames.value = Object.fromEntries(
      Object.keys(view.subViews).map((name) => {
        const v = view.subViews[name] as any
        return [name, { x: v.left, y: v.top, width: v.width, height: v.height }]
      })
    )

    console.log('ProjectCard frames calculated:', frames.value)
  } catch (error) {
    console.error('AutoLayout failed:', error)
  }
})
</script>

<template>
  <div
    ref="cardRef"
    class="project-card"
    :class="[`project-card--${variant}`, { 'project-card--debug': showBounds }]"
  >
    <!-- Title with AutoLayout -->
    <div
      :style="{
        position: 'absolute',
        left: frames.title?.x + 'px',
        top: frames.title?.y + 'px',
        width: frames.title?.width + 'px',
        height: frames.title?.height + 'px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }"
      class="project-card__title"
    >
      {{ title }}
    </div>

    <!-- Subtitle with AutoLayout -->
    <div
      :style="{
        position: 'absolute',
        left: frames.subtitle?.x + 'px',
        top: frames.subtitle?.y + 'px',
        width: frames.subtitle?.width + 'px',
        height: frames.subtitle?.height + 'px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }"
      class="project-card__subtitle"
    >
      {{ subtitle }}
    </div>

    <!-- Year with AutoLayout -->
    <div
      :style="{
        position: 'absolute',
        left: frames.year?.x + 'px',
        top: frames.year?.y + 'px',
        width: frames.year?.width + 'px',
        height: frames.year?.height + 'px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }"
      class="project-card__year"
    >
      {{ year }}
    </div>

    <!-- Tagline with AutoLayout -->
    <div
      :style="{
        position: 'absolute',
        left: frames.tagline?.x + 'px',
        top: frames.tagline?.y + 'px',
        width: frames.tagline?.width + 'px',
        height: frames.tagline?.height + 'px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }"
      class="project-card__tagline"
    >
      {{ tagline }}
    </div>
  </div>
</template>

<style scoped>
.project-card {
  background: rgba(0, 68, 64, 0.6);
  border: 1px solid rgba(32, 52, 45, 0.8);
  border-radius: 12px;
  padding: 0;
  text-align: center;
  backdrop-filter: blur(8px);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.3),
    0 4px 16px rgba(0, 0, 0, 0.2),
    0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  min-width: fit-content;
  width: 100%;
  height: 100%;
}

/* Subtle gradient overlay */
.project-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(103, 196, 113, 0.05) 0%,
    rgba(0, 153, 126, 0.05) 50%,
    rgba(0, 42, 41, 0.1) 100%
  );
  pointer-events: none;
  z-index: 0;
}

.project-card > * {
  position: relative;
  z-index: 1;
}

/* Hover effect */
.project-card:hover {
  transform: translateY(-3px);
  box-shadow:
    0 12px 48px rgba(0, 0, 0, 0.4),
    0 8px 24px rgba(0, 0, 0, 0.3),
    0 4px 12px rgba(0, 0, 0, 0.2);
  border-color: rgba(103, 196, 113, 0.3);
}

/* Title styling - AutoLayout positioned */
.project-card__title {
  color: #67c471;
  font-weight: 650;
  font-size: 1.8rem;
  font-family: system-ui, -apple-system, sans-serif;
  letter-spacing: 0.02em;
  white-space: nowrap;
}

/* Subtitle styling - AutoLayout positioned */
.project-card__subtitle {
  color: #d8e7e1;
  font-size: 1.2rem;
  font-family: system-ui, -apple-system, sans-serif;
  opacity: 0.95;
  white-space: nowrap;
}

/* Year styling - AutoLayout positioned */
.project-card__year {
  color: #d8e7e1;
  font-size: 1.2rem;
  font-family: system-ui, -apple-system, sans-serif;
  opacity: 0.95;
  white-space: nowrap;
}

/* Tagline styling - AutoLayout positioned */
.project-card__tagline {
  color: #97b2a8;
  font-style: italic;
  font-size: 1rem;
  font-family: system-ui, -apple-system, sans-serif;
  opacity: 0.9;
  line-height: 1.3;
}

/* Variant: Minimal */
.project-card--minimal {
  background: rgba(0, 68, 64, 0.3);
  border: 1px solid rgba(103, 196, 113, 0.2);
  padding: 1rem;
}

.project-card--minimal .project-card__title {
  font-size: 1rem;
}

.project-card--minimal .project-card__subtitle,
.project-card--minimal .project-card__year {
  font-size: 0.85rem;
}

.project-card--minimal .project-card__tagline {
  font-size: 0.75rem;
}

/* Variant: Accent */
.project-card--accent {
  background: linear-gradient(
    135deg,
    rgba(0, 68, 64, 0.8) 0%,
    rgba(0, 153, 126, 0.6) 100%
  );
  border: 2px solid #67c471;
  box-shadow:
    0 16px 40px rgba(0, 0, 0, 0.25),
    0 0 0 1px rgba(103, 196, 113, 0.1);
}

.project-card--accent:hover {
  border-color: #00997e;
  box-shadow:
    0 20px 48px rgba(0, 0, 0, 0.35),
    0 0 20px rgba(103, 196, 113, 0.3);
}

.project-card--accent .project-card__title {
  color: #bfe9de;
  font-size: 1.2rem;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .project-card {
    padding: 1.25rem;
  }

  .project-card__title {
    font-size: 1rem;
  }

  .project-card__subtitle,
  .project-card__year {
    font-size: 0.9rem;
  }

  .project-card__tagline {
    font-size: 0.8rem;
  }
}

/* Animation for entrance */
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.project-card {
  animation: slideInUp 0.6s ease-out 0.3s both;
}

/* Debug mode - show bounding box */
.project-card--debug {
  border: 2px solid #ff8800 !important;
  background: rgba(255, 136, 0, 0.1) !important;
}

.project-card--debug::after {
  content: 'PROJECT CARD';
  position: absolute;
  top: -20px;
  left: 0;
  font-size: 10px;
  color: #ff8800;
  font-weight: bold;
  background: rgba(0, 0, 0, 0.8);
  padding: 2px 4px;
  border-radius: 2px;
  z-index: 1000;
}
</style>