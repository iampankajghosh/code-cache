import ApiClient from "./ApiClient";

class HTTPService {
  private readonly client;
  constructor(config = {}) {
    const client = new ApiClient(config);
    this.client = client.getAxiosInstance();
  }

  public get(url: string, config = {}) {
    return this.client.get(url, config);
  }

  public post(url: string, data = {}, config = {}) {
    return this.client.post(url, data, config);
  }

  public put(url: string, data = {}, config = {}) {
    return this.client.put(url, data, config);
  }

  public delete(url: string, config = {}) {
    return this.client.delete(url, config);
  }

  public patch(url: string, data = {}, config = {}) {
    return this.client.patch(url, data, config);
  }
}

export default HTTPService;
