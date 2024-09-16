<script setup lang="ts">
import "@nordhealth/components/lib/Button"
import "@nordhealth/components/lib/Select"
import "@nordhealth/components/lib/Stack"

// Define props
const props = defineProps({
  totalPages: {
    type: Number,
    required: true,
  },
  currentPage: {
    type: Number,
    default: 1,
  },
  pageSize: {
    type: Number,
    default: 10, // Default cards per page
  },
  availablePageSizes: {
    type: Array as () => number[], // Array of available page sizes
    default: () => [10, 20, 50],
  },
})

const { totalPages } = toRefs(props)

const { $viewport } = useNuxtApp()

// Define emit to send events
const emit = defineEmits(['page-changed', 'page-size-changed'])

// Method to change the page
const changePage = (page: number) => {
  if (page > 0 && page <= totalPages.value) {
    emit('page-changed', page)
  }
}

// Method to change the number of cards per page
const changePageSize = (size: number) => {
  emit('page-size-changed', size)
}

watch(totalPages, () => {
  console.log(totalPages)
  if (props.currentPage > totalPages.value) {
    changePage(totalPages.value)
  }
})

// Computed function to calculate pagination behavior
const middlePages = computed(() => {
  const delta = 2 // Number of pages to show around the current page
  const range: number[] = []

  if (props.totalPages <= 1) return range // If totalPages <= 1, return an empty array

  let start = Math.max(2, props.currentPage - delta)
  let end = Math.min(props.totalPages - 1, props.currentPage + delta)

  if (start > 2) {
    start++
  }

  if (end < props.totalPages - 1) {
    end--
  }

  for (let i = start; i <= end; i++) {
    range.push(i)
  }

  return range
})

const itemsPerPage = computed({
  get: () => props.pageSize,
  set: (value: number) => {
    changePageSize(value)
  },
})

// Ellipsis visibility computed
const showLeftEllipsis = computed(() => 
  props.currentPage > 3 && 
  props.totalPages > 1 && 
  !$viewport.isLessThan('tablet')

)
const showRightEllipsis = computed(() => 
  props.currentPage < props.totalPages - 2 &&
  props.totalPages > 1 &&
  !$viewport.isLessThan('tablet')
)
</script>

<template>
  <nord-stack 
    direction="horizontal"
    justify-content="space-between"
    :wrap="$viewport.isLessThan('tablet')"
    class="n-padding-l"
  >
    <nord-visually-hidden id="short-pagination-label">Short pagination</nord-visually-hidden>

    <nord-stack
      direction="horizontal"
      role="navigation"
      aria-labelledby="short-pagination-label"
      style="--n-stack-gap: var(--n-space-xs)"
      :justify-content="$viewport.isLessThan('tablet') ? 'center' : 'start'"
    >
      <!-- Previous Button -->
      <nord-button 
        :disabled="currentPage === 1"
        @click.prevent="changePage(currentPage - 1)"
        :aria-disabled="currentPage === 1"
      >
        Previous
      </nord-button>

      <!-- First Page -->
      <nord-button 
        v-if="!$viewport.isLessThan('tablet')"
        :variant="currentPage === 1 ? 'primary' : undefined" 
        @click.prevent="changePage(1)"
      >
        1
      </nord-button>

      <!-- Ellipsis before middle pages -->
      <p v-if="showLeftEllipsis" class="n-padding-i-m n-color-text-weaker" aria-hidden="true">…</p>

      <!-- Middle Page Numbers -->
      <template 
        v-if="!$viewport.isLessThan('tablet')"
        v-for="page in middlePages" 
        :key="page" 
        :class="['page-item', { active: currentPage === page }]"
      >
        <nord-button 
          :variant="currentPage === page ? 'primary' : undefined"
          @click.prevent="changePage(page)"
        >
          {{ page }}
        </nord-button>
      </template>

      <!-- Ellipsis before middle pages -->
      <p v-if="showRightEllipsis" class="n-padding-i-m n-color-text-weaker" aria-hidden="true">…</p>

      <!-- Last Page -->
      <nord-button 
        v-if="totalPages > 1 && !$viewport.isLessThan('tablet')"
        :variant="currentPage === totalPages ? 'primary' : undefined"
        @click.prevent="changePage(totalPages)"
      >
        {{ totalPages }}
      </nord-button>

      <!-- Next Button -->
      <nord-button 
        :disabled="currentPage === totalPages"
        @click.prevent="changePage(currentPage + 1)"
        :aria-disabled="currentPage === totalPages"
      >
        Next
      </nord-button>
    </nord-stack>

    <!-- Dropdown for selecting cards per page -->
    <nord-stack 
      direction="horizontal"
      :justify-content="$viewport.isLessThan('tablet') ? 'center' : 'end'"
      align-items="center"
    >
      <label for="pageSizeSelect">Items per page: </label>
      <nord-select id="pageSizeSelect" v-model="itemsPerPage" hide-label>
        <option v-for="size in availablePageSizes" :key="size" :value="size">
          {{ size }}
        </option>
      </nord-select>
    </nord-stack>
  </nord-stack>
</template>

<style scoped>

</style>