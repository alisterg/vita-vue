import { EntryType } from "@/types";
import { Api } from "./Api";

export class EntryTypeApi extends Api {
  static async getAll() {
    const result = await this.sendRequest("/entry-type/all", "GET");
    return result as EntryType[];
  }
}
