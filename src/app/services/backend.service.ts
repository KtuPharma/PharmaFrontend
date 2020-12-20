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

  private handleError(error: HttpErrorResponse) {
    this.messagingService.errorMessage('Something went wrong');
    return throwError('Something bad happened. :(');
  }

  getDataList(data: string): Observable<any> {
    return this.http
      .get<any>(`${environment.apiEndpoint}/${data}`, { headers })
      .pipe(catchError(this.handleError));
  }
}
