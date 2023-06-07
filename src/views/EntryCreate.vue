<template>
  <page-layout title="Add entry">
    <ion-select
      aria-label="entry type"
      placeholder="Select entry type"
      v-model="selectedEntryType"
      @ion-change="entryTypeChanged"
    >
      <ion-select-option v-for="entryType in store.entryTypes" :value="entryType">
        {{ entryType.key }}
      </ion-select-option>
    </ion-select>

    <template v-if="selectedEntryType">
      <h3 class="text-tertiary">{{ selectedEntryType.key }}</h3>

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
import { getStore } from "@/store";
import { EntryApi } from "@/core/EntryApi";
import { toasty } from "@/core/utils";
import { useRouter } from "vue-router";

const store = getStore();
const router = useRouter();

const selectedEntryType = ref<EntryType>();
const promptResponses = ref<Record<string, string>>({});

function entryTypeChanged(event: CustomEvent) {
  const entryType = event.detail.value as EntryType;

  const emptyResponses: Record<string, string> = {};
  for (let i = 0; i < entryType.prompts.length; i++) {
    emptyResponses[entryType.prompts[i]] = "";
  }
  promptResponses.value = emptyResponses;
}

async function save() {
  if (!selectedEntryType.value) return;

  try {
    await EntryApi.create({
      entryType: selectedEntryType.value.key,
      entryData: promptResponses.value,
    });

    router.replace("/");
  } catch (e) {
    toasty(String(e));
    console.error(e);
  }
}
</script>

<style scoped>
.prompt-container {
  margin-bottom: 8px;
}
</style>
