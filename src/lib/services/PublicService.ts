import config from "@/src/config";
import { httpService } from "../api/HTTPService";
import { AnalyzeFormData } from "@/app/types";
import endpoints from "../api/endpointes";

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

  public async analyze(data: AnalyzeFormData) {
    const { preferred_location, expected_salary, resume_file } = data;
    const payload = new FormData();

    // prepare payload
    payload.append("preferred_location", preferred_location);
    payload.append("expected_salary", expected_salary);
    payload.append("resume_file", resume_file[0]);

    const response = await this.http._post(endpoints.public.analyze, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }
}

export const publicService = new PublicService();
