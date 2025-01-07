// import { Component } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { SupabaseService } from '../../services/supabase.service';

// @Component({
//   selector: 'app-profile',
//   standalone: true,
//   imports: [FormsModule],
//   templateUrl: './profile.component.html',
//   styleUrl: './profile.component.css'
// })
// export class ProfileComponent {
//   user = { email: '', name: '' };

//   constructor(private SupabaseService:SupabaseService){}


//   async updateProfile() {
//     try {
//       const { error } = await this.SupabaseService.
//         .from('users')
//         .update({ name: this.user.name })
//         .eq('email', this.user.email);

//       if (error) throw error;

//       alert('اطلاعات با موفقیت ذخیره شد');
//     } catch (error) {
//       console.error('خطا در به‌روزرسانی اطلاعات کاربر:', error.message);
//       alert('مشکلی در ذخیره اطلاعات پیش آمد');
//     }
//   }

// }
