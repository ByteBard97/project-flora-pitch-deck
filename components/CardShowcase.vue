<template>
  <div class="card-showcase">
    <h3>ProjectCard Component Examples</h3>

    <div class="showcase-grid">
      <!-- Default variant -->
      <div class="showcase-item">
        <h4>Default</h4>
        <ProjectCard
          title="Project Flora"
          subtitle="Pitch Presentation"
          year="2025"
          tagline="Intelligent design for a living world"
          variant="default"
        />
      </div>

      <!-- Minimal variant -->
      <div class="showcase-item">
        <h4>Minimal</h4>
        <ProjectCard
          title="Project Flora"
          subtitle="Demo Version"
          year="2025"
          tagline="Streamlined design"
          variant="minimal"
        />
      </div>

      <!-- Accent variant -->
      <div class="showcase-item">
        <h4>Accent</h4>
        <ProjectCard
          title="Project Flora"
          subtitle="Final Presentation"
          year="2025"
          tagline="The future of landscape design"
          variant="accent"
        />
      </div>

      <!-- Custom content -->
      <div class="showcase-item">
        <h4>Custom Content</h4>
        <ProjectCard
          title="Flora Beta"
          subtitle="User Testing"
          year="Q1 2025"
          tagline="Real users, real feedback"
          variant="default"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-showcase {
  padding: 2rem;
  background: var(--surface-1);
  border-radius: 12px;
  margin: 2rem 0;
}

.showcase-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 1.5rem;
}

.showcase-item {
  background: var(--surface-2);
  padding: 1.5rem;
  border-radius: 8px;
  text-align: center;
}

.showcase-item h4 {
  margin-bottom: 1rem;
  color: var(--text-hi);
}
</style>