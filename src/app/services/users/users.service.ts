import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { Observable, of, from } from 'rxjs';
import { environment } from '../../../environments/environment';
import { MessagingService } from '../messaging.service';
import { StatusDTO } from 'src/app/interfaces/statusDTO';

const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'X-Api-Request': 'true',
  Accept: 'application/json',
});

@Injectable()
export class UsersService {
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

  changeUsetStatus(status: StatusDTO): Observable<any> {
    return this.http
      .post<any>(`${environment.apiEndpoint}/Users/status/edit`, status, {
        headers,
      })
      .pipe(catchError((err) => this.handleError(err, this.messagingService)));
  }

  createUser(userObject): Observable<any> {
    return this.http
      .post<any>(`${environment.apiEndpoint}/Users/register`, userObject, {
        headers,
      })
      .pipe(catchError((err) => this.handleError(err, this.messagingService)));
  }
}
