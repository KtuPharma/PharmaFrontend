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

  getOrderInformation(id: string): Observable<any> {
    return this.http
      .get<any>(`${environment.apiEndpoint}/Orders/${id}/order`, { headers })
      .pipe(catchError(this.handleError));
  }

  delayOrder(id: string, days: number): Observable<any> {
    return this.http
      .get<any>(`${environment.apiEndpoint}/Orders/${id}/${days}`, { headers })
      .pipe(catchError(this.handleError));
  }

  changeOrderStatus(status: any): Observable<any> {
    return this.http
      .post<any>(`${environment.apiEndpoint}/Orders/changeStatus`, status, {
        headers,
      })
      .pipe(catchError(this.handleError));
  }
}
