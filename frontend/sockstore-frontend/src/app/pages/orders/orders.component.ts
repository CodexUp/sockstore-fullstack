import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { OrderService } from '../../services/order.service';

import { Order } from '../../models/order';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: Order[] = [];

  expandedOrderId: number | null = null;

  constructor(
    private orderService: OrderService
  ) {}

  ngOnInit(): void {

    this.loadOrders();

  }

  loadOrders() {

    this.orderService
      .getOrders()
      .subscribe({

        next: (data) => {

          this.orders = data;

        },

        error: (err) => {

          console.log(err);

        }

      });

  }

  completeOrder(id: number) {

    this.orderService
      .completeOrder(id)
      .subscribe({
  
        next: () => {
  
          this.loadOrders();
  
        },
  
        error: (err) => {
  
          console.log(err);
  
        }
  
      });
  
  }

  toggleProducts(orderId: number) {

    if (this.expandedOrderId === orderId) {
  
      this.expandedOrderId = null;
  
    } else {
  
      this.expandedOrderId = orderId;
  
    }
  
  }

}