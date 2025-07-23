<template>
  <Chip
    :label="`${requirement.icon} ${requirement.value}`"
    :class="requirement.met ? 'requirement-met' : 'requirement-unmet'"
    size="small"
  />
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import Chip from 'primevue/chip'
import type { Requirement } from '@/stores/todoStore'

defineProps<{ requirement: Requirement }>()
</script>

<style scoped>
@reference "@/assets/main.css";

.requirement-met {
  @apply bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100;
}

.requirement-unmet {
  @apply bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100;
}
</style>
