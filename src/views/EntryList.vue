<template>
  <page-layout title="All entries">
    <div class="filter-container">
      <ion-select aria-label="entry type" placeholder="Entry type" v-model="selectedEntryType">
        <ion-select-option>Any</ion-select-option>
        <ion-select-option v-for="entryType in store.entryTypes" :value="entryType">
          {{ entryType.key }}
        </ion-select-option>
      </ion-select>

      <ion-input placeholder="Search..." v-model="searchText"></ion-input>
    </div>

    <div class="no-entries" v-if="filteredEntries.length <= 0">No entries</div>
    <table class="entries-table" v-else>
      <thead>
        <th>Created</th>
        <th>Type</th>
        <th>Data</th>
        <th></th>
      </thead>
      <tr class="entry-row" v-for="entry in filteredEntries">
        <td class="entry-date">{{ formatDate(entry.createdAt) }}</td>
        <td class="entry-type">{{ entry.entryType }}</td>
        <td class="entry-data">
          <div v-for="(answer, prompt) in entry.entryData">{{ prompt }}: {{ answer }}</div>
        </td>
        <td><ion-button size="small">Edit</ion-button></td>
      </tr>
    </table>
  </page-layout>
</template>

<script setup lang="ts">
import { IonInput, IonSelect, IonSelectOption, IonButton } from "@ionic/vue";
import PageLayout from "./PageLayout.vue";
import { Entry } from "@/types";
import { computed, ref } from "vue";
import { getStore } from "@/store";

const store = getStore();

const searchText = ref("");
const selectedEntryType = ref();

const filteredEntries = computed(() => {
  return store.entries.filter((entry) => {
    const entryTypeMatches =
      !selectedEntryType.value || selectedEntryType.value === "Any" || selectedEntryType.value.key === entry.entryType;

    let searchMatches = true;
    if (searchText.value.length > 0) {
      const date = formatDate(entry.createdAt);
      searchMatches = searchEntryData(entry, searchText.value) || date.includes(searchText.value);
    }

    return entryTypeMatches && searchMatches;
  });
});

function searchEntryData(entry: Entry, searchText: string) {
  for (let i in entry.entryData) {
    if (entry.entryData[i].toLowerCase().includes(searchText.toLowerCase())) return true;
  }

  return false;
}

function formatDate(date: number) {
  const zeroPad = (num: number) => (num < 10 ? "0" + num : "" + num);

  const dateObj = new Date(date);

  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();

  return `${dateObj.getFullYear()}-${zeroPad(month)}-${zeroPad(day)}`;
}
</script>

<style scoped>
.no-entries {
  font-size: 1.8rem;
  display: flex;
  justify-content: center;
  margin-top: 50px;
  color: var(--ion-color-medium);
}

.filter-container {
  display: flex;
}

.entries-table {
  font-size: 0.8rem;
  text-align: left;
  width: 100%;
  margin-top: 12px;
}

.entries-table th {
  padding-bottom: 8px;
}

.entries-table tr:nth-child(even) {
  background-color: var(--ion-color-light);
}

.entry-date,
.entry-type {
  width: 90px;
  padding: 8px 0;
}

.entry-data {
  padding: 8px 0;
}
</style>
