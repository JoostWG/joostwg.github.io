<script setup lang="ts" generic="T extends AnyModel">
import { F1Api } from '@/lib/f1'
import type { AnyModel, PendingRequest, Response } from 'f1-garage/jolpica'
import { computed, onMounted, ref } from 'vue'

const props = defineProps<{
  title: string
  pendingRequest: (api: F1Api) => PendingRequest<T[]>
  columns: {
    name: string
    label: string
    field: keyof T | ((row: T, rows: T[]) => unknown)
    align: 'left' | 'center' | 'right'
  }[]
}>()

const api = new F1Api()

const response = ref<Response<T[]>>()

const loading = ref(false)

const pagination = ref({
  rowsPerPage: 15,
  page: 1,
  rowsNumber: 0,
})

const rows = computed(() => response.value?.data ?? [])

async function onRequest({
  page,
  rowsPerPage,
  // sortBy,
  // descending,
}: {
  sortBy: string
  descending: boolean
  page: number
  rowsPerPage: number
  rowsNumber?: number
}): Promise<void> {
  pagination.value.page = page
  pagination.value.rowsPerPage = rowsPerPage
  // pagination.value.sortBy = sortBy
  // pagination.value.descending = descending

  await load()
}

function columnValue(field: keyof T | ((row: T, rows: T[]) => unknown)) {
  return (row: T) => {
    if (typeof field === 'function') {
      return field(row, rows.value)
    }

    return row[field]
  }
}

async function fetch(): Promise<Response<T[]>> {
  const { rowsPerPage, page } = pagination.value
  try {
    loading.value = true
    return (await props
      .pendingRequest(api)
      .get({ limit: rowsPerPage, offset: (page - 1) * rowsPerPage })) as Response<T[]>
  } finally {
    loading.value = false
  }
}

async function load(): Promise<void> {
  const r = await fetch()

  response.value = r
  pagination.value.rowsNumber = r.meta.total
}

onMounted(async () => {
  await load()
})
</script>

<template>
  <q-table
    dense
    :loading
    v-model:pagination="pagination"
    @request="onRequest($event.pagination)"
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
