<template>
  <section class="sf">
    <header class="sf-fixed">
      <slot name="header" />
    </header>

    <!-- Weighted vertical stack -->
    <main class="sf-stack">
      <slot />
    </main>

    <footer class="sf-fixed">
      <slot name="footer" />
    </footer>
  </section>
</template>

<script setup lang="ts"></script>

<style>
/* The slide is the size container: cqw/cqh now mean “% of slide”. */
.sf {
  container-type: size;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  /* Scale tokens once; everything reads these. */
  --gutter: clamp(16px, 3cqw, 44px); /* left/right gutters */
  --col-gap: clamp(12px, 2cqw, 32px); /* space between columns */
  --stack-gap: clamp(12px, 1.8cqh, 28px);
  --radius: clamp(8px, 1.2cqh, 16px);
  --pad: clamp(10px, 1.4cqh, 22px);
  --title: clamp(18px, 3.4cqw, 40px);
  --body: clamp(12px, 2cqw, 18px);
}

.sf-fixed {
  flex: 0 0 auto;
} /* header/footer take only what they need */

.sf-stack {
  flex: 1 1 auto; /* takes the remaining vertical space */
  display: flex;
  flex-direction: column;
  gap: var(--stack-gap);
  min-height: 0; /* allow shrinking without overflow */
}

/* A block is a vertical section in the stack.
   Give it a weight with --w. Browser normalizes weights automatically. */
.sf-block {
  flex: var(--w, 1) 1 0%;
  min-height: 0;
  display: grid;
  /* Default: centered full-bleed row with gutters */
  grid-template-columns: var(--gutter) minmax(0, 1fr) var(--gutter);
}

/* Center content in the middle track for full rows */
.sf-block.full > * {
  grid-column: 2;
}

/* Two- and three-column rows with gutters + gaps */
.sf-block.cols-2 {
  grid-template-columns:
    var(--gutter) minmax(0, 1fr) var(--col-gap) minmax(0, 1fr)
    var(--gutter);
}
.sf-block.cols-2 > *:first-child {
  grid-column: 2;
  min-width: 0;
  min-height: 0;
}
.sf-block.cols-2 > *:last-child {
  grid-column: 4;
  min-width: 0;
  min-height: 0;
}

.sf-block.cols-3 {
  grid-template-columns:
    var(--gutter) minmax(0, 1fr) var(--col-gap) minmax(0, 1fr)
    var(--col-gap) minmax(0, 1fr) var(--gutter);
}
.sf-block.cols-3 > *:nth-child(1) {
  grid-column: 2;
  min-width: 0;
  min-height: 0;
}
.sf-block.cols-3 > *:nth-child(2) {
  grid-column: 4;
  min-width: 0;
  min-height: 0;
}
.sf-block.cols-3 > *:nth-child(3) {
  grid-column: 6;
  min-width: 0;
  min-height: 0;
}

/* A reusable “card/cell” wrapper that becomes its own size container.
   Children can now use cqw/cqh relative to the card, not the whole slide. */
.sf-cell {
  container-type: size;
  background: rgba(255, 255, 255, 0.04);
  outline: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: var(--radius);
  padding: var(--pad);
  min-width: 0;
  min-height: 0; /* critical for no overflow */
}

/* Typographic helpers that scale with the container */
.sf-title {
  font-size: var(--title);
  line-height: 1.15;
  margin: 0 0 calc(0.6 * var(--stack-gap));
}
.sf-body {
  font-size: var(--body);
  line-height: 1.35;
}
</style>
