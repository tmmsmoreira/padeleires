<script setup lang="ts">
import "@nordhealth/components/lib/Stack"
import "@nordhealth/components/lib/Input"
import "@nordhealth/components/lib/Button"
import { useAuthStore } from "../stores/auth"

definePageMeta({
  layout: 'login'
})

const email = ref('')
const password = ref('')
const loading = ref(false)

const router = useRouter()
const authStore = useAuthStore()

const handleSubmit = async () => {
  loading.value = true

  await authStore.login(email.value, password.value)

  router.push('/')
}
</script>

<template>
  <div class="login-page">
    <div class="login-card">
      <h2>Login</h2>

      <form action="#" @submit.prevent="handleSubmit" :disable="loading">
        <nord-stack>
          <nord-input id="email" label="Email" name="email" v-model="email" />
  
          <nord-input id="password" type="password" label="Password" name="password" v-model="password" />
  
          <nord-button
            variant="primary" 
            type="submit"
            :loading="loading"
          >
            Login
          </nord-button>
        </nord-stack>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-card {
  background-color: #fff;
  padding: 2rem;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h2 {
  margin-bottom: 1rem;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
}

input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>