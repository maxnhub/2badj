<script setup>
import BurgerMenu from './BurgerMenu.vue'
import UiTypography from './UiKit/UiTypography.vue'
</script>

<template>
  <header class="app-header">
    <div class="header-content">
      <BurgerMenu />
      <UiTypography variant="h1">How 2B a DJ</UiTypography>
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
</style>