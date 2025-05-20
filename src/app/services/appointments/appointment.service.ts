import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Appointment } from '../../models/appointments/appointment';
import { Result } from '../../models/shared/result';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAll(workSchduleId: string): Observable<Result<Appointment[]>> {
      return this.http.get<Result<Appointment[]>>(`${this.baseUrl}/Appointment/${workSchduleId}`);
    }

  confirm(appointmentId: string): Observable<Result<any>> {
    return this.http.patch<Result<any>>(`${this.baseUrl}/Appointment/confirm/${appointmentId}`, null);
   }

  cancel(appointmentId: string): Observable<Result<any>> {
    return this.http.patch<Result<any>>(`${this.baseUrl}/Appointment/cancel/${appointmentId}`, null);
  }
}
