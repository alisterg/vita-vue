<template>
  <page-layout title="Home">
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
        <ion-button>View</ion-button>
      </div>
    </div>
    <div>
      <h1 class="section-header">Routines</h1>
      <div>
        <ion-button router-link="/routine/create">Create</ion-button>
        <ion-button>View</ion-button>
      </div>
    </div>
  </page-layout>
</template>

<script setup lang="ts">
import { IonButton } from "@ionic/vue";
import PageLayout from "./PageLayout.vue";
</script>
