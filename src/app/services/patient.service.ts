import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  getPrescription(ptid: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/patient/patienthistory`, ptid)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(() => err.error.error);
        })
      );
  }

  getPatient(ptemail: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/patient/patientdata`, ptemail)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(() => err.error.error);
        })
      );
  }
}
