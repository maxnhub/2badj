import { createI18n } from 'vue-i18n';
     import ru from '../src/locales/content_ru.json';
     import en from '../src/locales/content_en.json';

     export default createI18n({
       legacy: false, // Отключаем legacy mode для Vue 3
       locale: 'ru', // Язык по умолчанию
       fallbackLocale: 'en', // Резервный язык
       messages: {
         ru: {
           header: { title: 'Как стать диджеем' },
           menu: { lessons: 'Уроки', noLessons: 'Уроки отсутствуют' },
           lesson: { lesson: 'Урок', next: 'Следующий', loading: 'Загрузка...', error: 'Ошибка загрузки урока', imageAlt: 'Изображение урока' },
         },
         en: {
           header: { title: 'How 2B a DJ' },
           menu: { lessons: 'Lessons', noLessons: 'No lessons available' },
           lesson: { lesson: 'Lesson', next: 'Next', loading: 'Loading...', error: 'Error loading lesson', imageAlt: 'Lesson image' },
         },
       },
     });