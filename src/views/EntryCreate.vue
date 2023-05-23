<template>
  <page-layout title="Add entry">
    <ion-select
      aria-label="entry type"
      placeholder="Select entry type"
      v-model="selectedEntryType"
      @ion-change="entryTypeChanged"
    >
      <ion-select-option v-for="entryType in entryTypes" :value="entryType">
        {{ entryType.key }}
      </ion-select-option>
    </ion-select>

    <template v-if="selectedEntryType">
      <div v-for="prompt in selectedEntryType.prompts" class="prompt-container">
        <ion-input
          :label="prompt"
          label-placement="stacked"
          fill="outline"
          v-model="promptResponses[prompt]"
        ></ion-input>
      </div>

      <ion-button @click="save">Save</ion-button>
    </template>
  </page-layout>
</template>

<script setup lang="ts">
import { IonButton, IonInput, IonSelect, IonSelectOption } from "@ionic/vue";
import PageLayout from "./PageLayout.vue";
import { EntryType } from "@/types";
import { ref } from "vue";

const selectedEntryType = ref();
const promptResponses = ref<Record<string, string>>({});

const entryTypes: EntryType[] = [
  { key: "fruit", prompts: ["Which fruit is your favourite?", "How many fruits are there?"] },
];

function entryTypeChanged(event: CustomEvent) {
  const entryType = event.detail.value as EntryType;

  const emptyResponses: Record<string, string> = {};
  for (let i = 0; i < entryType.prompts.length; i++) {
    emptyResponses[entryType.prompts[i]] = "";
  }
  promptResponses.value = emptyResponses;
}

function save() {
  console.log(promptResponses.value);
}
</script>

<style scoped>
.prompt-container {
  margin-bottom: 8px;
}
</style>
