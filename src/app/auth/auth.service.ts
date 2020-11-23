import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import jwtDecode from 'jwt-decode';

const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'X-Api-Request': 'true',
  Accept: 'application/json',
});

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private registerUrl = 'http://localhost:5000/api/v1/users/signup';
  private loginUrl = 'http://localhost:5000/api/v1/users/login';

  constructor(private http: HttpClient) {}

  registerUser(user) {
    return this.http.post<any>(this.registerUrl, user, { headers });
  }

  loginUser(user) {
    return this.http.post<any>(this.loginUrl, user, { headers });
  }

  logoutUser() {
    localStorage.removeItem('token');
  }

  getUserInfo() {
    return jwtDecode<any>(this.getToken());
  }

  getToken() {
    return localStorage.getItem('token');
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }
}
