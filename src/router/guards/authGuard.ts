import { supabase } from '@/lib/supabase'
import type { NavigationGuardNext, RouteLocation } from 'vue-router'

export const authGuard = async (
  to: RouteLocation,
  _from: RouteLocation,
  next: NavigationGuardNext,
) => {
  const user = await supabase.auth.getUser()
  if (!to.meta['requiresAuth'] || user.data.user !== null) {
    return next()
  } else {
    return next({ name: 'login' })
  }
}
