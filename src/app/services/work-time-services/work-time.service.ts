import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { WorkTime } from '../../models/work-times/work-time';
import { Observable } from 'rxjs';
import { Result } from '../../models/shared/result';

@Injectable({
  providedIn: 'root'
})
export class WorkTimeService {
private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }


  Add(workTime:WorkTime): Observable<Result<string>> {
    return this.http.post<Result<string>>(`${this.baseUrl}/clinic/job-time`, workTime);
  }

  update(workTime:WorkTime): Observable<Result<string>> {
    return this.http.put<Result<string>>(`${this.baseUrl}/clinic/job-time`, workTime);
  }

  delete(id:string): Observable<Result<string>> {
    return this.http.delete<Result<string>>(`${this.baseUrl}/clinic/job-time/${id}`);
  }

  getAll(): Observable<Result<WorkTime[]>> {
    return this.http.get<Result<WorkTime[]>>(`${this.baseUrl}/clinic/job-time`);
  }
}
