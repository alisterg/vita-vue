<template>
  <page-layout title="Create entry type">
    <ion-input label="Name (key)" label-placement="stacked" fill="outline" v-model="entryTypeName" />

    <div v-for="(prompt, index) in prompts" :key="index" class="prompt-container">
      <ion-input
        label="Enter prompt"
        :value="prompt"
        @input="handlePromptInput($event, index)"
        type="text"
        label-placement="stacked"
        fill="outline"
      />
    </div>

    <ion-button expand="block" fill="outline" size="small" color="secondary" @click="addPrompt">
      + Add prompt
    </ion-button>

    <ion-button @click="save">Save</ion-button>
  </page-layout>
</template>

<script setup lang="ts">
import { InputCustomEvent, IonButton, IonInput } from "@ionic/vue";
import PageLayout from "./PageLayout.vue";
import { EntryType } from "@/types";
import { ref } from "vue";
import { toasty } from "@/core/utils";
import { EntryTypeApi } from "@/core/EntryTypeApi";
import { useRouter } from "vue-router";

const router = useRouter();

const entryTypeName = ref("");
const prompts = ref([""]);

async function save() {
  const cleanedName = entryTypeName.value.trim();
  const cleanedPrompts = prompts.value.filter((item) => !!item);

  if (!cleanedName.length) {
    return await toasty("Enter a name");
  }

  if (!cleanedPrompts.length) {
    return await toasty("Enter at least 1 prompt");
  }

  const entryType: EntryType = {
    key: entryTypeName.value,
    prompts: prompts.value.filter((item) => !!item),
  };

  try {
    await EntryTypeApi.create(entryType);
    router.replace("/");
  } catch (e) {
    toasty(String(e));
  }
}

function handlePromptInput(event: InputCustomEvent, idx: number) {
  if (event.target.value) {
    prompts.value[idx] = String(event.target.value);
  }
}

function addPrompt() {
  prompts.value.push("");
}
</script>

<style scoped>
.prompt-container {
  margin-bottom: 8px;
}
</style>
