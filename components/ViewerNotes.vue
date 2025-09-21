<script setup lang="ts">
import { ref, computed } from "vue";
import { useSlideContext } from "@slidev/client";

const open = ref(false);
const { frontmatter } = useSlideContext();

const notes = computed(() => frontmatter.value?.viewerNotes ?? "");
</script>

<template>
  <button
    class="viewer-notes-toggle"
    @click="open = !open"
    :aria-expanded="open"
    aria-controls="viewer-notes-drawer"
    title="Toggle notes"
  >
    📝 Notes
  </button>

  <aside
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
/* ...same styles as before... */
</style>
