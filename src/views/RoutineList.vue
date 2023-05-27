<template>
  <page-layout title="All routines">
    <div class="no-routines" v-if="store.routines.length <= 0">No routines</div>
    <table class="routines-table" v-else>
      <thead>
        <th>Name (key)</th>
        <th>Entry types</th>
        <th></th>
      </thead>
      <tr class="routine-row" v-for="routine in store.routines">
        <td class="key">{{ routine.key }}</td>
        <td class="entry-type">
          <div v-for="entryType in routine.entryTypes">{{ entryType }}</div>
        </td>
        <td>
          <ion-button size="small" @click="runRoutine(routine)"> Run </ion-button>
          <ion-button size="small">Edit</ion-button>
        </td>
      </tr>
    </table>
  </page-layout>
</template>

<script setup lang="ts">
import { getStore } from "@/store";
import PageLayout from "./PageLayout.vue";
import { Routine } from "@/types";
import { IonButton } from "@ionic/vue";
import { useRouter } from "vue-router";

const store = getStore();

const router = useRouter();

function runRoutine(routine: Routine) {
  const store = getStore();
  store.currentRoutine = routine;
  router.push("/routine/execute");
}
</script>

<style scoped>
.no-routines {
  font-size: 1.8rem;
  display: flex;
  justify-content: center;
  margin-top: 50px;
  color: var(--ion-color-medium);
}

.routines-table {
  font-size: 0.8rem;
  text-align: left;
  width: 100%;
  margin-top: 12px;
}

.routines-table th {
  padding-bottom: 8px;
}

.routines-table tr:nth-child(even) {
  background-color: var(--ion-color-light);
}

.key {
  width: 90px;
  padding: 8px 0;
}

.entry-type {
  padding: 8px 0;
}
</style>
