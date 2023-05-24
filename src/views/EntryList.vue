<template>
  <page-layout title="All entries">
    <div class="filter-container">
      <ion-select aria-label="entry type" placeholder="Entry type" v-model="selectedEntryType">
        <ion-select-option>Any</ion-select-option>
        <ion-select-option v-for="entryType in entryTypes" :value="entryType">
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
      </thead>
      <tr class="entry-row" v-for="entry in filteredEntries">
        <td class="entry-date">{{ formatDate(entry.createdAt) }}</td>
        <td class="entry-type">{{ entry.entryType }}</td>
        <td class="entry-data">
          <div v-for="(answer, prompt) in entry.entryData">{{ prompt }}: {{ answer }}</div>
        </td>
      </tr>
    </table>
  </page-layout>
</template>

<script setup lang="ts">
import { IonInput, IonSelect, IonSelectOption } from "@ionic/vue";
import PageLayout from "./PageLayout.vue";
import { Entry, EntryType } from "@/types";
import { computed, ref } from "vue";

const searchText = ref("");
const selectedEntryType = ref();

const allEntries: Entry[] = [
  {
    uuid: "123",
    entryType: "fruit",
    entryData: { "Which fruit is your favourite?": "All of them", "How many fruits are there?": "100" },
    createdAt: Date.now(),
  },
  {
    uuid: "321",
    entryType: "vegetables",
    entryData: { "Which vegetable is your favourite?": "None of them", "How many vegetables are there?": "0" },
    createdAt: Date.now(),
  },
  {
    uuid: "abc",
    entryType: "fruit",
    entryData: { "Which fruit is your favourite?": "This one", "How many fruits are there?": "a billion" },
    createdAt: 1672531200000,
  },
];

const entryTypes: EntryType[] = [
  { key: "fruit", prompts: ["Which fruit is your favourite?", "How many fruits are there?"] },
  { key: "vegetables", prompts: ["Which vegetable is your favourite?", "How many vegetables are there?"] },
];

const filteredEntries = computed(() => {

  return allEntries.filter((entry) => {
    const entryTypeMatches =
      !selectedEntryType.value ||
      selectedEntryType.value === "Any" ||
      selectedEntryType.value.key === entry.entryType;

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

.entry-date,
.entry-type {
  width: 90px;
  padding: 8px 0;
}

.entry-data {
  padding: 8px 0;
}
</style>
