<template>
  <page-layout title="Create routine">
    <ion-input label="Name (key)" label-placement="stacked" fill="outline" v-model="routineName" />

    <h3>Entry types</h3>

    <div v-for="(entryType, index) in selectedEntryTypes" :key="index" class="prompt-container">
      {{ entryType.key }}
    </div>

    <ion-select v-if="isAdding" aria-label="entry type" placeholder="Select entry type" @ion-change="entryTypeChanged">
      <ion-select-option v-for="entryType in availableEntryTypes" :value="entryType">
        {{ entryType.key }}
      </ion-select-option>
    </ion-select>

    <ion-button
      v-if="availableEntryTypes.length"
      expand="block"
      fill="outline"
      size="small"
      color="secondary"
      @click="handleAddClick"
    >
      + Add entry type
    </ion-button>

    <ion-button @click="save">Save</ion-button>
  </page-layout>
</template>

<script setup lang="ts">
import { IonButton, IonInput, IonSelect, IonSelectOption, toastController } from "@ionic/vue";
import PageLayout from "./PageLayout.vue";
import { EntryType, Routine } from "@/types";
import { computed, ref } from "vue";
import { getStore } from "@/store";

const store = getStore();

const routineName = ref("");
const isAdding = ref(false);
const selectedEntryTypes = ref<EntryType[]>([]);

const availableEntryTypes = computed(() => {
  return store.entryTypes.filter(
    (entryType) => !selectedEntryTypes.value.find((selected) => selected.key === entryType.key)
  );
});

async function toasty(msg: string) {
  const toast = await toastController.create({
    message: msg,
    duration: 1000,
  });

  await toast.present();
}

async function save() {
  const cleanedName = routineName.value.trim();

  if (!cleanedName.length) {
    return await toasty("Enter a name");
  }

  if (!selectedEntryTypes.value.length) {
    return await toasty("Select at least 1 entry type");
  }

  const routine: Routine = {
    key: routineName.value,
    entryTypes: selectedEntryTypes.value.map((entryType) => entryType.key),
  };
  console.log(routine);
}

function entryTypeChanged(event: CustomEvent) {
  const entryType = event.detail.value as EntryType;
  selectedEntryTypes.value.push(entryType);
  isAdding.value = false;
}

function handleAddClick() {
  isAdding.value = true;
}
</script>

<style scoped>
.prompt-container {
  margin-bottom: 8px;
}
</style>
