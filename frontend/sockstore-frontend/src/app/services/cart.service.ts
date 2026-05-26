import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart-item';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];

  constructor() {
    if (typeof window !== 'undefined') {
      const saveCart = localStorage.getItem('cart');
      if (saveCart) {
        this.cartItems = JSON.parse(saveCart);
      }
    }

  }

  addToCart(product: Product) {

    const existingItem = this.cartItems.find(
      item => item.product.id === product.id
    );

    if (existingItem) {

      existingItem.quantity++;

    } else {

      this.cartItems.push({
        product: product,
        quantity: 1
      });

    }

    this.saveCart();

  }

  removeFromCart(productId: number) {

    const item = this.cartItems.find(
      item => item.product.id === productId
    );

    if (!item) return;

    item.quantity--;

    if (item.quantity <= 0) {

      this.cartItems = this.cartItems.filter(
        item => item.product.id !== productId
      );

    }

    this.saveCart();

  }

  getCartItems(): CartItem[] {
    return this.cartItems;
  }

  getTotal(): number {

    return this.cartItems.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);

  }

  saveCart() {
    if (typeof window !== 'undefined') {
      localStorage.setItem(
        'cart',
        JSON.stringify(this.cartItems)
      );
    }
  }

  clearCart() {
    this.cartItems = [];

    if (typeof window !== 'undefined') {
      localStorage.removeItem('cart');
    }
  }
}