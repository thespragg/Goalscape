<template>
  <div class="mb-4">
    <label class="block text-sm font-medium mb-2">Current Account</label>
    <div v-if="hasAccounts">
      <Button
        :label="selectedAccount || 'Select Account'"
        icon="pi pi-user"
        iconPos="left"
        class="w-full justify-content-start account-selector"
        severity="secondary"
        outlined
        @click="toggleAccountMenu"
        ref="accountButton"
      >
        <template #default>
          <span class="flex-grow-1 text-left">{{ selectedAccount || 'Select Account' }}</span>
          <i :class="accountMenuVisible ? 'pi pi-chevron-up' : 'pi pi-chevron-down'"></i>
        </template>
      </Button>

      <Menu ref="accountMenu" :model="accountMenuItems" :popup="true" class="w-full" />
    </div>

    <Message v-else severity="info" class="mb-3"> Add an account to get started </Message>

    <Button
      label="Add Account"
      icon="pi pi-plus"
      size="small"
      class="w-full mt-2"
      @click="showAddAccountDialog = true"
    />
  </div>
</template>

<script setup lang="ts">
import { useAccountStore } from '@/stores/accountStore'
import type { MenuItem } from 'primevue/menuitem'
import { computed, ref } from 'vue'

const showAddAccountDialog = ref(false)
const accountMenuVisible = ref(false)

const accountStore = useAccountStore()

const selectedAccount = ref('')
const hasAccounts = computed(() => accountStore.accounts.length > 0)

const accountMenuItems = computed<MenuItem[]>(() => {
  if (!accountStore.accounts.length) return []

  return accountStore.accounts.map((account) => ({
    label: account.username,
    command: () => {
      accountStore.selectAccount(account.username)
      accountMenuVisible.value = false
    },
  }))
})

const toggleAccountMenu = () => (accountMenuVisible.value = false)
</script>
