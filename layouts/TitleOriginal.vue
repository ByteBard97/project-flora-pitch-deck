<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  console.log('🎬 Slide loaded: TitleOriginal (Slide 1)')
})
</script>

<template>
  <div class="title-slide">
    <div class="title-content">
      <div>
        <img src="/flora-tree.webp" alt="Flora Logo" class="flora-logo">
        <h1 class="flora-wordmark">Flora</h1>
        <p class="main-tagline">Landscape design software • tech + nature</p>
      </div>

      <h2 class="subtitle-line">Seeding the Future of Landscape Design</h2>

      <div class="presentation-meta">
        <div class="meta-item presenter">Project Flora</div>
        <div class="meta-item">Pitch Presentation</div>
        <div class="meta-item">2025</div>
        <div class="tech-nature-accent">Intelligent design for a living world</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.title-slide {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 6vmin;
  position: relative;
  overflow: hidden;
  background: var(--bg-1);
}

.title-content {
  position: relative;
  z-index: 2;
  max-width: 900px;
  width: 100%;
  display: grid;
  gap: 3rem;
  justify-items: center;
  text-align: center;
}

/* Flora logo */
.flora-logo {
  width: clamp(200px, 25vw, 350px);
  height: clamp(200px, 25vw, 350px);
  margin: 0 auto 2rem auto;
  display: block;
  filter: drop-shadow(0 8px 24px rgba(0, 0, 0, 0.2));
}

/* Main Flora wordmark */
.flora-wordmark {
  font-family: "Inter", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-weight: 800;
  letter-spacing: 0.01em;
  line-height: 1;
  font-size: clamp(60px, 12vw, 140px);
  margin: 0;
  display: inline-block;
  background: linear-gradient(135deg, #67c471, #00997e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 2px 8px rgba(0, 153, 126, 0.25));
}

/* Main tagline */
.main-tagline {
  font-family: "Lora", Georgia, "Times New Roman", serif;
  font-size: clamp(18px, 3vw, 28px);
  font-weight: 400;
  color: var(--muted);
  opacity: 0.85;
  margin: 0;
  letter-spacing: 0.01em;
}

/* Subtitle */
.subtitle-line {
  font-family: "Inter", sans-serif;
  font-size: clamp(24px, 4vw, 36px);
  font-weight: 600;
  color: var(--text-hi);
  margin: 0;
  letter-spacing: -0.01em;
}

/* Presentation meta info */
.presentation-meta {
  background: rgba(0, 68, 64, 0.6);
  border: 1px solid rgba(32, 52, 45, 0.8);
  border-radius: 12px;
  padding: 2rem 3rem;
  display: grid;
  gap: 1rem;
  justify-items: center;
  max-width: 500px;
  width: 100%;
  backdrop-filter: blur(8px);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.3),
    0 4px 16px rgba(0, 0, 0, 0.2),
    0 2px 8px rgba(0, 0, 0, 0.1);
}

.meta-item {
  font-family: "Lora", serif;
  font-size: clamp(16px, 2vw, 20px);
  color: var(--text);
  margin: 0;
}

.presenter {
  font-weight: 600;
  color: var(--accent);
}

.tech-nature-accent {
  font-family: "Inter", sans-serif;
  font-size: clamp(14px, 2vw, 18px);
  color: var(--accent-300);
  font-weight: 500;
  opacity: 0.9;
  margin-top: 0.5rem;
  font-style: italic;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .title-content {
    gap: 2rem;
  }

  .presentation-meta {
    padding: 1.5rem 2rem;
  }
}

/* Subtle animation */
.flora-wordmark {
  animation: fadeInUp 1.2s ease-out;
}

.main-tagline {
  animation: fadeInUp 1.2s ease-out 0.3s both;
}

.subtitle-line {
  animation: fadeInUp 1.2s ease-out 0.6s both;
}

.presentation-meta {
  animation: fadeInUp 1.2s ease-out 0.9s both;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>