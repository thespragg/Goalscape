<template>
  <div class="flex min-h-screen">
    <AppSidebar />
    <div class="flex-1 flex flex-col transition-all duration-300" :class="mainContentClasses">
      <AppHeader />
      <main class="flex-1 p-6 overflow-y-auto bg-gray-50 dark:bg-gray-900">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import AppSidebar from './AppSidebar.vue'
import AppHeader from './AppHeader.vue'
import { useLayout } from '@/composables/useLayout'

const { isMobile, sidebarVisible } = useLayout()

const mainContentClasses = computed(() => {
  return {
    'ml-0': !sidebarVisible.value || isMobile.value,
    'ml-80': sidebarVisible.value && !isMobile.value,
  }
})
</script>
