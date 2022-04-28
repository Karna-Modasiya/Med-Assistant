import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, tap, catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
// import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  verifyUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/user/verification`, user).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(() => err.error.error);
      })
    );
  }

  registerUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/user/register`, user).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(() => err.error.error);
      })
    );
  }

  loginUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/user/login`, user, { withCredentials: true }).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(() => err.error.error);
      })
    );
  }

  isDoctorAuthenticated(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/user/isauthenticated/doctor`, { withCredentials: true }).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(() => err.error.error);
      })
    );
  }

  logoutUser(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/user/logout`, { withCredentials: true }).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(() => err.error.error);
      })
    );
  }
}