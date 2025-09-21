<script setup lang="ts">
import { onMounted, ref, nextTick } from 'vue'
import * as AL from '@lume/autolayout'

type Frame = { x: number; y: number; width: number; height: number }
const frames = ref<Record<string, Frame>>({})

onMounted(async () => {
  await nextTick()


  // Use the actual slide dimensions we found
  const slideEl = document.querySelector('#slideshow') as HTMLElement
  if (!slideEl) {
    throw new Error('Could not find #slideshow element')
  }
  const W = slideEl.clientWidth
  const H = slideEl.clientHeight
  console.log('Using slide dimensions:', W, 'x', H)

  // Calculate content height to match original design proportions
  const logoHeight = Math.round(H * 0.45)  // 45% for logo+Flora text (bigger)
  const taglineHeight = Math.round(H * 0.05) // 5% for tagline (compact)
  const ruleHeight = 3 // 3px green rule
  const subtitleHeight = Math.round(H * 0.08) // 8% for subtitle (readable)
  const cardHeight = Math.round(H * 0.25) // 25% for card (much bigger for readable text)

  const gap = 5 // Fixed 5px gaps
  const totalContentHeight = logoHeight + taglineHeight + ruleHeight + subtitleHeight + cardHeight + (gap * 4)
  const leftoverSpace = H - totalContentHeight

  // Use much smaller top and bottom margins
  const topPx = Math.max(20, Math.round(leftoverSpace * 0.2)) // Use only 20% of leftover space for top
  const botPx = Math.max(20, Math.round(leftoverSpace * 0.2)) // Use only 20% of leftover space for bottom

  console.log('Space calculation:', {
    totalHeight: H,
    contentHeight: totalContentHeight,
    leftoverSpace,
    topMargin: topPx,
    bottomMargin: botPx
  })

  // Get logo aspect ratio to keep the tree proportional
  const img = new Image()
  img.src = '/flora-tree.webp'
  try { await img.decode() } catch {}
  const R = (img.naturalWidth && img.naturalHeight)
    ? img.naturalWidth / img.naturalHeight
    : 1.6 // sensible fallback

  // Fixed VFL - use much more horizontal space
  const vfl = [
    // Vertical chain with proper spacing and explicit heights
    `V:|-(${topPx})-[logo(${logoHeight})]-${gap}-[tagline(${taglineHeight})]-${gap}-[rule(${ruleHeight})]-${gap}-[subtitle(${subtitleHeight})]-${gap}-[card(${cardHeight})]-(${botPx})-|`,

    // Keep logo aspect ratio - size-only, no positioning
    `H:[logo(==logo.height*${R})]`,

    // Much wider components - use more horizontal space
    'H:[tagline(>=400)]',
    'H:[rule(>=300)]',
    'H:[subtitle(>=500)]',
    'H:[card(>=450)]',
  ].join('\n')

  console.log('Clean VFL:', vfl)

  // Parse extended VFL (creates subViews & constraints)
  const constraints = AL.VisualFormat.parse(vfl, { extended: true })

  // Build the view with ONLY the VFL constraints - no competing addConstraint calls
  const view = new AL.View({
    width: W,
    height: H,
    constraints,
  })

  // Don't use centerX constraints - handle centering manually

  // Extract frames and manually center them
  frames.value = Object.fromEntries(
    Object.keys(view.subViews).map((name) => {
      const v = view.subViews[name]
      // Calculate centered x position
      const centeredX = (W - v.width) / 2
      return [name, { x: centeredX, y: v.top, width: v.width, height: v.height }]
    })
  )

  // Debug logging with ChatGPT's sanity check
  console.log('Canvas size:', W, 'x', H)
  console.table(Object.fromEntries(
    Object.entries(view.subViews).map(([k,v]) => [k, {
      top: (v as any).top,
      bottom: (v as any).bottom,
      height: (v as any).height,
      width: (v as any).width
    }])
  ))
  console.log('Centered frames:', frames.value)
});
</script>

<template>
  <!-- Fixed inner canvas; Slidev scales this uniformly -->
  <div
    id="cover-canvas"
    class="relative mx-auto w-full h-full"
    style="background: #002a29"
  >
    <!-- Combined Logo Component -->
    <div
      :style="{
        position: 'absolute',
        left: frames.logo?.x + 'px',
        top: frames.logo?.y + 'px',
        width: frames.logo?.width + 'px',
        height: frames.logo?.height + 'px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        boxSizing: 'border-box',
      }"
    >
      <FloraLogo size="xl" layout="vertical" :showBounds="true" />
    </div>

    <div
      :style="{
        position: 'absolute',
        left: frames.tagline?.x + 'px',
        top: frames.tagline?.y + 'px',
        width: frames.tagline?.width + 'px',
        height: frames.tagline?.height + 'px',
        overflow: 'hidden',
        boxSizing: 'border-box',
      }"
    >
      <TaglineText
        text="Landscape design software • tech + nature"
        :showBounds="true"
      />
    </div>

    <div
      :style="{
        position: 'absolute',
        left: frames.rule?.x + 'px',
        top: frames.rule?.y + 'px',
        width: frames.rule?.width + 'px',
        height: frames.rule?.height + 'px',
        background: '#1e4e49',
        border: '1px solid #00ff00',
        boxSizing: 'border-box',
      }"
    >
      <div style="position: absolute; top: -15px; left: 0; font-size: 8px; color: #00ff00; background: rgba(0,0,0,0.8); padding: 1px 3px; border-radius: 2px;">RULE</div>
    </div>

    <div
      :style="{
        position: 'absolute',
        left: frames.subtitle?.x + 'px',
        top: frames.subtitle?.y + 'px',
        width: frames.subtitle?.width + 'px',
        height: frames.subtitle?.height + 'px',
        overflow: 'hidden',
        boxSizing: 'border-box',
      }"
    >
      <SubtitleText
        text="Seeding the Future of Landscape Design"
        :showBounds="true"
      />
    </div>

    <!-- Project Card -->
    <div
      :style="{
        position: 'absolute',
        left: frames.card?.x + 'px',
        top: frames.card?.y + 'px',
        width: frames.card?.width + 'px',
        height: frames.card?.height + 'px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        boxSizing: 'border-box',
      }"
    >
      <ProjectCard
        title="Project Flora"
        subtitle="Pitch Presentation"
        year="2025"
        tagline="Intelligent design for a living world"
        variant="default"
        :showBounds="true"
        :containerWidth="frames.card?.width || 450"
        :containerHeight="frames.card?.height || 99"
      />
    </div>
  </div>
</template>
