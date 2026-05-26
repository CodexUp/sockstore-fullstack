import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

import { Product } from '../../models/product';
import { CartItem } from '../../models/cart-item';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];

  cartItems: CartItem[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {

    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });

  }

  addToCart(product: Product) {

    this.cartService.addToCart(product);

  }

}