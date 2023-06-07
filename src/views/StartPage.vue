<template>
  <page-layout title="Home">
    <IonProgressBar type="indeterminate" color="secondary" v-if="store.isLoading"></IonProgressBar>

    <div>
      <h1 class="section-header">Entries</h1>
      <div>
        <ion-button router-link="/entry/create">Create</ion-button>
        <ion-button router-link="/entry/list">View</ion-button>
      </div>
    </div>
    <div>
      <h1 class="section-header">Entry Types</h1>
      <div>
        <ion-button router-link="/entrytype/create">Create</ion-button>
        <ion-button router-link="/entrytype/list">View</ion-button>
      </div>
    </div>
    <div>
      <h1 class="section-header">Routines</h1>
      <div>
        <ion-button router-link="/routine/create">Create</ion-button>
        <ion-button router-link="/routine/list">View</ion-button>
      </div>
    </div>
  </page-layout>
</template>

<script setup lang="ts">
import { IonButton, IonProgressBar, onIonViewWillEnter } from "@ionic/vue";
import PageLayout from "./PageLayout.vue";
import { getStore } from "@/store";

const store = getStore();

onIonViewWillEnter(() => store.loadData());
</script>
