import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderService }
from '../../services/order.service';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-orders.component.html'
})
export class MyOrdersComponent
implements OnInit {

  orders: any[] = [];

  constructor(
    private orderService:
      OrderService
  ) {}

  ngOnInit(): void {

    this.orderService
      .getMyOrders()
      .subscribe(data => {

        this.orders = data;

      });

  }

}