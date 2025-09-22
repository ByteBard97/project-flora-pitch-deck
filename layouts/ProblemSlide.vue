<template>
  <div class="slidev-layout problem-slide">
    <h1>The Landscape Software Ecosystem is Broken</h1>
    <p class="subtitle">A Tale of Two Frustrations</p>

    <div class="split-layout">
      <div class="frustration-column">
        <h3>👩‍💼 For Annie (The Professional)</h3>
        <div class="panel">
          <h4>Professional tools are powerful, but...</h4>
          <ul>
            <li><strong>Clunky & Archaic:</strong> "archaic" interfaces (DynaSCAPE)</li>
            <li><strong>Expensive:</strong> The "plugin tax" (Land F/X + AutoCAD)</li>
            <li><strong>Ecologically Blind:</strong> Plants are just generic objects</li>
            <li><strong>Disconnected Workflow:</strong> Juggling AutoCAD, Adobe, spreadsheets, and external native plant websites</li>
          </ul>
        </div>
      </div>

      <div class="frustration-column">
        <h3>🏠 For Jake (The Prosumer)</h3>
        <div class="panel">
          <h4>Consumer apps are easy, but...</h4>
          <ul>
            <li><strong>Simplistic:</strong> Hit an "aesthetic ceiling" quickly</li>
            <li><strong>Aesthetically Driven:</strong> Form over function</li>
            <li><strong>Ecologically Ignorant:</strong> Non-regional plant libraries</li>
            <li><strong>Hack Together Solutions:</strong> PowerPoint or even <em>The Sims</em></li>
          </ul>
        </div>
      </div>
    </div>

    <div class="visual-metaphor">
      <div class="spectrum-title">
        <h3>THE SOFTWARE COMPLEXITY SPECTRUM</h3>
      </div>

      <div class="spectrum-container">
        <div class="spectrum-line-wrapper">
          <div class="spectrum-arrow-line"></div>
        </div>

        <div class="spectrum-markers">
          <div class="marker">
            <div class="marker-box">
              <img src="/complexity-signifier.png" alt="Complex Math" class="spectrum-image">
            </div>
            <span class="marker-label">Overly Complex</span>
          </div>

          <div class="marker">
            <div class="question-mark">?</div>
            <span class="marker-label">You Are Here</span>
          </div>

          <div class="marker">
            <div class="marker-box">
              <img src="/overly-simple.png" alt="Simple Math" class="spectrum-image">
            </div>
            <span class="marker-label">Overly Simple</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.problem-slide {
  padding: 1rem 1.5rem;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: #002a29; /* Flora brand deep background */
  background-image:
    radial-gradient(600px 400px at 10% 5%, rgba(103, 196, 113, 0.06), transparent 50%),
    radial-gradient(700px 500px at 90% 0%, rgba(0, 153, 126, 0.05), transparent 60%);
}

h1 {
  font-size: 2.1rem;
  margin-bottom: 0.3rem;
  color: #eef6f3;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  letter-spacing: -0.025em;
  line-height: 1.1;
}

.subtitle {
  font-size: 1.1rem;
  color: #97b2a8;
  margin-bottom: 1.2rem;
  font-style: italic;
  font-family: 'Lora', serif;
  font-weight: 400;
}

.split-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1rem;
  flex-shrink: 0;
  align-items: start;
}

.frustration-column {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.frustration-column h3 {
  font-size: 1.1rem;
  margin-bottom: 0.75rem;
  color: #50d0b0;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  letter-spacing: -0.01em;
}

.panel {
  background: rgba(26, 61, 58, 0.6);
  border: 1px solid rgba(80, 208, 176, 0.2);
  border-radius: 12px;
  padding: 1.25rem;
  height: 200px;
  display: flex;
  flex-direction: column;
}

.panel h4 {
  font-size: 1rem;
  margin-bottom: 0.75rem;
  color: #eef6f3;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  letter-spacing: -0.01em;
}

.panel ul {
  list-style: none;
  padding: 0;
  margin: 0;
  flex-grow: 1;
}

.panel li {
  margin-bottom: 0.7rem;
  color: #d8e7e1;
  line-height: 1.4;
  font-size: 0.9rem;
  font-family: 'Lora', serif;
  font-weight: 400;
}

.panel li strong {
  color: #eef6f3;
  font-weight: 600;
}

.visual-metaphor {
  margin-top: 1rem;
  flex-shrink: 0;
  width: 100%;
}

.spectrum-title {
  text-align: center;
  margin-bottom: 0.75rem;
}

.spectrum-title h3 {
  font-size: 0.95rem;
  color: #e2e8f0;
  margin: 0;
  letter-spacing: 0.1em;
}

.spectrum-container {
  background: rgba(15, 35, 33, 0.4);
  border: 1px solid rgba(80, 208, 176, 0.2);
  border-radius: 10px;
  padding: 1rem 0.75rem;
  position: relative;
  min-height: 80px;
}

.spectrum-line-wrapper {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 4px;
  transform: translateY(-50%);
}

.spectrum-arrow-line {
  position: absolute;
  top: 0;
  left: 60px;
  right: 60px;
  height: 4px;
  background: linear-gradient(90deg,
    #2d7a6f 0%,
    #50d0b0 50%,
    #2d7a6f 100%);
  border-radius: 2px;
}

.spectrum-arrow-line::before {
  content: '';
  position: absolute;
  left: -12px;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
  border-right: 12px solid #2d7a6f;
}

.spectrum-arrow-line::after {
  content: '';
  position: absolute;
  right: -12px;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
  border-left: 12px solid #2d7a6f;
}

.spectrum-markers {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 0 60px;
  z-index: 10;
}

.marker {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.marker-box {
  width: 70px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(26, 61, 58, 0.8);
  border: 2px solid #50d0b0;
  border-radius: 8px;
}

.complexity-symbols {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 2px;
  width: 50px;
  height: 35px;
  place-items: center;
}

.math-symbol, .integral {
  color: #50d0b0;
  font-weight: bold;
  font-size: 0.85rem;
  line-height: 1;
}

.integral {
  font-size: 1rem;
}

.spectrum-image {
  width: 50px;
  height: 40px;
  object-fit: contain;
}

.question-mark {
  width: 50px;
  height: 50px;
  background: #2d7a6f;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: #e2e8f0;
}

.question-mark::after {
  content: '?';
}

.marker-label {
  font-size: 0.75rem;
  color: #94a3b8;
  font-weight: 600;
  text-align: center;
  margin-top: 0.5rem;
  white-space: nowrap;
}
</style>