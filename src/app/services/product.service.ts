import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { Product } from '../models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private supabaseService: SupabaseService) { }

  async getProducts() {
    try {
      return await this.supabaseService.getData('products');
    } catch (error) {
      console.error('Error fetching products:', error);
      return null;
    }
  }

  // async getProductById(productId: number) {
  //   try {
  //     const { data, error } = await this.supabaseService.getDataById('products', productId);
  //     if (error) throw error;
  //     return data ? data[0] : null;
  //   } catch (error) {
  //     console.error('Error fetching product by ID:', error);
  //     return null;
  //   }
  // }

  async getProductById(productId: number) {
    try {
      const data = await this.supabaseService.getDataById('products', productId);
      if (data === undefined || data === null) {
        throw new Error('No data returned');
      }
      return data[0] || null;
    } catch (error) {
      console.error('Error fetching product by ID:', error);
      return null;
    }
  }

  async deleteProduct(productId: number) {
    try {
      const data = await this.supabaseService.deleteData('products', productId);
      if (!data) {
        console.warn('No data returned, but proceeding with deletion');
      }
      return data || null;
    } catch (error) {
      console.error('Error deleting product:', error);
      return null;
    }
  }
  

  async addProduct(product:Product) {
    try {
      return await this.supabaseService.addData('products', product);
    } catch (error) {
     console.error('Error adding product:', error);
     return null; 
    }
  }
}
