import { useAuthStore } from "../stores/auth"

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore()
  const { isAdmin } = authStore

  await authStore.getCurrentUser()
  
  // If a session exists, redirect the user to the dashboard or another protected route
  if (authStore.user && to.path === '/login') {
    return navigateTo('/')
  }

  // If the user is not authenticated, redirect them to the login page
  if (!authStore.user && to.path !== '/login') {  
    return navigateTo('/login')
  }

  if (!isAdmin && to.path === '/admin') {
    return navigateTo('/')
  }
})
