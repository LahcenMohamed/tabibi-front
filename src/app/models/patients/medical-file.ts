export interface MedicalFile {
  id: string;
  value: number;
  notes?: string;
  createdAt: string;
  patientId: string;
}

export interface BloodPressure {
  id: string;
  minValue: number;
  maxValue: number;
  notes?: string;
  createdAt: string;
  patientId: string;
}
