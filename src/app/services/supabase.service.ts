import { Injectable } from '@angular/core';
import { supabase, supabaseAdmin } from '../supabase-client';
import { Observable, of } from 'rxjs';
import { Product } from '../models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {

  constructor() { }

  // متد برای گرفتن داده‌ها از یک جدول
  async getData(tableName: string) {
    try {
      const { data, error } = await supabase.from(tableName).select('*');
      if (error) throw error
      return data
    } catch (err) {
      console.error('error fetching data:', err);
      return null
    }
  }

  async getDataById(tableName: string, id: number) {
    try {
      const { data, error } = await supabase.from(tableName).select('*').eq('id', id);
      console.log('داده محصول با ID:', data); // لاگ برای تست
      if (error) throw error;
      return data;
    } catch (err) {
      console.error('Error fetching data by ID:', err);
      return null;
    }
  }


  async addData(tableName: string, payload: object) {
    try {
      const { data, error } = await supabase.from(tableName).insert([payload]).select();
      if (error) throw error;
      return data ? data[0] : null
    } catch (err) {
      console.error('error adding data:', err);
      return null;
    }
  }

  async updateData(tableName: string, payload: object, id: number) {
    try {
      const { data, error } = await supabase.from(tableName).update(payload).eq('id', id);
      if (error) throw error;
      return data
    } catch (err) {
      console.error('errore updating data:', err);
      return null;
    }
  }

  async deleteData(tableName: string, id: number) {
    try {
      const { data, error } = await supabase.from(tableName).delete().eq('id', id);
      if (error) throw error;
      return data
    } catch (err) {
      console.error('error deleting data:', err);
      return null;
    }
  }

  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) {
      console.error('error getting current user:', error);
      return null;
    }
    const { data: userData, error: roleError } = await supabase
      .from('users')
      .select('*')
      .eq('id', user?.id)
      .single();
    if (roleError) {
      console.error('Error fetching role:', roleError);
      return null;
    }
    return userData
  }

  async deleteAuthUser(userId: string) {
    try {
      const { error } = await supabaseAdmin.auth.admin.deleteUser(userId);
      if (error) throw error;
      console.log('کاربر از Authentication با موفقیت حذف شد.');
      return true;
    } catch (error) {
      console.error('خطا در حذف کاربر از Authentication:', error);
      return false;
    }
  }

  async uploadImage(imageFile: File) {
    const filePath = `products/${Date.now()}_${imageFile.name}`;
    const { error } = await supabase.storage
      .from('product-images')
      .upload(filePath, imageFile, {
        cacheControl: '3600',
        upsert: true,
      });

    if (error) {
      console.error('Error uploading image:', error);
      throw error;
    }

    const publicUrl = supabase.storage
      .from('product-images')
      .getPublicUrl(filePath).data.publicUrl;
    return publicUrl; // بازگشت لینک عمومی
  }

  async updateProduct(product: { id?: number; [key: string]: any }) {
    console.log('شروع متد updateProduct با داده:', product);
    try {
      // جدا کردن ID از داده‌ها
      const { id, ...payload } = product;
  
      // ارسال داده‌ها به جز id برای آپدیت
      const { data, error } = await supabase.from('products').update(payload).eq('id', id);
  
      if (error) throw error;
  
      console.log('محصول با موفقیت ویرایش شد:', data);
      return data;
    } catch (err) {
      console.error('خطا در ویرایش محصول:', err);
      throw err;
    }
  }

  searchProducts(query: string): Observable<Product[]> {
    if (!query.trim()) {
      return of([]); // اگر جستجو خالی بود، نتایج خالی ارسال می‌کنیم
    }

    return new Observable((observer) => {
      supabase
        .from('products')
        .select('*')
        .ilike('name', `%${query}%`) // جستجوی بر اساس نام محصول
        .then(({ data, error }) => {
          if (error) {
            observer.error(error);
          } else {
            observer.next(data); // ارسال نتایج به اشتراک‌گذاری
          }
        });
    });
  }

  
}
