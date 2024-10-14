<script setup lang="ts">
import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import { usePlayersStore } from "../stores/players"
import { Checkbox } from '@/components/ui/checkbox'
import DataTableColumnHeader from '@/components/DataTable/DataTableColumnHeader.vue'
import DataTableRowActions from '@/components/DataTable/DataTableRowActions.vue'
import type { IPlayer } from "@/types"

const playersStore = usePlayersStore()
const { list, loading } = storeToRefs(playersStore)

const columns: ColumnDef<IPlayer>[] = [
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
    header: ({ column }) => h(DataTableColumnHeader<IPlayer>, { column, title: 'Player Id' }),
    cell: ({ row }) => h('div', { class: 'flex space-x-2' }, [
      h('span', { class: 'truncate font-medium' }, row.getValue('$id')),
    ]),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => h(DataTableColumnHeader<IPlayer>, { column, title: 'Name' }),
    cell: ({ row }) => h('div', { class: 'flex space-x-2' }, [
      h('span', { class: 'max-w-[500px] truncate font-medium' }, row.getValue('name')),
    ])
  },
  {
    accessorKey: 'email',
    header: ({ column }) => h(DataTableColumnHeader<IPlayer>, { column, title: 'Email' }),
    cell: ({ row }) => h('div', { class: 'flex space-x-2' }, [
      h('span', { class: 'truncate font-medium' }, row.getValue('email')),
    ])
  },
  {
    accessorKey: 'points',
    header: ({ column }) => h(DataTableColumnHeader<IPlayer>, { column, title: 'Points' }),
    cell: ({ row }) => h('div', { class: 'flex space-x-2' }, [
      h('span', { class: 'truncate font-medium' }, row.getValue('points')),
    ])
  },
  {
    accessorKey: 'ranking',
    header: ({ column }) => h(DataTableColumnHeader<IPlayer>, { column, title: 'Ranking' }),
    cell: ({ row }) => h('div', { class: 'flex items-center' }, [
      h('span', {}, row.getValue('ranking')),
    ])
  },
  {
    id: 'actions',
    cell: ({ row }) => h(DataTableRowActions<IPlayer>, { row }),
  },
]

playersStore.listPlayers()
</script>

<template>
  <div class="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
    <div class="flex items-center justify-between space-y-2">
      <div>
        <h2 class="text-2xl font-bold tracking-tight">
          Players
        </h2>
        <p class="text-muted-foreground">
          Here&apos;s a list of the available players
        </p>
      </div>
    </div>
    <DataTable :data="list" :columns="columns" :loading="loading"/>
  </div>
</template>

<style scoped>
/* Your styles here */
</style>