<script setup>
import UiTypography from '../UiKit/UiTypography.vue';

const props = defineProps({
  syncAccuracy: {
    type: Number,
    required: true
  }
});
</script>

<template>
  <div class="progress-section">
    <UiTypography variant="h4">🎯 Цель: 95%+ точность</UiTypography>
    <div class="progress-bar">
      <div 
        class="progress-fill" 
        :style="{ width: Math.min(syncAccuracy, 100) + '%' }"
        :class="{ completed: syncAccuracy >= 95 }"
      ></div>
    </div>
    <div class="progress-text">
      {{ syncAccuracy >= 95 ? 'Отлично! Продолжайте в том же духе!' : 'Регулируйте pitch fader для достижения синхронизации' }}
    </div>
  </div>
</template>

<style scoped>
.progress-section {
  margin-top: 25px;
}

.progress-bar {
  width: 100%;
  height: 12px;
  background: var(--background);
  border-radius: 6px;
  overflow: hidden;
  margin: 15px 0;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #f44336, #FF9800, #4CAF50);
  transition: width 0.3s ease;
}

.progress-fill.completed {
  background: #4CAF50;
}

.progress-text {
  text-align: center;
  font-style: italic;
  color: var(--text-secondary);
}
</style>