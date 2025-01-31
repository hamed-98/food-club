import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, CUSTOM_ELEMENTS_SCHEMA, } from '@angular/core';
import { RouterLink } from '@angular/router';
import Swiper from 'swiper';
import AOS from 'aos';
import { ScrollTop } from 'primeng/scrolltop';
import { SupabaseService } from '../../services/supabase.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.interface';
import { Carousel } from 'primeng/carousel';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule, ScrollTop, Carousel, CarouselModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeComponent implements AfterViewInit {

  products: Product[] = []
  isLoading: boolean = true;
  errorMessage: string | null = null
  categories: string[] = [];
  selectedCategory: string | null = null;
  responsiveOptions: any[] | undefined;



  constructor(private supabaseService: SupabaseService, private cartService: CartService, private cdr: ChangeDetectorRef) { }

  async ngOnInit() {
    await this.fetchProducts();
    
    AOS.init({
      duration: 1200, 
      once: true 
    });

  }

  ngAfterViewInit() {
    new Swiper('.swiper-container', {
      loop: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }


  async fetchProducts(): Promise<void> {
    this.isLoading = true;
    this.errorMessage = null;

    try {
      const data = await this.supabaseService.getData('products');
      if (data) {
        this.products = [...data] as Product[]
        this.categories = [...new Set(this.products.map(product => product.category))];

        this.cdr.detectChanges();

        if (this.categories.length > 0) {
          this.selectedCategory = this.categories[1]
        }

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

  filterByCategory(category: string): void {
    this.selectedCategory = category;
  }

  get filteredProducts(): Product[] {
    if (!this.selectedCategory) {
      return this.products;
    }
    return this.products.filter(product => product.category === this.selectedCategory);
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product)
    alert('محصول به سبد خرید اضافه شد!');
  }

}
