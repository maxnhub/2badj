const chaptersData = [
    {
        id: 1,
        title: 'Введение в диджеинг',
        Lessons: [
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
                audioExample: '/audio/rekordbox-intro.mp3',
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
                audioExample: '/audio/track-preparation.mp3',
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
                audioExample: '/audio/usb-export.mp3',
            },
        ],
    },
    {
        id: 2,
        title: 'Настройка оборудования',
        Lessons: [
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
                audioExample: '/audio/ddj-intro.mp3',
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
                audioExample: '/audio/setup-guide.mp3',
            },
        ],
    },
    {
        id: 3,
        title: 'Mixing Techniques',
        Lessons: [
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
              <div class="interactive-section">
                <h4>🎯 Практикуйтесь онлайн!</h4>
                <p>Используйте наш интерактивный тренажер для отработки beat matching:</p>
                <button onclick="window.openBeatMatchingTrainer()" class="interactive-btn">
                  Открыть Beat Matching Тренажер
                </button>
              </div>
            `,
                audioExample: '/audio/mixing-basics.mp3',
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
                audioExample: '/audio/control-layout.mp3',
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
                audioExample: '/audio/eq-mixing.mp3',
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
                audioExample: '/audio/looping.mp3',
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
                audioExample: '/audio/effects.mp3',
            },
        ],
    },
    {
        id: 4,
        title: 'Advanced Mixing Techniques',
        Lessons: [
            {
                id: 11,
                title: 'Основы сведения треков бит в бит',
                content: `
              <h3>Сведение бит в бит</h3>
              <p>В 99% случаев треки сводятся "бит в бит" — это значит, что удары бочки одного трека совпадают с ударами другого на сильную долю такта. Это создает плавный и естественный переход между треками.</p>
              <ul>
                <li><strong>Beat</strong>: Один удар бочки или последовательность ударов, образующая ритм.</li>
                <li><strong>Такт</strong>: Четыре удара, формирующие музыкальную фразу.</li>
                <li>Для точного сведения используйте <strong>Pitch Fader</strong> на контроллере для синхронизации BPM.</li>
              </ul>
              <h3>Как добиться идеального сведения?</h3>
              <ol>
                <li>Включите <strong>Beat Grid</strong> в Rekordbox для визуального контроля.</li>
                <img src="https://cdn.prod.website-files.com/5abf6872d0f264292bfb1c2d/6760aa73b5c684061dd156f9_6760a394b4acb4a80755b4cc_Corret%2520Beatgrid.jpeg" alt="Rekordbox Beat Grid" class="lesson-image">
                <li>Слушайте треки в наушниках и подстройте темп второго трека.</li>
                <li>Используйте джоги для точной синхронизации битов.</li>
              </ol>
              <div class="note">
                <p>Всегда проверяйте автоматически расставленный Beat Grid в Rekordbox, так как он может быть неточным!</p>
              </div>
              <div class="video-wrapper">
                <iframe width="560" height="315" src="https://www.youtube.com/embed/4g0tOBQJ6M4?si=B1U6K0P17Fv8SAne" title="Beat Matching Tutorial" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
              </div>
            `,
                audioExample: '/audio/beat-matching.mp3',
            },
            {
                id: 12,
                title: 'Сведение треков с разным BPM',
                content: `
              <h3>Работа с разными темпами</h3>
              <p>Сведение треков с разным BPM требует дополнительных техник, чтобы переход оставался плавным. Это особенно актуально для жанров с большими различиями в темпе, например, RnB (80-100 BPM) и House (120-130 BPM).</p>
              <ul>
                <li><strong>Плавное изменение темпа</strong>: Постепенно увеличивайте или уменьшайте BPM первого трека, используя Pitch Fader.</li>
                <li><strong>Использование петель</strong>: Создайте петлю в более медленном треке, чтобы замаскировать переход.</li>
                <li><strong>Эффекты</strong>: Применяйте фильтры или эхо для сглаживания смены темпа.</li>
              </ul>
              <h3>Пример на Pioneer CDJ-3000</h3>
              <div class="controller-images">
                <img src="https://store.djtechtools.com/cdn/shop/files/PioneerDJM-A9CDJ-3000Bundle.jpg?v=1691703142&width=3840" alt="Pioneer CDJ-3000" class="lesson-image">
              </div>
              <ol>
                <li>Загрузите треки с разным BPM (например, 87 и 126 BPM).</li>
                <li>Используйте <strong>Auto Loop</strong> для создания 4-ударной петли на медленном треке.</li>
                <li>Постепенно увеличивайте темп, пока он не приблизится к темпу второго трека.</li>
              </ol>
              <div class="video-wrapper">
                <iframe width="560" height="315" src="https://youtu.be/b-JtZrj_ftc?si=Mbn1wp9xWu1v-ghN" title="Mixing Different BPMs" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
              </div>
            `,
                audioExample: '/audio/mixing-bpm.mp3',
            },
            {
                id: 13,
                title: 'Креативные приемы сведения',
                content: `
              <h3>Создание уникального звучания</h3>
              <p>В 1% случаев диджеи намеренно смещают биты, чтобы создать уникальный звук. Это подходит для экспериментальных миксов или жанров, где допустимы нестандартные переходы.</p>
              <ul>
                <li><strong>Смещение битов</strong>: Сдвиньте бит второго трека вперед или назад для создания нового ритмического рисунка.</li>
                <li><strong>Hot Cues</strong>: Используйте cue-точки для быстрого перехода к определенным частям трека.</li>
                <li><strong>Эффекты для переходов</strong>: Применяйте фильтры, эхо или реверб для драматичных смен.</li>
              </ul>
              <h3>Пример креативного сведения</h3>
              <div class="controller-images">
                <img src="https://www.pioneerdj.com/-/media/pioneerdj/images/products/mixer/djm-900nxs2/djm-900nxs2_hero_1792x1316.jpg" alt="Pioneer DJM-900NXS2" class="lesson-image">
              </div>
              <ol>
                <li>Установите cue-точку на дропе второго трека.</li>
                <li>Примените эхо-эффект на последнем такте первого трека.</li>
                <li>Сдвиньте бит второго трека на пол-удара для уникального эффекта.</li>
              </ol>
              <div class="note">
                <p>Экспериментируйте с креативным сведением только после освоения базовых техник!</p>
              </div>
            `,
                audioExample: '/audio/creative-mixing.mp3',
            },
            {
              id: 14,
              title: 'Сведение с помощью круга Камелота',
              content: `
                  <h3>Введение в круг Камелота</h3>
                  <p>Круг Камелота — это система гармонического сведения, которая помогает диджеям смешивать треки в совместимых тональностях для более плавных переходов.</p>
                  
                  <div class="camelot-wheel">
                      <img src="https://zwook.ru/uploads/common/camelotcircle-cuatripatipedo.jpg" alt="Круг Камелота" class="lesson-image">
                  </div>
                  
                  <h3>Как это работает:</h3>
                  <ul>
                      <li><strong>Тональности представлены в виде кодов</strong> (например, 1A, 2B, 3A)</li>
                      <li><strong>Одинаковый код</strong>: Идеальное гармоническое совпадение</li>
                      <li><strong>Соседние коды</strong> (например, 1A → 2A или 1A → 1B): Хорошее совпадение</li>
                      <li><strong>+/- 7</strong>: Относительная минорная/мажорная тональность</li>
                  </ul>
                  
                  <h3>Практическое использование в Rekordbox:</h3>
                  <ol>
                      <li>Анализируйте треки для определения тональности</li>
                      <li>Сортируйте плейлист по тональности с использованием системы Камелота</li>
                      <li>Выбирайте треки с совместимыми тональностями для бесшовного сведения</li>
                  </ol>
                  
                  <div class="note">
                      <p>Гармоническое сведение может сделать ваши сеты более профессиональными и музыкально связными!</p>
                  </div>
                  
                  <div class="video-wrapper">
                      <iframe width="560" height="315" src="https://www.youtube.com/embed/-PwD6UyT9y4?si=eVGaKRNh5-pWB2r1" title="Camelot Wheel Tutorial" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                  </div>
              `,
              audioExample: '/audio/camelot-wheel.mp3',
            },
            {
              id: 15,
              title: 'Продвинутые техники гармонического сведения',
              content: `
                  <h3>За пределами базового сведения по Камелоту</h3>
                  <p>Освоив основы гармонического сведения, вы можете исследовать более продвинутые техники для креативных переходов.</p>
                  
                  <h3>Продвинутые переходы по Камелоту:</h3>
                  <ul>
                      <li><strong>Повышение энергии</strong>: Двигайтесь по часовой стрелке (например, 1A → 2A → 3A) для постепенного наращивания энергии</li>
                      <li><strong>Снижение энергии</strong>: Двигайтесь против часовой стрелки (например, 5A → 4A → 3A) для плавных спадов</li>
                      <li><strong>Модальные смещения</strong>: Переходите между относительными мажорными/минорными тональностями (1A ↔ 1B)</li>
                      <li><strong>Прыжки на +6/-6</strong>: Создавайте драматичные смены тональности для ключевых моментов</li>
                  </ul>
                  
                  <h3>Практический пример для наращивания напряжения:</h3>
                  <ol>
                      <li>Начните с 8A (До минор) - интро секция</li>
                      <li>Перейдите к 9A (Ре-бемоль минор) - наращивание напряжения</li>
                      <li>Переход к 10A (Ре минор) - пиковая энергия</li>
                      <li>Дроп на 11A (Ми-бемоль минор) - основная секция</li>
                  </ol>
                  
                  <div class="note">
                      <p>Используйте эти техники для создания эмоциональных путешествий в ваших сетах!</p>
                  </div>
              `,
              audioExample: '/audio/advanced-harmonic.mp3',
            },
            {
              id: 16,
              title: 'Круг Камелота на практике: подходы для разных жанров',
              content: `
                  <h3>Применение гармонического сведения к различным жанрам</h3>
                  <p>Разные музыкальные жанры требуют разных подходов к гармоническому сведению.</p>
                  
                  <h3>Стратегии для конкретных жанров:</h3>
                  
                  <div class="mixing-techniques">
                      <div class="technique">
                          <h4>House/Techno</h4>
                          <p>Придерживайтесь соседних тональностей для бесшовных длинных миксов. Идеально для поддержания энергии на танцполе.</p>
                      </div>
                      <div class="technique">
                          <h4>Hip-Hop/R&B</h4>
                          <p>Используйте переходы между относительными мажорными/минорными тональностями для эмоционального контраста.</p>
                      </div>
                      <div class="technique">
                          <h4>Progressive/Trance</h4>
                          <p>Применяйте шаги +1/+2 для постепенного наращивания энергии через несколько треков.</p>
                      </div>
                  </div>
                  
                  <h3>Настройка Rekordbox для гармонического сведения:</h3>
                  <ol>
                      <li>Включите отображение тональностей по Камелоту в настройках</li>
                      <li>Создайте умные плейлисты, сгруппированные по тональностям</li>
                      <li>Используйте функцию "похожие треки" для поиска совместимых вариантов</li>
                  </ol>
                  
                  <div class="video-wrapper">
                      <iframe width="560" height="315" src="https://www.youtube.com/embed/VOcEyIFFYxM?si=Cdzgq18racQaWDLT" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                  </div>
              `,
              audioExample: '/audio/genre-harmonic.mp3',
            }
        ],
    },
    {
      id: 5,
      title: 'Работа с эквалайзером и эффектами',
      Lessons: [
          {
              id: 17,
              title: 'Основы эквалайзера в диджеинге',
              content: `
                  <h3>Что такое эквалайзер и зачем он нужен?</h3>
                  <p>Эквалайзер (EQ) - это инструмент для регулировки баланса частот в аудиосигнале. В диджеинге EQ используется для:</p>
                  
                  <div class="mixing-techniques">
                      <div class="technique">
                          <h4>🎵 Гармоничного сведения</h4>
                          <p>Убираем конфликтующие частоты между треками</p>
                      </div>
                      <div class="technique">
                          <h4>🔊 Контроля энергии</h4>
                          <p>Усиливаем или ослабляем определенные диапазоны</p>
                      </div>
                      <div class="technique">
                          <h4>🎨 Творческого подхода</h4>
                          <p>Создаем уникальное звучание микса</p>
                      </div>
                  </div>
                  
                  <h3>Частотные диапазоны:</h3>
                  <ul>
                      <li><strong>Sub Bass (20-60Hz):</strong> Очень низкие частоты, которые ощущаются телом</li>
                      <li><strong>Bass (60-250Hz):</strong> Основные басовые частоты, фундамент трека</li>
                      <li><strong>Low Mids (250-500Hz):</strong> "Мутные" частоты, часто требуют коррекции</li>
                      <li><strong>Mids (500Hz-2kHz):</strong> Основные инструменты и вокал</li>
                      <li><strong>High Mids (2-6kHz):</strong> Атака и четкость звучания</li>
                      <li><strong>Highs (6-20kHz):</strong> Воздух, блеск и пространство</li>
                  </ul>
                  
                  <div class="interactive-section">
                      <h4>🎯 Практикуйтесь с эквалайзером!</h4>
                      <p>Используйте наш интерактивный тренажер чтобы понять как работает EQ:</p>
                      <button onclick="window.openEQTrainer()" class="interactive-btn">
                          Открыть Тренажер Эквалайзера
                      </button>
                  </div>
              `,
              audioExample: '/audio/eq-basics.mp3',
          },
          {
            id: 18,
            title: 'Практические техники работы с EQ',
            content: `
                <h3>Золотые правила работы с эквалайзером:</h3>
                
                <div class="mixing-techniques">
                    <div class="technique">
                        <h4>📉 Вычитание, а не сложение</h4>
                        <p>Лучше убирать лишние частоты, чем добавлять недостающие</p>
                    </div>
                    <div class="technique">
                        <h4>🎛️ Умеренность</h4>
                        <p>Изменения в ±3dB обычно достаточно</p>
                    </div>
                    <div class="technique">
                        <h4>👂 Слушайте контекст</h4>
                        <p>Всегда проверяйте изменения в контексте всего микса</p>
                    </div>
                </div>
                
                <h3>Типичные проблемы и решения:</h3>
                <table class="eq-table">
                    <thead>
                        <tr>
                            <th>Проблема</th>
                            <th>Частотный диапазон</th>
                            <th>Решение</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Мутный звук</td>
                            <td>200-500Hz</td>
                            <td>Убрать 2-4dB</td>
                        </tr>
                        <tr>
                            <td>Резкий звук</td>
                            <td>2-5kHz</td>
                            <td>Убрать 1-3dB</td>
                        </tr>
                        <tr>
                            <td>Недостаток баса</td>
                            <td>60-120Hz</td>
                            <td>Добавить 2-3dB</td>
                        </tr>
                        <tr>
                            <td>Нет четкости</td>
                            <td>5-8kHz</td>
                            <td>Добавить 1-2dB</td>
                        </tr>
                    </tbody>
                </table>
                
                <h3>Техника "EQ-свипирования":</h3>
                <ol>
                    <li>Создайте узкую полосу усиления (+6-8dB)</li>
                    <li>Медленно "просканируйте" частотный диапазон</li>
                    <li>Найдите проблемные частоты (звучат неприятно)</li>
                    <li>Ослабьте найденные частоты на 2-4dB</li>
                </ol>
                
                <div class="video-wrapper">
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/mPKMHdU6T8A?si=9vZz7LcF6vMpVJfC" title="EQ Techniques" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>
            `,
            audioExample: '/audio/eq-techniques.mp3',
        },
        {
            id: 19,
            title: 'Эффекты: Фильтры, Эхо и Реверберация',
            content: `
                <h3>Творческое использование эффектов в диджеинге</h3>
                
                <div class="mixing-techniques">
                    <div class="technique">
                        <h4>🔧 Фильтры</h4>
                        <p>Плавное изменение частотного спектра для создания напряжения и релиза</p>
                    </div>
                    <div class="technique">
                        <h4>🔁 Эхо/Дилей</h4>
                        <p>Повторение звука с задержкой для создания пространства и ритма</p>
                    </div>
                    <div class="technique">
                        <h4>🏛️ Реверберация</h4>
                        <p>Имитация акустики помещений для добавления глубины</p>
                    </div>
                </div>
                
                <h3>Практическое применение фильтров:</h3>
                <ul>
                    <li><strong>Low Pass Filter:</strong> Плавно убирает высокие частоты - идеально для брейкдаунов</li>
                    <li><strong>High Pass Filter:</strong> Убирает низкие частоты - создает ощущение "подъема"</li>
                    <li><strong>Filter Sweep:</strong> Плавное изменение частоты среза для драматических переходов</li>
                </ul>
                
                <h3>Настройка эхо-эффектов:</h3>
                <div class="controller-layout">
                    <div class="features">
                        <h4>Ключевые параметры:</h4>
                        <ul>
                            <li><strong>Time:</strong> Время между повторениями (синхронизируйте с BPM!)</li>
                            <li><strong>Feedback:</strong> Количество повторений</li>
                            <li><strong>Mix:</strong> Баланс между исходным звуком и эффектом</li>
                        </ul>
                    </div>
                </div>
                
                <div class="interactive-section">
                    <h4>🎧 Экспериментируйте с эффектами!</h4>
                    <p>Попробуйте различные настройки в нашем тренажере эффектов:</p>
                    <button onclick="window.openEffectsTrainer()" class="interactive-btn">
                        Открыть Тренажер Эффектов
                    </button>
                </div>
                
                <div class="note">
                    <p><strong>Совет:</strong> Всегда используйте эффекты умеренно! Слишком много эффектов может испортить микс.</p>
                </div>
            `,
            audioExample: '/audio/effects-basics.mp3',
        },
        {
            id: 20,
            title: 'Продвинутые техники эффектов',
            content: `
                <h3>Создание профессиональных переходов с помощью эффектов</h3>
                
                <h3>Техника "Echo Out":</h3>
                <ol>
                    <li>За 16 тактов до конца трека включите эхо-эффект</li>
                    <li>Установите время задержки в 1/4 или 1/8 от темпа</li>
                    <li>Постепенно увеличивайте уровень эффекта</li>
                    <li>В момент перехода выключите оригинальный трек, оставив только эхо</li>
                    <li>Плавно уберите эффект на следующем треке</li>
                </ol>
                
                <h3>Использование реверберации для переходов:</h3>
                <ul>
                    <li><strong>Short Room:</strong> Для быстрых переходов и добавления энергии</li>
                    <li><strong>Hall:</strong> Для драматических, эпических переходов</li>
                    <li><strong>Plate:</strong> Для вокала и создания "сияющего" эффекта</li>
                </ul>
                
                <h3>Комбинирование эффектов:</h3>
                <div class="mixing-techniques">
                    <div class="technique">
                        <h4>Фильтр + Эхо</h4>
                        <p>Примените low pass фильтр к эхо-эффекту для создания "подводного" звучания</p>
                    </div>
                    <div class="technique">
                        <h4>Реверб + Дилей</h4>
                        <p>Добавьте небольшой дилей к реверберации для более ритмичного пространства</p>
                    </div>
                </div>
                
                <h3>Практическое упражнение:</h3>
                <div class="exercise">
                    <h4>🎯 Создайте переход с использованием эффектов:</h4>
                    <ol>
                        <li>Выберите два совместимых трека</li>
                        <li>Начните с применения high pass фильтра к уходящему треку</li>
                        <li>Добавьте эхо-эффект на последние 8 тактов</li>
                        <li>Используйте реверберацию чтобы "сгладить" переход</li>
                        <li>Практикуйтесь до достижения плавного результата</li>
                    </ol>
                </div>
                
                <div class="video-wrapper">
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/V1KZeG7whis?si=3Lw2K3JQz3vq3pzX" title="Advanced Effects" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>
            `,
            audioExample: '/audio/advanced-effects.mp3',
        }
        ],
      },
];

module.exports = chaptersData;