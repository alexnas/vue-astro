<script setup lang="ts">
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
</script>

<template>
  <div class="flex flex-col h-screen bg-gray-200 font-roboto">
    <app-header />
    <main class="flex flex-1 overflow-auto">
      <router-view />
    </main>

    <app-footer />
  </div>
</template>

<style scoped></style>
