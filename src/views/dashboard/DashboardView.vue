<template>
  <div class="dashboard-content">
    <div class="hidden lg:grid lg:grid-cols-12 lg:gap-6">
      <div class="lg:col-span-4">
        <SkillProgressPanel />
      </div>

      <div class="lg:col-span-8">
        <TodoListPanel />
      </div>
    </div>

    <div class="block lg:hidden">
      <SkillProgressPanel class="mb-6" />
      <TodoListPanel />
    </div>
  </div>
</template>

<script setup lang="ts">
import SkillProgressPanel from './components/SkillProgressPanel.vue'
import TodoListPanel from './components/TodoListPanel.vue'
</script>
