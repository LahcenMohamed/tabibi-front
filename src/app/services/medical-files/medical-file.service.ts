import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BloodPressure, MedicalFile } from '../../models/patients/medical-file';
import { Result } from '../../models/shared/result';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicalFileService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getBloodPressuresByPatientId(patientId: string): Observable<Result<BloodPressure[]>> {
    return this.http.get<Result<BloodPressure[]>>(`${this.baseUrl}/patients/blood-pressures/${patientId}`);
  }

  getHeightsByPatientId(patientId: string): Observable<Result<MedicalFile[]>> {
    return this.http.get<Result<MedicalFile[]>>(`${this.baseUrl}/patients/heights/${patientId}`);
  }

  getWeightsByPatientId(patientId: string): Observable<Result<MedicalFile[]>> {
    return this.http.get<Result<MedicalFile[]>>(`${this.baseUrl}/patients/weights/${patientId}`);
  }

  getTemperaturesByPatientId(patientId: string): Observable<Result<MedicalFile[]>> {
    return this.http.get<Result<MedicalFile[]>>(`${this.baseUrl}/patients/temperatures/${patientId}`);
  }
  getBloodSugarsByPatientId(patientId: string): Observable<Result<MedicalFile[]>> {
    return this.http.get<Result<MedicalFile[]>>(`${this.baseUrl}/patients/blood-sugars/${patientId}`);
  }
}
