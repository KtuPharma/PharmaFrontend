import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';

import { throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { Observable, of, from } from 'rxjs';
import { environment } from '../../environments/environment';
import { MessagingService } from './messaging.service';

const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'X-Api-Request': 'true',
  Accept: 'application/json',
});

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  constructor(
    private http: HttpClient,
    private messagingService: MessagingService
  ) {}

  handleError(error: HttpErrorResponse, ms: MessagingService) {
    const errors = Object.values(error.error.errors);
    let message = '';
    errors.forEach((er) => {
      message += `${er}\n`;
    });
    ms.errorMessage(message);
    return throwError('Something bad happened. :(');
  }

  getDataList(data: string): Observable<any> {
    return this.http
      .get<any>(`${environment.apiEndpoint}/${data}`, { headers })
      .pipe(catchError((err) => this.handleError(err, this.messagingService)));
  }

  sendMessage(message): Observable<any> {
    return this.http
      .post<any>(`${environment.apiEndpoint}/Messages`, message, {
        headers,
      })
      .pipe(catchError((err) => this.handleError(err, this.messagingService)));
  }
}
