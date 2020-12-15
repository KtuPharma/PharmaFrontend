import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { Observable, of, from } from 'rxjs';
import { environment } from '../../../environments/environment';
import { StatusDTO } from 'src/app/interfaces/statusDTO';

const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'X-Api-Request': 'true',
  Accept: 'application/json',
});

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    return throwError('Something bad happened. :(');
  }

  changeUsetStatus(status : StatusDTO): Observable<any>{
    return this.http.post<any>(`${environment.apiEndpoint}/Users/status/edit`, status, {headers})
    .pipe(catchError(this.handleError));
  }
}
