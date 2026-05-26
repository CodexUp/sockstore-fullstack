import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

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

}