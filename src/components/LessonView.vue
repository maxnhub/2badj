<script setup>
import { useLessonsStore } from '../stores/lessons';
import UiButton from './UiKit/UiButton.vue';
import UiTypography from './UiKit/UiTypography.vue';
import { ref, onMounted, watch, computed } from 'vue';

const store = useLessonsStore();
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
  handleSwipe();
};

const handleSwipe = () => {
  if (touchStartX.value - touchEndX.value > 50) {
    navigateImage(1);
  }
  if (touchEndX.value - touchStartX.value > 50) {
    navigateImage(-1);
  }
};

watch(() => store.currentLessonId, () => {
  if (store.currentLesson) {
    extractImagesFromContent();
  } else {
    modalImages.value = [];
  }
});

onMounted(async () => {
  isLoading.value = true;
  await store.fetchChapters();
  isLoading.value = false;
  if (store.currentLesson) {
    extractImagesFromContent();
  }
  const lessonContent = document.querySelector('.lesson-content');
  if (lessonContent) {
    lessonContent.addEventListener('click', handleImageClick);
  }
});
</script>

<template>
  <div class="lesson-view" v-if="!isLoading && store.currentLesson">
    <div class="lesson-header">
      <UiTypography variant="h2">{{ store.currentLesson.title }}</UiTypography>
      <UiTypography variant="caption">
        Chapter {{ store.currentChapterId || 'N/A' }}: {{ store.currentChapter?.title || 'No Chapter' }} | 
        Lesson {{ currentLessonIndex }} of {{ store.currentChapter?.Lessons?.length || 0 }}
      </UiTypography>
    </div>
    
    <div 
      class="lesson-content" 
      v-html="store.currentLesson.content"
      @click="handleImageClick"
    ></div>
    
    <UiButton 
      v-if="store.hasNextLesson || store.hasNextChapter" 
      @click="store.nextLesson"
      class="next-button"
    >
      Следующий урок →
    </UiButton>

    <div 
      v-if="showImageModal" 
      class="image-modal" 
      @click.self="closeImageModal"
      @touchstart="handleTouchStart"
      @touchend="handleTouchEnd"
    >
      <div class="modal-content">
        <transition name="slide" mode="out-in">
          <img 
            :key="currentImageIndex"
            :src="modalImages[currentImageIndex]?.src" 
            :alt="modalImages[currentImageIndex]?.alt"
          >
        </transition>
        
        <div v-if="modalImages.length > 1" class="slider-thumbnails">
          <div 
            v-for="(img, index) in modalImages"
            :key="index"
            class="thumbnail"
            :class="{ active: index === currentImageIndex }"
            @click="currentImageIndex = index"
          >
            <img :src="img.src" :alt="img.alt">
          </div>
        </div>
        
        <button class="close-btn" @click.stop="closeImageModal">
          ×
        </button>
        
        <div class="image-counter" v-if="modalImages.length > 1">
          {{ currentImageIndex + 1 }} / {{ modalImages.length }}
        </div>
      </div>
    </div>
  </div>
  <div v-else-if="isLoading" class="loading">
    <UiTypography variant="h3">Загрузка...</UiTypography>
  </div>
  <div v-else class="error">
    <UiTypography variant="h3">Ошибка: Урок не найден</UiTypography>
  </div>
</template>

<style scoped>
.lesson-view {
  max-width: 1000px;
  margin: 100px auto;
  padding: 30px;
  background: var(--text-light);
  border-radius: 12px;
  box-shadow: 0 4px 20px var(--shadow);
}

.lesson-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 1px solid var(--text-secondary);
}

.next-button {
  margin-top: 40px;
  display: block;
  width: 100%;
}

:deep(.lesson-content) {
  line-height: 1.7;
  color: var(--neutral-dark);
}

:deep(.shortcuts-grid) {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 12px;
  margin: 20px 0;
  background: var(--background-light);
  padding: 15px;
  border-radius: 8px;
}

:deep(kbd) {
  background: var(--primary-dark);
  color: var(--text-light);
  padding: 3px 6px;
  border-radius: 4px;
  font-family: monospace;
}

:deep(.note) {
  background: var(--background-light);
  border-left: 4px solid var(--accent);
  padding: 12px 15px;
  margin: 20px 0;
  border-radius: 0 4px 4px 0;
}

:deep(a) {
  color: var(--primary-light);
  text-decoration: none;
}

:deep(a:hover) {
  text-decoration: underline;
}

:deep(.lesson-image) {
  max-width: 100%;
  border-radius: 8px;
  margin: 15px 0;
  box-shadow: 0 4px 12px var(--shadow);
}

:deep(.controller-layout) {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 20px 0;
}

:deep(.controller-images) {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

:deep(.controller-images img) {
  max-width: 300px;
  border-radius: 8px;
  border: 1px solid var(--text-secondary);
}

:deep(.features) {
  flex: 1;
}

:deep(.video-wrapper) {
  position: relative;
  padding-bottom: 56.25%;
  margin: 25px 0;
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