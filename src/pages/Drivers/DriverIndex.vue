<script setup lang="ts">
import ApiTable from '@/components/ApiTable.vue'
import { h } from 'vue'
</script>

<template>
  <div class="tw:grid tw:grid-cols-12 tw:p-4">
    <div class="tw:col-span-full tw:md:col-span-10 tw:lg:col-span-8">
      <q-card
        flat
        bordered
      >
        <ApiTable
          title="Drivers"
          :pending-request="(api) => api.drivers()"
          :columns="[
            {
              name: 'id',
              label: 'ID',
              field: (driver) => driver.id,
              align: 'left',
            },
            {
              name: 'name',
              label: 'Name',
              field: (driver) => driver.name,
              align: 'left',
            },
            {
              name: 'code',
              label: 'Code',
              field: (driver) => driver.code,
              align: 'left',
            },
            {
              name: 'nr',
              label: 'Nr.',
              field: (driver) => driver.number,
              align: 'right',
            },
            {
              name: 'age',
              label: 'Age',
              field: (driver) => driver.age,
              align: 'right',
            },
            {
              name: 'wiki',
              label: 'Wiki',
              field: (driver) =>
                h(
                  'a',
                  { href: driver.wikiUrl, target: '_blank', class: 'tw:text-blue-500' },
                  driver.wikiUrl ?? '',
                ),
              align: 'left',
            },
          ]"
        />
      </q-card>
    </div>
  </div>
</template>
