<script setup lang="ts">
import "@nordhealth/components/lib/Navigation"
import "@nordhealth/components/lib/Avatar"
import "@nordhealth/components/lib/NavGroup"
import "@nordhealth/components/lib/NavItem"
import "@nordhealth/components/lib/Dropdown"
import "@nordhealth/components/lib/DropdownItem"
import "@nordhealth/components/lib/Button"
import "@nordhealth/components/lib/Icon"

import { useAuthStore } from "../stores/auth"

const authStore = useAuthStore()
</script>

<template>
  <nord-navigation>
    <div slot="header" expand class="n-padding-m">
      <nord-avatar slot="start" name="Bath Clinic" variant="square">M</nord-avatar>
      My Project
    </div>
    <nord-nav-group>
      <RouterLink to="/" custom v-slot="{ isActive, href }">
        <nord-nav-item :href="href" :active="isActive" icon="navigation-dashboard">Dashboard</nord-nav-item>
      </RouterLink>
      <RouterLink to="/giftCards" custom v-slot="{ isActive, href }">
        <nord-nav-item :href="href" :active="isActive" icon="navigation-payments">Gift Cards</nord-nav-item>
      </RouterLink>
    </nord-nav-group>
    <nord-dropdown expand slot="footer">
      <nord-button slot="toggle" expand>
        <nord-avatar slot="start" aria-hidden="true" name="Tiago Moreira"></nord-avatar>
        Tiago Moreira
      </nord-button>
      <nord-dropdown-item @click="authStore.logout">
        Sign out
        <nord-icon slot="end" name="interface-logout"></nord-icon>
      </nord-dropdown-item>
    </nord-dropdown>
  </nord-navigation>
</template>