<script setup lang="ts">
import "@nordhealth/components/lib/Stack"
import "@nordhealth/components/lib/Card"
import "@nordhealth/components/lib/Icon"

const { $viewport } = useNuxtApp()

definePageMeta({
  middleware: 'auth',
})
</script>

<template>
  <h1 :class="$viewport.isLessThan('tablet') ? 'n-margin-bs-xxl' : null">Welcome to my application</h1>

  <section class="n-grid-6 n-padding-b-l">
    <RouterLink to="/giftCards">
      <nord-card class="n-align-center">
        <h4>Manage Gift Cards</h4>
        <nord-icon name="navigation-payments" size="xl" class="n-margin-bs-m"></nord-icon>
      </nord-card>
    </RouterLink>
  </section>
</template>

<style scoped>
a {
  text-decoration: none;
  color: inherit;
}
</style>