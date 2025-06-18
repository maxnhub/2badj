<script setup>
import { useLessonsStore } from '../stores/lessons'
import { ref } from 'vue'
import UiTypography from './UiKit/UiTypography.vue'

const store = useLessonsStore()
const openChapters = ref([])

const toggleChapter = (chapterId) => {
  if (openChapters.value.includes(chapterId)) {
    openChapters.value = openChapters.value.filter(id => id !== chapterId)
  } else {
    openChapters.value.push(chapterId)
  }
}
</script>

<template>
  <button class="burger-menu" @click="store.toggleMenu">
    <span class="burger-line"></span>
    <span class="burger-line"></span>
    <span class="burger-line"></span>
  </button>

  <div class="menu-overlay" :class="{ open: store.isMenuOpen }" @click="store.toggleMenu">
    <div class="menu-content" @click.stop>
      <UiTypography variant="h2">Lessons</UiTypography>
      <div v-for="chapter in store.chapters" :key="chapter.id" class="chapter">
        <UiTypography 
          variant="h3" 
          class="chapter-title" 
          @click="toggleChapter(chapter.id)"
        >
          {{ chapter.title }}
        </UiTypography>
        <ul v-if="openChapters.includes(chapter.id)">
          <li 
            v-for="lesson in chapter.lessons" 
            :key="lesson.id" 
            @click="store.setLesson(chapter.id, lesson.id)"
            :class="{ active: store.currentChapterId === chapter.id && store.currentLessonId === lesson.id }"
          >
            {{ lesson.title }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.burger-menu {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 24px;
  width: 30px;
  padding: 0;
}

.burger-line {
  display: block;
  width: 100%;
  height: 3px;
  background-color: var(--text-light);
}

.menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.menu-overlay.open {
  opacity: 1;
  pointer-events: all;
}

.menu-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 300px;
  height: 100%;
  background-color: var(--primary-dark);
  color: var(--text-light);
  padding: 20px;
  transform: translateX(-100%);
  transition: transform 0.3s ease;
}

.menu-overlay.open .menu-content {
  transform: translateX(0);
}

.chapter {
  margin-bottom: 20px;
}

.chapter-title {
  cursor: pointer;
  padding: 10px 0;
  border-bottom: 1px solid var(--primary-medium-dark);
}

.chapter-title:hover {
  color: var(--accent);
}

ul {
  list-style: none;
  padding: 0;
  margin-left: 10px;
}

li {
  padding: 10px 0;
  cursor: pointer;
  border-bottom: 1px solid var(--primary-medium-dark);
}

li:hover, li.active {
  color: var(--accent);
}
</style>