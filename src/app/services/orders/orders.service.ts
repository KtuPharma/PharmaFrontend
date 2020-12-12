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
export class OrdersService {
  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    return throwError('Something bad happened. :(');
  }

  getOrders(): Observable<any> {
    return this.http
      .get<any>(`${environment.apiEndpoint}/Orders`, { headers })
      .pipe(catchError(this.handleError));
  }
}
