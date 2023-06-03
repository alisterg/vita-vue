import { Entry } from "@/types";
import { Api } from "./Api";

export class EntryApi extends Api {
  private static parseEntry(entry: any) {
    return {
      ...entry,
      createdAt: parseInt(entry.createdAt + "000"),
    } as Entry;
  }

  static async getAll() {
    const result = await this.sendRequest("/entry/all", "GET");
    return result.map(this.parseEntry);
  }
}
