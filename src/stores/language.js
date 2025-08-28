import { defineStore } from 'pinia';

export const useLanguageStore = defineStore('language', {
  state: () => ({
    currentLanguage: 'ru', // Язык по умолчанию - русский
    translations: {
      ru: {
        nextLesson: 'Следующий урок',
        lesson: 'Урок',
      },
      en: {
        nextLesson: 'Next Lesson',
        lesson: 'Lesson',
      },
    },
  }),
  actions: {
    setLanguage(language) {
      this.currentLanguage = language;
    },
    getTranslation(key) {
      return this.translations[this.currentLanguage][key] || key;
    },
  },
});