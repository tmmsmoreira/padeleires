<script setup lang="ts">
import UserAuthForm from '@/components/UserAuthForm.vue'
import { cn } from '@/lib/utils'

definePageMeta({
  middleware: 'auth',
  layout: 'full-page'
})
</script>

<template>
  <div class="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
    <div class="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
      <div class="absolute inset-0 overflow-hidden">
        <img
          height="3382px"
          width="2537px"
          src="/login.jpg"
          alt="Padel field"
          :class="cn('h-full w-full object-cover aspect-[3/4] filter brightness-50')"
        >
      </div>
      <div class="relative z-20 flex items-center text-lg font-medium">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          class="mr-2 h-6 w-6"
        >
          <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
        </svg>
        Padeleires
      </div>
      <div class="relative z-20 mt-auto">
        <blockquote class="space-y-2">
          <p class="text-lg">
            &ldquo;Padel é uma dança de cores em movimento, onde cada
            pancada reflete o orgulho de uma comunidade unida, celebrando
            a liberdade de ser, sem fronteiras.&ldquo;
          </p>
          <footer class="text-sm">
            Comunidade Padeleires
          </footer>
        </blockquote>
      </div>
    </div>
    <div class="lg:p-8">
      <div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div class="flex flex-col space-y-2 text-center">
          <h1 class="text-2xl font-semibold tracking-tight">
            Login de membro
          </h1>
          <p class="text-sm text-muted-foreground">
            Insira o seu email e password para efectuar o login
          </p>
        </div>
        <UserAuthForm />
        <p class="px-7 text-center text-sm text-muted-foreground">
          Ao clicar, está a concordar com os nossos
          <a
            href="/terms"
            class="underline underline-offset-4 hover:text-primary"
          >
            Termos de Serviço
          </a>
          e
          <a
            href="/privacy"
            class="underline underline-offset-4 hover:text-primary"
          >
            Política de Privacidade
          </a>
          .
        </p>
      </div>
    </div>
  </div>
</template>