import { Injectable } from '@angular/core';
import { Product } from '../models/product.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart: Product[] = []
  private cartSubject = new BehaviorSubject<number>(0);

  cartCount$ = this.cartSubject.asObservable();

  constructor() {}

  addToCart(product: Product): void {
    if (!product.availability) {
      alert('این محصول موجود نیست.');
      return;
    }
    this.cart.push(product);
    this.updateCart();
  }

  getCartItems() {
    return this.cart
  }

  removeFromCart(productId: number): void {
    this.cart = this.cart.filter((item) => item.id !== productId)
    this.updateCart()
  }

  clearCart(): void {
    this.cart = [];
    this.updateCart();
  }

  getCartCount(): number {
    return this.cart.length;
  }

  private updateCart():void{
    this.cartSubject.next(this.cart.length);
  }

}
