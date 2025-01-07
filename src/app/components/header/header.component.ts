import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false
  cartCount: number = 0;
  isAdmin:boolean = false

  menuOpen: boolean = false;
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  clesemenu() {
    this.menuOpen = false
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' 
    });
  }

  constructor(public authService: AuthService,public SupabaseService: SupabaseService, private cartservice: CartService,private router:Router) { }

  async ngOnInit() {
    this.userRole()
    this.isLoggedIn = await this.authService.isLoggedIn();

    this.authService.onAuthStateChange((user) => {
      this.isLoggedIn = !!user;
    });

    this.cartservice.cartCount$.subscribe((count) => {
      this.cartCount = count
    });

  }

  async logout() {
    if (confirm('آیا مطمئن هستید؟')) {
      await this.authService.signOut();
      this.isLoggedIn = false;
      this.router.navigate(['/'])
    }
  }

  async userRole(): Promise<boolean>{
    const role = await this.SupabaseService.getCurrentUser();
    if (role.role === 'admin') {
      this.isAdmin = true
      return true;
    } else {
      this.isAdmin = false
      return false;
    }
  }

}
