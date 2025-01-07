import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.interface';
import { SupabaseService } from '../../services/supabase.service';
import { CartService } from '../../services/cart.service';
import Aos from 'aos';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
  products: Product[] = []
  isLoading: boolean = true;
  errorMessage: string | null = null
  categories: string[] = [];
  selectedCategory: string | null = null;

  constructor(private supabaseService: SupabaseService, private cartService: CartService) { }

  async ngOnInit(): Promise<void> {
    await this.fetchProducts();

    Aos.init({
      duration: 1200, // مدت زمان انیمیشن
      once: true // انیمیشن فقط یکبار اجرا شود
    });
  }

  async fetchProducts(): Promise<void> {
    this.isLoading = true;
    this.errorMessage = null;

    try {
      const data = await this.supabaseService.getData('products');
      if (data) {
        this.products = data as Product[]
        this.categories = [...new Set(this.products.map(product => product.category))];
      } else {
        this.errorMessage = 'محصولی یافت نشد!';
      }
    } catch (error) {
      this.errorMessage = 'خطا در بارگذاری محصولات.';
      console.error(error);
    } finally {
      this.isLoading = false
    }
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product)
    alert('محصول به سبد خرید اضافه شد!');
  }


  filterByCategory(category: string): void {
    this.selectedCategory = category;
  }

  get filteredProducts(): Product[] {
    if (!this.selectedCategory) {
      return this.products;
    }
    return this.products.filter(product => product.category === this.selectedCategory);
  }

  clearFilter(): void {
    this.selectedCategory = null;
  }

}
