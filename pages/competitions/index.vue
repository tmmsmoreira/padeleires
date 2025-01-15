<script setup lang="ts">
import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import { useCompetitionsStore } from "../../stores/competitions"
import { Checkbox } from '@/components/ui/checkbox'
import DataTableColumnHeader from '@/components/DataTable/DataTableColumnHeader.vue'
import DataTableRowActions from '@/components/DataTable/DataTableRowActions.vue'
import type { ICompetition } from "@/types"
import { getFormattedDate } from "@/lib/utils"

const competitionsStore = useCompetitionsStore()
const { list, loading } = storeToRefs(competitionsStore)
const router = useRouter()

const columns: ColumnDef<ICompetition>[] = [
  {
    id: 'select',
    header: ({ table }) => h(Checkbox, {
      'checked': table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate'),
      'onUpdate:checked': value => table.toggleAllPageRowsSelected(!!value),
      'ariaLabel': 'Select all',
      'class': 'border-black translate-y-0.5',
    }),
    cell: ({ row }) => h(Checkbox, { 
      'checked': row.getIsSelected(),
      'onUpdate:checked': value => row.toggleSelected(!!value),
      'ariaLabel': 'Select row',
      'class': 'border-black translate-y-0.5'
    }),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: '$id',
    header: ({ column }) => h(DataTableColumnHeader<ICompetition>, { column, title: 'Competition Id' }),
    cell: ({ row }) => h('div', { class: 'flex space-x-2' }, [
      h('span', { class: 'truncate font-medium' }, row.getValue('$id')),
    ]),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'datetime',
    header: ({ column }) => h(DataTableColumnHeader<ICompetition>, { column, title: 'Data & Hora' }),
    cell: ({ row }) => {
      const formattedDate = getFormattedDate(row.getValue('datetime'))

      return h('div', { class: 'flex space-x-2' }, [
        h('span', { class: 'max-w-[500px] truncate font-medium' }, formattedDate),
    ])}
  },
  {
    accessorKey: 'location',
    accessorFn: (row) => row.location.name,
    header: ({ column }) => h(DataTableColumnHeader<ICompetition>, { column, title: 'Club' }),
    cell: ({ row }) => h('div', { class: 'flex space-x-2' }, [
      h('span', { class: 'max-w-[500px] truncate font-medium' }, row.getValue('location')),
    ])
  },
  {
    id: 'actions',
    cell: ({ row }) => h(DataTableRowActions<ICompetition>, { row }),
      enableSorting: false,
      enableHiding: false,
  },
]

competitionsStore.listCompetitions()

</script>

<template>
  <div class="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
    <div class="flex items-center justify-between space-y-2">
      <div>
        <h2 class="text-2xl font-bold tracking-tight">
          Competições
        </h2>
        <p class="text-muted-foreground">
          Aqui estão as competições disponíveis
        </p>
      </div>
    </div>
    <DataTable 
      :data="list" 
      :columns="columns" 
      :loading="loading"
    />
  </div>
</template>

<style scoped>
/* Your styles here */
</style>