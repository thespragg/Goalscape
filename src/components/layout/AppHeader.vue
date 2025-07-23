<template>
  <Toolbar class="sticky top-0 z-50 w-full shadow-sm bg-white dark:bg-gray-800">
    <template #start>
      <Button
        :icon="isMobile ? 'pi pi-bars' : sidebarVisible ? 'pi pi-times' : 'pi pi-bars'"
        severity="secondary"
        text
        @click="toggleSidebar"
      />
      <span v-if="!isMobile" class="font-semibold ml-3 text-gray-900 dark:text-white">
        {{ currentRouteTitle }}
      </span>
    </template>
    <template #center v-if="isMobile">
      <span class="font-semibold text-gray-900 dark:text-white">
        {{ currentRouteTitle }}
      </span>
    </template>
  </Toolbar>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import Toolbar from 'primevue/toolbar'
import { computed } from 'vue'
import { useLayout } from '@/composables/useLayout'

const { sidebarVisible, isMobile, toggleSidebar } = useLayout()

const currentRouteTitle = computed(() => {
  return ''
})
</script>
