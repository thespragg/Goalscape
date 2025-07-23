<template>
  <Panel header="Skill Progress" class="h-full">
    <div class="flex flex-col gap-3">
      <Card v-for="skill in skills" :key="skill.name" class="skill-card">
        <template #content>
          <SkillProgressItem :skill="skill" />
        </template>
      </Card>
    </div>
  </Panel>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Panel from 'primevue/panel'
import Card from 'primevue/card'
import SkillProgressItem from './SkillProgressItem.vue'

const skills = ref([
  {
    name: 'Attack',
    icon: '⚔️',
    currentXp: 1234567,
    goalXp: 2000000,
    dailyAverage: 15000,
    daysRemaining: 51,
  },
  // ... other skills
])
</script>
