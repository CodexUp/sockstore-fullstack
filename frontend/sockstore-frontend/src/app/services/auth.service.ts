import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:5144/api/Auth';

  constructor(private http: HttpClient) {}

  login(data: any): Observable<any> {

    return this.http.post(
      `${this.apiUrl}/login`,
      data
    );

  }

  saveToken(token: string) {

    if (typeof window !== 'undefined') {

      localStorage.setItem('token', token);

    }

  }

  getToken() {

    if (typeof window !== 'undefined') {

      return localStorage.getItem('token');

    }

    return null;

  }

  logout() {

    if (typeof window !== 'undefined') {

      localStorage.removeItem('token');

    }

  }

  isLoggedIn(): boolean {

    return !!this.getToken();

  }

  getRole(): string{
    const token = this.getToken();

    if(!token){
      return '';
    }

    const decode: any = jwtDecode(token);

    return decode[
      'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
      
    ] || '';
  }

  isAdmin(): boolean {
    return this.getRole() === 'Admin';
  }

  isCustomer(): boolean{
    return this.getRole() === 'User';
  }

  register(data: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/register`,
      data
    );
  }

}