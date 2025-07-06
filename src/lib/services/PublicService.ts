import config from "@/src/config";
import { httpService } from "../api/HTTPService";

class PublicService {
  private readonly http;
  private readonly geoapifyUrl;
  private readonly geoApikey;

  constructor() {
    this.http = httpService;
    this.geoapifyUrl = "https://api.geoapify.com/v1/geocode/autocomplete";
    this.geoApikey = config.GEOAPIFY_API_KEY;
  }

  public async getLocationSuggestions(keyword: string) {
    const params: Record<string, string | number> = {
      text: keyword,
      limit: 10,
      apiKey: this.geoApikey,
      typefilter: "city,state,country",
    };

    const response = await this.http._get(this.geoapifyUrl, {
      params,
    });

    return response.data;
  }
}

export const publicService = new PublicService();
