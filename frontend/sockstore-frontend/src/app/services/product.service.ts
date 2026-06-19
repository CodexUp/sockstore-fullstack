import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  createProduct(product: any){
    return this.http.post(
    this.apiUrl,
    product
    );
  }

  updateProduct(product: Product) {

    return this.http.put(
      `${this.apiUrl}/${product.id}`,
      product
    );
  }

  deleteProduct(id: number){
    return this.http.delete(
      `${this.apiUrl}/${id}`
    );
  }
}