import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CreateWorkSchedule, WorkSchedule } from '../../models/work-schedules/work-schedule';
import { Result } from '../../models/shared/result';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkScheduleService {
private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }


  Add(workSchedule:CreateWorkSchedule): Observable<Result<string>> {
    return this.http.post<Result<string>>(`${this.baseUrl}/work-schedule`, workSchedule);
  }

  getAll(): Observable<Result<WorkSchedule[]>> {
    return this.http.get<Result<WorkSchedule[]>>(`${this.baseUrl}/work-schedule`);
  }
}
