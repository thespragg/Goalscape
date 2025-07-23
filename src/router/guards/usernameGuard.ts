import { useUsernames } from '@/composables/useUsernames'
import type { NavigationGuardNext, RouteLocation } from 'vue-router'

export const usernameGuard = async (
  to: RouteLocation,
  _from: RouteLocation,
  next: NavigationGuardNext,
) => {
  const accounts = useUsernames()
  const usernames = await accounts.usernames()

  if (!to.meta['requiresUsername'] || usernames.length != 0) {
    return next()
  } else {
    return next({
      name: 'dashboard',
    })
  }
}
