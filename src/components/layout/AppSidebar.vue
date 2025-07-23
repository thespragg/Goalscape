<template>
  <Drawer :modal="false" :style="{ width: 'calc(var(--spacing) * 80)' }" :visible="sidebarVisible">
    <template #container>
      <div class="flex flex-col h-full">
        <div class="flex items-center justify-between px-6 shrink-0 h-16">
          <span class="font-semibold text-2xl text-primary">Osrs Tracker</span>
        </div>
        <div class="overflow-y-auto border-t border-slate-300">
          <ul class="list-none p-0 m-0 overflow-hidden">
            <li>
              <a
                v-ripple
                class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
              >
                <i class="pi pi-folder mr-2"></i>
                <span class="font-medium">Projects</span>
              </a>
            </li>
            <li>
              <a
                v-ripple
                class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
              >
                <i class="pi pi-chart-bar mr-2"></i>
                <span class="font-medium">Performance</span>
              </a>
            </li>
            <li>
              <a
                v-ripple
                class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
              >
                <i class="pi pi-cog mr-2"></i>
                <span class="font-medium">Settings</span>
              </a>
            </li>
          </ul>
        </div>
        <div class="mt-auto">
          <hr class="mb-4 mx-4 border-t border-0 border-surface-200 dark:border-surface-700" />
          <a
            v-ripple
            class="m-4 flex items-center cursor-pointer p-4 gap-2 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
          >
            <span class="font-bold">username</span>
          </a>
        </div>
      </div>
    </template>
  </Drawer>
</template>

<script setup lang="ts">
import { useUsernames } from '@/composables/useUsernames'
import { useLayout } from '@/composables/useLayout'

const { sidebarVisible } = useLayout()
const accounts = useUsernames()
const usernames = await accounts.usernames()
console.log({ usernames })
</script>
