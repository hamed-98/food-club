import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  email=''
  password=''
  errorMessage:string=''

  constructor (private AuthService:AuthService,private router:Router){}

  async onSubmit(){
    try {
      await this.AuthService.signUp(this.email,this.password);
      alert('ثبت نام موفقیت آمیز بود')
      this.router.navigate(['/']);
    } catch (error:any) {
      this.errorMessage = error.message;
    }

  }

}
