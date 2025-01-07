import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ContactComponent } from './components/contact/contact.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { CartComponent } from './components/cart/cart.component';
import { UserOrdersComponent } from './components/user-orders/user-orders.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { DashboardOverviewComponent } from './admin/dashboard-overview/dashboard-overview.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'menu', loadComponent:()=>import('./components/menu/menu.component').then(m=>m.MenuComponent) },
  { path: 'contact', component: ContactComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'signin', component: SignInComponent },
  { path: '**', redirectTo: 'sign-in' }, 
  { path: 'cart', component: CartComponent },
  {
    path: 'orders',
    children: [
      { path: '', component: UserOrdersComponent }, 
      { path: 'new', component: OrdersComponent }, 
    ],
  },
  { 
    path: 'admin', 
    component: AdminDashboardComponent,
    children: [
      { path: 'users', loadComponent: () => import('./admin/admin-users/admin-users.component').then(m => m.AdminUsersComponent) },
      { path: 'products', loadComponent:() => import('./admin/admin-products/admin-products.component').then(m => m.AdminProductsComponent) },
      { path: 'orders', component: AdminOrdersComponent },
      { path: 'overview', component: DashboardOverviewComponent }, 
    ],
    canActivate: [AuthGuard],
  },
];
