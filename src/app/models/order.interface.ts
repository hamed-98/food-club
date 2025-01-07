import { Product } from "./product.interface";

export interface Order {
    id?: number;
    user_id: string;
    products: Product[];  // اینجا می‌تونیم آرایه‌ای از محصولات داشته باشیم
    total_price: number;
    status: 'pending' | 'completed' | 'processing'; // وضعیت سفارش
    created_at?: string;
  }
  