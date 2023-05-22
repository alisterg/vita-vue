export type Entry = {
  uuid: string;
  entryType: string;
  entryData: Record<string, string>;
  createdAt: number;
};

export type EntryDto = {
  entryType: string;
  entryData: Record<string, string>;
};

export type EntryType = {
  key: string;
  prompts: string[];
};

export type Routine = {
  key: string;
  entryTypes: string[];
};
