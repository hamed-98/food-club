import { Injectable } from '@angular/core';
import { User } from '@supabase/supabase-js';
import { supabase } from '../supabase-client';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  async signUp(email: string, password: string): Promise<{ user: User | null; message: string }> {
    const { data: authData, error: authError } = await supabase.auth.signUp({ email, password });

    if (authError) throw authError;

    if (authData.user) {
      const { error: dbError } = await supabase.from('users').insert([{ id: authData.user.id, email: authData.user.email, password, role: 'user' }]);

      if (dbError) throw dbError;

      return { user: authData.user, message: 'ثبت نام با موفقیت انجام شد!' };
    }

    return { user: null, message: 'خطا در ثبت‌نام' };
  }



  async signIn(email: string, password: string): Promise<string> {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;

    const user = data.user;
    if (user) {
      const { data: roleData, error: roleError } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single();

      if (roleError) throw roleError;
      return roleData?.role || 'user'; // نقش پیش‌فرض در صورت نبودن داده
    }
    return 'user';
  }


  async signOut(): Promise<void> {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }



  // گرفتن کاربر فعلی
  async getCurrentUser(): Promise<User | null> {
    const user = supabase.auth.getUser();
    return (await user).data.user || null;
  }

  // بررسی ورود کاربر
  async isLoggedIn(): Promise<boolean> {
    const user = await this.getCurrentUser();
    return !!user;
  }

  async onAuthStateChange(callback: (user: User | null) => void) {
    supabase.auth.onAuthStateChange((event, session) => {
      callback(session?.user || null);
    })
  }
}
