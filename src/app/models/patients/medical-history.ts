export interface DiseaseBase {
  id: string;
  name: string;
  patientId: string;
}

export interface Disease {
  id: string;
  name: string;
  patientId: string;
  startDate: string; // ISO 8601 date format (e.g. "2024-05-19")
  endDate: string;
}
