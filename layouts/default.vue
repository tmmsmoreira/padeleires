<script setup lang="ts">
import "@nordhealth/components/lib/Layout"

import AppNavigation from "../components/AppNavigation.vue"
</script>

<template>
  <nord-layout>
    <AppNavigation slot="nav"/>
    <NuxtPage />
  </nord-layout>
</template>

