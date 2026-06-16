import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { DashboardStats } from '../models/dashboard-stats';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl =
    'http://localhost:5144/api/dashboard';

  constructor(private http: HttpClient) {}

  getStats(): Observable<DashboardStats> {

    return this.http.get<DashboardStats>(
      this.apiUrl
    );

  }

}