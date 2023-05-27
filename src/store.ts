import { defineStore } from "pinia";
import { Routine } from "./types";

export const getStore = defineStore("store", {
  state: () => ({
    currentRoutine: undefined as Routine | undefined,
  }),
});
