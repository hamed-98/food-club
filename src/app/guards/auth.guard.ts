import { CanActivate, Router } from '@angular/router';
import { SupabaseService } from '../services/supabase.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private SupabaseService: SupabaseService) { }

  async canActivate(): Promise<boolean> {
    const user = await this.SupabaseService.getCurrentUser();
    if (user && user.role === 'admin') {
      console.log('user', user);
      return true;
    }
    this.router.navigate(['']); // اگه ادمین نبود، به صفحه اصلی هدایت بشه
    return false;
  }
}
