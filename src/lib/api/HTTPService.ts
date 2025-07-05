import ApiClient from "./ApiClient";

class HTTPService {
  private readonly apiClient;
  constructor(config = {}) {
    const client = new ApiClient(config);
    this.apiClient = client.getAxiosInstance();
  }

  public get(url: string, config = {}) {
    return this.apiClient.get(url, config);
  }

  public post(url: string, data = {}, config = {}) {
    return this.apiClient.post(url, data, config);
  }

  public put(url: string, data = {}, config = {}) {
    return this.apiClient.put(url, data, config);
  }

  public delete(url: string, config = {}) {
    return this.apiClient.delete(url, config);
  }

  public patch(url: string, data = {}, config = {}) {
    return this.apiClient.patch(url, data, config);
  }
}

export default HTTPService;
