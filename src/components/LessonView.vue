<script setup>
import { useLessonsStore } from '../stores/lessons';
import { useLanguageStore } from '../stores/language';
import UiButton from './UiKit/UiButton.vue';
import UiTypography from './UiKit/UiTypography.vue';
import BeatMatchingTrainer from './BeatMatchingTrainer.vue';
import EQTrainer from './EQTrainer.vue';
import EffectsTrainer from './EffectsTrainer.vue';
import { ref, onMounted, watch, computed, nextTick } from 'vue';

const store = useLessonsStore();
const languageStore = useLanguageStore();
const modalImages = ref([]);
const showImageModal = ref(false);
const currentImageIndex = ref(0);
const touchStartX = ref(0);
const touchEndX = ref(0);
const isLoading = ref(true);

// Состояния для тренажеров
const showBeatMatchingTrainer = ref(false);
const showEQTrainer = ref(false);
const showEffectsTrainer = ref(false);

const currentLessonIndex = computed(() => {
  const chapter = store.currentChapter;
  const lessonIndex = chapter?.Lessons?.findIndex(lesson => lesson.id === store.currentLessonId);
  return lessonIndex !== -1 ? lessonIndex + 1 : 1;
});

const lessonText = computed(() => languageStore.getTranslation('lesson'));
const nextLessonText = computed(() => languageStore.getTranslation('nextLesson'));

// Функции для открытия тренажеров
const openBeatMatchingTrainer = () => {
  showBeatMatchingTrainer.value = true;
};

const openEQTrainer = () => {
  showEQTrainer.value = true;
};

const openEffectsTrainer = () => {
  showEffectsTrainer.value = true;
};

// Функция для закрытия всех тренажеров
const closeTrainer = () => {
  showBeatMatchingTrainer.value = false;
  showEQTrainer.value = false;
  showEffectsTrainer.value = false;
};

// Универсальный обработчик кликов
const handleContentClick = (event) => {
  // Обработка кликов по изображениям
  if (event.target.tagName === 'IMG' && event.target.src && !event.target.src.startsWith('data:')) {
    const index = Array.from(document.querySelectorAll('.lesson-content img'))
      .filter(img => img.src && !img.src.startsWith('data:'))
      .findIndex(img => img === event.target);
    if (index !== -1) {
      openImageModal(index);
    }
    return;
  }

  // Обработка кликов по интерактивным кнопкам
  const button = event.target.closest('[data-action]');
  if (button) {
    event.preventDefault();
    event.stopPropagation();
    
    const action = button.getAttribute('data-action');
    switch (action) {
      case 'beat-matching':
        openBeatMatchingTrainer();
        break;
      case 'eq-trainer':
        openEQTrainer();
        break;
      case 'effects-trainer':
        openEffectsTrainer();
        break;
    }
    return;
  }

  // Обработка старых кнопок с onclick (для обратной совместимости)
  const oldButton = event.target.closest('button[onclick]');
  if (oldButton) {
    event.preventDefault();
    event.stopPropagation();
    
    const onclickText = oldButton.getAttribute('onclick');
    if (onclickText) {
      if (onclickText.includes('openBeatMatchingTrainer')) {
        openBeatMatchingTrainer();
      } else if (onclickText.includes('openEQTrainer')) {
        openEQTrainer();
      } else if (onclickText.includes('openEffectsTrainer')) {
        openEffectsTrainer();
      }
    }
  }
};

// Заменяем onclick атрибуты на data-атрибуты
const processContentButtons = () => {
  if (!store.currentLesson?.content) return;
  
  nextTick(() => {
    const lessonContent = document.querySelector('.lesson-content');
    if (!lessonContent) return;
    
    const buttons = lessonContent.querySelectorAll('button[onclick]');
    buttons.forEach(button => {
      const onclick = button.getAttribute('onclick');
      if (onclick.includes('openBeatMatchingTrainer')) {
        button.removeAttribute('onclick');
        button.setAttribute('data-action', 'beat-matching');
        button.classList.add('interactive-btn');
      } else if (onclick.includes('openEQTrainer')) {
        button.removeAttribute('onclick');
        button.setAttribute('data-action', 'eq-trainer');
        button.classList.add('interactive-btn');
      } else if (onclick.includes('openEffectsTrainer')) {
        button.removeAttribute('onclick');
        button.setAttribute('data-action', 'effects-trainer');
        button.classList.add('interactive-btn');
      }
    });
  });
};

const extractImagesFromContent = () => {
  if (!store.currentLesson?.content) {
    modalImages.value = [];
    return;
  }
  const parser = new DOMParser();
  const doc = parser.parseFromString(store.currentLesson.content, 'text/html');
  const images = Array.from(doc.querySelectorAll('img'))
    .filter(img => img.src && !img.src.startsWith('data:'))
    .map(img => ({
      src: img.src,
      alt: img.alt || 'Изображение урока',
    }));
  modalImages.value = images;
};

const openImageModal = (index) => {
  if (index >= 0 && index < modalImages.value.length) {
    currentImageIndex.value = index;
    showImageModal.value = true;
    document.body.style.overflow = 'hidden';
  }
};

const closeImageModal = () => {
  showImageModal.value = false;
  currentImageIndex.value = 0;
  document.body.style.overflow = '';
};

const navigateImage = (direction) => {
  const newIndex = currentImageIndex.value + direction;
  if (newIndex >= 0 && newIndex < modalImages.value.length) {
    currentImageIndex.value = newIndex;
  }
};

const handleTouchStart = (e) => {
  touchStartX.value = e.changedTouches[0].screenX;
};

const handleTouchEnd = (e) => {
  touchEndX.value = e.changedTouches[0].screenX;
  const deltaX = touchStartX.value - touchEndX.value;
  if (deltaX > 50) {
    navigateImage(1); // Swipe left
  } else if (deltaX < -50) {
    navigateImage(-1); // Swipe right
  }
};

onMounted(() => {
  store.fetchChapters().then(() => {
    isLoading.value = false;
    extractImagesFromContent();
    processContentButtons();
  });
});

watch(
  () => store.currentLesson,
  () => {
    extractImagesFromContent();
    // Закрываем все тренажеры при смене урока
    closeTrainer();
    
    // Обрабатываем кнопки после обновления контента
    nextTick(() => {
      processContentButtons();
    });
  }
);
</script>

<template>
  <div class="lesson-view">
    <div v-if="isLoading" class="loading">
      <UiTypography variant="h3">Загрузка...</UiTypography>
    </div>
    
    <!-- Тренажер Beat Matching -->
    <div v-if="showBeatMatchingTrainer" class="trainer-overlay">
      <div class="trainer-header">
        <UiButton @click="closeTrainer" variant="secondary">
          ← Назад к уроку
        </UiButton>
        <UiTypography variant="h2">Beat Matching Тренажер</UiTypography>
      </div>
      <BeatMatchingTrainer />
    </div>

    <!-- Тренажер Эквалайзера -->
    <div v-else-if="showEQTrainer" class="trainer-overlay">
      <div class="trainer-header">
        <UiButton @click="closeTrainer" variant="secondary">
          ← Назад к уроку
        </UiButton>
        <UiTypography variant="h2">🎛️ Тренажер Эквалайзера</UiTypography>
      </div>
      <EQTrainer />
    </div>

    <!-- Тренажер Эффектов -->
    <div v-else-if="showEffectsTrainer" class="trainer-overlay">
      <div class="trainer-header">
        <UiButton @click="closeTrainer" variant="secondary">
          ← Назад к уроку
        </UiButton>
        <UiTypography variant="h2">🎛️ Тренажер Эффектов</UiTypography>
      </div>
      <EffectsTrainer />
    </div>

    <!-- Основной контент урока -->
    <div 
      v-else-if="!isLoading && store.currentLesson" 
      class="lesson-content" 
      @click="handleContentClick"
    >
      <UiTypography variant="h2">{{ store.currentLesson.title }}</UiTypography>
      <UiTypography variant="body1" class="lesson-number">
        {{ lessonText }} {{ currentLessonIndex }} из {{ store.currentChapter?.Lessons?.length }}
      </UiTypography>
      
      <div v-html="store.currentLesson.content"></div>
      
      <!-- Практические секции для разных уроков -->
      <div v-if="[6, 11].includes(store.currentLesson.id)" class="practice-section">
        <UiTypography variant="h3">🎵 Практическое задание</UiTypography>
        <UiButton @click="openBeatMatchingTrainer" variant="primary" size="large">
          🎧 Открыть Beat Matching Тренажер
        </UiButton>
        <p>Потренируйтесь синхронизировать биты двух треков с разным BPM</p>
      </div>
      
      <div v-else-if="[17, 18].includes(store.currentLesson.id)" class="practice-section">
        <UiTypography variant="h3">🎛️ Практическое задание</UiTypography>
        <UiButton @click="openEQTrainer" variant="primary" size="large">
          📊 Открыть Тренажер Эквалайзера
        </UiButton>
        <p>Изучите работу эквалайзера на практике с визуализацией спектра</p>
      </div>
      
      <div v-else-if="[19, 20].includes(store.currentLesson.id)" class="practice-section">
        <UiTypography variant="h3">🎧 Практическое задание</UiTypography>
        <UiButton @click="openEffectsTrainer" variant="primary" size="large">
          🔥 Открыть Тренажер Эффектов
        </UiButton>
        <p>Экспериментируйте с фильтрами, эхо и реверберацией в реальном времени</p>
      </div>
      
      <audio
        v-if="store.currentLesson.audioExample"
        :src="store.currentLesson.audioExample"
        controls
        class="audio-player"
      ></audio>
      
      <UiButton
        v-if="store.hasNextLesson || store.hasNextChapter"
        variant="primary"
        @click="store.nextLesson"
      >
        {{ nextLessonText }}
      </UiButton>
    </div>
    
    <div v-else class="error">
      <UiTypography variant="h3">Урок не найден</UiTypography>
    </div>

    <!-- Модальное окно для изображений -->
    <div v-if="showImageModal" class="image-modal" @touchstart="handleTouchStart" @touchend="handleTouchEnd">
      <transition name="slide">
        <div class="modal-content" :key="currentImageIndex">
          <button class="close-btn" @click="closeImageModal">&times;</button>
          <img
            :src="modalImages[currentImageIndex].src"
            :alt="modalImages[currentImageIndex].alt"
            @click.stop
          />
          <div class="image-counter">
            {{ currentImageIndex + 1 }} / {{ modalImages.length }}
          </div>
          <div class="slider-thumbnails">
            <div
              v-for="(image, index) in modalImages"
              :key="index"
              class="thumbnail"
              :class="{ active: index === currentImageIndex }"
              @click="currentImageIndex = index"
            >
              <img :src="image.src" :alt="image.alt" />
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped>
.lesson-view {
  max-width: 1000px;
  margin: 80px auto 20px;
  padding: 0 20px;
}

.lesson-content {
  background: var(--background-light);
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 8px var(--shadow);
}

.audio-player {
  width: 100%;
  margin: 20px 0;
  outline: none;
}

.lesson-number {
  color: var(--text-secondary);
  margin-bottom: 20px;
}

:deep(.lesson-content h3) {
  margin: 25px 0 15px;
  color: var(--text-primary);
}

:deep(.lesson-content p) {
  margin-bottom: 15px;
}

:deep(.lesson-content ul, :deep(.lesson-content ol)) {
  margin: 15px 0;
  padding-left: 30px;
}

:deep(.lesson-content li) {
  margin-bottom: 10px;
}

:deep(.lesson-content kbd) {
  background-color: var(--background);
  border: 1px solid var(--text-secondary);
  border-radius: 4px;
  padding: 2px 6px;
  font-size: 14px;
  font-family: monospace;
  color: var(--text-primary);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

:deep(.shortcuts-grid) {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 10px;
  margin: 20px 0;
}

:deep(.shortcuts-grid div) {
  background: var(--background);
  padding: 10px;
  border-radius: 4px;
  text-align: center;
}

:deep(.note) {
  background: var(--background);
  padding: 15px;
  border-radius: 8px;
  border-left: 4px solid var(--primary-light);
  margin: 20px 0;
}

:deep(.controller-images) {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin: 20px 0;
}

:deep(.lesson-image) {
  max-width: 100%;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s;
}

:deep(.lesson-image:hover) {
  transform: scale(1.02);
}

:deep(.video-wrapper) {
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  margin: 20px 0;
}

:deep(.video-wrapper iframe) {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 8px;
}

:deep(.mixing-techniques) {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin: 30px 0;
}

:deep(.technique) {
  background: var(--background-light);
  padding: 20px;
  border-radius: 8px;
  border-left: 4px solid var(--primary-light);
}

:deep(.eq-table) {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  background: var(--background);
  border-radius: 8px;
  overflow: hidden;
}

:deep(.eq-table th) {
  background: var(--primary-medium);
  color: var(--text-light);
  padding: 12px;
  text-align: left;
  font-weight: 600;
}

:deep(.eq-table td) {
  padding: 10px 12px;
  border-bottom: 1px solid var(--neutral-medium);
}

:deep(.eq-table tr:hover) {
  background: var(--background-light);
}

:deep(.exercise) {
  background: var(--background);
  padding: 20px;
  border-radius: 8px;
  border: 2px solid var(--primary-light);
  margin: 20px 0;
}

:deep(.exercise h4) {
  color: var(--primary-dark);
  margin-bottom: 15px;
}

:deep(.interactive-btn) {
  background: linear-gradient(135deg, var(--primary-light), var(--primary-medium-dark));
  color: var(--text-light);
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.3s ease;
  margin: 10px 0;
  display: inline-block;
  text-decoration: none;
}

:deep(.interactive-btn:hover) {
  transform: translateY(-2px);
  background: linear-gradient(135deg, var(--primary-medium), var(--primary-dark));
  box-shadow: 0 6px 12px var(--shadow);
}

:deep(.interactive-section) {
  background: var(--background);
  padding: 20px;
  border-radius: 8px;
  border-left: 4px solid var(--primary-light);
  margin: 25px 0;
  text-align: center;
}

:deep(.interactive-section h4) {
  color: var(--primary-dark);
  margin-bottom: 15px;
}

.image-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  position: relative;
  width: 90%;
  max-width: 900px;
  max-height: 90vh;
  text-align: center;
}

.modal-content img {
  max-width: 100%;
  max-height: 70vh;
  object-fit: contain;
  border-radius: 8px;
  display: block;
  margin: 0 auto;
}

.close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: var(--text-light);
  font-size: 40px;
  cursor: pointer;
  padding: 0 15px;
  z-index: 2;
}

.close-btn:hover {
  color: var(--text-secondary);
}

.image-counter {
  position: absolute;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  color: var(--text-light);
  background: rgba(0, 0, 0, 0.5);
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 14px;
}

.slider-thumbnails {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 20px;
  overflow-x: auto;
  padding: 10px 0;
  max-width: 100%;
}

.thumbnail {
  width: 60px;
  height: 60px;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  opacity: 0.7;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.thumbnail:hover {
  opacity: 1;
}

.thumbnail.active {
  opacity: 1;
  border-color: var(--primary-light);
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.slide-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.loading, .error {
  max-width: 1000px;
  margin: 100px auto;
  padding: 30px;
  text-align: center;
}

.practice-section {
  background: var(--background);
  padding: 25px;
  border-radius: 12px;
  border-left: 4px solid var(--primary-light);
  margin: 30px 0;
  text-align: center;
}

.trainer-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--background-light);
  z-index: 1000;
  overflow-y: auto;
}

.trainer-header {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px;
  background: var(--primary-dark);
  color: var(--text-light);
  position: sticky;
  top: 0;
  z-index: 1001;
}

.trainer-header button {
  margin-right: auto;
}

@media (max-width: 768px) {
  .lesson-view {
    margin: 60px auto 10px;
    padding: 0 10px;
  }
  
  .lesson-content {
    padding: 20px;
  }
  
  .trainer-header {
    flex-direction: column;
    gap: 10px;
    text-align: center;
  }
  
  .trainer-header button {
    margin-right: 0;
    align-self: flex-start;
  }
  
  :deep(.interactive-btn) {
    padding: 10px 20px;
    font-size: 14px;
  }
}
</style>