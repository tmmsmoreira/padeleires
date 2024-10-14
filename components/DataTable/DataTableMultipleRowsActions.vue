<script lang="ts" setup generic="TData">
import type { Table } from '@tanstack/vue-table'

interface DataTablePaginationProps {
  table: Table<TData>
}

const props = defineProps<DataTablePaginationProps>()

const isOpen = ref(false)

const hasSelectedRows = computed(() => props.table.getFilteredSelectedRowModel().rows.length > 0)

watch(hasSelectedRows, (value) => {
  isOpen.value = value
}, { immediate: true })
</script>

<template>
  <Collapsible v-model:open="isOpen">
    <CollapsibleContent>
      <Separator/>
      <div class="flex items-center justify-between p-4">
        <div class="flex-1 text-sm text-muted-foreground">
          {{ table.getFilteredSelectedRowModel().rows.length }} of
          {{ table.getFilteredRowModel().rows.length }} row(s) selected.
        </div>
        <div class="flex items-center space-x-4">
          <Button
            variant="outline"
            @click="table.toggleAllPageRowsSelected()"
          >
            <span>Cancel</span>
          </Button>
          <Button
            @click="() => {}"
          >
            <span>Delete</span>
          </Button>
        </div>
      </div>
    </CollapsibleContent>
  </Collapsible>
  <!-- <div v-if="table.getFilteredSelectedRowModel().rows.length">
    <Separator/>
    <div class="flex items-center justify-between p-4">
      <div class="flex-1 text-sm text-muted-foreground">
        {{ table.getFilteredSelectedRowModel().rows.length }} of
        {{ table.getFilteredRowModel().rows.length }} row(s) selected.
      </div>
      <div class="flex items-center space-x-4">
        <Button
          variant="outline"
          @click="table.toggleAllPageRowsSelected()"
        >
          <span>Cancel</span>
        </Button>
        <Button
          @click="() => {}"
        >
          <span>Delete</span>
        </Button>
      </div>
    </div>
  </div> -->
</template>

<style scoped>
.slide-enter-active {
  transition: all 0.3s ease-out;
}

.slide-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(-50px);
}
</style>