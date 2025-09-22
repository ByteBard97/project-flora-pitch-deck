<template>
  <div class="qa-slide">
    <div class="main-content" :class="{ visible: showMain }">
      <h1>Discussion & Questions</h1>
      <p class="subtitle">Seeding the Future of Landscape Design</p>

      <div class="flora-card">
        <div class="flora-logo">
          <div class="logo-icon">🌿</div>
          <div class="wordmark">Project Flora</div>
        </div>
        <div class="tagline">"Let's discuss how we can bring this vision to life together."</div>
      </div>
    </div>

    <!-- Decorative background plants -->
    <div class="qa-bg" aria-hidden="true">
      <div class="qa-horizon"></div>
      <div class="qa-plant p1" :class="{ visible: showPlants }"></div>
      <div class="qa-plant p2" :class="{ visible: showPlants }"></div>
      <div class="qa-plant p3" :class="{ visible: showPlants }"></div>
      <div class="qa-plant p4" :class="{ visible: showPlants }"></div>
      <div class="qa-plant p5" :class="{ visible: showPlants }"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const showMain = ref(false)
const showPlants = ref(false)

onMounted(() => {
  setTimeout(() => {
    showMain.value = true
  }, 300)

  setTimeout(() => {
    showPlants.value = true
  }, 800)
})
</script>

<style scoped>
.qa-slide {
  background: linear-gradient(135deg, #0f4a3c 0%, #1e6b5a 100%);
  color: white;
  padding: 1rem;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.main-content {
  text-align: center;
  z-index: 2;
  opacity: 0;
  transform: translateY(30px);
  transition: all 1s ease-out;
}

.main-content.visible {
  opacity: 1;
  transform: translateY(0);
}

.main-content h1 {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 0.3rem;
  line-height: 1.1;
}

.subtitle {
  font-size: 0.9rem;
  color: #a0c4c7;
  font-style: italic;
  margin-bottom: 1rem;
}

.flora-card {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1.2rem;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.flora-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 0.8rem;
}

.logo-icon {
  font-size: 1.5rem;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #10b981, #059669);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
}

.wordmark {
  font-size: 1.5rem;
  line-height: 1;
  font-weight: bold;
  color: white;
}

.tagline {
  color: #a0c4c7;
  font-style: italic;
  font-size: 0.8rem;
}

.qa-bg {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  opacity: 0.12;
}

.qa-horizon {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 24%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #10b981, transparent);
}

.qa-plant {
  position: absolute;
  bottom: 24%;
  background: #059669;
  border-radius: 50% 12% 50% 50%;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s ease-out;
}

.qa-plant.visible {
  opacity: 1;
  transform: translateY(0);
}

.p1 {
  left: 10%;
  width: 38px;
  height: 56px;
  animation: sway 4s ease-in-out infinite;
  transition-delay: 0s;
}

.p2 {
  left: 24%;
  width: 28px;
  height: 46px;
  animation: sway 4s ease-in-out infinite 0.4s;
  transition-delay: 0.2s;
}

.p3 {
  left: 46%;
  width: 50px;
  height: 78px;
  animation: sway 4s ease-in-out infinite 0.8s;
  transition-delay: 0.4s;
}

.p4 {
  left: 70%;
  width: 34px;
  height: 52px;
  animation: sway 4s ease-in-out infinite 1.2s;
  transition-delay: 0.6s;
}

.p5 {
  left: 85%;
  width: 24px;
  height: 38px;
  animation: sway 4s ease-in-out infinite 1.6s;
  transition-delay: 0.8s;
}

@keyframes sway {
  0%, 100% {
    transform: rotate(0);
  }
  25% {
    transform: rotate(2deg);
  }
  75% {
    transform: rotate(-2deg);
  }
}
</style>