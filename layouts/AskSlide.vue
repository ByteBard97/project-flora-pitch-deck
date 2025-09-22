<template>
  <div class="ask-slide">
    <div class="slide-header">
      <h1>Let's Build This, Together.</h1>
      <p class="subtitle">The Final Piece: Partnership</p>
    </div>

    <div class="readiness-section" :class="{ visible: showReadiness }">
      <div class="readiness-card">
        <p>The research is done, the opportunity is validated, and the strategy is clear.</p>
        <p class="highlight"><strong>The final ingredient is the founding team.</strong></p>
      </div>
    </div>

    <div class="ask-section" :class="{ visible: showAsk }">
      <div class="ask-card">
        <h3>My Ask</h3>
        <p>I am asking for your <strong>full commitment</strong> to join me as <strong>co-founders</strong> of Project Flora.</p>
      </div>
    </div>

    <div class="next-steps" :class="{ visible: showSteps }">
      <h3>🚀 Next Steps</h3>
      <div class="steps-grid">
        <div class="step-card" :class="{ visible: showStep1 }">
          <div class="step-number">1</div>
          <h4>Formally agree to partner</h4>
          <p>on this venture</p>
        </div>
        <div class="step-card" :class="{ visible: showStep2 }">
          <div class="step-number">2</div>
          <h4>Solidify our roles</h4>
          <p>Responsibilities, and equity structure</p>
        </div>
        <div class="step-card" :class="{ visible: showStep3 }">
          <div class="step-number">3</div>
          <h4>Collaborate on technical spec</h4>
          <p>Make key architectural decisions <em>as a team</em></p>
        </div>
        <div class="step-card" :class="{ visible: showStep4 }">
          <div class="step-number">4</div>
          <h4>Begin development</h4>
          <p>MVP in Q4 2025</p>
        </div>
      </div>
    </div>

    <div class="timing-section" :class="{ visible: showTiming }">
      <div class="timing-card">
        <p><strong>⚡ The timing is perfect.</strong></p>
        <p>The market is ready, the technology exists, and we have the exact skills needed.</p>
      </div>
    </div>

    <div class="cta-section" :class="{ visible: showCTA }">
      <div class="cta-card">
        <h3>🌱 Are you ready to seed the future of landscape design?</h3>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const showReadiness = ref(false)
const showAsk = ref(false)
const showSteps = ref(false)
const showStep1 = ref(false)
const showStep2 = ref(false)
const showStep3 = ref(false)
const showStep4 = ref(false)
const showTiming = ref(false)
const showCTA = ref(false)

onMounted(() => {
  setTimeout(() => {
    showReadiness.value = true
  }, 300)

  setTimeout(() => {
    showAsk.value = true
  }, 600)

  setTimeout(() => {
    showSteps.value = true
  }, 900)

  setTimeout(() => {
    showStep1.value = true
  }, 1200)

  setTimeout(() => {
    showStep2.value = true
  }, 1400)

  setTimeout(() => {
    showStep3.value = true
  }, 1600)

  setTimeout(() => {
    showStep4.value = true
  }, 1800)

  setTimeout(() => {
    showTiming.value = true
  }, 2100)

  setTimeout(() => {
    showCTA.value = true
  }, 2400)
})
</script>

<style scoped>
.ask-slide {
  background: linear-gradient(135deg, #0f4a3c 0%, #1e6b5a 100%);
  color: white;
  padding: 0.8rem;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.slide-header {
  text-align: center;
  margin-bottom: 0.8rem;
}

.slide-header h1 {
  font-size: 1.6rem;
  font-weight: bold;
  margin-bottom: 0.3rem;
  line-height: 1.1;
}

.subtitle {
  font-size: 0.8rem;
  color: #a0c4c7;
  font-style: italic;
  margin: 0;
}

.readiness-section, .ask-section, .timing-section, .cta-section {
  display: flex;
  justify-content: center;
  margin-bottom: 0.6rem;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s ease-out;
}

.readiness-section.visible, .ask-section.visible, .timing-section.visible, .cta-section.visible {
  opacity: 1;
  transform: translateY(0);
}

.readiness-card, .ask-card, .timing-card {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 0.8rem;
  text-align: center;
  backdrop-filter: blur(10px);
  max-width: 80%;
}

.ask-card {
  border-left: 3px solid #fbbf24;
}

.readiness-card p, .ask-card p, .timing-card p {
  font-size: 0.7rem;
  color: #a0c4c7;
  margin-bottom: 0.3rem;
}

.readiness-card p:last-child {
  margin-bottom: 0;
}

.highlight strong {
  color: white;
  font-size: 0.8rem;
}

.ask-card h3 {
  font-size: 0.9rem;
  color: white;
  margin-bottom: 0.5rem;
}

.ask-card strong {
  color: white;
}

.next-steps {
  margin-bottom: 0.6rem;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s ease-out;
}

.next-steps.visible {
  opacity: 1;
  transform: translateY(0);
}

.next-steps h3 {
  text-align: center;
  font-size: 0.8rem;
  color: white;
  margin-bottom: 0.5rem;
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.4rem;
}

.step-card {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 0.6rem;
  text-align: center;
  backdrop-filter: blur(10px);
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s ease-out;
  position: relative;
}

.step-card.visible {
  opacity: 1;
  transform: translateY(0);
}

.step-number {
  position: absolute;
  top: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 20px;
  background: linear-gradient(135deg, #fbbf24, #10b981);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.6rem;
  font-weight: bold;
  color: #0f4a3c;
}

.step-card h4 {
  font-size: 0.6rem;
  color: white;
  margin-bottom: 0.3rem;
  margin-top: 0.3rem;
}

.step-card p {
  font-size: 0.5rem;
  color: #a0c4c7;
  margin: 0;
}

.step-card em {
  color: #fbbf24;
}

.timing-card {
  border-left: 3px solid #10b981;
}

.timing-card p:first-child {
  font-size: 0.8rem;
  color: white;
}

.cta-card {
  background: linear-gradient(135deg, #10b981, #fbbf24);
  border: none;
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
  color: white;
  max-width: 90%;
}

.cta-card h3 {
  font-size: 0.9rem;
  margin: 0;
  color: white;
  font-weight: bold;
}
</style>