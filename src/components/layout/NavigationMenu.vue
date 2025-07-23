<template>
  <nav class="px-4">
    <ul class="list-none p-0 m-0">
      <li v-for="item in navItems" :key="item.route" class="mb-1">
        <Button
          :label="item.label"
          :icon="item.icon"
          class="w-full justify-start"
          :severity="isActive(item.route) ? 'primary' : 'secondary'"
          :outlined="!isActive(item.route)"
          text
          @click="navigateTo(item.route)"
        />
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import Button from 'primevue/button'
import { useAccountStore } from '@/stores/accountStore'
import { useLayout } from '@/composables/useLayout'

const router = useRouter()
const route = useRoute()
const accountStore = useAccountStore()
const { isMobile, sidebarVisible } = useLayout()

const navItems = [
  { label: 'Dashboard', icon: 'pi pi-home', route: 'dashboard' },
  { label: 'Lists', icon: 'pi pi-list', route: 'lists' },
  { label: 'Skill Progression', icon: 'pi pi-chart-line', route: 'skill-progression' },
]

const isActive = (routeName: string) => route.name === routeName

const navigateTo = (routeName: string) => {
  if (!accountStore.hasAccounts && routeName !== 'dashboard') {
    accountStore.showAccountWarning()
    return
  }
  router.push({ name: routeName })
  if (isMobile.value) {
    sidebarVisible.value = false
  }
}
</script>
