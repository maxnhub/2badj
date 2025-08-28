<script setup>
import BurgerMenu from './BurgerMenu.vue';
import UiTypography from './UiKit/UiTypography.vue';
import { useLanguageStore } from '../stores/language';
import { useLessonsStore } from '../stores/lessons';

const languageStore = useLanguageStore();
const lessonsStore = useLessonsStore();

function toggleLanguage() {
  const newLanguage = languageStore.currentLanguage === 'ru' ? 'en' : 'ru';
  languageStore.setLanguage(newLanguage);
  lessonsStore.fetchChapters(); // Перезагружаем данные для нового языка
}
</script>

<template>
  <header class="app-header">
    <div class="header-content">
      <BurgerMenu />
      <UiTypography variant="h1">How 2B a DJ</UiTypography>
      <button class="language-toggle" @click="toggleLanguage">
        {{ languageStore.currentLanguage === 'ru' ? 'EN' : 'RU' }}
      </button>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  background-color: var(--primary-dark);
  color: var(--text-light);
  padding: 20px;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 100;
}

.header-content {
  display: flex;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.language-toggle {
  margin-left: auto;
  padding: 8px 16px;
  background-color: var(--primary-light);
  color: var(--text-light);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.2s;
}

.language-toggle:hover {
  background-color: var(--primary);
}
</style>