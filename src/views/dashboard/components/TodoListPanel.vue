<template>
  <Panel header="Active Todo List" class="h-full">
    <div class="flex flex-col gap-3">
      <TodoItem v-for="todo in todoStore.todos" :key="todo.title" :todo="todo" />
    </div>
  </Panel>
</template>

<script setup lang="ts">
import Panel from 'primevue/panel'
import TodoItem from './TodoItem.vue'
import { useTodoStore } from '@/stores/todoStore'

const todoStore = useTodoStore()
</script>
