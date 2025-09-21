<script setup lang="ts">
const props = defineProps<{ value: number }>(); // 0..100 left→right
</script>

<template>
  <div class="card">
    <div
      style="
        display: flex;
        justify-content: space-between;
        margin-bottom: 8px;
        color: var(--muted);
      "
    >
      <span>Overly Complex</span><span>Overly Simple</span>
    </div>
    <div
      style="
        height: 10px;
        border-radius: 999px;
        position: relative;
        background: linear-gradient(
          90deg,
          var(--flora-leaf),
          var(--flora-tree)
        );
      "
    >
      <i
        :style="{
          position: 'absolute',
          left: props.value + '%',
          top: '50%',
          transform: 'translate(-50%,-50%)',
          width: '22px',
          height: '22px',
          borderRadius: '50%',
          background: '#fff',
          boxShadow: '0 8px 16px rgba(0,0,0,.35)',
        }"
      />
    </div>
  </div>
</template>
