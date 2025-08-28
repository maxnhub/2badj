<script setup>
import { useLessonsStore } from '../stores/lessons';
import { useLanguageStore } from '../stores/language';
import UiButton from './UiKit/UiButton.vue';
import UiTypography from './UiKit/UiTypography.vue';
import { ref, onMounted, watch, computed } from 'vue';

const store = useLessonsStore();
const languageStore = useLanguageStore();
const modalImages = ref([]);
const showImageModal = ref(false);
const currentImageIndex = ref(0);
const touchStartX = ref(0);
const touchEndX = ref(0);
const isLoading = ref(true);

const currentLessonIndex = computed(() => {
  const chapter = store.currentChapter;
  const lessonIndex = chapter?.Lessons?.findIndex(lesson => lesson.id === store.currentLessonId);
  return lessonIndex !== -1 ? lessonIndex + 1 : 1;
});

const lessonText = computed(() => languageStore.getTranslation('lesson'));
const nextLessonText = computed(() => languageStore.getTranslation('nextLesson'));

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

const handleImageClick = (e) => {
  if (e.target.tagName === 'IMG' && e.target.src && !e.target.src.startsWith('data:')) {
    const index = Array.from(document.querySelectorAll('.lesson-content img'))
      .filter(img => img.src && !img.src.startsWith('data:'))
      .findIndex(img => img === e.target);
    if (index !== -1) {
      openImageModal(index);
    }
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
  });
});

watch(
  () => store.currentLesson,
  () => {
    extractImagesFromContent();
  }
);
</script>

<template>
  <div class="lesson-view">
    <div v-if="isLoading" class="loading">
      <UiTypography variant="h3">Загрузка...</UiTypography>
    </div>
    <div v-else-if="store.currentLesson" class="lesson-content" @click="handleImageClick">
      <UiTypography variant="h2">{{ store.currentLesson.title }}</UiTypography>
      <UiTypography variant="body1" class="lesson-number">
        {{ lessonText }} {{ currentLessonIndex }} из {{ store.currentChapter?.Lessons?.length }}
      </UiTypography>
      <div v-html="store.currentLesson.content" />
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
</style>