// import { Component, OnInit } from '@angular/core';
// import { Product } from '../../models/product.interface';
// import { ActivatedRoute } from '@angular/router';
// import { ProductService } from '../../services/product.service';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-product-details',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './product-details.component.html',
//   styleUrls: ['./product-details.component.css']
// })
// export class ProductDetailsComponent implements OnInit {
  
//   product: Product | null = null
//   isLoading: boolean = true

//   constructor(private productService: ProductService,private route: ActivatedRoute) { }

//   async ngOnInit() {
//     // دریافت ID از پارامترهای آدرس
//     const productId = this.route.snapshot.paramMap.get('id');
//     console.log('ID محصول:', productId);

//     // بررسی وجود ID و دریافت محصول بر اساس آن
//     if (productId) {
//       this.product = await this.productService.getProductById(+productId); // استفاده از متد جدید
//     }

//     // تغییر وضعیت لودینگ به پایان
//     this.isLoading = false;

//     // بررسی لاگ برای رفع مشکلات احتمالی
//     console.log('محصول انتخاب شده:', this.product);
//   }

//   // ngOnInit() {
//   //   const productId = Number(this.route.snapshot.paramMap.get('id')); // ID از پارامتر URL
//   //   this.productService.getProductById(productId).then((product) => {
//   //     this.product = product;
//   //     console.log('محصول انتخاب شده:', this.product); // لاگ برای بررسی
//   //   });
//   // }
  
// }
