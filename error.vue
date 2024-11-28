<script lang="ts" setup>
import Animated404 from './components/Animated404.vue'

const error = useError()
</script>

<template>
  <MainNav />
  <main class="flex-1 py-6 bg-background">
    <div class="container flex justify-center relative">
      <template v-if="error.statusCode === 404">
        <div class="error-404">
          <Animated404 />
          <p class="text-center text-gray-500">
            The page you're looking for doesn't exist.
          </p>
        </div>
      </template>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.error-404 {
  height: calc(100lvh - 4rem - 3rem - 1px);
  width: 800px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;

  .animated-404 {
    width: 100%;
    max-width: 600px;
    height: auto;
  }
}
</style>