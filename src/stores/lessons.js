import { defineStore } from 'pinia'

export const useLessonsStore = defineStore('lessons', {
  state: () => ({
    currentChapterId: 1,
    currentLessonId: 1,
    isMenuOpen: false,
    chapters: [
      {
        id: 1,
        title: 'Introduction to DJing',
        lessons: [
          {
            id: 1,
            title: 'Знакомство с Rekordbox',
            content: `
              <h3>Что такое Rekordbox?</h3>
              <p>Профессиональное ПО от Pioneer DJ для организации и подготовки музыки. Основные функции:</p>
              <ul>
                <li>Анализ треков (BPM, тональность)</li>
                <li>Разметка cue-точек и петель</li>
                <li>Экспорт на USB для CDJ/XDJ</li>
                <li>Режим Performance для живого сведения</li>
              </ul>
              <h3>Как начать?</h3>
              <ol>
                <li>Скачайте с <a href="https://rekordbox.com/" target="_blank">официального сайта</a></li>
                <li>Добавьте музыку в библиотеку</li>
                <li>Разметьте треки (cue-точки, loops)</li>
              </ol>
            `,
            audioExample: '/audio/rekordbox-intro.mp3'
          },
          {
            id: 2,
            title: 'Подготовка треков',
            content: `
              <h3>Горячие клавиши для работы:</h3>
              <div class="shortcuts-grid">
                <div><kbd>C</kbd> - Добавить cue-точку</div>
                <div><kbd>Space</kbd> - Воспроизведение/пауза</div>
                <div><kbd>B</kbd> - Установить loop</div>
              </div>
              <h3>Советы новичкам:</h3>
              <ul>
                <li>Всегда проверяйте автоматически расставленный BPM</li>
                <li>Размечайте структуру треков (интро, дроп, аутро)</li>
                <li>Используйте цветовые метки для организации</li>
              </ul>
            `,
            audioExample: '/audio/track-preparation.mp3'
          },
          {
            id: 3,
            title: 'Экспорт на USB',
            content: `
              <h3>Для выступления в клубе:</h3>
              <ol>
                <li>Вставьте USB-флешку</li>
                <li>Перейдите в <strong>Export Mode</strong></li>
                <li>Перенесите плейлисты на устройство</li>
              </ol>
              <div class="note">
                <p>Форматируйте флешку в FAT32 для совместимости с CDJ!</p>
              </div>
            `,
            audioExample: '/audio/usb-export.mp3'
          }
        ]
      },
      {
        id: 2,
        title: 'Hardware Setup',
        lessons: [
          {
            id: 4,
            title: 'DDJ-400: Первое знакомство',
            content: `
              <h3>Базовый контроллер для начинающих</h3>
              <div class="controller-layout">
                <div class="controller-images">
                  <img src="https://www.pioneerdj.com/-/media/pioneerdj/images/products/controller/ddj-400sxa/ddj-400_cgi_top_1792x1316.jpg" alt="DDJ-400 Top View" class="lesson-image">
                  <img src="https://www.pioneerdj.com/-/media/pioneerdj/images/products/controller/ddj-400sxa/ddj-400_cgi_rear_1792x1316.jpg?dmc=1.jpg" alt="DDJ-400 Rear View" class="lesson-image">
                </div>
                <div class="features">
                  <h4>Ключевые элементы:</h4>
                  <ul>
                    <li><strong>Джоги</strong> - для скретча и поиска</li>
                    <li><strong>Фейдеры</strong> - управление громкостью</li>
                    <li><strong>Эффекты</strong> - встроенные процессоры</li>
                    <li><strong>Кнопки Hot Cues</strong> - быстрый доступ</li>
                  </ul>
                </div>
              </div>
            `,
            audioExample: '/audio/ddj-intro.mp3'
          },
          {
            id: 5,
            title: 'Подключение DDJ-400',
            content: `
              <h3>Пошаговая инструкция:</h3>
              <ol>
                <li>Установите драйверы с <a href="https://www.pioneerdj.com/" target="_blank">официального сайта</a></li>
                <li>Подключите контроллер через USB</li>
                <li>Откройте Rekordbox в режиме Performance</li>
                <li>Выберите DDJ-400 в настройках аудио</li>
              </ol>
              <div class="video-wrapper">
                <iframe width="560" height="315" src="https://www.youtube.com/embed/G1DcY3dMmsU?si=4eHYxonfjynUoQBR" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
              </div>
            `,
            audioExample: '/audio/setup-guide.mp3'
          }
        ]
      },
      {
        id: 3,
        title: 'Mixing Techniques',
        lessons: [
          {
            id: 6,
            title: 'Базовое сведение на DDJ-400',
            content: `
              <h3>Техники для начинающих:</h3>
              <div class="mixing-techniques">
                <div class="technique">
                  <h4>1. Beat Matching</h4>
                  <p>Совмещение BPM двух треков с помощью джогов</p>
                </div>
                <div class="technique">
                  <h4>2. Фейдер-микширование</h4>
                  <p>Плавный переход между каналами</p>
                </div>
                <div class="technique">
                  <h4>3. Использование эффектов</h4>
                  <p>Добавление фильтров и эхо</p>
                </div>
              </div>
              <div class="video-wrapper">
                <iframe width="560" height="315" src="https://www.youtube.com/embed/4g0tOBQJ6M4?si=B1U6K0P17Fv8SAne" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
              </div>
            `,
            audioExample: '/audio/mixing-basics.mp3'
          },
          {
            id: 7,
            title: 'Расположение элементов управления',
            content: `
              <h3>Расположение элементов управления:</h3>
              <div class="controller-layout">
                <div class="features">
                  <h4>Основные элементы:</h4>
                  <ul>
                    <li><strong>Pitch Fader</strong>: Регулировка темпа трека</li>
                    <img src="https://i.ytimg.com/vi/TPv-DYkUUrg/sddefault.jpg" alt="Регулировка темпа трека" class="lesson-image">
                    <li><strong>Cue Buttons</strong>: Метки для быстрого перехода</li>
                    <img src="https://i.ytimg.com/vi/OffmOKo7Oy8/maxresdefault.jpg" alt="Hot keys" class="lesson-image">
                    <li><strong>Loop Controls</strong>: Создание и управление петлями</li>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNfKcVjCAeIyd4chtD4CrAQWsh4WdMWHKCNQ&s.jpg" alt="Создание и управление петлями" class="lesson-image">
                  </ul>
                </div>
              </div>
            `,
            audioExample: '/audio/control-layout.mp3'
          },
          {
            id: 8,
            title: 'EQ Mixing',
            content: `
              <h3>Работа с эквалайзером:</h3>
              <p>Эквалайзер позволяет регулировать частоты (низкие, средние, высокие) для плавных переходов.</p>
              <ul>
                <li><strong>Low EQ</strong>: Управление басами (убирайте низы на одном треке при сведении)</li>
                <li><strong>Mid EQ</strong>: Средние частоты для вокала и инструментов</li>
                <li><strong>High EQ</strong>: Высокие частоты для четкости</li>
              </ul>
              <div class="video-wrapper">
                <iframe width="560" height="315" src="https://www.youtube.com/embed/-jRCizG7Ito?si=J4UN62bo9RRb_Dob" title="EQ Mixing" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
              </div>
            `,
            audioExample: '/audio/eq-mixing.mp3'
          },
          {
            id: 9,
            title: 'Looping Techniques',
            content: `
              <h3>Создание и использование петель:</h3>
              <p>Петли позволяют повторять часть трека для создания эффектов или переходов.</p>
              <ul>
                <li><strong>Auto Loop</strong>: Автоматическое создание петель (4, 8, 16 ударов)</li>
                <img src="https://www.knightsoundandlight.com/cdn/shop/products/589DDJFLX46_1024x1024@2x.jpg?v=1667927220.jpg" alt="Auto Loop" class="lesson-image">
                <li><strong>Manual Loop</strong>: Ручная настройка начала и конца</li>
                <img src="https://djtechzone.com/wp-content/uploads/2019/07/pioneer-dj-ddj-800-looping-section.jpg" alt="Manual Loop" class="lesson-image">
                <li><strong>Loop Exit</strong>: Выход из петли для продолжения трека</li>
                <img src="https://wearecrossfader.co.uk/wp-content/uploads/2024/02/flx4-loop-wordpress-thumb.jpg" alt="Loop Exit" class="lesson-image">
              </ul>
              <div class="note">
                <p>Используйте петли для удлинения интро или создания уникальных переходов!</p>
              </div>
            `,
            audioExample: '/audio/looping.mp3'
          },
          {
            id: 10,
            title: 'Using Effects',
            content: `
              <h3>Добавление эффектов:</h3>
              <p>Эффекты добавляют динамики и разнообразия в микс.</p>
              <div class="mixing-techniques">
                <div class="technique">
                  <h4>1. Filter</h4>
                  <p>Добавляет или убирает частоты для создания переходов</p>
                </div>
                <div class="technique">
                  <h4>2. Echo</h4>
                  <p>Создает эхо-эффект для драматичных переходов</p>
                </div>
                <div class="technique">
                  <h4>3. Reverb</h4>
                  <p>Добавляет пространственный эффект</p>
                </div>
              </div>
              <div class="video-wrapper">
                <iframe width="560" height="315" src="https://www.youtube.com/embed/5QzL0YOtMhY?si=7Y8zX9kL2mN6Y7ZQ" title="Effects Tutorial" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
              </div>
            `,
            audioExample: '/audio/effects.mp3'
          }
        ]
      }
    ]
  }),
  getters: {
    currentChapter: (state) => state.chapters.find(chapter => chapter.id === state.currentChapterId),
    currentLesson: (state) => {
      const chapter = state.chapters.find(chapter => chapter.id === state.currentChapterId)
      return chapter?.lessons.find(lesson => lesson.id === state.currentLessonId)
    },
    hasNextLesson: (state) => {
      const chapter = state.chapters.find(chapter => chapter.id === state.currentChapterId)
      const lessonIndex = chapter?.lessons.findIndex(lesson => lesson.id === state.currentLessonId)
      return lessonIndex < chapter?.lessons.length - 1
    },
    hasNextChapter: (state) => state.currentChapterId < state.chapters.length
  },
  actions: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
    },
    nextLesson() {
      if (this.hasNextLesson) {
        const chapter = this.chapters.find(chapter => chapter.id === this.currentChapterId)
        const lessonIndex = chapter.lessons.findIndex(lesson => lesson.id === this.currentLessonId)
        this.currentLessonId = chapter.lessons[lessonIndex + 1].id
      } else if (this.hasNextChapter) {
        this.currentChapterId++
        this.currentLessonId = this.chapters.find(chapter => chapter.id === this.currentChapterId).lessons[0].id
      }
    },
    setLesson(chapterId, lessonId) {
      this.currentChapterId = chapterId
      this.currentLessonId = lessonId
      this.isMenuOpen = false
    }
  }
})