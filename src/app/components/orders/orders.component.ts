import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Product } from '../../models/product.interface';
import { OrderService } from '../../services/order.service';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {
  constructor(private orderService: OrderService, private cartService: CartService, private authService: AuthService,
    private router: Router) { }

  cartItems: Product[] = [];
  userId: string | null = null;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  totalPrice: number = 0;

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.totalPrice = this.cartItems.reduce((total, product) => total + product.price, 0);

    this.authService.getCurrentUser().then(user => {
      this.userId = user ? user.id : null;
    })
  }

  async placeOrder() {

    if (!this.userId) {
      this.errorMessage = 'لطفا وارد شوید';
      return;
    }

    try {
      const order = await this.orderService.placeOrder(this.userId);
      console.log('Order Response:', order); // لاگ برای بررسی مقدار

      if (order) {
        this.successMessage = 'سفارش شما با موفقیت ثبت شد';
        setTimeout(() => {
          this.cartService.clearCart();
          this.router.navigate(['/']);
        }, 2000);

      } else {
        this.errorMessage = 'خطا در ثبت سفارش';
      }

    } catch (error) {
      console.error('Error during placeOrder:', error); // لاگ خطا برای بررسی دقیق‌تر
      this.errorMessage = 'خطای سرور. لطفا دوباره تلاش کنید.';
    }
  }

}
