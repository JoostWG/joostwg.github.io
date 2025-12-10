<script setup lang="ts" generic="T">
import { F1Api } from '@/lib/f1'
import type { Api, Pagination, Response } from 'jolpica-f1-api'
import { computed, onMounted, ref } from 'vue'

const props = defineProps<{
  title: string
  apiPromise: (api: Api, pagination: Pagination) => Promise<Response<T[]>>
  columns: {
    name: string
    label: string
    field: keyof T | ((row: T, rows: T[]) => unknown)
    align: 'left' | 'center' | 'right'
  }[]
}>()

const api = new F1Api()
const perPage = 30

const response = ref<Response<T[]>>()

const rows = computed(() => response.value?.data ?? [])

function columnValue(field: keyof T | ((row: T, rows: T[]) => unknown)) {
  return (row: T) => {
    if (typeof field === 'function') {
      return field(row, rows.value)
    }

    return row[field]
  }
}

onMounted(async () => {
  response.value = await props.apiPromise(api, { limit: perPage, offset: 0 })
})
</script>

<template>
  <q-table
    dense
    :pagination="{
      rowsPerPage: perPage,
    }"
    :title="title"
    :rows="rows"
    :columns="
      columns.map((column) => ({
        ...column,
        field: columnValue(column.field),
      })) as any
    "
  />
</template>
