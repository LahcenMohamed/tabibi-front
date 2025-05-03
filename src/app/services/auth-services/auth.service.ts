import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { SignUpRequest } from '../../models/auth/sign-up-request';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Result } from '../../models/shared/result';
import { SignInRequest } from '../../models/auth/sign-in-request';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  signUp(signUpRequest:SignUpRequest)
  {
    return this.http.post<Result<string>>(`${this.baseUrl}/authenfication/signup`,signUpRequest)
  }
  signIn(signInRequest:SignInRequest)
  {
    return this.http.post<Result<string>>(`${this.baseUrl}/authenfication/signin`,signInRequest)
  }
}
