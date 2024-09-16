import { defineStore } from 'pinia'
import useAppWrite from "../composables/useAppWrite"
import type { Models } from "appwrite" 

// Interface defining the structure of the authentication store's state
interface IAuthStore {
  user: Models.User<Models.Preferences> | null  // `user` can either be a valid Appwrite user object or `null`
}

const router = useRouter()  // Creating a `router` instance to navigate between routes
const { account } = useAppWrite()  // Destructuring `account` from the `useAppWrite` composable to handle account-related operations

// Defining the authentication store using Pinia's `defineStore`
export const useAuthStore = defineStore('auth', {
  // The `state` function returns the initial state of the store
  state: () => {
    return {
      user: null,  // Initially, `user` is `null`, meaning no one is logged in
    } as IAuthStore  // Type assertion to ensure the state follows the `IAuthStore` interface
  },

  // `actions` contains the methods that can be used to update the state and handle authentication
  actions: {
    // `login` function to handle user login using email and password
    async login(email: string, password: string) {
      try {
        // Create a session using Appwrite's email and password authentication
        await account.createEmailPasswordSession(email, password)
        // After successful login, fetch and set the current user data
        this.getCurrentUser()
      } catch (error) {
        // Handle errors during login (e.g., incorrect credentials)
        console.error('Login error:', error)
      }
    },

    // `getCurrentUser` function to fetch the currently authenticated user's details
    async getCurrentUser() {
      try {
        // Get the authenticated user's data from Appwrite
        const response = await account.get()
        this.user = response  // Set the `user` state with the fetched user data
      } catch (error: any) {
        if (error.code === 401) {
          // If the error code is 401 (Unauthorized), the user is not authenticated
          console.error('User not authenticated:', error.message)
          this.user = null  // Clear the `user` state since no one is logged in
        } else {
          // Handle other errors during fetching the user
          console.error('Error fetching user:', error)
        }
      }
    },

    // `logout` function to handle user logout
    async logout() {
      try {
        // Delete the current session from Appwrite, effectively logging out the user
        await account.deleteSession('current')
        this.user = null  // Clear the `user` state to reflect that no one is logged in
        router.push('/login')  // Redirect the user to the login page after logging out
      } catch (error) {
        // Handle errors during logout
        console.error('Logout error:', error)
      }
    },
  },
})
