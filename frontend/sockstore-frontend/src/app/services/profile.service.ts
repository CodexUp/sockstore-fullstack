import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { User } from '../models/user';

import { HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private apiUrl = `${environment.apiUrl}/profile`;

  constructor(
    private http: HttpClient
  ) {}

  getProfile(): Observable<User> {

    let token = '';

    if (typeof window !== 'undefined') {
      token = localStorage.getItem('token') || '';
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    }); 

    return this.http.get<User>(
      this.apiUrl,
      { headers }
    );

  }

  updateProfile(
    user: User
  ): Observable<User> {

    let token = '';

    if (typeof window !== 'undefined') {
      token = localStorage.getItem('token') || '';
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.put<User>(
      this.apiUrl,
      user,
      { headers }
    );

  }

}