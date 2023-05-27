<template>
  <page-layout title="All entry types">
    <div class="filter-container">
      <ion-input placeholder="Search..." v-model="searchText"></ion-input>
    </div>

    <div class="no-entry-types" v-if="filteredEntryTypes.length <= 0">No entry types</div>
    <table class="entry-types-table" v-else>
      <thead>
        <th>Name (key)</th>
        <th>Prompts</th>
        <th></th>
      </thead>
      <tr class="entry-type-row" v-for="entryType in filteredEntryTypes">
        <td class="key">{{ entryType.key }}</td>
        <td class="prompts">
          <div v-for="prompt in entryType.prompts">{{ prompt }}</div>
        </td>
        <td><ion-button size="small">Edit</ion-button></td>
      </tr>
    </table>
  </page-layout>
</template>

<script setup lang="ts">
import { IonInput, IonButton } from "@ionic/vue";
import PageLayout from "./PageLayout.vue";
import { EntryType } from "@/types";
import { computed, ref } from "vue";
import { getStore } from "@/store";

const store = getStore();

const searchText = ref("");

const filteredEntryTypes = computed(() => {
  return store.entryTypes.filter((entryType) => {
    let searchMatches = true;
    if (searchText.value.length > 0) {
      searchMatches = searchPrompts(entryType, searchText.value) || entryType.key.includes(searchText.value);
    }

    return searchMatches;
  });
});

function searchPrompts(entryType: EntryType, searchText: string) {
  for (let i in entryType.prompts) {
    if (entryType.prompts[i].toLowerCase().includes(searchText.toLowerCase())) return true;
  }

  return false;
}
</script>

<style scoped>
.no-entry-types {
  font-size: 1.8rem;
  display: flex;
  justify-content: center;
  margin-top: 50px;
  color: var(--ion-color-medium);
}

.filter-container {
  display: flex;
}

.entry-types-table {
  font-size: 0.8rem;
  text-align: left;
  width: 100%;
  margin-top: 12px;
}

.entry-types-table th {
  padding-bottom: 8px;
}

.entry-types-table tr:nth-child(even) {
  background-color: var(--ion-color-light);
}

.key {
  width: 90px;
  padding: 8px 0;
}

.prompts {
  padding: 8px 0;
}
</style>
