<script setup>
import UiTypography from '../UiKit/UiTypography.vue';

const props = defineProps({
  bpm1: {
    type: Number,
    required: true
  },
  currentBPM2: {
    type: Number,
    required: true
  }
});
</script>

<template>
  <div class="tracks-info">
    <div class="track track-1">
      <UiTypography variant="h3">🎧 Трек 1 (Референс)</UiTypography>
      <div class="bpm-display">{{ bpm1 }} BPM</div>
      <div class="track-type">Квадратная волна</div>
    </div>
    
    <div class="track track-2">
      <UiTypography variant="h3">🎛️ Трек 2 (Управляемый)</UiTypography>
      <div class="bpm-display">{{ currentBPM2.toFixed(1) }} BPM</div>
      <div class="track-type">Пилообразная волна</div>
    </div>
  </div>
</template>

<style scoped>
.tracks-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.track {
  padding: 15px;
  background: var(--background);
  border-radius: 8px;
  text-align: center;
  border: 2px solid var(--border);
}

.bpm-display {
  font-size: 1.5em;
  font-weight: bold;
  color: var(--primary);
  margin: 10px 0;
}

.track-type {
  font-size: 0.9em;
  color: var(--text-secondary);
}

@media (max-width: 768px) {
  .tracks-info {
    grid-template-columns: 1fr;
    gap: 10px;
  }
}
</style>