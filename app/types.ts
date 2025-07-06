export interface AnalyzeFormData {
  preferred_location: string;
  expected_salary: string;
  resume_file: File[];
}

export interface GeoApiSuggestedLocation {
  properties: {
    city: string;
    state: string;
    country: string;
    formatted: string;
  };
}
