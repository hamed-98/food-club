// import { Injectable } from '@angular/core';
// import { CanActivate, Router } from '@angular/router';
// import { AuthService } from '../services/auth.service';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root',
// })
// export class RoleGuard implements CanActivate {
//   constructor(private authService: AuthService, private router: Router) {}

//   canActivate(): Observable<boolean> {
//     return this.authService.user$.pipe(
//       map((user) => {
//         if (user && user.role === 'admin') {
//           return true; // اجازه ورود به مسیر
//         } else {
//           this.router.navigate(['/']); // انتقال به صفحه اصلی
//           return false;
//         }
//       })
//     );
//   }
// }
