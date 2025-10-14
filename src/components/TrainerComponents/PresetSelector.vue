<script setup>
import { ref, computed } from 'vue';
import UiButton from '../UiKit/UiButton.vue';
import UiTypography from '../UiKit/UiTypography.vue';

const props = defineProps({
  selectedPreset: {
    type: Number,
    required: true,
    default: 0
  },
  isAudioLoaded: {
    type: Boolean,
    required: true,
    default: false
  },
  isAudioPlaying: {
    type: Boolean,
    required: true,
    default: false
  }
});

const emit = defineEmits(['selectPreset', 'playAudioExample', 'randomPreset']);

const showPresetSelector = ref(false);

const bpmPresets = [
  { name: 'Deep House', bpm1: 120, bpm2: 118, difficulty: 'легкий', audioUrl: 'https://assets.mixkit.co/music/preview/mixkit-deep-urban-623.mp3' },
  { name: 'Techno', bpm1: 130, bpm2: 128, difficulty: 'средний', audioUrl: 'https://assets.mixkit.co/music/preview/mixkit-tech-trance-535.mp3' },
  { name: 'Drum & Bass', bpm1: 174, bpm2: 172, difficulty: 'сложный', audioUrl: 'https://assets.mixkit.co/music/preview/mixkit-drum-and-bass-01-739.mp3' },
  { name: 'Hip-Hop', bpm1: 95, bpm2: 92, difficulty: 'легкий', audioUrl: 'https://assets.mixkit.co/music/preview/mixkit-hip-hop-02-80.mp3' },
  { name: 'Trance', bpm1: 138, bpm2: 140, difficulty: 'средний', audioUrl: 'https://assets.mixkit.co/music/preview/mixkit-trance-001-235.mp3' },
  { name: 'Dubstep', bpm1: 140, bpm2: 142, difficulty: 'сложный', audioUrl: 'https://assets.mixkit.co/music/preview/mixkit-dubstep-01-739.mp3' },
  { name: 'Disco', bpm1: 115, bpm2: 117, difficulty: 'легкий', audioUrl: 'https://assets.mixkit.co/music/preview/mixkit-disco-01-739.mp3' },
  { name: 'Hardstyle', bpm1: 150, bpm2: 148, difficulty: 'сложный', audioUrl: 'https://assets.mixkit.co/music/preview/mixkit-hard-style-01-739.mp3' }
];

const currentPreset = computed(() => bpmPresets[props.selectedPreset] || bpmPresets[0]);

const toggleSelector = () => {
  showPresetSelector.value = !showPresetSelector.value;
};

const selectPresetLocal = (index) => {
  emit('selectPreset', index);
  showPresetSelector.value = false;
};

const randomPresetLocal = () => {
  emit('randomPreset');
  showPresetSelector.value = false;
};
</script>

<template>
  <div class="preset-selector">
    <div class="preset-header">
      <UiTypography variant="h3">Выбор жанра и BPM</UiTypography>
      <div class="preset-actions">
        <UiButton 
          @click="toggleSelector"
          variant="outline"
          size="small"
        >
          {{ showPresetSelector ? 'Скрыть' : 'Сменить' }}
        </UiButton>
        <UiButton 
          @click="emit('playAudioExample')" 
          :disabled="!isAudioLoaded"
          variant="secondary"
          size="small"
        >
          {{ isAudioPlaying ? '⏹️ Стоп' : '🎵 Пример жанра' }}
        </UiButton>
      </div>
    </div>
    
    <div class="current-preset" v-if="!showPresetSelector">
      <div class="preset-info">
        <span class="preset-name">{{ currentPreset.name }}</span>
        <span class="preset-difficulty" :class="currentPreset.difficulty">
          {{ currentPreset.difficulty }}
        </span>
      </div>
      <div class="preset-bpm">
        {{ currentPreset.bpm1 }} BPM → {{ currentPreset.bpm2 }} BPM
      </div>
    </div>
    
    <div v-if="showPresetSelector" class="preset-grid">
      <div
        v-for="(preset, index) in bpmPresets"
        :key="index"
        class="preset-card"
        :class="{ 
          active: props.selectedPreset === index,
          [preset.difficulty]: true 
        }"
        @click="selectPresetLocal(index)"
      >
        <div class="preset-title">{{ preset.name }}</div>
        <div class="preset-bpm-display">
          {{ preset.bpm1 }} → {{ preset.bpm2 }} BPM
        </div>
        <div class="preset-diff">{{ preset.difficulty }}</div>
        <div class="audio-preview" @click.stop="selectPresetLocal(index); emit('playAudioExample')">
          🎵 Послушать
        </div>
      </div>
      
      <div class="preset-card random" @click="randomPresetLocal">
        <div class="preset-title">🎲 Случайный</div>
        <div class="preset-desc">Неожиданный вызов!</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.preset-selector {
  margin-bottom: 30px;
}

.preset-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.preset-actions {
  display: flex;
  gap: 10px;
}

.current-preset {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background: var(--background);
  border-radius: 8px;
  border-left: 4px solid var(--primary);
}

.preset-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.preset-name {
  font-size: 1.2em;
  font-weight: bold;
}

.preset-difficulty {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.8em;
  font-weight: bold;
  text-transform: uppercase;
}

.preset-difficulty.легкий {
  background: #4CAF50;
  color: white;
}

.preset-difficulty.средний {
  background: #FF9800;
  color: white;
}

.preset-difficulty.сложный {
  background: #F44336;
  color: white;
}

.preset-bpm {
  font-size: 1.1em;
  font-weight: bold;
  color: var(--primary);
}

.preset-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-top: 15px;
}

.preset-card {
  padding: 15px;
  background: var(--background);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  text-align: center;
  position: relative;
}

.preset-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px var(--shadow);
}

.preset-card.active {
  border-color: var(--primary);
  background: rgba(var(--primary-rgb), 0.1);
}

.preset-card.легкий { border-left: 4px solid #4CAF50; }
.preset-card.средний { border-left: 4px solid #FF9800; }
.preset-card.сложный { border-left: 4px solid #F44336; }

.preset-card.random {
  border-left: 4px solid #9C27B0;
  background: linear-gradient(135deg, #f3e5f5, #e1bee7);
}

.preset-title {
  font-weight: bold;
  margin-bottom: 5px;
}

.preset-bpm-display {
  font-size: 0.9em;
  color: var(--primary);
  font-weight: bold;
}

.preset-diff {
  font-size: 0.8em;
  opacity: 0.8;
  margin-bottom: 8px;
}

.audio-preview {
  font-size: 0.8em;
  color: #3498db;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  background: rgba(52, 152, 219, 0.1);
  transition: all 0.2s ease;
}

.audio-preview:hover {
  background: #3498db;
  color: white;
}

@media (max-width: 768px) {
  .preset-grid {
    grid-template-columns: 1fr;
  }

  .preset-header {
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
  }

  .preset-actions {
    width: 100%;
    justify-content: flex-end;
  }

  .current-preset {
    flex-direction: column;
    gap: 10px;
    text-align: center;
  }
}
</style>