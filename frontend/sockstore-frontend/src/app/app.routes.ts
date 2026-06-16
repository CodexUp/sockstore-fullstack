import { Routes } from '@angular/router';

import { ProductsComponent } from './pages/products/products.component';
import { CartComponent } from './pages/cart/cart.component';
import { AdminComponent} from './pages/admin/admin.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './guards/auth.guard';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { adminGuard } from './guards/admin.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegisterComponent } from './pages/register/register.component';    
import { MyOrdersComponent } from './pages/my-orders/my-orders.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
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
    canActivate: [adminGuard]
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
    component: OrdersComponent,
    canActivate: [adminGuard]
  },

  {
    path: 'profile',
    component: ProfileComponent
  },

  {
    path: 'register',
    component: RegisterComponent
  },

  {
    path: 'my-orders',
    component: MyOrdersComponent,
    canActivate: [authGuard]
  },

  {
    path: 'wishlist',
    component: WishlistComponent,
    canActivate: [authGuard]
  }

];