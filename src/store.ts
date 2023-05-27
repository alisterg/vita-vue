import { defineStore } from "pinia";
import { Entry, EntryType, Routine } from "./types";

export const getStore = defineStore("store", {
  state: () => ({
    currentRoutine: undefined as Routine | undefined,
    routines: [] as Routine[],
    entryTypes: [] as EntryType[],
    entries: [] as Entry[],
  }),
  actions: {
    initMockData() {
      this.routines = [
        { key: "daily", entryTypes: ["fruit", "yogaClass"] },
        { key: "weekly", entryTypes: ["groceries", "vegetables"] },
      ];

      this.entryTypes = [
        { key: "fruit", prompts: ["Which fruit is your favourite?", "How many fruits are there?"] },
        { key: "vegetables", prompts: ["Which vegetable is your favourite?", "How many vegetables are there?"] },
      ];

      this.entries = [
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
        {
          uuid: "abc",
          entryType: "fruit",
          entryData: { "Which fruit is your favourite?": "This one", "How many fruits are there?": "a billion" },
          createdAt: 1672531200000,
        },
        {
          uuid: "abc",
          entryType: "fruit",
          entryData: { "Which fruit is your favourite?": "This one", "How many fruits are there?": "a billion" },
          createdAt: 1672531200000,
        },
        {
          uuid: "abc",
          entryType: "fruit",
          entryData: { "Which fruit is your favourite?": "This one", "How many fruits are there?": "a billion" },
          createdAt: 1672531200000,
        },
      ];
    },
  },
});
