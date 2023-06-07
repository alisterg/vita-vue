export class Api {
  protected static async sendRequest(endpoint: string, method: string, body: object = {}) {
    const apiKey = import.meta.env.VITE_API_KEY;
    const baseUrl = import.meta.env.VITE_BASE_URL;

    const options = {
      method,
      body: method === "GET" || method === "DELETE" || method === "HEAD" ? undefined : JSON.stringify(body),
      headers: { "Content-Type": "application/json", "x-api-key": apiKey },
    };

    const response = await fetch(baseUrl + endpoint, options);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    if (response.status === 201) {
      return;
    }

    return response.json();
  }
}
