<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import UiButton from './UiKit/UiButton.vue';
import UiTypography from './UiKit/UiTypography.vue';

// Состояние тренажера
const isPlaying = ref(false);
const audioContext = ref(null);
const audioSource = ref(null);
const analyser = ref(null);
const animationFrame = ref(null);

// Эффекты
const effects = ref({
  filter: {
    enabled: false,
    type: 'lowpass',
    frequency: 1000,
    resonance: 1,
    node: null
  },
  delay: {
    enabled: false,
    time: 0.3,
    feedback: 0.5,
    mix: 0.3,
    node: null
  },
  reverb: {
    enabled: false,
    time: 2,
    decay: 2,
    mix: 0.3,
    node: null
  }
});

// Визуализация
const waveformData = ref(new Uint8Array(128));
const canvas = ref(null);

// Загрузка аудио
const loadAudio = async () => {
  try {
    audioContext.value = new (window.AudioContext || window.webkitAudioContext)();
    
    // Создаем анализатор для визуализации
    analyser.value = audioContext.value.createAnalyser();
    analyser.value.fftSize = 256;
    
    // Создаем эффекты
    createEffects();
    
    // Генерируем тестовый сигнал
    audioSource.value = generateTestSignal();
    
    // Подключаем цепочку
    connectAudioChain();
    
  } catch (error) {
    console.error('Ошибка загрузки аудио:', error);
  }
};

// Создание эффектов
const createEffects = () => {
  // Фильтр
  effects.value.filter.node = audioContext.value.createBiquadFilter();
  effects.value.filter.node.type = effects.value.filter.type;
  effects.value.filter.node.frequency.value = effects.value.filter.frequency;
  effects.value.filter.node.Q.value = effects.value.filter.resonance;
  
  // Дилей (эхо)
  effects.value.delay.node = audioContext.value.createDelay(5.0);
  effects.value.delay.node.delayTime.value = effects.value.delay.time;
  
  const delayFeedback = audioContext.value.createGain();
  delayFeedback.gain.value = effects.value.delay.feedback;
  
  const delayMix = audioContext.value.createGain();
  delayMix.gain.value = effects.value.delay.mix;
  
  effects.value.delay.feedbackNode = delayFeedback;
  effects.value.delay.mixNode = delayMix;
  
  // Реверб (упрощенный)
  effects.value.reverb.node = audioContext.value.createConvolver();
  effects.value.reverb.node.buffer = createReverbBuffer(effects.value.reverb.time, effects.value.reverb.decay);
  
  const reverbMix = audioContext.value.createGain();
  reverbMix.gain.value = effects.value.reverb.mix;
  effects.value.reverb.mixNode = reverbMix;
};

// Создание импульса для реверберации
const createReverbBuffer = (duration, decay) => {
  const sampleRate = audioContext.value.sampleRate;
  const length = sampleRate * duration;
  const buffer = audioContext.value.createBuffer(2, length, sampleRate);
  
  for (let channel = 0; channel < 2; channel++) {
    const data = buffer.getChannelData(channel);
    
    for (let i = 0; i < length; i++) {
      // Импульс с экспоненциальным затуханием
      const t = i / sampleRate;
      data[i] = (Math.random() * 2 - 1) * Math.exp(-t / decay);
    }
  }
  
  return buffer;
};

// Подключение аудио цепочки
const connectAudioChain = () => {
  let lastNode = audioSource.value;
  
  // Применяем эффекты в порядке: фильтр -> дилей -> реверб
  if (effects.value.filter.enabled && effects.value.filter.node) {
    lastNode.connect(effects.value.filter.node);
    lastNode = effects.value.filter.node;
  }
  
  if (effects.value.delay.enabled && effects.value.delay.node) {
    // Подключаем дилей с обратной связью
    lastNode.connect(effects.value.delay.node);
    effects.value.delay.node.connect(effects.value.delay.mixNode);
    effects.value.delay.mixNode.connect(analyser.value);
    
    // Обратная связь
    effects.value.delay.node.connect(effects.value.delay.feedbackNode);
    effects.value.delay.feedbackNode.connect(effects.value.delay.node);
  } else {
    lastNode.connect(analyser.value);
  }
  
  if (effects.value.reverb.enabled && effects.value.reverb.node) {
    lastNode.connect(effects.value.reverb.node);
    effects.value.reverb.node.connect(effects.value.reverb.mixNode);
    effects.value.reverb.mixNode.connect(analyser.value);
  }
  
  analyser.value.connect(audioContext.value.destination);
};

// Генерация тестового сигнала
const generateTestSignal = () => {
  const bufferSize = audioContext.value.sampleRate * 2;
  const buffer = audioContext.value.createBuffer(2, bufferSize, audioContext.value.sampleRate);
  
  for (let channel = 0; channel < 2; channel++) {
    const data = buffer.getChannelData(channel);
    
    for (let i = 0; i < bufferSize; i++) {
      const time = i / audioContext.value.sampleRate;
      
      // Более музыкальный тестовый сигнал
      const kick = Math.sin(2 * Math.PI * 50 * time) * Math.exp(-time * 10);
      const snare = Math.random() * Math.exp(-time * 30);
      const hihat = Math.random() * 0.3;
      const bass = Math.sin(2 * Math.PI * 110 * time) * 0.2;
      const melody = Math.sin(2 * Math.PI * 440 * time) * 0.1;
      
      data[i] = (kick + snare + hihat + bass + melody) * 0.5;
    }
  }
  
  const source = audioContext.value.createBufferSource();
  source.buffer = buffer;
  source.loop = true;
  return source;
};

// Визуализация формы волны
const drawWaveform = () => {
  if (!analyser.value || !canvas.value) return;
  
  const ctx = canvas.value.getContext('2d');
  const width = canvas.value.width;
  const height = canvas.value.height;
  
  analyser.value.getByteTimeDomainData(waveformData.value);
  
  ctx.fillStyle = 'rgb(20, 20, 30)';
  ctx.fillRect(0, 0, width, height);
  
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#3498db';
  ctx.beginPath();
  
  const sliceWidth = width / waveformData.value.length;
  let x = 0;
  
  for (let i = 0; i < waveformData.value.length; i++) {
    const v = waveformData.value[i] / 128.0;
    const y = v * height;
    
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
    
    x += sliceWidth;
  }
  
  ctx.lineTo(width, height / 2);
  ctx.stroke();
  
  animationFrame.value = requestAnimationFrame(drawWaveform);
};

// Управление эффектами
const toggleEffect = (effectName) => {
  effects.value[effectName].enabled = !effects.value[effectName].enabled;
  reconnectAudioChain();
};

const updateEffectParam = (effectName, param, value) => {
  effects.value[effectName][param] = value;
  
  if (effectName === 'filter') {
    if (param === 'type') {
      effects.value.filter.node.type = value;
    } else if (param === 'frequency') {
      effects.value.filter.node.frequency.value = value;
    } else if (param === 'resonance') {
      effects.value.filter.node.Q.value = value;
    }
  } else if (effectName === 'delay') {
    if (param === 'time') {
      effects.value.delay.node.delayTime.value = value;
    } else if (param === 'feedback') {
      effects.value.delay.feedbackNode.gain.value = value;
    } else if (param === 'mix') {
      effects.value.delay.mixNode.gain.value = value;
    }
  } else if (effectName === 'reverb') {
    if (param === 'time' || param === 'decay') {
      effects.value.reverb.node.buffer = createReverbBuffer(
        effects.value.reverb.time,
        effects.value.reverb.decay
      );
    } else if (param === 'mix') {
      effects.value.reverb.mixNode.gain.value = value;
    }
  }
};

// Переподключение аудио цепочки
const reconnectAudioChain = () => {
  if (audioSource.value) {
    audioSource.value.disconnect();
    analyser.value.disconnect();
  }
  connectAudioChain();
};

// Управление воспроизведением
const togglePlayback = async () => {
  if (!audioContext.value) {
    await loadAudio();
  }
  
  if (isPlaying.value) {
    audioSource.value.stop();
    cancelAnimationFrame(animationFrame.value);
  } else {
    if (audioContext.value.state === 'suspended') {
      await audioContext.value.resume();
    }
    audioSource.value.start();
    drawWaveform();
  }
  
  isPlaying.value = !isPlaying.value;
};

// Предустановки эффектов
const effectPresets = {
  dubDelay: {
    filter: { enabled: true, type: 'lowpass', frequency: 800, resonance: 5 },
    delay: { enabled: true, time: 0.4, feedback: 0.6, mix: 0.4 },
    reverb: { enabled: false }
  },
  spaceReverb: {
    filter: { enabled: false },
    delay: { enabled: false },
    reverb: { enabled: true, time: 3, decay: 4, mix: 0.6 }
  },
  filteredEcho: {
    filter: { enabled: true, type: 'bandpass', frequency: 1000, resonance: 10 },
    delay: { enabled: true, time: 0.2, feedback: 0.7, mix: 0.5 },
    reverb: { enabled: false }
  }
};

const applyPreset = (presetName) => {
  const preset = effectPresets[presetName];
  
  Object.keys(preset).forEach(effectName => {
    Object.keys(preset[effectName]).forEach(param => {
      if (param !== 'enabled') {
        updateEffectParam(effectName, param, preset[effectName][param]);
      }
    });
    effects.value[effectName].enabled = preset[effectName].enabled;
  });
  
  reconnectAudioChain();
};

onMounted(() => {
  loadAudio();
});

onUnmounted(() => {
  if (audioSource.value) {
    audioSource.value.stop();
  }
  if (animationFrame.value) {
    cancelAnimationFrame(animationFrame.value);
  }
});
</script>

<template>
  <div class="effects-trainer">
    <UiTypography variant="h2">🎛️ Тренажер Эффектов</UiTypography>
    
    <div class="trainer-container">
      <!-- Визуализация формы волны -->
      <div class="waveform-section">
        <UiTypography variant="h3">Форма волны</UiTypography>
        <canvas ref="canvas" width="800" height="200" class="waveform-canvas"></canvas>
      </div>
      
      <!-- Управление эффектами -->
      <div class="effects-controls">
        <!-- Фильтр -->
        <div class="effect-panel" :class="{ active: effects.filter.enabled }">
          <div class="effect-header">
            <UiTypography variant="h4">🔧 Фильтр</UiTypography>
            <UiButton 
              @click="toggleEffect('filter')"
              :variant="effects.filter.enabled ? 'primary' : 'secondary'"
              size="small"
            >
              {{ effects.filter.enabled ? 'ВКЛ' : 'ВЫКЛ' }}
            </UiButton>
          </div>
          
          <div v-if="effects.filter.enabled" class="effect-params">
            <div class="param-group">
              <label>Тип:</label>
              <select 
                :value="effects.filter.type"
                @change="updateEffectParam('filter', 'type', $event.target.value)"
              >
                <option value="lowpass">Low Pass</option>
                <option value="highpass">High Pass</option>
                <option value="bandpass">Band Pass</option>
                <option value="lowshelf">Low Shelf</option>
                <option value="highshelf">High Shelf</option>
              </select>
            </div>
            
            <div class="param-group">
              <label>Частота: {{ effects.filter.frequency }}Hz</label>
              <input 
                type="range" 
                :value="effects.filter.frequency"
                @input="updateEffectParam('filter', 'frequency', parseFloat($event.target.value))"
                min="20"
                max="20000"
                step="1"
                class="param-slider"
              >
            </div>
            
            <div class="param-group">
              <label>Резонанс: {{ effects.filter.resonance }}</label>
              <input 
                type="range" 
                :value="effects.filter.resonance"
                @input="updateEffectParam('filter', 'resonance', parseFloat($event.target.value))"
                min="0.1"
                max="20"
                step="0.1"
                class="param-slider"
              >
            </div>
          </div>
        </div>
        
        <!-- Дилей -->
        <div class="effect-panel" :class="{ active: effects.delay.enabled }">
          <div class="effect-header">
            <UiTypography variant="h4">🔁 Эхо/Дилей</UiTypography>
            <UiButton 
              @click="toggleEffect('delay')"
              :variant="effects.delay.enabled ? 'primary' : 'secondary'"
              size="small"
            >
              {{ effects.delay.enabled ? 'ВКЛ' : 'ВЫКЛ' }}
            </UiButton>
          </div>
          
          <div v-if="effects.delay.enabled" class="effect-params">
            <div class="param-group">
              <label>Время: {{ effects.delay.time }}s</label>
              <input 
                type="range" 
                :value="effects.delay.time"
                @input="updateEffectParam('delay', 'time', parseFloat($event.target.value))"
                min="0.1"
                max="2"
                step="0.05"
                class="param-slider"
              >
            </div>
            
            <div class="param-group">
              <label>Обратная связь: {{ Math.round(effects.delay.feedback * 100) }}%</label>
              <input 
                type="range" 
                :value="effects.delay.feedback"
                @input="updateEffectParam('delay', 'feedback', parseFloat($event.target.value))"
                min="0"
                max="0.9"
                step="0.05"
                class="param-slider"
              >
            </div>
            
            <div class="param-group">
              <label>Уровень: {{ Math.round(effects.delay.mix * 100) }}%</label>
              <input 
                type="range" 
                :value="effects.delay.mix"
                @input="updateEffectParam('delay', 'mix', parseFloat($event.target.value))"
                min="0"
                max="1"
                step="0.05"
                class="param-slider"
              >
            </div>
          </div>
        </div>
        
        <!-- Реверб -->
        <div class="effect-panel" :class="{ active: effects.reverb.enabled }">
          <div class="effect-header">
            <UiTypography variant="h4">🏛️ Реверберация</UiTypography>
            <UiButton 
              @click="toggleEffect('reverb')"
              :variant="effects.reverb.enabled ? 'primary' : 'secondary'"
              size="small"
            >
              {{ effects.reverb.enabled ? 'ВКЛ' : 'ВЫКЛ' }}
            </UiButton>
          </div>
          
          <div v-if="effects.reverb.enabled" class="effect-params">
            <div class="param-group">
              <label>Время: {{ effects.reverb.time }}s</label>
              <input 
                type="range" 
                :value="effects.reverb.time"
                @input="updateEffectParam('reverb', 'time', parseFloat($event.target.value))"
                min="0.5"
                max="5"
                step="0.1"
                class="param-slider"
              >
            </div>
            
            <div class="param-group">
              <label>Затухание: {{ effects.reverb.decay }}</label>
              <input 
                type="range" 
                :value="effects.reverb.decay"
                @input="updateEffectParam('reverb', 'decay', parseFloat($event.target.value))"
                min="0.5"
                max="5"
                step="0.1"
                class="param-slider"
              >
            </div>
            
            <div class="param-group">
              <label>Уровень: {{ Math.round(effects.reverb.mix * 100) }}%</label>
              <input 
                type="range" 
                :value="effects.reverb.mix"
                @input="updateEffectParam('reverb', 'mix', parseFloat($event.target.value))"
                min="0"
                max="1"
                step="0.05"
                class="param-slider"
              >
            </div>
          </div>
        </div>
      </div>
      
      <!-- Управление -->
      <div class="controls-section">
        <div class="playback-controls">
          <UiButton 
            @click="togglePlayback"
            :variant="isPlaying ? 'secondary' : 'primary'"
          >
            {{ isPlaying ? '⏸️ Стоп' : '▶️ Воспроизвести' }}
          </UiButton>
        </div>
        
        <div class="presets-section">
          <UiTypography variant="h4">Предустановки эффектов:</UiTypography>
          <div class="preset-buttons">
            <UiButton 
              v-for="(preset, name) in effectPresets" 
              :key="name"
              @click="applyPreset(name)"
              variant="outline"
              size="small"
            >
              {{ name === 'dubDelay' ? '🔁 Даб Дилей' :
                 name === 'spaceReverb' ? '🚀 Космический Реверб' :
                 '🔧 Фильтрованное Эхо' }}
            </UiButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.effects-trainer {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

.trainer-container {
  background: var(--background-light);
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 6px 20px var(--shadow);
}

.waveform-section {
  margin-bottom: 30px;
}

.waveform-canvas {
  width: 100%;
  height: 200px;
  background: linear-gradient(180deg, #1a1a2e 0%, #16213e 100%);
  border-radius: 8px;
  border: 2px solid var(--primary-medium);
}

.effects-controls {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin: 30px 0;
}

.effect-panel {
  background: var(--background);
  padding: 20px;
  border-radius: 8px;
  border: 2px solid var(--neutral-medium);
  transition: all 0.3s ease;
}

.effect-panel.active {
  border-color: var(--primary-light);
  box-shadow: 0 4px 12px rgba(52, 152, 219, 0.2);
}

.effect-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.effect-params {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.param-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.param-group label {
  font-weight: 500;
  font-size: 0.9em;
  color: var(--text-secondary);
}

.param-slider {
  width: 100%;
}

.controls-section {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 30px;
  margin: 30px 0;
}

.playback-controls {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.presets-section {
  flex: 1;
}

.preset-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
}

@media (max-width: 768px) {
  .effects-controls {
    grid-template-columns: 1fr;
  }
  
  .controls-section {
    flex-direction: column;
    gap: 20px;
  }
}
</style>