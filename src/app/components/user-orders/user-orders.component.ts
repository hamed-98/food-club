import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';
import { Order } from '../../models/order.interface';

@Component({
  selector: 'app-user-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-orders.component.html',
  styleUrl: './user-orders.component.css'
})
export class UserOrdersComponent implements OnInit {
  userOrders: Order[] | null = null;
  userId: string | null = null;
  errorMessage: string | null = null

  constructor(private orderService: OrderService, private authService: AuthService) {}

  async ngOnInit() {
    this.authService.getCurrentUser().then(async user => {
      this.userId = user ? user.id : null;
      if (this.userId) {
        try {
          this.userOrders = await this.orderService.getUserOrders(this.userId);
          if (this.userOrders) {
            this.userOrders = this.userOrders.sort((a, b) => {
              return new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime();
            });
          }
        } catch (error) {
          this.errorMessage = 'مشکلی در دریافت سفارش‌ها رخ داد.';
        }
      } else {
        this.errorMessage = 'لطفاً وارد حساب کاربری شوید.';
      }
    });
  }
  
  getStatusText(status: string): string {
    const statusMap: { [key: string]: string } = {
      'pending': 'در حال انتظار',
      'completed': 'تکمیل شده',
      'processing': 'در حال آماده سازی'
    };
    return statusMap[status] || 'نامشخص';
  }
}
