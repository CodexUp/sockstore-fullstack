import { Routes } from '@angular/router';

import { ProductsComponent } from './pages/products/products.component';
import { CartComponent } from './pages/cart/cart.component';
import {AdminComponent} from './pages/admin/admin.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './guards/auth.guard';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { OrdersComponent } from './pages/orders/orders.component';

export const routes: Routes = [

  {
    path: '',
    component: ProductsComponent
  },

  {
    path: 'cart',
    component: CartComponent
  },

  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [authGuard]
  },

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'checkout',
    component: CheckoutComponent
  },

  {
    path:'orders',
    component: OrdersComponent
  }

];