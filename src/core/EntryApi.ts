import { Api } from "./api";

export class EntryApi extends Api {
  static async getAll() {
    const response = await this.sendRequest("/entries", "GET");
    console.log(response);
    return response.data;
  }
}
