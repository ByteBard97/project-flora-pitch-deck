<script setup>
const props = defineProps(["frontmatter"]);
</script>

<template>
  <div class="slidev-layout flora-title">
    <h1>{{ frontmatter?.slideTitle || "NO TITLE" }}</h1>
    <p>{{ frontmatter?.subtitle || "NO SUBTITLE" }}</p>

    <slot />
  </div>
</template>
