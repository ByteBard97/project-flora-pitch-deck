<template>
  <v-tooltip
    location="top"
    :open-delay="200"
    :close-delay="800"
    :offset="[0, 8]"
  >
    <template v-slot:activator="{ props }">
      <a
        :href="href"
        target="_blank"
        rel="noopener noreferrer"
        class="flora-tooltip-link"
        v-bind="props"
      >
        <slot>{{ text }}</slot>
      </a>
    </template>

    <template v-slot:default>
      <div class="flora-tooltip">
        <div class="flora-tooltip-header">
          <span class="flora-tooltip-icon">{{ icon }}</span>
          <strong class="flora-tooltip-title">{{ title }}</strong>
        </div>
        <div class="flora-tooltip-content">
          <p class="flora-tooltip-description">{{ description }}</p>
          <p v-if="context" class="flora-tooltip-context">{{ context }}</p>
        </div>
      </div>
    </template>
  </v-tooltip>
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
/* Flora-styled tooltip link */
.flora-tooltip-link {
  color: white;
  text-decoration: underline;
  text-decoration-color: var(--flora-circuit);
  text-underline-offset: 2px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
}

.flora-tooltip-link:hover {
  color: var(--flora-leaf);
  text-decoration-color: var(--flora-leaf);
  text-shadow: 0 0 8px rgba(103, 196, 113, 0.3);
}

/* Flora-styled tooltip container */
.flora-tooltip {
  background: linear-gradient(135deg, var(--bg-1) 0%, var(--surface-2) 100%);
  border: 2px solid var(--flora-tree);
  border-radius: 12px;
  padding: 16px;
  width: 320px;
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.4),
    0 0 0 1px rgba(103, 196, 113, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  position: relative;
}

/* Override Vuetify's default tooltip background */
:deep(.v-overlay__content) {
  background: transparent !important;
  box-shadow: none !important;
  padding: 0 !important;
}

/* Remove any default Vuetify tooltip styling */
:deep(.v-tooltip > .v-overlay__content) {
  background: transparent !important;
  border: none !important;
  border-radius: 0 !important;
  box-shadow: none !important;
}

/* Subtle glow effect */
.flora-tooltip::before {
  content: '';
  position: absolute;
  top: -1px;
  left: -1px;
  right: -1px;
  bottom: -1px;
  background: linear-gradient(135deg, var(--flora-leaf), var(--flora-tree));
  border-radius: 12px;
  opacity: 0.1;
  z-index: -1;
}

/* Header with icon and title */
.flora-tooltip-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(103, 196, 113, 0.2);
}

.flora-tooltip-icon {
  font-size: 18px;
  filter: drop-shadow(0 0 4px rgba(103, 196, 113, 0.3));
}

.flora-tooltip-title {
  color: var(--flora-leaf);
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.025em;
  text-shadow: 0 0 8px rgba(103, 196, 113, 0.2);
}

/* Content styling */
.flora-tooltip-content {
  line-height: 1.5;
}

.flora-tooltip-description {
  color: var(--text);
  font-size: 13px;
  margin: 0 0 8px 0;
  line-height: 1.4;
}

.flora-tooltip-context {
  color: var(--flora-circuit);
  font-size: 12px;
  font-style: italic;
  margin: 0;
  padding: 6px 10px;
  background: rgba(143, 218, 183, 0.1);
  border-radius: 6px;
  border-left: 2px solid var(--flora-circuit);
}
</style>