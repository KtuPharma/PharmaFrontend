import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';

import { throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'X-Api-Request': 'true',
  Accept: 'application/json',
});

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  constructor(private http: HttpClient) {}

  /**
   * Retrieves data and catches errors from provided endpoint
   * @param dataType data type class same as generic
   * @param endpoint without backslashes
   */
  /* getData<T>(dataType: any, endpoint: string) {
    return this.http
      .get<T>(`${environment.apiEndpoint}/${endpoint}`, { headers })
      .pipe(
        map((data) => plainToClass<T, any>(dataType, data)),
        retry(3),
        catchError(this.handleError)
      );
  } */

  /**
   * Retrieves data array and catches errors from provided endpoint
   * @param dataType data type class same as generic
   * @param endpoint without backslashes
   */
  /* getDataArray<T>(dataType: any, endpoint: string) {
    return this.http
      .get<T[]>(`${environment.apiEndpoint}/${endpoint}`, { headers })
      .pipe(
        map((data) => plainToClass<T[], any>(dataType, data)),
        retry(3),
        catchError(this.handleError)
      );
  } */

  private handleError(error: HttpErrorResponse) {
    return throwError('Something bad happened. :(');
  }

    testEndPoint() {
        return this.http.get<any>(`${environment.apiEndpoint}`, { headers }).subscribe(data => {
            return data.message;
        });
    }
}
