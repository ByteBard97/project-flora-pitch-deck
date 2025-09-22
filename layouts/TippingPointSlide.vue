<template>
  <div class="slide-root">
    <div class="tipping-point-slide">
      <div class="slide-header">
        <h1>Three Powerful Waves are Converging</h1>
        <p class="subtitle">Why Now?</p>
      </div>

      <div class="content-container">
        <!-- Left Half: Three Wave Cards -->
        <div class="left-rail">
          <WaveCell
            :wave-number="1"
            border-color="#10b981"
            :visible="showWave1"
            :max-scale="1.3"
            :min-scale="0.7"
          >
            <template #icon>🌱</template>
            <template #title>The Eco-Conscious Consumer</template>
            <template #metrics>
              <div class="stat">
                <div class="number">71%</div>
                <div class="label">
                  increase in searches for sustainable goods
                </div>
              </div>
              <div class="stat">
                <div class="number">2.7x</div>
                <div class="label">faster growth for sustainable products</div>
              </div>
            </template>
            The yard is the new frontier for personal climate action
          </WaveCell>

          <WaveCell
            :wave-number="2"
            border-color="#06b6d4"
            :visible="showWave2"
            :max-scale="1.3"
            :min-scale="0.7"
          >
            <template #icon>🦅</template>
            <template #title>The Native Plant Movement Matures</template>
            Organizations like <strong>Audubon and NWF</strong> are
            mainstreaming the movement
            <template #badges>
              <div class="pain-point">
                <span class="quote">"mired in complexity"</span>
                <span class="solution"
                  >They need a tool to simplify the process</span
                >
              </div>
            </template>
          </WaveCell>

          <WaveCell
            :wave-number="3"
            border-color="#fbbf24"
            :visible="showWave3"
            :max-scale="1.3"
            :min-scale="0.7"
          >
            <template #icon>🎨</template>
            <template #title>The Democratization of Design</template>
            <strong>Proven playbook:</strong> Platforms like Canva and Figma
            have built billion-dollar companies
            <template #badges>
              <div class="analogy">
                <div class="comparison">
                  <span class="company">Canva</span>
                  <span class="arrow">→</span>
                  <span class="domain">Graphic Design</span>
                </div>
                <div class="comparison">
                  <span class="company">Figma</span>
                  <span class="arrow">→</span>
                  <span class="domain">UI/UX Design</span>
                </div>
                <div class="comparison opportunity">
                  <span class="company">Project Flora</span>
                  <span class="arrow">→</span>
                  <span class="domain">Ecological Landscape Design</span>
                </div>
              </div>
            </template>
          </WaveCell>
        </div>

        <!-- Right Half: Convergence Visualization -->
        <div class="right-half">
          <ConvergenceVisualization :start-animation="startSpinning" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import WaveCell from "../components/WaveCell.vue";
import ConvergenceVisualization from "../components/ConvergenceVisualization2.vue";

const showWave1 = ref(false);
const showWave2 = ref(false);
const showWave3 = ref(false);
const showConvergence = ref(false);
const showLines = ref(false);
const startSpinning = ref(false);

// Embedded speaker notes for this slide
const speakerNotes = computed(
  () => `
**Framing:** "Why now? Because three powerful cultural and market waves are converging — and Flora sits right at their intersection."

**Wave 1 — Eco-Conscious Consumer:**
• 71% increase in searches for sustainable goods.
• Sustainable products are growing 2.7x faster than conventional.
• The yard is the new frontier for climate action.

**Wave 2 — Native Plant Movement:**
• Audubon and NWF are mainstreaming it.
• Movement is "mired in complexity."
• Users need a tool that simplifies ecological design.

**Wave 3 — Democratization of Design:**
• Canva → Graphic Design, Figma → UI/UX.
• Flora can play the same role for ecological landscape design.

**Punchline:** "These three forces create perfect timing. Flora is the convergence point."
`
);

// Make notes available to the global notes system
defineExpose({
  viewerNotes: speakerNotes,
});

onMounted(() => {
  setTimeout(() => {
    showWave1.value = true;
  }, 300);

  setTimeout(() => {
    showWave2.value = true;
  }, 600);

  setTimeout(() => {
    showWave3.value = true;
  }, 900);

  setTimeout(() => {
    showConvergence.value = true;
  }, 1200);

  setTimeout(() => {
    showLines.value = true;
  }, 1500);

  // Start the 3D spinning animation
  setTimeout(() => {
    startSpinning.value = true;
  }, 2000);
});
</script>

<style scoped>
/* The slide is the size container */
.slide-root {
  container-type: size;
  width: 100%;
  height: 100%;
}

.tipping-point-slide {
  background: linear-gradient(135deg, #0f4a3c 0%, #1e6b5a 100%);
  color: white;
  padding: clamp(8px, 2cqh, 24px) clamp(16px, 2cqw, 24px);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.slide-header {
  flex: 0 0 auto;
  text-align: center;
  margin-bottom: clamp(8px, 1.5cqh, 16px);
}

.slide-header h1 {
  font-size: clamp(20px, 4cqw, 38px);
  font-weight: bold;
  color: white;
  margin-bottom: clamp(4px, 0.5cqh, 8px);
}

.subtitle {
  font-family: "Lora", Georgia, "Times New Roman", serif;
  font-size: clamp(12px, 2cqw, 20px);
  color: #a0c4c7;
  font-style: italic;
  margin: 0;
  margin-bottom: clamp(8px, 1cqh, 16px);
}

.content-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(20px, 3cqw, 40px);
  flex: 1 1 auto;
  min-height: 0;
  overflow: hidden;
}

.left-rail {
  /* local to THIS slide/component only */
  display: grid;
  grid-auto-rows: minmax(0, 1fr); /* equal rows that can shrink */
  gap: clamp(8px, 1.5cqh, 16px);
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0; /* critical: allow children to shrink */
  padding-right: clamp(10px, 2cqw, 20px);
}

.right-half {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

/* Right half styling - just the container */

@media (max-width: 768px) {
  .waves-visualization {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .wave-stats {
    flex-direction: column;
    gap: 0.8rem;
  }
}
</style>
