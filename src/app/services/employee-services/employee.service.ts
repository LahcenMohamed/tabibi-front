import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../../models/employees/employee';
import { CreateEmployeeRequest } from '../../models/employees/create-employee-request';
import { Observable } from 'rxjs';
import { Result } from '../../models/shared/result';
import { UpdateEmployeeRequest } from '../../models/employees/update-employee-request';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  createEmployee(employee:CreateEmployeeRequest): Observable<Result<string>> {
    return this.http.post<Result<string>>(`${this.baseUrl}/employees`, employee);
  }

  update(employee:UpdateEmployeeRequest): Observable<Result<string>> {
    return this.http.put<Result<string>>(`${this.baseUrl}/employees`, employee);
  }

  delete(id:string): Observable<Result<string>> {
    return this.http.delete<Result<string>>(`${this.baseUrl}/employees/${id}`);
  }

  getAll(): Observable<Result<Employee[]>> {
    return this.http.get<Result<Employee[]>>(`${this.baseUrl}/employees`);
  }
}
