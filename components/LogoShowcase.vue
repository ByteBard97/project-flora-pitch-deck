<template>
  <div class="logo-showcase">
    <h3>FloraLogo Component Examples</h3>

    <div class="showcase-grid">
      <!-- Different Sizes -->
      <div class="showcase-item">
        <h4>Sizes</h4>
        <div class="size-examples">
          <FloraLogo size="small" />
          <FloraLogo size="medium" />
          <FloraLogo size="large" />
          <FloraLogo size="xl" />
        </div>
      </div>

      <!-- Different Layouts -->
      <div class="showcase-item">
        <h4>Layouts</h4>
        <div class="layout-examples">
          <FloraLogo size="medium" layout="vertical" />
          <FloraLogo size="medium" layout="horizontal" />
        </div>
      </div>

      <!-- Tree Only -->
      <div class="showcase-item">
        <h4>Tree Only</h4>
        <FloraLogo size="medium" :show-text="false" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.logo-showcase {
  padding: 2rem;
  background: var(--surface-1);
  border-radius: 12px;
  margin: 2rem 0;
}

.showcase-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
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

.size-examples {
  display: flex;
  justify-content: space-around;
  align-items: end;
  gap: 1rem;
  flex-wrap: wrap;
}

.layout-examples {
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
}
</style>