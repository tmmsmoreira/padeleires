import { defineStore } from 'pinia'
import useAppWrite from "../composables/useAppWrite"
import type { Models } from "appwrite" 

interface IAuthStore {
  user: Models.User<Models.Preferences> | undefined
}

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      user: undefined,
    } as IAuthStore
  },

  actions: {
    async login(email: string, password: string) {
      const { account } = useAppWrite()

      try {
        await account.value?.createEmailPasswordSession(email, password)
        this.getCurrentUser()
      } catch (error) {
        console.error('Login error:', error)
      }
    },

    async getCurrentUser() {
      const { account } = useAppWrite()

      try {
        const response = await account.value?.get()
        this.user = response
      } catch (error: any) {
        if (error.code === 401) {
          console.error('User not authenticated:', error.message)
          this.user = undefined
        } else {
          console.error('Error fetching user:', error)
        }
      }
    },

    async logout() {
      const { account } = useAppWrite()
      const router = useRouter()

      try {
        await account.value?.deleteSession('current')
        this.user = undefined
        router.push('/login')
      } catch (error) {
        console.error('Logout error:', error)
      }
    },
  },

  getters: {
    isAuthenticated(state) {
      return !!state.user
    },

    isPlayer(state) {
      return state.user?.labels.includes('player')
    },

    isAdmin(state) {
      return state.user?.labels.includes('admin')
    },

    userInitials(state) {
      if (state.user) {
        const names = state.user.name.split(' ')
        return names[0].charAt(0) + names[names.length - 1].charAt(0)
      }

      return ''
    }
  }
})
