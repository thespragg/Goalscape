<template>
  <div class="flex items-center gap-3">
    <Avatar :label="skill.icon" shape="circle" size="large" />
    <div class="flex-grow">
      <div class="font-semibold mb-1">{{ skill.name }}</div>
      <div class="text-sm text-color-secondary mb-2">
        <span :title="xpTitle">
          {{ formatXp(skill.currentXp) }} / {{ formatXp(skill.goalXp) }}
        </span>
      </div>
      <ProgressBar :value="xpPercentage" :showValue="false" class="mb-2" style="height: 0.5rem" />
      <div class="flex justify-between text-sm text-color-secondary">
        <span>{{ formatXp(skill.dailyAverage) }}/day</span>
        <Chip :label="`${skill.daysRemaining}d left`" size="small" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Avatar from 'primevue/avatar'
import ProgressBar from 'primevue/progressbar'
import Chip from 'primevue/chip'

const props = defineProps<{
  skill: {
    currentXp: number
    goalXp: number
    dailyAverage: number
    daysRemaining: number
    name: string
    icon: string
  }
}>()

const xpPercentage = computed(() => (props.skill.currentXp / props.skill.goalXp) * 100)

const xpTitle = computed(
  () => `${props.skill.currentXp.toLocaleString()} / ${props.skill.goalXp.toLocaleString()} XP`,
)

const formatXp = (xp: number) => {
  if (xp >= 1000000) return (xp / 1000000).toFixed(1) + 'M'
  if (xp >= 1000) return (xp / 1000).toFixed(0) + 'K'
  return xp.toString()
}
</script>
