import { Routine } from "@/types";
import { Api } from "./Api";

export class RoutineApi extends Api {
  static async getAll() {
    const result = await this.sendRequest("/routine/all", "GET");
    return result as Routine[];
  }
}
