<script setup lang="ts">
import { User, Users, Gamepad2 } from 'lucide-vue-next'

</script>

<template>
  <section class="grid gap-6">
    <div class="grid grid-cols-3 gap-4">
      <NuxtLink to="/players">
        <Card class="hover:bg-accent hover:text-accent-foreground p-14">
          <Label class="flex flex-col items-center justify-between cursor-pointer">
            <User class="mb-6 h-20 w-20"/>
            <span class="text-xl">Jogadores</span>
          </Label>
        </Card>
      </NuxtLink>
      <NuxtLink to="/competitions">
        <Card class="hover:bg-accent hover:text-accent-foreground p-14">
          <Label class="flex flex-col items-center justify-between cursor-pointer">
            <Users class="mb-6 h-20 w-20"/>
            <span class="text-xl">Competições</span>
          </Label>
        </Card>
      </NuxtLink>
      <!-- <NuxtLink to="/teams">
        <Card class="hover:bg-accent hover:text-accent-foreground p-14">
          <Label class="flex flex-col items-center justify-between cursor-pointer">
            <Gamepad2 class="mb-6 h-20 w-20"/>
            <span class="text-xl">Jogos</span>
          </Label>
        </Card>
      </NuxtLink> -->
    </div>
  </section>
</template>

