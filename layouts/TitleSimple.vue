<template>
  <div class="slidev-layout flora-title">
    <!-- Direct positioning with percentages -->
    <img src="/flora-tree.webp" alt="Flora Logo" class="flora-logo" />
    <h1 class="flora-title-text">Flora.ai</h1>
    <p class="flora-subtitle">Landscape design software • tech + nature</p>
    <div class="flora-separator"></div>
    <h2 class="flora-tagline">Seeding the Future of Landscape Design</h2>
    <div class="flora-card">
      <div class="card-project">Project Flora</div>
      <div class="card-line">Pitch Presentation</div>
      <div class="card-line">2025</div>
      <div class="card-tagline">Intelligent design for a living world</div>
    </div>
  </div>
</template>

<style scoped>
/* DIRECT PERCENTAGE APPROACH - No grid indirection */

.flora-title {
  background:
    radial-gradient(1200px 600px at 50% -10%, rgba(255,255,255,0.03), transparent 60%),
    radial-gradient(800px 400px at 20% 120%, rgba(0,0,0,0.2), transparent 60%),
    #002a29;
  width: 980px;
  height: 551px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  box-sizing: border-box;
  position: relative;
}

/* Each element sized as direct % of container (551px) */
.flora-logo {
  height: 25%;  /* ~138px of 551px */
  width: auto;
  filter: drop-shadow(0 8px 24px rgba(0, 0, 0, 0.3));
  margin-bottom: 2%;
}

.flora-title-text {
  background: linear-gradient(135deg, #67c471, #00997e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-family: system-ui, -apple-system, sans-serif;
  font-weight: 800;
  font-size: 13%;  /* 13% of 551px = ~72px */
  margin: 0 0 1% 0;
  line-height: 1;
  letter-spacing: -0.02em;
  filter: drop-shadow(0 2px 8px rgba(0, 153, 126, 0.25));
}

.flora-subtitle {
  color: #97b2a8;
  font-family: system-ui, sans-serif;
  font-style: italic;
  font-size: 3.5%;  /* ~19px */
  margin: 0 0 2% 0;
  text-align: center;
}

.flora-separator {
  width: 60px;
  height: 1px;
  background: #1e4e49;
  margin: 0 0 2% 0;
}

.flora-tagline {
  color: #eef6f3;
  font-family: system-ui, sans-serif;
  font-weight: 600;
  font-size: 5%;  /* ~28px */
  margin: 0 0 3% 0;
  text-align: center;
}

.flora-card {
  background: #004440;
  border: 1px solid #20342d;
  border-radius: 12px;
  padding: 2% 3%;
  text-align: center;
  width: 70%;
  max-width: 400px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(8px);
}

.card-project {
  color: #67c471;
  font-weight: 650;
  font-size: 3.5%;  /* ~19px */
  margin-bottom: 1%;
  font-family: system-ui, -apple-system, sans-serif;
  letter-spacing: 0.02em;
}

.card-line {
  color: #d8e7e1;
  margin: 0.5% 0;
  font-size: 3.2%;  /* ~18px */
  font-family: system-ui, -apple-system, sans-serif;
  opacity: 0.95;
}

.card-tagline {
  color: #97b2a8;
  font-style: italic;
  margin-top: 1.5%;
  font-size: 2.9%;  /* ~16px */
  font-family: system-ui, -apple-system, sans-serif;
  opacity: 0.9;
}
</style>