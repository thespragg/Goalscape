<template>
  <Card class="todo-card">
    <template #content>
      <div class="flex gap-3">
        <Checkbox :binary="true" />
        <div class="flex-grow">
          <div class="font-medium mb-3">{{ todo.title }}</div>
          <div class="flex flex-wrap gap-2">
            <RequirementChip v-for="req in todo.requirements" :key="req.label" :requirement="req" />
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import Card from 'primevue/card'
import Checkbox from 'primevue/checkbox'
import RequirementChip from './RequirementChip.vue'
import type { Todo } from '@/stores/todoStore'

defineProps<{
  todo: Todo
}>()
</script>
