<template>
  <Suspense>
    <RouterView />
  </Suspense>
  <Toast />
</template>

<script setup lang="ts">
import Toast from 'primevue/toast'
import { onMounted, ref } from 'vue'
import { supabase } from '@/lib/supabase'

const session = ref()

onMounted(() => {
  supabase.auth.getSession().then(({ data }) => {
    session.value = data.session
  })

  supabase.auth.onAuthStateChange((_, _session) => {
    session.value = _session
  })
})
</script>
