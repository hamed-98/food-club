import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { SupabaseService } from '../../services/supabase.service';
import { Order } from '../../models/order.interface';

@Component({
  selector: 'app-dashboard-overview',
  standalone: true,
  imports: [CommonModule, ChartModule, TableModule],
  templateUrl: './dashboard-overview.component.html',
  styleUrls: ['./dashboard-overview.component.css']
})
export class DashboardOverviewComponent implements OnInit {
  totalOrders = 0;
  todaySales = 0;
  totalUsers = 0;
  totalRevenue = 0;
  orders: Order[] = [];

  // داده‌های نمودار
  salesChartData: any;

  constructor(private supabaseService: SupabaseService) {}

  async ngOnInit() {
    const orders = await this.supabaseService.getData('orders');
    this.totalOrders = orders?.length || 0;
    this.totalRevenue = orders?.reduce((sum: number, order: Order) => sum + order.total_price, 0) || 0;

    const users = await this.supabaseService.getData('users');
    this.totalUsers = users?.length || 0;

    const today = new Date().toISOString().split('T')[0];
    this.todaySales = orders?.filter(order => order.created_at?.startsWith(today)).length || 0;

    this.orders = orders || [];

    this.setupChartData(orders ?? []);
  }

  private setupChartData(orders: Order[]) {
    const salesPerMonth = new Array(12).fill(0);
    orders.forEach(order => {
      const month = new Date(order.created_at!).getMonth();
      salesPerMonth[month] += order.total_price;
    });

    this.salesChartData = {
      labels: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'],
      datasets: [
        {
          label: 'درآمد ماهانه',
          data: salesPerMonth,
          borderColor: '#42A5F5',
          backgroundColor: 'rgba(66, 165, 245, 0.2)',
          fill: true,
          tension: 0.4
        }
      ]
    };
  }
}
