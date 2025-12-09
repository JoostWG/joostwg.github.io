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
  <table>
    <thead>
      <tr>
        <th class="text-right"></th>
        <th class="text-right">Nr</th>
        <th class="text-left">Driver</th>
        <th class="text-left">Constructor</th>
        <th class="text-right">Laps</th>
        <th class="text-right">Time/Status</th>
        <th class="text-right">Fastest</th>
        <th class="text-right">Points</th>
        <th class="text-right">Grid</th>
        <th class="text-right">+/-</th>
        <th class="text-right">+/-</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="result of results" :key="result.position">
        <td class="text-right">{{ result.positionText }}</td>
        <td class="text-right">{{ result.number }}</td>
        <td>{{ result.driver.firstName }} {{ result.driver.lastName }}</td>
        <td>{{ result.team?.name }}</td>
        <td class="text-right">{{ result.laps }}</td>
        <td class="text-right">{{ result.finishingTime?.time ?? result.status ?? '-' }}</td>
        <td class="text-right">
          {{ result.fastestLap !== null ? result.fastestLap.time.time : '' }}
        </td>
        <td class="text-right">{{ result.points !== 0 ? result.points : '' }}</td>
        <td class="text-right">{{ result.grid ?? '' }}</td>
        <td class="text-right">
          {{
            result.grid !== null && result.finishingTime !== null
              ? formatPositionDiff(result.grid - Number(result.position))
              : ''
          }}
        </td>
        <td class="text-right">
          {{
            result.grid !== null && result.finishingTime !== null
              ? formatPositionDiff(getRealDiff(results, result))
              : ''
          }}
        </td>
      </tr>
    </tbody>
  </table>
</template>
