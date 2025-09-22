<template>
  <div class="signals-section">
    <h3>MARKET READINESS SIGNALS</h3>
    <div class="signals">
      <div class="ready">✅ Market is mature and ready</div>
      <div class="ready">✅ Users already paying for software</div>
      <div class="ready">✅ Pain points are well-documented</div>
      <div class="hot">🔥 No integrated solution exists</div>
    </div>
  </div>
</template>

<style scoped>
.signals-section h3 {
  font-size: 1rem;
  margin-bottom: 0.8rem;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.signals {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.8rem;
}

.ready, .hot {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 0.8rem;
  font-size: 0.85rem;
  color: #a0c4c7;
  backdrop-filter: blur(5px);
}

.hot {
  color: #fbbf24;
  border-color: rgba(251, 191, 36, 0.3);
  background: rgba(251, 191, 36, 0.1);
}
</style>