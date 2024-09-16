import { useAuthStore } from "../stores/auth"

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore()
  
  await authStore.getCurrentUser()
  
  // If a session exists, redirect the user to the dashboard or another protected route
  if (authStore.user && to.path === '/login') {
    return navigateTo('/')
  }

  if (!authStore.user) {
    // If the user is not authenticated, redirect them to the login page
    return navigateTo('/login')
  }
})
