import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CreateDoctorRequets } from '../../models/doctors/create-doctor-request';
import { Result } from '../../models/shared/result';
import { catchError, map, Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  createDoctor(doctor: CreateDoctorRequets){
     return this.http.post<Result<string>>(`${this.baseUrl}/clinic/doctors`, doctor);
  }
}
