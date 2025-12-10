<script setup lang="ts">
import { F1Api } from '@/lib/f1'
import { type Result } from 'jolpica-f1-api'
import { onMounted, ref } from 'vue'

const api = new F1Api()

const results = ref<Result[]>([])

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

onMounted(async () => {
  results.value = await api
    .getResults({ season: 'current', round: 'last' })
    .then((response) => response.data)
})
</script>

<template>
  <div class="grid grid-cols-12 p-4">
    <div class="col-span-full md:col-span-10 lg:col-span-8">
      <q-card
        flat
        bordered
      >
        <q-table
          title="Results"
          dense
          :pagination="{
            rowsPerPage: 50,
          }"
          :rows="results"
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
              field: ({ driver }: Result) => `${driver.firstName} ${driver.lastName}`,
              align: 'left',
            },
            {
              name: 'team',
              label: 'Constructor',
              field: ({ team }: Result) => team?.name,
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
              field: (result: Result) => result.finishingTime?.time ?? result.status ?? '-',
              align: 'right',
            },
            {
              name: 'fastest',
              label: 'Fastest',
              field: (result: Result) =>
                result.fastestLap !== null ? result.fastestLap.time.time : '',
              align: 'right',
            },
            {
              name: 'points',
              label: 'Points',
              field: (result: Result) => (result.points !== 0 ? result.points : ''),
              align: 'right',
            },
            {
              name: 'grid',
              label: 'Grid',
              field: (result: Result) => result.grid ?? '',
              align: 'right',
            },
            {
              name: 'diff',
              label: '+/-',
              field: (result: Result) =>
                result.grid !== null && result.finishingTime !== null
                  ? formatPositionDiff(result.grid - Number(result.position))
                  : '',
              align: 'right',
            },
            {
              name: 'realDiff',
              label: '+/-',
              field: (result: Result) =>
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
