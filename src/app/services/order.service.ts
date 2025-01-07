import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { CartService } from './cart.service';
import { Order } from '../models/order.interface';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private supabaseService: SupabaseService, private cartService: CartService) { }

  async placeOrder(userId: string): Promise<Order | null> {
    const cartItems = this.cartService.getCartItems();
    const totalPrice = cartItems.reduce((total, product) => total + product.price, 0);

    const order: Order = {
      user_id: userId,
      products: cartItems,
      total_price: totalPrice,
      status: 'pending',
    };
    console.log('Order Object:', order);

    try {
      // درج سفارش در جدول
      const result = await this.supabaseService.addData('orders', order);

      if (result) {
        console.log('Order Placed:', result);
        this.cartService.clearCart(); // پاک کردن سبد خرید
        return result; // برگرداندن سفارش درج شده
      }
    } catch (error) {
      console.error('Error placing order:', error);

    }
    return null;
  }

  async getUserOrders(userId: string) {
    try {
      const result = await this.supabaseService.getData('orders');
      if (result) {
        return result.filter((order) => order.user_id === userId);
      } else {
        return [];
      }

    } catch (error) {
      console.error('Error fetching orders:', error);
      return null;
    }
  }

  async getAllOrders() {
    try {
      const result = this.supabaseService.getData('orders')
      if (result) {
        return result
      } else {
        return []
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      return null
    }
  }

  async updateOrderStatus(orderId: number, newStatus: 'pending' | 'completed' | 'processing') {
    try {
      const result = await this.supabaseService.updateData('orders', { status: newStatus }, orderId);
      if (result) {
        console.log('Order status updated:', result);
        return result;
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
    return null;
  }

}
