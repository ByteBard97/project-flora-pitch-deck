<!-- components/ToolLink.vue -->
<template>
  <VTooltip
    :triggers="['hover','focus']"
    :delay="{ show: 200, hide: 800 }"
    placement="top-start"
    :distance="6"
    :hide-on-click="false"
    :popper-triggers="['hover']"
    :arrow-padding="0"
    :offset="[0, 6]"
    :flip="true"
  >
    <a
      :href="href"
      target="_blank"
      rel="noopener noreferrer"
      class="tool-link"
    >
      <slot>{{ text }}</slot>
    </a>

    <template #popper>
      <div class="tool-tooltip">
        <div class="tooltip-header">
          <span class="tool-icon">{{ icon }}</span>
          <strong>{{ title }}</strong>
        </div>
        <div class="tooltip-content">
          <p>{{ description }}</p>
          <p v-if="context" class="context">{{ context }}</p>
        </div>
      </div>
    </template>
  </VTooltip>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    required: true
  },
  href: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  context: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>
.tool-link {
  color: white;
  text-decoration: underline;
  cursor: pointer;
  transition: color 0.2s ease;
}

.tool-link:hover {
  color: #fbbf24;
}

.tool-tooltip {
  background: rgba(0, 0, 0, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 12px;
  width: 280px;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.tooltip-header {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #fbbf24;
  font-size: 14px;
  margin-bottom: 8px;
}

.tool-icon {
  font-size: 16px;
}

.tooltip-content p {
  color: #e5e5e5;
  font-size: 12px;
  line-height: 1.4;
  margin: 0 0 6px 0;
}

.tooltip-content .context {
  color: #a0c4c7;
  font-size: 11px;
  font-style: italic;
  margin-bottom: 0;
}

/* Style the floating-vue arrow to look like a speech bubble */
:deep(.v-popper__arrow-outer) {
  border-top-color: rgba(255, 255, 255, 0.2) !important;
}

:deep(.v-popper__arrow-inner) {
  border-top-color: rgba(0, 0, 0, 0.95) !important;
}
</style>