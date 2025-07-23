import { readonly, ref } from 'vue'
import { createClient, type SupabaseClient } from '@supabase/supabase-js'
export interface Username {
  id: string
  created_at: string
  username: string
  email: string
}

export interface CreateUsernameData {
  username: string
  email: string
}

export interface UpdateUsernameData {
  username?: string
  email?: string
}

export interface GetAllOptions {
  refresh?: boolean
}

const supabaseUrl = import.meta.env['VITE_SUPABASE_URL']
const supabaseAnonKey = import.meta.env['VITE_SUPABASE_ANON_KEY']

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey)

export const useUsernames = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const cache = ref<Username[]>([])
  const cacheInitialized = ref(false)

  const handleError = (err: unknown, operation: string) => {
    console.error(`Error during ${operation}:`, err)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error.value = (err as any).message || `Failed to ${operation}`
  }

  const clearError = () => {
    error.value = null
  }

  const getCurrentUserEmail = async (): Promise<string | null> => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      return user?.email || null
    } catch (err) {
      handleError(err, 'get current user')
      return null
    }
  }

  const usernames = async (options: GetAllOptions = {}): Promise<Username[]> => {
    const { refresh = false } = options

    if (!refresh && cacheInitialized.value) {
      return cache.value
    }

    loading.value = true
    clearError()

    try {
      const userEmail = await getCurrentUserEmail()

      if (!userEmail) {
        throw new Error('User not authenticated')
      }

      const { data, error: fetchError } = await supabase
        .from('usernames')
        .select('*')
        .eq('email', userEmail)
        .order('created_at', { ascending: false })

      if (fetchError) throw fetchError

      cache.value = data || []
      cacheInitialized.value = true

      return cache.value
    } catch (err) {
      handleError(err, 'fetch usernames')
      return []
    } finally {
      loading.value = false
    }
  }

  const create = async (data: CreateUsernameData): Promise<Username | null> => {
    loading.value = true
    clearError()

    try {
      const { data: newUsername, error: createError } = await supabase
        .from('usernames')
        .insert([data])
        .select()
        .single()

      if (createError) throw createError

      if (cacheInitialized.value) {
        cache.value.unshift(newUsername)
      }

      return newUsername
    } catch (err) {
      handleError(err, 'create username')
      return null
    } finally {
      loading.value = false
    }
  }

  const updateById = async (id: string, data: UpdateUsernameData): Promise<Username | null> => {
    loading.value = true
    clearError()

    try {
      const { data: updatedUsername, error: updateError } = await supabase
        .from('usernames')
        .update(data)
        .eq('id', id)
        .select()
        .single()

      if (updateError) throw updateError

      if (cacheInitialized.value) {
        const index = cache.value.findIndex((u) => u.id === id)
        if (index !== -1) {
          cache.value[index] = updatedUsername
        }
      }

      return updatedUsername
    } catch (err) {
      handleError(err, 'update username')
      return null
    } finally {
      loading.value = false
    }
  }

  const deleteById = async (id: string): Promise<boolean> => {
    loading.value = true
    clearError()

    try {
      const { error: deleteError } = await supabase.from('usernames').delete().eq('id', id)

      if (deleteError) throw deleteError

      if (cacheInitialized.value) {
        cache.value = cache.value.filter((u) => u.id !== id)
      }

      return true
    } catch (err) {
      handleError(err, 'delete username')
      return false
    } finally {
      loading.value = false
    }
  }

  const clearCache = () => {
    cache.value = []
    cacheInitialized.value = false
  }

  return {
    loading: readonly(loading),
    error: readonly(error),
    cache: readonly(cache),

    usernames,
    create,
    updateById,
    deleteById,
    clearError,
    clearCache,
  }
}
