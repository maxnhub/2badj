<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue';
import UiButton from './UiKit/UiButton.vue';
import UiTypography from './UiKit/UiTypography.vue';
import PresetSelector from './TrainerComponents/PresetSelector.vue';
import Visualization from './TrainerComponents/Visualization.vue';
import TrackInfo from './TrainerComponents/TrackInfo.vue';
import StatusPanel from './TrainerComponents/StatusPanel.vue';
import ProgressSection from './TrainerComponents/ProgressSection.vue';
import PitchFader from './TrainerComponents/PitchFader.vue';

// Заглушка для analytics, чтобы избежать ошибки
window.analytics = window.analytics || { track: () => {}, identify: () => {} };

// Пресеты
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

// Состояние
const isPlaying = ref(false);
const selectedPreset = ref(0);
const bpm1 = ref(bpmPresets[0].bpm1);
const bpm2 = ref(bpmPresets[0].bpm2);
const pitchValue = ref(0);
const beatPhase = ref(0);
const beatNumber = ref(0);
const isSynced = ref(false);
const score = ref(0);
const bestScore = ref(0);
const timer = ref(null);
const trainingTime = ref(0);
const audioBuffers = ref({});
const isAudioLoaded = ref(false);
const isAudioPlaying = ref(false);

// Аудио контекст
let audioContext = null;
let sources = [];
let gains = [];
let timeInterval = null;
let audioBufferSources = [];

// Вычисляемые свойства
const currentBPM2 = computed(() => {
  return bpm2.value * (1 + pitchValue.value / 100);
});

const syncAccuracy = computed(() => {
  const diff = Math.abs(bpm1.value - currentBPM2.value);
  return Math.max(0, 100 - diff * 2);
});

const formattedTime = computed(() => {
  const minutes = Math.floor(trainingTime.value / 60);
  const seconds = trainingTime.value % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
});

// Загрузка аудио
const loadAudioBuffers = async () => {
  try {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    for (const preset of bpmPresets) {
      if (preset.audioUrl) {
        try {
          console.log(`Загрузка аудио для ${preset.name}: ${preset.audioUrl}`);
          const response = await fetch(preset.audioUrl, { mode: 'cors' });
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const arrayBuffer = await response.arrayBuffer();
          const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
          audioBuffers.value[preset.name] = audioBuffer;
          console.log(`Аудио для ${preset.name} успешно загружено`);
        } catch (error) {
          console.warn(`Не удалось загрузить аудио для ${preset.name}:`, error);
        }
      }
    }
    
    isAudioLoaded.value = Object.keys(audioBuffers.value).length > 0;
    console.log(`Аудио загружено: ${isAudioLoaded.value}`);
  } catch (error) {
    console.error('Ошибка загрузки аудио:', error);
    isAudioLoaded.value = false;
  }
};

// Остановка аудио
const stopAudioExample = () => {
  audioBufferSources.forEach(source => {
    if (source) {
      try {
        source.stop();
        console.log('Аудио остановлено');
      } catch (error) {
        console.warn('Ошибка при остановке аудио:', error);
      }
    }
  });
  audioBufferSources = [];
  isAudioPlaying.value = false;
};

// Воспроизведение аудио
const playAudioExample = async () => {
  if (!audioContext || !isAudioLoaded.value) {
    console.log('Аудио не загружено или AudioContext недоступен');
    return;
  }
  
  if (isAudioPlaying.value) {
    stopAudioExample();
    return;
  }
  
  const preset = bpmPresets[selectedPreset.value];
  const buffer = audioBuffers.value[preset.name];
  
  if (!buffer) {
    console.log('Аудио буфер не найден для:', preset.name);
    return;
  }
  
  try {
    stopAudioExample();
    
    if (audioContext.state === 'suspended') {
      console.log('Возобновление AudioContext');
      await audioContext.resume();
    }
    
    const source1 = audioContext.createBufferSource();
    source1.buffer = buffer;
    
    const gain1 = audioContext.createGain();
    gain1.gain.value = 0.5;
    
    source1.connect(gain1);
    gain1.connect(audioContext.destination);
    
    const source2 = audioContext.createBufferSource();
    source2.buffer = buffer;
    
    const gain2 = audioContext.createGain();
    gain2.gain.value = 0.5;
    
    const playbackRate = currentBPM2.value / preset.bpm1;
    source2.playbackRate.value = playbackRate;
    
    source2.connect(gain2);
    gain2.connect(audioContext.destination);
    
    const startTime = audioContext.currentTime + 0.1;
    source1.start(startTime);
    source2.start(startTime);
    
    audioBufferSources.push(source1, source2);
    isAudioPlaying.value = true;
    console.log(`Воспроизведение аудио для ${preset.name} начато`);
    
    setTimeout(() => {
      stopAudioExample();
    }, 30000);
    
    source1.onended = () => {
      isAudioPlaying.value = false;
      console.log('Аудио 1 завершено');
    };
    
    source2.onended = () => {
      isAudioPlaying.value = false;
      console.log('Аудио 2 завершено');
    };
    
  } catch (error) {
    console.error('Ошибка воспроизведения аудио:', error);
    isAudioPlaying.value = false;
  }
};

// Инициализация аудио
const initAudio = async () => {
  console.log('Инициализация аудио');
  await loadAudioBuffers();
  
  try {
    if (!audioContext) {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    for (let i = 0; i < 2; i++) {
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      
      oscillator.type = i === 0 ? 'square' : 'sawtooth';
      oscillator.frequency.value = 150 + i * 80;
      gain.gain.value = 0;
      
      oscillator.connect(gain);
      gain.connect(audioContext.destination);
      
      oscillator.start();
      sources.push(oscillator);
      gains.push(gain);
    }
    console.log('Аудио инициализировано успешно');
  } catch (error) {
    console.error('Ошибка инициализации аудио:', error);
  }
};

// Воспроизведение битов
const playBeat = (track, time) => {
  if (!gains[track]) return;
  
  const attack = track === 0 ? 0.02 : 0.01;
  const decay = track === 0 ? 0.1 : 0.08;
  
  gains[track].gain.cancelScheduledValues(time);
  gains[track].gain.setValueAtTime(0, time);
  gains[track].gain.linearRampToValueAtTime(0.4, time + attack);
  gains[track].gain.exponentialRampToValueAtTime(0.001, time + attack + decay);
};

// Смена пресета
const selectPreset = (index) => {
  if (isPlaying.value) {
    stopTraining();
  }
  
  selectedPreset.value = index;
  bpm1.value = bpmPresets[index].bpm1;
  bpm2.value = bpmPresets[index].bpm2;
  pitchValue.value = 0;
  
  beatPhase.value = 0;
  beatNumber.value = 0;
  isSynced.value = false;
  
  stopAudioExample();
};

// Случайный пресет
const randomPreset = () => {
  const randomIndex = Math.floor(Math.random() * bpmPresets.length);
  selectPreset(randomIndex);
};

// Основной цикл
const startTraining = () => {
  if (!audioContext) {
    console.log('AudioContext не инициализирован');
    return;
  }
  
  isPlaying.value = true;
  isSynced.value = false;
  trainingTime.value = 0;
  
  let startTime = audioContext.currentTime;
  let lastBeatTime1 = 0;
  let lastBeatTime2 = 0;
  
  timeInterval = setInterval(() => {
    if (isPlaying.value) {
      trainingTime.value++;
    }
  }, 1000);
  
  const updateBeats = () => {
    if (!isPlaying.value) return;
    
    const currentTime = audioContext.currentTime - startTime;
    
    const beatInterval1 = 60 / bpm1.value;
    if (currentTime - lastBeatTime1 >= beatInterval1) {
      lastBeatTime1 = currentTime;
      playBeat(0, audioContext.currentTime);
      beatNumber.value++;
    }
    
    const beatInterval2 = 60 / currentBPM2.value;
    if (currentTime - lastBeatTime2 >= beatInterval2) {
      lastBeatTime2 = currentTime;
      playBeat(1, audioContext.currentTime);
    }
    
    const phase = ((currentTime - lastBeatTime1) / beatInterval1) % 1;
    beatPhase.value = phase;
    
    if (syncAccuracy.value > 95) {
      if (!isSynced.value) {
        isSynced.value = true;
        score.value += 10;
      }
      if (isSynced.value && trainingTime.value % 5 === 0) {
        score.value += 2;
      }
    } else {
      isSynced.value = false;
    }
    
    if (score.value > bestScore.value) {
      bestScore.value = score.value;
    }
    
    timer.value = requestAnimationFrame(updateBeats);
  };
  
  updateBeats();
};

const stopTraining = () => {
  isPlaying.value = false;
  if (timer.value) {
    cancelAnimationFrame(timer.value);
    timer.value = null;
  }
  if (timeInterval) {
    clearInterval(timeInterval);
    timeInterval = null;
  }
  
  gains.forEach(gain => {
    if (gain) gain.gain.value = 0;
  });
  
  stopAudioExample();
};

const resetTraining = () => {
  stopTraining();
  pitchValue.value = 0;
  score.value = 0;
  beatNumber.value = 0;
  beatPhase.value = 0;
  trainingTime.value = 0;
};

// Сброс при смене пресета
watch(selectedPreset, () => {
  resetTraining();
});

onMounted(() => {
  initAudio();
});

onUnmounted(() => {
  stopTraining();
  if (audioContext) {
    audioContext.close();
  }
});
</script>

<template>
  <div class="beat-matching-trainer">
    <UiTypography variant="h2">Beat Matching Тренажер</UiTypography>
    
    <div class="trainer-container">
      <PresetSelector 
        :selectedPreset="selectedPreset"
        :isAudioLoaded="isAudioLoaded"
        :isAudioPlaying="isAudioPlaying"
        @selectPreset="selectPreset"
        @playAudioExample="playAudioExample"
        @randomPreset="randomPreset"
      />
      
      <Visualization 
        :beatNumber="beatNumber"
        :isPlaying="isPlaying"
        :beatPhase="beatPhase"
        :currentBPM2="currentBPM2"
        :bpm1="bpm1"
      />
      
      <TrackInfo 
        :bpm1="bpm1"
        :currentBPM2="currentBPM2"
      />
      
      <PitchFader 
        v-model="pitchValue"
        :disabled="!isPlaying"
        :bpm1="bpm1"
        :bpm2="bpm2"
        :key="selectedPreset"
      />
      
      <StatusPanel 
        :isSynced="isSynced"
        :syncAccuracy="syncAccuracy"
        :formattedTime="formattedTime"
        :score="score"
        :bestScore="bestScore"
      />
      
      <div class="controls">
        <UiButton 
          @click="isPlaying ? stopTraining() : startTraining()"
          :variant="isPlaying ? 'secondary' : 'primary'"
          size="large"
        >
          {{ isPlaying ? '⏸️ Пауза' : '▶️ Начать тренировку' }}
        </UiButton>
        
        <UiButton @click="resetTraining" variant="outline">
          🔄 Сбросить
        </UiButton>
      </div>
      
      <ProgressSection :syncAccuracy="syncAccuracy" />
    </div>
  </div>
</template>

<style scoped>
.beat-matching-trainer {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

.trainer-container {
  background: var(--background-light);
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 6px 20px var(--shadow);
}

.controls {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin: 20px 0;
}

@media (max-width: 768px) {
  .trainer-container {
    padding: 20px;
  }
}
</style>