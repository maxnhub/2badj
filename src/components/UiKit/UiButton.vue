<script setup>
import { defineEmits, defineProps } from 'vue'

defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: value => ['primary', 'secondary'].includes(value)
  }
})

const emit = defineEmits(['click'])
</script>

<template>
  <button 
    :class="['ui-button', variant]" 
    @click="emit('click')"
  >
    <slot />
  </button>
</template>

<style scoped>
.ui-button {
  border: none;
  padding: 14px 28px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-block;
}

.ui-button.primary {
  background: linear-gradient(135deg, var(--primary-light), var(--primary-medium-dark));
  color: var(--text-light);
  box-shadow: 0 4px 6px var(--shadow);
}

.ui-button.primary:hover {
  transform: translateY(-2px);
  background: linear-gradient(135deg, var(--primary-medium), var(--primary-dark));
  box-shadow: 0 6px 12px var(--shadow);
}

.ui-button.primary:active {
  transform: translateY(0);
}

.ui-button.secondary {
  background: var(--neutral-dark);
  color: var(--text-light);
  box-shadow: 0 4px 6px var(--shadow);
}

.ui-button.secondary:hover {
  transform: translateY(-2px);
  background: var(--primary-dark);
  box-shadow: 0 6px 12px var(--shadow);
}
</style>