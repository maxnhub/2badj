<script setup>
import { computed } from 'vue';

const props = defineProps({
  beatNumber: {
    type: Number,
    required: true
  },
  isPlaying: {
    type: Boolean,
    required: true
  },
  beatPhase: {
    type: Number,
    required: true
  },
  currentBPM2: {
    type: Number,
    required: true
  },
  bpm1: {
    type: Number,
    required: true
  }
});

const phaseColor = computed(() => {
  const hue = props.beatPhase * 120;
  return `hsl(${hue}, 70%, 50%)`;
});
</script>

<template>
  <div class="visualization">
    <div class="beat-grid-large">
      <div class="grid-header">
        <span>Трек 1 (Референс)</span>
        <span>Трек 2 (Управляемый)</span>
      </div>
      <div class="grid-container">
        <div class="track-grid track-1-grid">
          <div 
            v-for="n in 32" 
            :key="n" 
            class="beat-cell-large"
            :class="{ 
              active: beatNumber % 32 === n - 1,
              strong: n % 4 === 1,
              playing: beatNumber % 32 === n - 1 && isPlaying
            }"
          ></div>
        </div>
        <div class="track-grid track-2-grid">
          <div 
            v-for="n in 32" 
            :key="n" 
            class="beat-cell-large"
            :class="{ 
              active: Math.floor(beatNumber * (currentBPM2 / bpm1)) % 32 === n - 1,
              strong: n % 4 === 1,
              playing: Math.floor(beatNumber * (currentBPM2 / bpm1)) % 32 === n - 1 && isPlaying
            }"
          ></div>
        </div>
      </div>
    </div>
    
    <div class="phase-indicator">
      <div class="phase-labels">
        <span>0%</span>
        <span>Фаза: {{ (beatPhase * 100).toFixed(1) }}%</span>
        <span>100%</span>
      </div>
      <div 
        class="phase-bar" 
        :style="{ 
          width: (beatPhase * 100) + '%',
          backgroundColor: phaseColor
        }"
      ></div>
      <div class="phase-marker" :style="{ left: (beatPhase * 100) + '%' }"></div>
    </div>
  </div>
</template>

<style scoped>
.visualization {
  margin-bottom: 20px;
}

.beat-grid-large {
  background: var(--background);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  border: 2px solid var(--border);
}

.grid-header {
  display: grid;
  grid-template-columns: 1fr 1fr;
  text-align: center;
  margin-bottom: 15px;
  font-weight: bold;
  color: var(--text-secondary);
}

.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.track-grid {
  display: grid;
  grid-template-columns: repeat(16, 1fr);
  gap: 4px;
  height: 40px;
}

.beat-cell-large {
  background: var(--background-light);
  border-radius: 4px;
  transition: all 0.1s ease;
  border: 1px solid var(--border);
}

.beat-cell-large.strong {
  background: #7f8c8d;
}

.beat-cell-large.active {
  background: #e74c3c;
}

.beat-cell-large.playing {
  background: #2ecc71;
  transform: scale(1.1);
  box-shadow: 0 0 10px #2ecc71;
}

.track-1-grid .beat-cell-large.active {
  background: #e74c3c;
}

.track-2-grid .beat-cell-large.active {
  background: #3498db;
}

.track-1-grid .beat-cell-large.playing {
  background: #2ecc71;
  box-shadow: 0 0 10px #2ecc71;
}

.track-2-grid .beat-cell-large.playing {
  background: #9b59b6;
  box-shadow: 0 0 10px #9b59b6;
}

.phase-indicator {
  position: relative;
  width: 100%;
  height: 20px;
  background: var(--background);
  border-radius: 10px;
  overflow: hidden;
  margin-top: 10px;
  border: 2px solid var(--border);
}

.phase-labels {
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  font-size: 0.8em;
  color: var(--text-secondary);
  position: absolute;
  width: 100%;
  top: -20px;
}

.phase-bar {
  height: 100%;
  transition: width 0.1s ease;
}

.phase-marker {
  position: absolute;
  top: 0;
  width: 3px;
  height: 100%;
  background: white;
  transform: translateX(-50%);
  z-index: 2;
  box-shadow: 0 0 5px rgba(0,0,0,0.5);
}

@media (max-width: 768px) {
  .grid-container {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .track-grid {
    grid-template-columns: repeat(8, 1fr);
  }
}
</style>