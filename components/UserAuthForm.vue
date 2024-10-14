<script setup lang="ts">
import { cn } from '@/lib/utils'
import * as z from 'zod'
import { toTypedSchema } from '@vee-validate/zod'

import { LoaderCircle } from 'lucide-vue-next'

const email = ref('')
const password = ref('')
const isLoading = ref(false)

const router = useRouter()
const authStore = useAuthStore()

const userAuthFormSchema = toTypedSchema(z.object({
  email: z
    .string({
      required_error: 'Please insert your email.',
    })
    .email(),
  password: z
    .string({
      required_error: 'Please insert your password.',
    })
}))

const { handleSubmit, resetForm } = useForm({
  validationSchema: userAuthFormSchema,
})

const onSubmit = handleSubmit(async () => {
  isLoading.value = true

  try {
    await authStore.login(email.value, password.value)
    router.push('/')
  } catch (e) {

  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div :class="cn('grid gap-6', $attrs.class ?? '')">
    <form
      class="grid gap-2"
      :disabled="isLoading"
      @submit="onSubmit"
    >
      <FormField
        v-slot="{ componentField }"
        name="email"
        class="grid gap-1"
      >
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input
              v-bind="componentField"
              id="email"
              v-model="email"
              placeholder="name@example.com"
              type="email"
            />
          </FormControl>
          <FormMessage class="text-xs" />
        </FormItem>
      </FormField>
      <FormField
        v-slot="{ componentField }"
        name="password"
        class="grid gap-1"
      >
        <FormItem>
          <FormLabel>Password</FormLabel>
          <FormControl>
            <Input
              v-bind="componentField"
              id="password"
              v-model="password"
              placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
              type="password"
            />
          </FormControl>
          <FormMessage class="text-xs" />
        </FormItem>
      </FormField>
      <Button :disabled="isLoading">
        <LoaderCircle
          v-if="isLoading"
          class="mr-2 h-4 w-4 animate-spin"
        />
        Login
      </Button>
    </form>
    <!-- <div class="relative">
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
      Google
    </Button> -->
  </div>
</template>