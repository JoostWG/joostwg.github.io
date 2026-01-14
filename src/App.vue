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
        <q-toolbar-title>
          <!-- Wth is this -->
          <router-link to="/">Home</router-link>
          <router-link to="/drivers">Drivers</router-link>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style scoped></style>
