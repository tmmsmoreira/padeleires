<script setup lang="ts">
import { ChevronLeft } from 'lucide-vue-next'

definePageMeta({
  layout: 'stepper-page'
})

const steps = [
  {
    step: 1,
    title: 'Details',
    description:
        'Provide the name of the competition and when it will take place.',
  },
  {
    step: 2,
    title: 'Location',
    description: 'Provide the location of the competition and how many fields you have available.',
  },
  {
    step: 3,
    title: 'Teams',
    description:
        'Choose the players and create the teams. The teams can be created manually or automatically based on the raking of each player.',
  },
  {
    step: 4,
    title: 'Review',
    description:
        'Check all the competition settings.',
  },
]
</script>

<template>
  <div class="container flex h-full flex-col lg:flex-row">
    <div class="flex-1 lg:max-w-xl">
      <div class="mx-auto w-full max-w-md my-8">
        <NuxtLink to="/competitions">
          <Button variant="link" class="px-0">
            <ChevronLeft class="mr-2 h-4 w-4"/> Back
          </Button>
        </NuxtLink>
        <h2 class="text-2xl font-bold">
          Create new competition
        </h2>
        <p class="text-muted-foreground">
          Manage your account settings and set e-mail preferences.
        </p>
      </div>

      <Stepper orientation="vertical" class="mx-auto flex w-full max-w-md flex-col justify-start gap-10">
        <StepperItem
          v-for="step in steps"
          :key="step.step"
          v-slot="{ state }"
          class="relative flex w-full items-start gap-6"
          :step="step.step"
        >
          <StepperSeparator
            v-if="step.step !== steps[steps.length - 1].step"
            class="absolute left-[18px] top-[38px] block h-[105%] w-0.5 shrink-0 rounded-full bg-muted group-data-[state=completed]:bg-primary"
          />
    
          <StepperTrigger as-child>
            <Button
              :variant="state === 'completed' || state === 'active' ? 'default' : 'outline'"
              size="icon"
              class="z-10 rounded-full shrink-0"
              :class="[state === 'active' && 'ring-2 ring-ring ring-offset-2 ring-offset-background']"
            >
              <Check v-if="state === 'completed'" class="size-5" />
              <Circle v-if="state === 'active'" />
              <Dot v-if="state === 'inactive'" />
            </Button>
          </StepperTrigger>
    
          <div class="flex flex-col gap-1">
            <StepperTitle class="text-sm font-semibold transition lg:text-base">
              {{ step.title }}
            </StepperTitle>
            <StepperDescription
              :class="[state === 'active' && 'text-primary']"
              class="sr-only text-xs text-muted-foreground transition md:not-sr-only lg:text-sm"
            >
              {{ step.description }}
            </StepperDescription>
          </div>
        </StepperItem>
      </Stepper>
    </div>
    <Separator orientation="vertical" />
    <div class="flex-1 ml-8">
      <div class="space-y-6">

      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add your styles here */
</style>