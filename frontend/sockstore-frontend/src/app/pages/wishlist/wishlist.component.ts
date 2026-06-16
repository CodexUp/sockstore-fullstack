import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishlistService } from '../../services/wishlist.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl:
    './wishlist.component.html'
})
export class WishlistComponent
implements OnInit {

  wishlist: any[] = [];

  constructor(
    private wishlistService:
      WishlistService,

    private cartService:
    CartService
  ) {}

  ngOnInit(): void {

    if (typeof window !== 'undefined')
      {
        this.loadWishlist();
      }

  }

  loadWishlist() {

    const token =
      localStorage.getItem('token');
  
    if (!token)
    {
      return;
    }
  
    this.wishlistService
      .getWishlist()
      .subscribe({
        next: data => {
  
          this.wishlist = data;
  
        },
        error: err => {
  
          console.log(err);
  
        }
      });
  
  }

  remove(productId: number) {

    this.wishlistService
      .removeFromWishlist(productId)
      .subscribe(() => {

        this.loadWishlist();

      });

  }

  addToCart(product: any) {

    this.cartService
      .addToCart(product);
  
    alert(
      '🛒 Agregado al carrito'
    );
  
  }

  moveToCart(item: any) {

    if(item.product.stock <= 0)
    {
      alert(
        '❌ Producto agotado'
      );
  
      return;
    }
  
    this.cartService
      .addToCart(item.product);
  
    this.wishlistService
      .removeFromWishlist(
        item.product.id
      )
      .subscribe(() => {
  
        this.loadWishlist();
  
      });
  
  }

}