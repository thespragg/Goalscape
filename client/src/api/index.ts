import { useAuth } from '@/composables/useAuth'
import { UsersEndpoint } from './routes/users'

export class GoalscapeApi {
  public users: UsersEndpoint

  constructor(baseUrl: string, getToken: () => string | null) {
    this.users = new UsersEndpoint(baseUrl, getToken)
  }
}

let apiInstance: GoalscapeApi | null = null

export function useGoalscapeApi() {
  const { authToken } = useAuth()

  if (!apiInstance) {
    const baseUrl = import.meta.env.VITE_GOALSCAPE_API_URL

    if (!baseUrl) {
      throw new Error('VITE_GOALSCAPE_API_URL is not defined in environment variables')
    }

    apiInstance = new GoalscapeApi(baseUrl, () => authToken.value)
  }

  return apiInstance
}
