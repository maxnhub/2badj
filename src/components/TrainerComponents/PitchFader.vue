<script setup>
import { ref, computed, watch } from 'vue';
import UiButton from '../UiKit/UiButton.vue';
import UiTypography from '../UiKit/UiTypography.vue';

const props = defineProps({
  modelValue: {
    type: Number,
    default: 0
  },
  disabled: {
    type: Boolean,
    default: false
  },
  bpm1: {
    type: Number,
    required: true
  },
  bpm2: {
    type: Number,
    required: true
  }
});

const emit = defineEmits(['update:modelValue']);

const pitchValue = ref(props.modelValue);

const currentBPM2 = computed(() => {
  return props.bpm2 * (1 + pitchValue.value / 100);
});

const bpmDifference = computed(() => {
  return currentBPM2.value - props.bpm1;
});

const updatePitch = (value) => {
  const newValue = Math.max(-8, Math.min(8, value));
  pitchValue.value = newValue;
  emit('update:modelValue', newValue);
};

watch(() => props.modelValue, (newValue) => {
  pitchValue.value = newValue;
});

const handleFineAdjust = (delta) => {
  const newValue = Math.round((pitchValue.value + delta) * 10) / 10;
  updatePitch(newValue);
};

const handlePreset = (value) => {
  updatePitch(value);
};

const handleReset = () => {
  updatePitch(0);
};
</script>

<template>
  <div class="pitch-control">
    <UiTypography variant="h4">🎚️ Pitch Fader Control</UiTypography>
    
    <div class="pitch-fader-container">
      <div class="pitch-labels">
        <span class="pitch-label">+8%</span>
        <span class="pitch-value">{{ pitchValue > 0 ? '+' : '' }}{{ pitchValue.toFixed(1) }}%</span>
        <span class="pitch-label">-8%</span>
      </div>
      
      <div class="vertical-slider-container">
        <div class="pitch-track">
          <div 
            class="pitch-fill"
            :style="{ height: Math.abs(pitchValue) * 3.125 + '%' }"
            :class="{ positive: pitchValue > 0, negative: pitchValue < 0 }"
          ></div>
        </div>
        
        <input 
          type="range" 
          :value="pitchValue"
          @input="updatePitch(parseFloat($event.target.value))"
          min="-8"
          max="8"
          step="0.1"
          class="vertical-slider"
          :disabled="disabled"
          orient="vertical"
        >
        
        <div class="center-notch"></div>
        <div class="pitch-thumb" :style="{ bottom: (pitchValue + 8) * 3.125 + '%' }">
          <div class="thumb-value">{{ pitchValue > 0 ? '+' : '' }}{{ pitchValue.toFixed(1) }}%</div>
        </div>
      </div>
      
      <div class="bpm-difference">
        <div class="difference-label">Разница BPM</div>
        <div class="difference-value" :class="{ positive: bpmDifference > 0, negative: bpmDifference < 0 }">
          {{ bpmDifference > 0 ? '+' : '' }}{{ bpmDifference.toFixed(1) }}
        </div>
      </div>
    </div>
    
    <div class="fine-controls">
      <div class="control-group">
        <span class="control-label">Точная настройка:</span>
        <div class="control-buttons">
          <UiButton 
            @click="handleFineAdjust(-0.5)"
            :disabled="disabled"
            variant="secondary"
            size="small"
            title="Крупный шаг -0.5%"
            class="control-btn"
          >
            -0.5%
          </UiButton>
          <UiButton 
            @click="handleFineAdjust(-0.1)"
            :disabled="disabled"
            variant="secondary"
            size="small"
            title="Мелкий шаг -0.1%"
            class="control-btn"
          >
            -0.1%
          </UiButton>
          <UiButton 
            @click="handleReset"
            :disabled="disabled"
            variant="outline"
            size="small"
            title="Сброс на 0%"
            class="control-btn reset-btn"
          >
            ↺ 0%
          </UiButton>
          <UiButton 
            @click="handleFineAdjust(0.1)"
            :disabled="disabled"
            variant="secondary"
            size="small"
            title="Мелкий шаг +0.1%"
            class="control-btn"
          >
            +0.1%
          </UiButton>
          <UiButton 
            @click="handleFineAdjust(0.5)"
            :disabled="disabled"
            variant="secondary"
            size="small"
            title="Крупный шаг +0.5%"
            class="control-btn"
          >
            +0.5%
          </UiButton>
        </div>
      </div>
      
      <div class="quick-presets">
        <span class="control-label">Быстрые пресеты:</span>
        <div class="preset-buttons">
          <UiButton 
            @click="handlePreset(-4)"
            :disabled="disabled"
            variant="outline"
            size="small"
            class="preset-btn"
          >
            -4%
          </UiButton>
          <UiButton 
            @click="handlePreset(-2)"
            :disabled="disabled"
            variant="outline"
            size="small"
            class="preset-btn"
          >
            -2%
          </UiButton>
          <UiButton 
            @click="handlePreset(2)"
            :disabled="disabled"
            variant="outline"
            size="small"
            class="preset-btn"
          >
            +2%
          </UiButton>
          <UiButton 
            @click="handlePreset(4)"
            :disabled="disabled"
            variant="outline"
            size="small"
            class="preset-btn"
          >
            +4%
          </UiButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pitch-control {
  text-align: center;
  margin: 40px 0;
}

.pitch-fader-container {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-template-rows: 1fr;
  gap: 10px;
  margin: 30px 0;
  background: var(--background);
  padding: 30px;
  border-radius: 16px;
  border: 2px solid var(--border);
  box-shadow: 0 8px 32px var(--shadow);
  position: relative;
  overflow: hidden;
}

.pitch-fader-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--primary), transparent);
  animation: scanline 3s linear infinite;
}

@keyframes scanline {
  0% { transform: translateY(0); }
  100% { transform: translateY(100%); }
}

.pitch-labels {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-template-rows: 1fr;
  gap: 10px;
  font-weight: bold;
  color: var(--text-secondary);
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  align-items: center;
}

.pitch-value {
  font-size: 1.4em;
  font-weight: bold;
  color: var(--primary);
  background: rgba(var(--primary-rgb), 0.1);
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid var(--primary);
}

.vertical-slider-container {
  position: relative;
  height: 300px;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.pitch-track {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 100%;
  background: linear-gradient(to bottom, #e74c3c, #f39c12, #2ecc71);
  border-radius: 10px;
  border: 2px solid var(--border);
  box-shadow: inset 0 2px 4px var(--shadow);
  overflow: hidden;
}

.pitch-fill {
  position: absolute;
  left: 0;
  width: 100%;
  transition: height 0.1s ease;
}

.pitch-fill.positive {
  background: linear-gradient(to top, #27ae60, #2ecc71);
  bottom: 50%;
}

.pitch-fill.negative {
  background: linear-gradient(to bottom, #c0392b, #e74c3c);
  top: 50%;
}

.vertical-slider {
  position: relative;
  width: 80px;
  height: 300px;
  margin: 0 20px;
  appearance: slider-vertical;
  writing-mode: bt-lr;
  background: transparent;
  outline: none;
  z-index: 2;
  opacity: 0.01;
  cursor: pointer;
}

.center-notch {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 2px;
  background: var(--text-secondary);
  border-radius: 1px;
  box-shadow: 0 0 10px var(--shadow);
  z-index: 1;
}

.pitch-thumb {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 24px;
  background: linear-gradient(135deg, var(--primary), #2980b9);
  border: 2px solid var(--border);
  border-radius: 6px;
  box-shadow: 0 4px 12px var(--shadow), 0 0 0 2px rgba(var(--primary-rgb), 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
  transition: bottom 0.1s ease;
  cursor: grab;
}

.pitch-thumb:active {
  cursor: grabbing;
  box-shadow: 0 2px 6px var(--shadow), 0 0 0 3px rgba(var(--primary-rgb), 0.7);
  transform: translateX(-50%) scale(1.05);
}

.thumb-value {
  font-size: 0.8em;
  font-weight: bold;
  color: white;
  text-shadow: 0 1px 2px var(--shadow);
}

.bpm-difference {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  background: var(--background-light);
  padding: 15px;
  border-radius: 10px;
  border: 1px solid var(--border);
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  justify-content: center;
}

.difference-label {
  font-size: 0.9em;
  color: var(--text-secondary);
  font-weight: bold;
}

.difference-value {
  font-size: 1.3em;
  font-weight: bold;
  padding: 5px 12px;
  border-radius: 6px;
  background: var(--background);
}

.difference-value.positive {
  color: #2ecc71;
  border: 1px solid #27ae60;
}

.difference-value.negative {
  color: #e74c3c;
  border: 1px solid #c0392b;
}

.difference-value:not(.positive):not(.negative) {
  color: var(--primary);
  border: 1px solid #2980b9;
}

.fine-controls {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 30px;
}

.control-group, .quick-presets {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
}

.control-label {
  font-weight: bold;
  color: var(--text-secondary);
  font-size: 0.9em;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.control-buttons, .preset-buttons {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
}

.control-btn {
  min-width: 60px;
  font-weight: bold;
  transition: all 0.2s ease;
}

.control-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px var(--shadow);
}

.reset-btn {
  background: linear-gradient(135deg, #95a5a6, #7f8c8d);
  border-color: #95a5a6;
  color: white;
  font-weight: bold;
}

.preset-btn {
  min-width: 50px;
  font-size: 0.8em;
  background: rgba(var(--primary-rgb), 0.1);
  border: 1px solid var(--primary);
  color: var(--primary);
}

.preset-btn:hover:not(:disabled) {
  background: var(--primary);
  color: white;
}

@media (max-width: 768px) {
  .pitch-fader-container {
    flex-direction: column;
    gap: 20px;
    padding: 20px;
  }
  
  .pitch-labels {
    flex-direction: row;
    gap: 30px;
  }
  
  .vertical-slider-container {
    height: 250px;
  }
  
  .pitch-track {
    width: 16px;
  }
  
  .pitch-thumb {
    width: 50px;
    height: 20px;
  }
  
  .thumb-value {
    font-size: 0.7em;
  }
  
  .control-buttons, .preset-buttons {
    gap: 6px;
  }
  
  .control-btn, .preset-btn {
    min-width: 50px;
    font-size: 0.8em;
    padding: 6px 10px;
  }
}

.pitch-thumb {
  animation: thumb-glow 2s ease-in-out infinite alternate;
}

@keyframes thumb-glow {
  from {
    box-shadow: 0 4px 12px var(--shadow), 0 0 0 2px rgba(var(--primary-rgb), 0.5);
  }
  to {
    box-shadow: 0 4px 16px var(--shadow), 0 0 0 3px rgba(var(--primary-rgb), 0.7);
  }
}

.vertical-slider:disabled ~ .pitch-thumb {
  background: linear-gradient(135deg, #7f8c8d, #95a5a6);
  animation: none;
  box-shadow: 0 2px 6px var(--shadow);
  cursor: not-allowed;
}

.vertical-slider:disabled ~ .pitch-thumb .thumb-value {
  color: var(--text-secondary);
}
</style>