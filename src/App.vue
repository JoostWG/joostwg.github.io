<script setup lang="ts">
import { useQuasar } from 'quasar'

const $q = useQuasar()

$q.dark.set(true)
</script>

<template>
  <q-layout>
    <q-header
      reveal
      bordered
      class="bg-dark text-white"
    >
      <q-toolbar>
        <q-toolbar-title> Bruh </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style scoped></style>
