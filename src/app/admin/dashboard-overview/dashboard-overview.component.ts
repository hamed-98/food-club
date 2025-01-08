import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../../services/supabase.service';
import { CommonModule } from '@angular/common';
import { Order } from '../../models/order.interface';



@Component({
  selector: 'app-dashboard-overview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-overview.component.html',
  styleUrls: ['./dashboard-overview.component.css']
})
export class DashboardOverviewComponent implements OnInit {
  totalOrders = 0;
  todaySales = 0;
  totalUsers = 0;
  totalRevenue = 0;

  constructor(private supabaseService: SupabaseService) {}

  async ngOnInit() {
    // گرفتن تعداد سفارشات
    const orders = await this.supabaseService.getData('orders');
    this.totalOrders = orders?.length || 0;

    // محاسبه درآمد کل
    this.totalRevenue = orders?.reduce((sum:number, order:Order) => sum + order.total_price, 0) || 0;

    // گرفتن کاربران
    const users = await this.supabaseService.getData('users');
    this.totalUsers = users?.length || 0;

    // گرفتن فروش امروز
    const today = new Date().toISOString().split('T')[0];
    this.todaySales = orders?.filter(order => order.created_at?.startsWith(today)).length || 0;
  }
}
