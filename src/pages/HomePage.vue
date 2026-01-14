<script setup lang="ts">
import ApiTable from '@/components/ApiTable.vue'
import { type Result } from 'jolpica-f1-api'

function formatPositionDiff(diff: number): string {
  return `${['-', '=', '+'][Math.sign(diff) + 1]} ${Math.abs(diff).toString().padStart(2)}`
}

function getRealDiff(allResults: Result[], result: Result): number {
  return (
    Number(result.grid) -
    Number(result.position) -
    allResults.filter((r) => Number(r.grid) < Number(result.grid) && r.finishingTime === null)
      .length
  )
}
</script>

<template>
  <div class="tw:grid tw:grid-cols-12 tw:p-4">
    <div class="tw:col-span-full tw:md:col-span-10 tw:lg:col-span-8">
      <q-card
        flat
        bordered
      >
        <ApiTable
          title="Results"
          :pending-request="(api) => api.results({ season: 2025, round: 'last' })"
          :columns="[
            {
              name: 'position',
              label: 'Pos.',
              field: 'positionText',
              align: 'right',
            },
            {
              name: 'number',
              label: 'Nr.',
              field: 'number',
              align: 'right',
            },
            {
              name: 'driver',
              label: 'Driver',
              field: ({ driver }) => `${driver.firstName} ${driver.lastName}`,
              align: 'left',
            },
            {
              name: 'team',
              label: 'Constructor',
              field: ({ team }) => team?.name,
              align: 'left',
            },
            {
              name: 'laps',
              label: 'Laps',
              field: 'laps',
              align: 'right',
            },
            {
              name: 'timeOrStatus',
              label: 'Time/Status',
              field: (result) => result.finishingTime?.time ?? result.status ?? '-',
              align: 'right',
            },
            {
              name: 'fastest',
              label: 'Fastest',
              field: (result) => (result.fastestLap !== null ? result.fastestLap.time.time : ''),
              align: 'right',
            },
            {
              name: 'points',
              label: 'Points',
              field: (result) => (result.points !== 0 ? result.points : ''),
              align: 'right',
            },
            {
              name: 'grid',
              label: 'Grid',
              field: (result) => result.grid ?? '',
              align: 'right',
            },
            {
              name: 'diff',
              label: '+/-',
              field: (result) =>
                result.grid !== null && result.finishingTime !== null
                  ? formatPositionDiff(result.grid - Number(result.position))
                  : '',
              align: 'right',
            },
            {
              name: 'realDiff',
              label: '+/-',
              field: (result, results) =>
                result.grid !== null && result.finishingTime !== null
                  ? formatPositionDiff(getRealDiff(results, result))
                  : '',
              align: 'right',
            },
          ]"
        />
      </q-card>
    </div>
  </div>
</template>
