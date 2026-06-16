import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

import { Product } from '../../models/product';
import { CartItem } from '../../models/cart-item';

import { FormsModule } from '@angular/forms';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];

  cartItems: CartItem[] = [];

  searchText = '';

  maxPrice = 100000;

  onlyAvailable = false;

  currentPage = 1;

  itemsPerPage = 6;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private wishlistService: WishlistService
  ) {}

  ngOnInit(): void {

    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });

  }

  addToCart(product: Product) {

    if(product.stock <= 0){
      alert('❌ Producto agotado');
      return;
    }

    this.cartService.addToCart(product);

  }

  isInCart(productId: number): boolean {

    return this.cartService.isInCart(
      productId
    );
  
  }

  addToWishlist(
    productId: number
  ) {
  
    this.wishlistService
      .addToWishlist(productId)
      .subscribe({
  
        next: () => {
  
          alert(
            '❤️ Agregado a favoritos'
          );
  
        },
  
        error: () => {
  
          alert(
            '⚠️ Ya está en favoritos'
          );
  
        }
  
      });
  
  }

  get filteredProducts() {

    const result = this.products.filter(product =>
  
      product.name
        .toLowerCase()
        .includes(
          this.searchText.toLowerCase()
        )
      &&
      product.price <= this.maxPrice
      &&
      (
        !this.onlyAvailable
        ||
        product.stock > 0
      )
    );
    if (
      this.currentPage >
      Math.ceil(
        result.length /
        this.itemsPerPage
      )
    ) { 
      this.currentPage = 1;
    }
    return result;
  }

  get paginatedProducts() {

    const startIndex =
      (this.currentPage - 1)
      * this.itemsPerPage;
  
    return this.filteredProducts.slice(
      startIndex,
      startIndex + this.itemsPerPage
    );
  
  }

  get totalPages() {

    return Math.ceil(
      this.filteredProducts.length
      / this.itemsPerPage
    );
  
  }

  changePage(page: number) {

    if (
      page < 1 ||
      page > this.totalPages
    ) {
      return;
    }
  
    this.currentPage = page;
  
  }

}