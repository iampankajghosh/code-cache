import ApiClient from "./ApiClient";

class HTTPService {
  private readonly apiClient;
  constructor(config = {}) {
    const client = new ApiClient(config);
    this.apiClient = client.getAxiosInstance();
  }

  public _get(url: string, config = {}) {
    return this.apiClient.get(url, config);
  }

  public _post(url: string, data = {}, config = {}) {
    return this.apiClient.post(url, data, config);
  }

  public _put(url: string, data = {}, config = {}) {
    return this.apiClient.put(url, data, config);
  }

  public _delete(url: string, config = {}) {
    return this.apiClient.delete(url, config);
  }

  public _patch(url: string, data = {}, config = {}) {
    return this.apiClient.patch(url, data, config);
  }
}

export const httpService = new HTTPService();
