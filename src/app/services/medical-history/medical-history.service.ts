import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Result } from '../../models/shared/result';
import { Observable } from 'rxjs';
import { Disease, DiseaseBase } from '../../models/patients/medical-history';

@Injectable({
  providedIn: 'root'
})
export class MedicalHistoryService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getDiseasesByPatientId(patientId: string): Observable<Result<Disease[]>> {
    return this.http.get<Result<Disease[]>>(`${this.baseUrl}/patients/medical-history/diseases/patient/${patientId}`);
  }

  getGeneticDiseasesByPatientId(patientId: string): Observable<Result<DiseaseBase[]>> {
    return this.http.get<Result<DiseaseBase[]>>(`${this.baseUrl}/patients/medical-history/genetic-diseases/patient/${patientId}`);
  }

  getAllergiesByPatientId(patientId: string): Observable<Result<DiseaseBase[]>> {
    return this.http.get<Result<DiseaseBase[]>>(`${this.baseUrl}/patients/medical-history/allergies/patient/${patientId}`);
  }

  getAddictionsByPatientId(patientId: string): Observable<Result<DiseaseBase[]>> {
    return this.http.get<Result<DiseaseBase[]>>(`${this.baseUrl}/patients/medical-history/addictions/patient/${patientId}`);
  }
  getChronicDiseasesByPatientId(patientId: string): Observable<Result<DiseaseBase[]>> {
    return this.http.get<Result<DiseaseBase[]>>(`${this.baseUrl}/patients/medical-history/chronic-diseases/patient/${patientId}`);
  }
}
