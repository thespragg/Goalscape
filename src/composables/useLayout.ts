import { ref, onMounted, onUnmounted } from 'vue'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

const breakpoints = useBreakpoints(breakpointsTailwind)
const isMobile = breakpoints.smaller('sm')
const sidebarVisible = ref(true)

export function useLayout() {
  const checkMobile = () => {
    if (!isMobile.value) {
      sidebarVisible.value = true
    }
  }

  onMounted(() => {
    window.addEventListener('resize', checkMobile)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', checkMobile)
  })

  return {
    sidebarVisible,
    isMobile,
    toggleSidebar: () => {
      sidebarVisible.value = !sidebarVisible.value
    },
  }
}
