import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { Observable, of, from } from 'rxjs';
import { environment } from '../../../environments/environment';
import { MessagingService } from '../messaging.service';

const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'X-Api-Request': 'true',
  Accept: 'application/json',
});

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(
    private http: HttpClient,
    private messagingService: MessagingService
  ) {}

  private handleError(error: HttpErrorResponse, ms: MessagingService) {
    const errors = Object.values(error.error.errors);
    let message = '';
    errors.forEach((er) => {
      message += `${er}\n`;
    });
    ms.errorMessage(message);
    return throwError('Something bad happened. :(');
  }

  getOrderInformation(id: string): Observable<any> {
    return this.http
      .get<any>(`${environment.apiEndpoint}/Orders/${id}/order`, { headers })
      .pipe(catchError((err) => this.handleError(err, this.messagingService)));
  }

  delayOrder(id: string, days: number): Observable<any> {
    return this.http
      .get<any>(`${environment.apiEndpoint}/Orders/${id}/${days}`, { headers })
      .pipe(catchError((err) => this.handleError(err, this.messagingService)));
  }

  changeOrderStatus(status: any): Observable<any> {
    return this.http
      .post<any>(`${environment.apiEndpoint}/Orders/changeStatus`, status, {
        headers,
      })
      .pipe(catchError((err) => this.handleError(err, this.messagingService)));
  }

  addOrder(id, productList): Observable<any> {
    return this.http
      .post<any>(
        `${environment.apiEndpoint}/Warehouse/${id}/order`,
        [...productList],
        {
          headers,
        }
      )
      .pipe(catchError((err) => this.handleError(err, this.messagingService)));
  }
}
