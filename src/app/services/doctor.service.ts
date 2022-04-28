import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Prescription } from '../interfaces/prescription';
import { patientId } from '../interfaces/patientid';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  sendPrescription(prescription: Prescription): Observable<Prescription> {
    return this.http.post<Prescription>(`${this.baseUrl}/doctor/prescription`, prescription)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(() => err.error.error);
        })
      );
  }

  findPatient(uhid: patientId): Observable<patientId>{
    return this.http.post<patientId>(`${this.baseUrl}/doctor/patientid`, uhid)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(() => err.error.error);
        })
      );
  }

  doctorDetails(emailId: any): Observable<any>{
    return this.http.post<patientId>(`${this.baseUrl}/doctor/doctDetails`, emailId)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(() => err.error.error);
        })
      );
  }
}
