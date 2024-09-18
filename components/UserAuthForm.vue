<script setup lang="ts">
import { cn } from '@/lib/utils'

import { LoaderCircle } from 'lucide-vue-next'

const email = ref('')
const password = ref('')
const isLoading = ref(false)

const router = useRouter()
const authStore = useAuthStore()

const onSubmit = async () => {
  isLoading.value = true

  await authStore.login(email.value, password.value)

  router.push('/')
}
</script>

<template>
  <div :class="cn('grid gap-6', $attrs.class ?? '')">
    <form @submit.prevent="onSubmit">
      <div class="grid gap-2">
        <div class="grid gap-1">
          <Label class="sr-only" for="email">
            Email
          </Label>
          <Input
            v-model="email"
            id="email"
            placeholder="name@example.com"
            type="email"
            auto-capitalize="none"
            auto-complete="email"
            auto-correct="off"
            :disabled="isLoading"
          />
        </div>
        <div class="grid gap-1">
          <Label class="sr-only" for="email">
            Password
          </Label>
          <Input
            v-model="password"
            id="password"
            placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
            type="password"
            :disabled="isLoading"
          />
        </div>
        <Button :disabled="isLoading">
          <LoaderCircle v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
          Login
        </Button>
      </div>
    </form>
    <div class="relative">
      <div class="absolute inset-0 flex items-center">
        <span class="w-full border-t" />
      </div>
      <div class="relative flex justify-center text-xs uppercase">
        <span class="bg-background px-2 text-muted-foreground">
          Ou continue com
        </span>
      </div>
    </div>
    <Button variant="outline" type="button" :disabled="isLoading">
      <LoaderCircle v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
      <!-- <GitHubLogo v-else class="mr-2 h-4 w-4" /> -->
      Google
    </Button>
  </div>
</template>