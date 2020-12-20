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
export class SupplierService {
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

  changeProviderStatus(id: number): Observable<any> {
    return this.http
      .post<any>(`${environment.apiEndpoint}/Providers/${id}`, id, { headers })
      .pipe(catchError((err) => this.handleError(err, this.messagingService)));
  }

  createProvider(providerObject): Observable<any> {
    return this.http
      .post<any>(`${environment.apiEndpoint}/Providers`, providerObject, {
        headers,
      })
      .pipe(catchError((err) => this.handleError(err, this.messagingService)));
  }

  changeProductStatus(id): Observable<any> {
    return this.http
      .post<any>(
        `${environment.apiEndpoint}/products/${id}`,
        {},
        {
          headers,
        }
      )
      .pipe(catchError((err) => this.handleError(err, this.messagingService)));
  }

  addStock(id, productList): Observable<any> {
    return this.http
      .post<any>(
        `${environment.apiEndpoint}/Providers/${id}/order`,
        [...productList],
        {
          headers,
        }
      )
      .pipe(catchError((err) => this.handleError(err, this.messagingService)));
  }
}
