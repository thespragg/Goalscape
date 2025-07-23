import { defineStore } from 'pinia'
import { ref } from 'vue'

export type Todo = {
  completed: boolean
  requirements: Requirement[]
  title: string
}

export type Requirement = {
  type: 'skill' | 'resource'
  value: number
  label: string
  unit: string
  icon: string
  met: boolean
}

export const useTodoStore = defineStore('todo', () => {
  const todos = ref<Todo[]>([
    {
      completed: false,
      title: 'Complete Falador Elite Diary',
      requirements: [
        {
          type: 'skill',
          value: 85,
          met: false,
          icon: '⚔️',
          label: 'Attack',
          unit: '',
        },
      ],
    },
  ])

  return { todos }
})
