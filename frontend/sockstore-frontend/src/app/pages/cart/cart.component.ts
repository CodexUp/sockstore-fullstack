import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { CartService } from '../../services/cart.service';

import { CartItem } from '../../models/cart-item';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
  }

  add(item: CartItem) {

    if (
      item.quantity >= item.product.stock
    ) {
  
      alert(
        `⚠️ Solo hay ${item.product.stock} unidades disponibles`
      );
  
      return;
  
    }
  
    item.quantity++;
  
  }

  remove(item: CartItem) {
    this.cartService.removeFromCart(item.product.id);
    this.cartItems = this.cartService.getCartItems();
  }

  getTotal(){
    return this.cartService.getTotal();
  }

  hasItems(): boolean{
    return this.cartItems.length > 0;
  }
}