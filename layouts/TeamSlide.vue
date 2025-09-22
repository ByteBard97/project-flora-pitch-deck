<template>
  <div class="team-slide">
    <div class="slide-header">
      <h1>The Perfect Team to Cultivate This Vision</h1>
      <p class="subtitle">The Founding Team: The Right People for the Mission</p>
    </div>

    <div class="team-intro" :class="{ visible: showIntro }">
      <p>This project requires a rare blend of <strong>deep domain expertise</strong>, <strong>technical excellence</strong>, and <strong>strategic vision</strong>. We have it.</p>
    </div>

    <div class="team-members">
      <div class="member annie" :class="{ visible: showAnnie }">
        <div class="member-photo">
          <div class="photo-placeholder">A</div>
        </div>
        <h3>Annie</h3>
        <h4>The Domain Expert</h4>
        <div class="expertise">
          <div class="expertise-item">
            <span class="icon">🌱</span>
            <span>Decades of hands-on landscape architecture</span>
          </div>
          <div class="expertise-item">
            <span class="icon">🌿</span>
            <span>Deep horticultural knowledge</span>
          </div>
          <div class="expertise-item">
            <span class="icon">✓</span>
            <span>Owns the "ground truth"</span>
          </div>
        </div>
        <p>Ensures our data and design principles are <strong>authentic and effective</strong></p>
      </div>

      <div class="member jake" :class="{ visible: showJake }">
        <div class="member-photo">
          <div class="photo-placeholder">J</div>
        </div>
        <h3>Jake</h3>
        <h4>The Technical & User Visionary</h4>
        <div class="expertise">
          <div class="expertise-item">
            <span class="icon">👥</span>
            <span>Represents our target prosumer</span>
          </div>
          <div class="expertise-item">
            <span class="icon">🛠️</span>
            <span>Understands existing tool frustrations</span>
          </div>
          <div class="expertise-item">
            <span class="icon">💻</span>
            <span>Engineering skill for scalable products</span>
          </div>
        </div>
        <p>Possesses the engineering skill to build a <strong>modern, scalable, and beautiful product</strong> that users will love</p>
      </div>

      <div class="member geoff" :class="{ visible: showGeoff }">
        <div class="member-photo">
          <div class="photo-placeholder">G</div>
        </div>
        <h3>Geoff</h3>
        <h4>The Strategic Driver</h4>
        <div class="expertise">
          <div class="expertise-item">
            <span class="icon">📈</span>
            <span>Market research & business strategy</span>
          </div>
          <div class="expertise-item">
            <span class="icon">🎯</span>
            <span>Product vision & execution</span>
          </div>
          <div class="expertise-item">
            <span class="icon">🤝</span>
            <span>Unites domain & technical expertise</span>
          </div>
        </div>
        <p>Bringing the <strong>market research, business strategy, and product vision</strong> to unite the domain and technical expertise into a viable, high-growth venture</p>
      </div>
    </div>

    <div class="team-synergy" :class="{ visible: showSynergy }">
      <h3>🎨 The Perfect Combination</h3>
      <p><strong>Domain Expertise + Technical Excellence + Strategic Vision</strong></p>
      <div class="result">= High-Growth Venture</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const showIntro = ref(false)
const showAnnie = ref(false)
const showJake = ref(false)
const showGeoff = ref(false)
const showSynergy = ref(false)

onMounted(() => {
  setTimeout(() => {
    showIntro.value = true
  }, 300)

  setTimeout(() => {
    showAnnie.value = true
  }, 600)

  setTimeout(() => {
    showJake.value = true
  }, 900)

  setTimeout(() => {
    showGeoff.value = true
  }, 1200)

  setTimeout(() => {
    showSynergy.value = true
  }, 1500)
})
</script>

<style scoped>
.team-slide {
  background: linear-gradient(135deg, #0f4a3c 0%, #1e6b5a 100%);
  color: white;
  padding: 1rem;
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
  font-size: 1.4rem;
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

.team-intro {
  text-align: center;
  margin-bottom: 1rem;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s ease-out;
}

.team-intro.visible {
  opacity: 1;
  transform: translateY(0);
}

.team-intro p {
  font-size: 0.8rem;
  color: #a0c4c7;
  margin: 0;
}

.team-intro strong {
  color: white;
}

.team-members {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.8rem;
  margin-bottom: 1rem;
}

.member {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 0.8rem;
  text-align: center;
  backdrop-filter: blur(10px);
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s ease-out;
}

.member.visible {
  opacity: 1;
  transform: translateY(0);
}

.annie {
  border-left: 3px solid #10b981;
}

.jake {
  border-left: 3px solid #06b6d4;
}

.geoff {
  border-left: 3px solid #fbbf24;
}

.member-photo {
  margin-bottom: 0.5rem;
}

.photo-placeholder {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #fbbf24, #10b981);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.2rem;
  color: #0f4a3c;
  margin: 0 auto;
}

.member h3 {
  font-size: 0.9rem;
  color: white;
  margin-bottom: 0.3rem;
}

.member h4 {
  font-size: 0.7rem;
  color: #fbbf24;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.expertise {
  margin-bottom: 0.5rem;
}

.expertise-item {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  margin-bottom: 0.3rem;
  font-size: 0.5rem;
  color: #a0c4c7;
}

.expertise-item .icon {
  font-size: 0.6rem;
}

.member p {
  font-size: 0.5rem;
  color: #a0c4c7;
  line-height: 1.3;
  margin: 0;
}

.member strong {
  color: white;
}

.team-synergy {
  text-align: center;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 1rem;
  backdrop-filter: blur(10px);
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s ease-out;
}

.team-synergy.visible {
  opacity: 1;
  transform: translateY(0);
}

.team-synergy h3 {
  font-size: 0.9rem;
  color: white;
  margin-bottom: 0.5rem;
}

.team-synergy p {
  font-size: 0.7rem;
  color: #a0c4c7;
  margin-bottom: 0.5rem;
}

.result {
  font-size: 0.8rem;
  font-weight: bold;
  background: linear-gradient(135deg, #fbbf24, #10b981);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>