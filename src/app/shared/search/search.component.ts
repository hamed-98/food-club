import { Component, ElementRef, signal, ViewChild } from '@angular/core';
import { Product } from '../../models/product.interface';
import { debounceTime, distinctUntilChanged, of, switchMap, Subject, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../../services/supabase.service';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ListboxModule } from 'primeng/listbox';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule,Dialog,FormsModule,ButtonModule,ListboxModule,InputTextModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {


  @ViewChild('searchInput') searchInput!: ElementRef;
  searchQuery= signal('');
  dialogVisible = false;
  results = signal<Product[]>([]);
  private searchStream = new Subject<string>();
  private routeSubscription!: Subscription;


  constructor(private router:Router,private SupabaseService: SupabaseService,private CartService:CartService) {

    this.routeSubscription = this.router.events.subscribe(() => {
      this.dialogVisible = false;
      this.searchQuery.set(''); // Clear the search input
    });

    this.searchStream
    .pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((query: string) => query.trim() ? this.SupabaseService.searchProducts(query) : of([]))
    )
    .subscribe((products: Product[]) => {
      this.results.set(products);
      this.dialogVisible = products.length > 0;
    });

  }

  // ngAfterViewInit() {
  //   setTimeout(() => {
  //     if (this.searchInput?.nativeElement) {
  //       this.keepFocus();
  //     }
  //   }, 100); 
  // }

  ngOnChanges() {
    setTimeout(() => {
      if (this.searchInput?.nativeElement) {
        this.keepFocus();
      }
    }, 100);

    // this.keepFocus();
  }
  
  onSearch(event: Event) {
    this.searchQuery.set((event.target as HTMLInputElement).value);
    this.searchStream.next(this.searchQuery());
  }

  keepFocus() {
    setTimeout(() => {
      if (this.searchInput?.nativeElement) {
        this.searchInput.nativeElement.focus();
      }
    }, 0);
  }

  addToCart(product: Product): void {
    this.CartService.addToCart(product)
    alert('محصول به سبد خرید اضافه شد!');
  }

  clearSearch() {
    this.searchQuery.set(''); // مقدار اینپوت را پاک می‌کنیم
  }
  

  ngOnDestroy() {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe()
    }
  }

}
