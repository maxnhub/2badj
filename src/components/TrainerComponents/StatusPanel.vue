<script setup>
import UiTypography from '../UiKit/UiTypography.vue';

const props = defineProps({
  isSynced: {
    type: Boolean,
    required: true
  },
  syncAccuracy: {
    type: Number,
    required: true
  },
  formattedTime: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  bestScore: {
    type: Number,
    required: true
  }
});
</script>

<template>
  <div class="status-panel">
    <div class="sync-status" :class="{ synced: isSynced }">
      <div class="sync-indicator"></div>
      <UiTypography variant="body">
        {{ isSynced ? '✅ Идеальная синхронизация!' : '❌ Требуется корректировка' }}
      </UiTypography>
      <div class="accuracy">Точность: {{ syncAccuracy.toFixed(1) }}%</div>
    </div>

    <div class="stats">
      <div class="stat">
        <span>Время:</span>
        <strong>{{ formattedTime }}</strong>
      </div>
      <div class="stat">
        <span>Счет:</span>
        <strong>{{ score }}</strong>
      </div>
      <div class="stat">
        <span>Рекорд:</span>
        <strong>{{ bestScore }}</strong>
      </div>
    </div>
  </div>
</template>

<style scoped>
.status-panel {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
  margin: 25px 0;
}

.stats {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.stat {
  display: flex;
  justify-content: space-between;
  padding: 8px 12px;
  background: var(--background);
  border-radius: 6px;
}

.sync-status {
  padding: 15px;
  background: var(--background);
  border-radius: 8px;
  border: 2px solid var(--border);
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
}

.sync-indicator {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--primary);
}

.sync-status.synced {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

.accuracy {
  font-weight: bold;
  color: var(--primary);
}

@media (max-width: 768px) {
  .status-panel {
    grid-template-columns: 1fr;
  }
}
</style>