import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl =
    'http://localhost:5144/api/orders';

  constructor(
    private http: HttpClient
  ) { }

  createOrder(order: Order) {

    let token = '';

    if (typeof window !== 'undefined')
    {
        token =
          localStorage.getItem('token')
          || '';
    }
  
    const headers =
      new HttpHeaders({
        Authorization:
          `Bearer ${token}`
      });
  
    return this.http.post(
      this.apiUrl,
      order,
      { headers }
    );
  
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(
      this.apiUrl
    );
  }

  completeOrder(id: number): Observable<Order>{
    return this.http.put<Order>(
    `${this.apiUrl}/${id}/complete`,
    {}
    );
  }

  getMyOrders() {

    const token =
      localStorage.getItem('token');
  
    return this.http.get<any[]>(
      `${this.apiUrl}/my-orders`,
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );
  
  }

}