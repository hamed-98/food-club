import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {

  email = '';
  password = '';
  errorMessage: string | null = null;
  


  constructor(private authService: AuthService, private router: Router) { }

  async onSubmit() {
    try {
      const role = await this.authService.signIn(this.email, this.password);
      if (role === 'admin') {
        this.router.navigate(['/admin/overview']); // مسیر پنل ادمین
      } else {
        this.router.navigate(['/']); // مسیر کاربر عادی
      }
    } catch (error: any) {
      this.errorMessage = error.message;
    }
  }
}
