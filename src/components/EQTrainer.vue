<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import UiButton from './UiKit/UiButton.vue';
import UiTypography from './UiKit/UiTypography.vue';

// Состояние тренажера
const isPlaying = ref(false);
const audioContext = ref(null);
const audioSource = ref(null);
const analyser = ref(null);
const gainNode = ref(null);
const eqNodes = ref([]);
const animationFrame = ref(null);

// Настройки EQ
const eqBands = ref([
  { freq: 60, type: 'lowshelf', gain: 0, label: 'Sub', color: '#FF6B6B', icon: '🔊' },
  { freq: 250, type: 'peaking', gain: 0, label: 'Low', color: '#4ECDC4', icon: '🥁' },
  { freq: 1000, type: 'peaking', gain: 0, label: 'Mid', color: '#45B7D1', icon: '🎤' },
  { freq: 4000, type: 'peaking', gain: 0, label: 'High', color: '#96CEB4', icon: '🎸' },
  { freq: 12000, type: 'highshelf', gain: 0, label: 'Air', color: '#FFEAA7', icon: '✨' }
]);

// Визуализация
const frequencyData = ref(new Uint8Array(128));
const canvas = ref(null);

// Загрузка аудио
const loadAudio = async () => {
  try {
    audioContext.value = new (window.AudioContext || window.webkitAudioContext)();
    
    // Создаем аудио ноды
    gainNode.value = audioContext.value.createGain();
    analyser.value = audioContext.value.createAnalyser();
    analyser.value.fftSize = 256;
    
    // Создаем цепочку EQ
    eqNodes.value = eqBands.value.map(band => {
      const filter = audioContext.value.createBiquadFilter();
      filter.type = band.type;
      filter.frequency.value = band.freq;
      filter.gain.value = band.gain;
      return filter;
    });
    
    // Подключаем цепочку: источник -> EQ -> анализатор -> выход
    let lastNode = audioSource.value;
    eqNodes.value.forEach(node => {
      if (lastNode) lastNode.connect(node);
      lastNode = node;
    });
    lastNode.connect(analyser.value);
    analyser.value.connect(gainNode.value);
    gainNode.value.connect(audioContext.value.destination);
    
    // Генерируем тестовый сигнал (розовый шум + мелодия)
    audioSource.value = generateTestSignal();
    audioSource.value.connect(eqNodes.value[0]);
    
  } catch (error) {
    console.error('Ошибка загрузки аудио:', error);
  }
};

// Генерация тестового сигнала
const generateTestSignal = () => {
  const bufferSize = audioContext.value.sampleRate * 2;
  const buffer = audioContext.value.createBuffer(2, bufferSize, audioContext.value.sampleRate);
  
  for (let channel = 0; channel < 2; channel++) {
    const data = buffer.getChannelData(channel);
    
    // Розовый шум + синусоиды на разных частотах
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    
    for (let i = 0; i < bufferSize; i++) {
      // Розовый шум
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      const pink = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
      b6 = white * 0.115926;
      
      // Тестовые синусоиды
      const time = i / audioContext.value.sampleRate;
      const sine1 = Math.sin(2 * Math.PI * 100 * time) * 0.1;  // 100 Hz
      const sine2 = Math.sin(2 * Math.PI * 1000 * time) * 0.1; // 1 kHz
      const sine3 = Math.sin(2 * Math.PI * 5000 * time) * 0.1; // 5 kHz
      
      data[i] = (pink * 0.3 + sine1 + sine2 + sine3) * 0.3;
    }
  }
  
  const source = audioContext.value.createBufferSource();
  source.buffer = buffer;
  source.loop = true;
  return source;
};

// Визуализация спектра
const drawSpectrum = () => {
  if (!analyser.value || !canvas.value) return;
  
  const ctx = canvas.value.getContext('2d');
  const width = canvas.value.width;
  const height = canvas.value.height;
  
  analyser.value.getByteFrequencyData(frequencyData.value);
  
  // Градиентный фон
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, '#0f0f23');
  gradient.addColorStop(1, '#1a1a2e');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  
  // Рисуем частотные полосы с градиентами
  const barWidth = (width / frequencyData.value.length) * 2.5;
  let x = 0;
  
  for (let i = 0; i < frequencyData.value.length; i++) {
    const barHeight = frequencyData.value[i] / 255 * height * 0.8;
    
    // Градиент для каждой полосы
    const barGradient = ctx.createLinearGradient(0, height - barHeight, 0, height);
    const hue = i / frequencyData.value.length * 360;
    barGradient.addColorStop(0, `hsla(${hue}, 80%, 65%, 0.9)`);
    barGradient.addColorStop(1, `hsla(${hue}, 80%, 45%, 0.6)`);
    
    ctx.fillStyle = barGradient;
    
    // Скругленные углы для полос
    ctx.beginPath();
    ctx.roundRect(x, height - barHeight, barWidth - 1, barHeight, 4);
    ctx.fill();
    
    // Свечение
    ctx.shadowColor = `hsla(${hue}, 80%, 65%, 0.5)`;
    ctx.shadowBlur = 10;
    ctx.fill();
    ctx.shadowBlur = 0;
    
    x += barWidth + 1;
  }
  
  // Рисуем линии частот EQ с анимацией
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
  ctx.setLineDash([3, 3]);
  ctx.lineWidth = 1;
  
  eqBands.value.forEach(band => {
    const xPos = (Math.log(band.freq / 20) / Math.log(20000 / 20)) * width;
    
    // Анимированная линия
    ctx.beginPath();
    ctx.moveTo(xPos, 0);
    ctx.lineTo(xPos, height);
    ctx.stroke();
    
    // Подписи частот с фоном
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(xPos - 20, height - 25, 40, 20);
    
    ctx.fillStyle = 'white';
    ctx.font = 'bold 11px "Arial", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`${band.freq}Hz`, xPos, height - 10);
  });
  ctx.setLineDash([]);
  
  // Сетка
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.lineWidth = 0.5;
  
  // Горизонтальные линии
  for (let i = 0; i <= 4; i++) {
    const y = (height / 4) * i;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
  
  animationFrame.value = requestAnimationFrame(drawSpectrum);
};

// Управление EQ
const updateEQ = (index, gain) => {
  eqBands.value[index].gain = gain;
  if (eqNodes.value[index]) {
    eqNodes.value[index].gain.value = gain;
  }
};

// Сброс всех полос EQ
const resetEQ = () => {
  eqBands.value.forEach((band, index) => {
    band.gain = 0;
    if (eqNodes.value[index]) {
      eqNodes.value[index].gain.value = 0;
    }
  });
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
    drawSpectrum();
  }
  
  isPlaying.value = !isPlaying.value;
};

// Предустановки EQ
const presets = {
  flat: [0, 0, 0, 0, 0],
  bassBoost: [8, 4, 0, -2, 0],
  vocalBoost: [-4, 0, 6, 4, 2],
  trebleBoost: [-8, -4, 0, 4, 8],
  smile: [6, 2, -2, 2, 6]
};

const applyPreset = (presetName) => {
  const gains = presets[presetName];
  gains.forEach((gain, index) => {
    updateEQ(index, gain);
  });
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
  <div class="eq-trainer">
    <UiTypography variant="h2">🎛️ Тренажер Эквалайзера</UiTypography>
    
    <div class="trainer-container">
      <!-- Визуализация спектра -->
      <div class="spectrum-section">
        <UiTypography variant="h3">Частотный спектр</UiTypography>
        <canvas ref="canvas" width="800" height="200" class="spectrum-canvas"></canvas>
      </div>
      
      <!-- Полосы EQ -->
      <div class="eq-controls">
        <UiTypography variant="h3">Регуляторы EQ</UiTypography>
        <div class="eq-bands">
          <div 
            v-for="(band, index) in eqBands" 
            :key="index" 
            class="eq-band"
            :style="{ '--band-color': band.color }"
          >
            <div class="band-header">
              <div class="band-icon">{{ band.icon }}</div>
              <div class="band-info">
                <div class="band-label">{{ band.label }}</div>
                <div class="band-frequency">{{ band.freq }}Hz</div>
              </div>
            </div>
            
            <div class="slider-container">
              <input 
                type="range" 
                :value="band.gain"
                @input="updateEQ(index, parseFloat($event.target.value))"
                min="-12"
                max="12"
                step="0.5"
                class="eq-slider"
                :class="{ 'positive': band.gain > 0, 'negative': band.gain < 0 }"
              >
              <div class="slider-track">
                <div 
                  class="slider-fill"
                  :style="{ height: Math.abs(band.gain) * 2.5 + '%' }"
                ></div>
              </div>
            </div>
            
            <div class="gain-display" :class="{ 'positive': band.gain > 0, 'negative': band.gain < 0 }">
              <div class="gain-value">{{ band.gain > 0 ? '+' : '' }}{{ band.gain }}dB</div>
              <div class="gain-bar">
                <div 
                  class="gain-fill"
                  :style="{ height: Math.abs(band.gain) * 4 + '%' }"
                ></div>
              </div>
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
            class="play-button"
          >
            <span class="button-content">
              <span class="button-icon">{{ isPlaying ? '⏸️' : '▶️' }}</span>
              <span>{{ isPlaying ? 'Стоп' : 'Воспроизвести' }}</span>
            </span>
          </UiButton>
          
          <UiButton @click="resetEQ" variant="outline" class="reset-button">
            <span class="button-content">
              <span class="button-icon">🔄</span>
              <span>Сброс EQ</span>
            </span>
          </UiButton>
        </div>
        
        <div class="presets-section">
          <UiTypography variant="h4">🎚️ Предустановки</UiTypography>
          <div class="preset-buttons">
            <UiButton 
              v-for="(preset, name) in presets" 
              :key="name"
              @click="applyPreset(name)"
              variant="outline"
              size="small"
              class="preset-btn"
            >
              {{ name === 'flat' ? '📊 Плоско' : 
                 name === 'bassBoost' ? '🔈 Басс' :
                 name === 'vocalBoost' ? '🎤 Вокал' :
                 name === 'trebleBoost' ? '🔔 Верхние' :
                 '😊 Улыбка' }}
            </UiButton>
          </div>
        </div>
      </div>
      
      <!-- Информация -->
      <div class="info-section">
        <UiTypography variant="h4">💡 Советы по использованию EQ</UiTypography>
        <div class="tips-grid">
          <div v-for="(band, index) in eqBands" :key="index" class="tip-card" :style="{ '--tip-color': band.color }">
            <div class="tip-icon">{{ band.icon }}</div>
            <div class="tip-content">
              <div class="tip-title">{{ band.label }} ({{ band.freq }}Hz)</div>
              <div class="tip-text">
                <span v-if="band.label === 'Sub'">Очень низкие частоты - основа баса</span>
                <span v-else-if="band.label === 'Low'">Низкие частоты - тело и теплота</span>
                <span v-else-if="band.label === 'Mid'">Средние частоты - вокал и основные инструменты</span>
                <span v-else-if="band.label === 'High'">Высокие частоты - четкость и атака</span>
                <span v-else>Очень высокие - воздух и блеск</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.eq-trainer {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

.trainer-container {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  padding: 30px;
  border-radius: 20px;
  box-shadow: 
    0 10px 40px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.spectrum-section {
  margin-bottom: 40px;
}

.spectrum-canvas {
  width: 100%;
  height: 200px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.5);
}

.eq-controls {
  margin: 40px 0;
}

.eq-bands {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 20px;
  margin-top: 25px;
}

.eq-band {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%);
  padding: 20px;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.eq-band::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--band-color), transparent);
  opacity: 0.7;
}

.eq-band:hover {
  transform: translateY(-5px);
  box-shadow: 
    0 10px 25px rgba(0, 0, 0, 0.3),
    0 0 0 1px var(--band-color);
}

.band-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.band-icon {
  font-size: 24px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
}

.band-info {
  flex: 1;
}

.band-label {
  font-weight: 700;
  font-size: 1.1em;
  color: white;
  margin-bottom: 2px;
}

.band-frequency {
  font-size: 0.85em;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
}

.slider-container {
  position: relative;
  margin: 15px 0;
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.eq-slider {
  position: absolute;
  width: 160px;
  height: 20px;
  margin: 0;
  transform: rotate(-90deg);
  background: transparent;
  outline: none;
  z-index: 2;
  opacity: 0;
  cursor: pointer;
}

.slider-track {
  position: relative;
  width: 6px;
  height: 140px;
  background: linear-gradient(to bottom, 
    rgba(255, 255, 255, 0.1) 0%, 
    rgba(255, 255, 255, 0.05) 50%, 
    rgba(255, 255, 255, 0.1) 100%);
  border-radius: 3px;
  overflow: hidden;
}

.slider-fill {
  position: absolute;
  bottom: 50%;
  left: 0;
  width: 100%;
  background: linear-gradient(to top, var(--band-color), transparent);
  border-radius: 3px;
  transition: height 0.2s ease;
}

.eq-slider.positive ~ .slider-track .slider-fill {
  background: linear-gradient(to top, var(--band-color), rgba(255, 255, 255, 0.3));
}

.eq-slider.negative ~ .slider-track .slider-fill {
  background: linear-gradient(to bottom, #ff6b6b, transparent);
  top: 50%;
  bottom: auto;
}

.gain-display {
  text-align: center;
  margin-top: 15px;
}

.gain-value {
  font-weight: 700;
  font-size: 1.1em;
  margin-bottom: 8px;
  transition: all 0.3s ease;
}

.gain-display.positive .gain-value {
  color: var(--band-color);
  text-shadow: 0 0 10px var(--band-color);
}

.gain-display.negative .gain-value {
  color: #ff6b6b;
  text-shadow: 0 0 10px #ff6b6b;
}

.gain-bar {
  width: 4px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
}

.gain-fill {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: var(--band-color);
  border-radius: 2px;
  transition: height 0.2s ease;
}

.gain-display.negative .gain-fill {
  background: #ff6b6b;
}

.controls-section {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 40px;
  margin: 40px 0;
  align-items: start;
}

.playback-controls {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.button-content {
  display: flex;
  align-items: center;
  gap: 8px;
}

.button-icon {
  font-size: 1.2em;
}

.play-button, .reset-button {
  width: 100%;
}

.presets-section {
  background: rgba(255, 255, 255, 0.05);
  padding: 20px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.preset-buttons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 10px;
  margin-top: 15px;
}

.preset-btn {
  transition: all 0.3s ease;
}

.preset-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.info-section {
  background: rgba(255, 255, 255, 0.05);
  padding: 25px;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.tips-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-top: 20px;
}

.tip-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%);
  padding: 15px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.tip-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
  border-color: var(--tip-color);
}

.tip-icon {
  font-size: 20px;
  flex-shrink: 0;
}

.tip-content {
  flex: 1;
}

.tip-title {
  font-weight: 600;
  color: white;
  margin-bottom: 4px;
  font-size: 0.9em;
}

.tip-text {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.8em;
  line-height: 1.4;
}

@media (max-width: 768px) {
  .trainer-container {
    padding: 20px;
  }
  
  .eq-bands {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 15px;
  }
  
  .controls-section {
    grid-template-columns: 1fr;
    gap: 25px;
  }
  
  .preset-buttons {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .tips-grid {
    grid-template-columns: 1fr;
  }
  
  .eq-band {
    padding: 15px;
  }
  
  .slider-container {
    height: 120px;
  }
  
  .slider-track {
    height: 100px;
  }
}

/* Анимации */
@keyframes glow {
  0%, 100% { opacity: 0.7; }
  50% { opacity: 1; }
}

.eq-band:hover::before {
  animation: glow 2s ease-in-out infinite;
}

/* Кастомный скроллбар */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: var(--band-color);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--band-color);
  opacity: 0.8;
}
</style>