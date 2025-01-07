import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.interface';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  cartItems:Product[]=[]

  constructor(private cartservice:CartService){}

  ngOnInit(): void {
    this.cartItems = this.cartservice.getCartItems()
  }

  removeItem(productId:number){
    this.cartservice.removeFromCart(productId)
    this.cartItems = this.cartservice.getCartItems()
  }

  clearCart():void{
    this.cartservice.clearCart()
    this.cartItems = []
  }

  calculateTotal(): number{
    return this.cartItems.reduce((total,product)=>total+product.price,0)
  }




}
