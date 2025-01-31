import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Order } from '../../models/order.interface';
import { OrderService } from '../../services/order.service';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [CommonModule, FormsModule, TableModule, DropdownModule],
  templateUrl: './admin-orders.component.html',
  styleUrl: './admin-orders.component.css'
})
export class AdminOrdersComponent {
  orders: Order[] = [];
  filterStatus: string = '';
  filteredOrders: Order[] = [];
  isLoading = true;

  statusOptions = [
    { label: 'همه', value: '' },
    { label: 'در انتظار', value: 'pending' },
    { label: 'در حال پردازش', value: 'processing' },
    { label: 'تکمیل شده', value: 'completed' }
  ];

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.fetchOrders();
  }

  async fetchOrders() {
    try {
      this.orders = await this.orderService.getAllOrders() || [];
      this.filteredOrders = [...this.orders];
      this.isLoading = false;
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  }


  filterOrders() {
    if (this.filterStatus) {
      this.filteredOrders = this.orders.filter(order => order.status === this.filterStatus);
    } else {
      this.filteredOrders = [...this.orders];
      
    }

  }

  async updateOrderStatus(order: Order) {
    try {
      const updatedOrder = await this.orderService.updateOrderStatus(order.id!, order.status);
      if (updatedOrder) {
        this.fetchOrders();
        console.log('Order status updated:', updatedOrder);
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  }

  getStatusText(status: string): string {
    const statusMap: { [key: string]: string } = {
      'pending': 'در حال انتظار',
      'completed': 'تکمیل شده',
      'processing': 'در حال پردازش'
    };
    return statusMap[status] || 'نامشخص';
  }



}
