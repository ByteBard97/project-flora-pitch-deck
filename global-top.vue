<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import { useNav } from "@slidev/client";

const open = ref(false);
const showHint = ref(false);
const { currentPage, total, currentSlideRoute } = useNav();

// Show on all slides except first + last
const shouldShow = computed(() => {
  const p = currentPage.value ?? 1;
  const t = total.value ?? 1;
  return p > 1 && p < t;
});

// Pull notes from front-matter
const notes = computed(() => {
  return (currentSlideRoute.value?.meta as any)?.frontmatter?.viewerNotes ?? "";
});

// Auto-close on slide change
watch(currentPage, () => {
  open.value = false;
  // Show the hint only once when the notes button first becomes visible
  if (shouldShow.value && !localStorage.getItem("notes-hint-shown")) {
    showHint.value = true;
    localStorage.setItem("notes-hint-shown", "true");
    // Auto-hide hint after 4s
    setTimeout(() => (showHint.value = false), 4000);
  }
});

onMounted(() => {
  // Don't show hint by default - user can discover the notes button
  showHint.value = false;
});
</script>

<template>
  <!-- Floating Notes button -->
  <div v-if="shouldShow" class="notes-container">
    <button
      class="viewer-notes-toggle"
      @click="open = !open"
      :aria-expanded="open"
      aria-controls="viewer-notes-drawer"
      title="Show notes"
    >
      📝 Notes
    </button>

    <!-- One-time hint bubble with accessibility tweak -->
    <div v-if="showHint" class="notes-hint" aria-live="polite">
      Click to see notes!
    </div>
  </div>

  <!-- Slide-out drawer -->
  <aside
    v-if="shouldShow"
    id="viewer-notes-drawer"
    class="viewer-notes-drawer"
    :class="{ open }"
    role="complementary"
    aria-label="Slide notes"
  >
    <header>
      <strong>Slide Notes</strong>
      <button class="close" @click="open = false" aria-label="Close">✕</button>
    </header>

    <div class="content" v-if="notes" v-html="notes" />
    <div class="content empty" v-else>
      <em>No notes for this slide.</em>
    </div>
  </aside>
</template>

<style scoped>
.notes-hint {
  position: absolute;
  bottom: 120%;
  right: 0;
  background: var(--surface-2, #0d3431);
  color: var(--text-hi, #eef6f3);
  border: 1px solid var(--line-1, #1e4e49);
  border-radius: var(--radius, 12px);
  padding: 8px 12px;
  font-size: 14px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(4px);
  white-space: nowrap;
  z-index: 1001;
  animation:
    hintFloat 420ms ease-out,
    hintFade 4s forwards;
}

/* little tail pointing to the button */
.notes-hint::after {
  content: "";
  position: absolute;
  right: 14px;
  top: 100%;
  width: 10px;
  height: 10px;
  background: var(--surface-2, #0d3431);
  border-left: 1px solid var(--line-1, #1e4e49);
  border-bottom: 1px solid var(--line-1, #1e4e49);
  transform: rotate(45deg);
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
}

/* gentle entrance + auto fade */
@keyframes hintFloat {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes hintFade {
  0%,
  80% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

/* respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  .notes-hint {
    animation: none;
  }
}

.notes-container {
  position: fixed;
  right: 16px;
  bottom: 16px;
  z-index: 1000;
}

.viewer-notes-toggle {
  border: none;
  cursor: pointer;
  font-weight: 700;
  padding: 0.6em 1.1em;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    var(--flora-leaf, #67c471),
    var(--flora-tree, #00997e)
  );
  color: #fff;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.35);
  transition: transform 0.2s ease;
}
.viewer-notes-toggle:hover {
  transform: scale(1.05);
}

/* Hint bubble */
.notes-hint {
  position: absolute;
  bottom: 120%;
  right: 0;
  background: var(--surface-2, #0d3431);
  color: var(--text-hi, #eef6f3);
  border: 1px solid var(--line-1, #1e4e49);
  border-radius: var(--radius, 8px);
  padding: 6px 10px;
  font-size: 14px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.35);
  animation: fadeInOut 4s forwards;
}
@keyframes fadeInOut {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  10%,
  90% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-10px);
  }
}

.viewer-notes-drawer {
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: min(420px, 90vw);
  transform: translateX(100%);
  transition: transform 0.25s ease;
  background: var(--surface-2, #0d3431);
  color: var(--text, #d8e7e1);
  border-left: 1px solid var(--line-1, #1e4e49);
  box-shadow: -16px 0 40px rgba(0, 0, 0, 0.35);
  z-index: 999;
  display: grid;
  grid-template-rows: auto 1fr;
}
.viewer-notes-drawer.open {
  transform: translateX(0);
}

.viewer-notes-drawer header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 18px;
  border-bottom: 1px solid var(--line-1, #1e4e49);
}
.viewer-notes-drawer header .close {
  border: none;
  background: transparent;
  color: inherit;
  font-size: 18px;
  cursor: pointer;
}
.viewer-notes-drawer .content {
  padding: 16px 18px;
  line-height: 1.6;
}
.viewer-notes-drawer .empty {
  color: var(--muted, #9fb8b1);
}
</style>
