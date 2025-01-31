import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { user } from '../../models/users.interface';
import { SupabaseService } from '../../services/supabase.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.css'
})
export class AdminUsersComponent implements OnInit {
  users: user[] = []
  isLoading = true;

  constructor(private supabaseServise: SupabaseService) { }

  async ngOnInit() {
    const data = await this.supabaseServise.getData('users');
    if (data) {
      this.users = data;
    } else {
      this.users = [];
    }
    this.isLoading = false
  }

  async updateUserRole(user: user) {
    const updateUserRole = await this.supabaseServise.updateData('users', { role: user.role }, user.id)
    if (updateUserRole) {
      alert('خطا در به‌روزرسانی نقش کاربر.');
    } else {
      alert('نقش کاربر با موفقیت به‌روزرسانی شد.');
    }
  }

  async deleteUser(userId: number) {
    const confirmDelete = confirm('آیا از حذف این کاربر اطمینان دارید؟');
    if (!confirmDelete) return;

    const result: any = await this.supabaseServise.deleteData('users', userId)
    console.log('result',result);
    if (!result) {
      const authResult = await this.supabaseServise.deleteAuthUser(userId.toString());
      if (authResult) {
        this.users = this.users.filter((user) => user.id !== userId);
        alert('کاربر با موفقیت حذف شد.');
      } else {
        console.error('خطا در حذف کاربر:', result.error.message);
        alert('حذف کاربر به دلیل وابستگی به داده‌های دیگر ممکن نیست.');
      }
    }else {
      alert('خطایی در حذف کاربر رخ داد.');
    }
  }
}
