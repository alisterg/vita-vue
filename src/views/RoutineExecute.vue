<template>
  <page-layout title="Run routine">
    <h3 class="text-tertiary">{{ store.currentRoutine?.key }}</h3>

    <template v-for="entryType in entryTypes">
      <template v-if="promptResponses[entryType.key]">
        <h4>{{ entryType.key }}</h4>

        <ion-input
          v-for="prompt in entryType.prompts"
          :label="prompt"
          label-placement="stacked"
          fill="outline"
          v-model="promptResponses[entryType.key][prompt]"
        ></ion-input>
      </template>
    </template>

    <ion-button @click="save">Save</ion-button>
  </page-layout>
</template>

<script setup lang="ts">
import { IonButton, IonInput } from "@ionic/vue";
import PageLayout from "./PageLayout.vue";
import { EntryDto, EntryType } from "@/types";
import { computed, onMounted, ref } from "vue";
import { getStore } from "@/store";
import { EntryApi } from "@/core/EntryApi";
import { toasty } from "@/core/utils";
import { useRouter } from "vue-router";

const store = getStore();
const router = useRouter();

const entryTypes = computed(() => {
  if (!store.currentRoutine) return [];

  return store.currentRoutine.entryTypes
    .map((key) => store.entryTypes.find((et) => et.key === key))
    .filter((et) => !!et) as EntryType[];
});

onMounted(() => {
  resetPromptResponses();
});

const promptResponses = ref<Record<string, Record<string, string>>>({});

function resetPromptResponses() {
  const res: Record<string, Record<string, string>> = {};

  for (let i = 0; i < entryTypes.value.length; i++) {
    const entryType = entryTypes.value[i];
    res[entryType.key] = {};

    for (let j = 0; j < entryType.prompts.length; j++) {
      const prompt = entryType.prompts[j];
      res[entryType.key][prompt] = "";
    }
  }

  promptResponses.value = res;
}

async function save() {
  const entries: EntryDto[] = [];

  for (let entryType in promptResponses.value) {
    // If the entry type has at least one prompt filled then we want to save it
    const hasResponse = Object.values(promptResponses.value[entryType]).filter((response) => !!response).length;

    if (!hasResponse) continue;

    entries.push({
      entryType,
      entryData: promptResponses.value[entryType],
    });
  }

  try {
    await EntryApi.bulkCreate(entries);
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
