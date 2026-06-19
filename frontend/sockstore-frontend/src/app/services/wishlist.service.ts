import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  private apiUrl = `${environment.apiUrl}/Wishlist`;

    constructor(
      private http: HttpClient,
      private authService: AuthService
    ) {}

    private getHeaders() {

      const token =
        this.authService.getToken()
        || '';

      return {
        headers: new HttpHeaders({
          Authorization:
            `Bearer ${token}`
        })
      };
    
    }

  getWishlist() {

    return this.http.get<any[]>(
      this.apiUrl,
      this.getHeaders()
    );

  }

  addToWishlist(
    productId: number
  ) {

    return this.http.post(
      `${this.apiUrl}/${productId}`,
      {},
      this.getHeaders()
    );

  }

  removeFromWishlist(
    productId: number
  ) {

    return this.http.delete(
      `${this.apiUrl}/${productId}`,
      this.getHeaders()
    );

  }

}