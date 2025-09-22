<template>
  <div class="gtm-slide">
    <div class="slide-header">
      <h1>Building a Community, Not Just a Customer List</h1>
      <p class="subtitle">The Go-to-Market Blueprint</p>
    </div>

    <div class="gtm-strategy">
      <div class="icp-section" :class="{ visible: showICP }">
        <h3>🎯 Ideal Customer Profile</h3>
        <div class="persona-card">
          <div class="persona-avatar">🏠</div>
          <h4>"The Eco-Conscious Millennial Homeowner"</h4>
          <ul>
            <li>Digitally native</li>
            <li>Values-driven</li>
            <li>Already seeking this information</li>
            <li>Willing to invest time in sustainable choices</li>
          </ul>
        </div>
      </div>

      <div class="business-model" :class="{ visible: showBusinessModel }">
        <h3>💰 Business Model</h3>
        <div class="freemium-funnel">
          <div class="funnel-stage free">
            <h4>Free Tier</h4>
            <p>Essential to maximize user acquisition and fuel the community flywheel</p>
            <div class="features">
              <span>• Basic design tools</span>
              <span>• Limited plant database</span>
              <span>• Community access</span>
            </div>
          </div>
          <div class="funnel-arrow">↓</div>
          <div class="funnel-stage premium">
            <h4>Premium Tier</h4>
            <div class="price">$5-10/month</div>
            <p>Monetizes our most engaged power users</p>
            <div class="features">
              <span>• Full plant database</span>
              <span>• Advanced design features</span>
              <span>• Professional exports</span>
              <span>• Priority support</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="launch-strategy" :class="{ visible: showLaunchStrategy }">
      <h3>🚀 Launch Strategy</h3>
      <div class="strategy-steps">
        <div class="strategy-step">
          <div class="step-icon">🤝</div>
          <h4>Partnerships</h4>
          <p>Collaborate with trusted organizations</p>
          <div class="partners">
            <span class="partner">Audubon Society</span>
            <span class="partner">National Wildlife Federation</span>
            <span class="partner">Local native plant societies</span>
          </div>
        </div>

        <div class="strategy-step">
          <div class="step-icon">📝</div>
          <h4>Content Marketing</h4>
          <p>Become the go-to educational resource</p>
          <div class="content-types">
            <span>Plant selection guides</span>
            <span>Seasonal care tips</span>
            <span>Success stories</span>
          </div>
        </div>

        <div class="strategy-step">
          <div class="step-icon">🌍</div>
          <h4>Phased Rollout</h4>
          <p>Launch with deep data for key ecoregions</p>
          <div class="rollout-plan">
            <div class="phase">Phase 1: Pacific Northwest</div>
            <div class="phase">Phase 2: Northeast</div>
            <div class="phase">Phase 3: Southwest</div>
          </div>
        </div>
      </div>
    </div>

    <div class="growth-metrics" :class="{ visible: showMetrics }">
      <h3>📊 Success Metrics</h3>
      <div class="metrics-grid">
        <div class="metric">
          <div class="metric-value">5%</div>
          <div class="metric-label">Freemium conversion rate target</div>
        </div>
        <div class="metric">
          <div class="metric-value">40%</div>
          <div class="metric-label">Monthly user engagement goal</div>
        </div>
        <div class="metric">
          <div class="metric-value">2.5x</div>
          <div class="metric-label">Viral coefficient from community sharing</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const showICP = ref(false)
const showBusinessModel = ref(false)
const showLaunchStrategy = ref(false)
const showMetrics = ref(false)

onMounted(() => {
  setTimeout(() => {
    showICP.value = true
  }, 300)

  setTimeout(() => {
    showBusinessModel.value = true
  }, 600)

  setTimeout(() => {
    showLaunchStrategy.value = true
  }, 900)

  setTimeout(() => {
    showMetrics.value = true
  }, 1200)
})
</script>

<style scoped>
.gtm-slide {
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
  margin-bottom: 0.5rem;
}

.slide-header h1 {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.2rem;
  line-height: 1.1;
}

.subtitle {
  font-size: 0.7rem;
  color: #a0c4c7;
  font-style: italic;
  margin: 0;
}

.gtm-strategy {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.6rem;
  margin-bottom: 0.6rem;
}

.icp-section, .business-model {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s ease-out;
}

.icp-section.visible, .business-model.visible {
  opacity: 1;
  transform: translateY(0);
}

.icp-section h3, .business-model h3 {
  font-size: 0.7rem;
  margin-bottom: 0.3rem;
  color: white;
}

.persona-card {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 0.4rem;
  text-align: center;
  backdrop-filter: blur(10px);
}

.persona-avatar {
  font-size: 1rem;
  margin-bottom: 0.3rem;
}

.persona-card h4 {
  font-size: 0.6rem;
  color: white;
  margin-bottom: 0.3rem;
}

.persona-card ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.persona-card li {
  font-size: 0.5rem;
  color: #a0c4c7;
  margin-bottom: 0.2rem;
}

.freemium-funnel {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  align-items: center;
}

.funnel-stage {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 0.4rem;
  text-align: center;
  backdrop-filter: blur(10px);
  width: 100%;
}

.free {
  border-left: 3px solid #10b981;
}

.premium {
  border-left: 3px solid #fbbf24;
}

.funnel-stage h4 {
  font-size: 0.6rem;
  color: white;
  margin-bottom: 0.2rem;
}

.price {
  font-size: 0.7rem;
  font-weight: bold;
  color: #fbbf24;
  margin-bottom: 0.2rem;
}

.funnel-stage p {
  font-size: 0.4rem;
  color: #a0c4c7;
  margin-bottom: 0.3rem;
}

.features {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}

.features span {
  font-size: 0.4rem;
  color: #a0c4c7;
}

.funnel-arrow {
  font-size: 1.2rem;
  color: #a0c4c7;
}

.launch-strategy {
  margin-bottom: 0.6rem;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s ease-out;
}

.launch-strategy.visible {
  opacity: 1;
  transform: translateY(0);
}

.launch-strategy h3 {
  font-size: 0.7rem;
  margin-bottom: 0.3rem;
  color: white;
  text-align: center;
}

.strategy-steps {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
}

.strategy-step {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 0.5rem;
  text-align: center;
  backdrop-filter: blur(10px);
}

.step-icon {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.strategy-step h4 {
  font-size: 0.7rem;
  color: white;
  margin-bottom: 0.3rem;
}

.strategy-step p {
  font-size: 0.5rem;
  color: #a0c4c7;
  margin-bottom: 0.5rem;
}

.partners, .content-types, .rollout-plan {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.partner, .content-types span, .phase {
  font-size: 0.5rem;
  color: #a0c4c7;
  background: rgba(255, 255, 255, 0.1);
  padding: 0.2rem 0.4rem;
  border-radius: 10px;
}

.growth-metrics {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s ease-out;
}

.growth-metrics.visible {
  opacity: 1;
  transform: translateY(0);
}

.growth-metrics h3 {
  font-size: 0.7rem;
  margin-bottom: 0.3rem;
  color: white;
  text-align: center;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
}

.metric {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 0.5rem;
  text-align: center;
  backdrop-filter: blur(10px);
}

.metric-value {
  font-size: 1rem;
  font-weight: bold;
  color: #fbbf24;
  margin-bottom: 0.2rem;
}

.metric-label {
  font-size: 0.4rem;
  color: #a0c4c7;
}
</style>