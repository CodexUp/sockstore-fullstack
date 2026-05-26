import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';
import { Order } from '../../models/order';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})



export class CheckoutComponent {

  customerName = '';
  address = '';
  phone = '';

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ){}

  finishOrder() {

    const order: Order = {
  
      customerName: this.customerName,
  
      address: this.address,
  
      phone: this.phone,
  
      total: this.cartService.getTotal()
  
    };
  
    this.orderService
      .createOrder(order)
      .subscribe({
  
        next: () => {
  
          alert('✅ Compra realizada');
  
          this.cartService.clearCart();
  
          this.router.navigate(['/']);
  
        },
  
        error: (err) => {
  
          console.log(err);
  
        }
  
      });
  
  }

}

