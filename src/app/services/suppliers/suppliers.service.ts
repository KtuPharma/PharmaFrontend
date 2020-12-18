import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { Observable, of, from } from 'rxjs';
import { environment } from '../../../environments/environment';

const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'X-Api-Request': 'true',
  Accept: 'application/json',
});

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    return throwError('Something bad happened. :(');
  }

  changeProviderStatus(id: number): Observable<any> {
    return this.http
      .post<any>(`${environment.apiEndpoint}/Providers/${id}`, id, { headers })
      .pipe(catchError(this.handleError));
  }

  createProvider(providerObject): Observable<any> {
    return this.http
      .post<any>(`${environment.apiEndpoint}/Providers`, providerObject, {
        headers,
      })
      .pipe(catchError(this.handleError));
  }
}
