<template>
  <div class="flora-title-slide">
    <!-- Background gradient overlay -->
    <div class="bg-overlay"></div>

    <!-- Main content container -->
    <div class="title-content">
      <!-- Logo and main title section -->
      <div class="hero-section">
        <img src="/flora-tree.webp" alt="Flora Logo" class="flora-logo" />

        <h1 class="flora-wordmark">Flora</h1>
        <p class="main-tagline">Landscape design software • tech + nature</p>
      </div>

      <!-- Subtitle -->
      <h2 class="subtitle-line">Seeding the Future of Landscape Design</h2>

      <!-- Presentation metadata card -->
      <div class="presentation-meta">
        <div class="meta-item presenter">Project Flora</div>
        <div class="meta-item">Pitch Presentation</div>
        <div class="meta-item">2025</div>
        <div class="tech-nature-accent">
          Intelligent design for a living world
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// No props needed as specified
// Animation will trigger on mount
</script>

<style scoped>
/* Root container - full slide area without vh/vw */
.flora-title-slide {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 3rem;
  background: #002a29; /* var(--flora-bg) */
  overflow: hidden;
  box-sizing: border-box;
}

/* Background gradient effects */
.bg-overlay {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(
      1200px 600px at 50% -10%,
      rgba(255, 255, 255, 0.06),
      transparent 60%
    ),
    radial-gradient(
      800px 400px at 20% 120%,
      rgba(0, 0, 0, 0.25),
      transparent 60%
    );
  pointer-events: none;
}

/* Content container */
.title-content {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 800px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  text-align: center;
}

/* Hero section with logo and wordmark */
.hero-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

/* Flora logo */
.flora-logo {
  width: 150px;
  height: 150px;
  object-fit: contain;
  filter: drop-shadow(0 8px 24px rgba(0, 0, 0, 0.2));
  animation: fadeInScale 1.2s ease-out;
}

/* Main Flora wordmark with gradient */
.flora-wordmark {
  font-family: "Nunito", "Inter", system-ui, sans-serif;
  font-weight: 800;
  font-size: 3.5rem; /* Smaller size to fit better */
  letter-spacing: -0.02em;
  line-height: 1;
  margin: 0;

  /* Gradient text effect */
  background: linear-gradient(135deg, #67c471, #00997e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  /* Subtle shadow for depth */
  filter: drop-shadow(0 2px 8px rgba(0, 153, 126, 0.25));

  animation: fadeInUp 1.2s ease-out;
}

/* Tagline */
.main-tagline {
  font-family: "Lora", Georgia, serif;
  font-size: 1.25rem;
  font-weight: 400;
  color: #97b2a8; /* var(--muted) */
  margin: 0;
  letter-spacing: 0.01em;
  opacity: 0.9;
  animation: fadeInUp 1.2s ease-out 0.2s both;
}

/* Subtitle */
.subtitle-line {
  font-family: "Inter", system-ui, sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: #67c471; /* var(--flora-leaf) */
  margin: 0;
  letter-spacing: -0.01em;
  animation: fadeInUp 1.2s ease-out 0.4s both;
}

/* Presentation metadata card */
.presentation-meta {
  background: #004440; /* var(--surface-2) */
  border: 1px solid #20342d; /* var(--line-1) */
  border-radius: 12px;
  padding: 0.5rem 1.25rem;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.125rem;
  max-width: 400px;
  width: 100%;
  animation: fadeInUp 1.2s ease-out 0.6s both;
}

.meta-item {
  font-family: "Lora", Georgia, serif;
  font-size: 1.125rem;
  color: #d8e7e1; /* var(--text) */
  margin: 0;
}

.presenter {
  font-weight: 600;
  color: #67c471; /* var(--flora-leaf) */
}

.tech-nature-accent {
  font-family: "Inter", system-ui, sans-serif;
  font-size: 1rem;
  color: #97b2a8; /* var(--muted) */
  font-weight: 500;
  opacity: 0.9;
  margin-top: 0.25rem;
}

/* Animations */
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

@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Responsive adjustments for smaller slides */
@media (max-width: 768px) {
  .flora-title-slide {
    padding: 2rem;
  }

  .title-content {
    gap: 2rem;
  }

  .flora-logo {
    width: 150px;
    height: 150px;
  }

  .flora-wordmark {
    font-size: 3.5rem;
  }

  .main-tagline {
    font-size: 1.1rem;
  }

  .subtitle-line {
    font-size: 1.5rem;
  }

  .presentation-meta {
    padding: 1.25rem 1.5rem;
    min-width: 250px;
  }

  .meta-item {
    font-size: 1rem;
  }

  .tech-nature-accent {
    font-size: 0.875rem;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
