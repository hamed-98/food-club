import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.interface';
import { ProductService } from '../../services/product.service';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-products.component.html',
  styleUrl: './admin-products.component.css'
})
export class AdminProductsComponent implements OnInit {
  products: Product[] | null | undefined = [];
  isLoading: boolean = true;
  isModalOpen: boolean = false;
  isEditing: boolean = false;
  isUploading: boolean = false;
  previewUrl: string | null = null;

  newProduct: Product = {
    name: '',
    description: '',
    price: 0,
    image: '',
    category: '',
    availability: true,
  };
  selectedFile: File | null = null;


  constructor(private productService: ProductService, private supsabaseService: SupabaseService) { }

  ngOnInit() {
    this.fetchProducts()
  }

  async fetchProducts() {
    this.products = await this.productService.getProducts()
    this.isLoading = false;
  }

  openModal() {
    this.isModalOpen = true;
    this.isEditing = false;
    this.resetForm() 
  }

  closeModal() {
    this.isModalOpen = false;
    this.resetForm()
    this.previewUrl=null;
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result as string; // تبدیل نتیجه به رشته
      };
      reader.readAsDataURL(file);
    }
  }

  // Reset the form
  resetForm() {
    this.newProduct = {
      name: '',
      description: '',
      price: 0,
      image: '',
      category: '',
      availability: true,
    };
    this.selectedFile = null;
  }

  async deleteProduct(id: number) {
    const confirmation = confirm('آیا مطمئن هستید که می‌خواهید این محصول را حذف کنید؟');
    if (confirmation) {
      await this.productService.deleteProduct(id);
      this.products = this.products?.filter(product => product.id !== id);
    }
  }

  async addProduct() {
    if (this.selectedFile) {
      this.isUploading = true;
      const imageUrl = await this.uploadImage(this.selectedFile);
      this.newProduct.image = imageUrl;
    }

    try {
      const response = await this.productService.addProduct(this.newProduct);
      if (response) {
        console.log('محصول با موفقیت افزوده شد:', response);
        this.fetchProducts(); // به‌روزرسانی لیست محصولات
        this.closeModal(); // بستن مدال
      } else {
        alert('افزودن محصول با خطا مواجه شد.');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      alert('افزودن محصول با خطا مواجه شد.');
    }finally {
      this.isUploading = false; 
    }
  }

  async uploadImage(file: File) {
    try {
      const imageUrl = await this.supsabaseService.uploadImage(file);
      return imageUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      return '';
    }
  }

  editProduct(product: Product) {
    this.isModalOpen = true; // باز کردن مودال
    this.newProduct = { ...product }; // کپی محصول برای ویرایش
    this.isEditing = true;
  }

  async saveChanges() {
    try {
      if (this.selectedFile) {
        this.isUploading = true;
        const imageUrl = await this.uploadImage(this.selectedFile);
        this.newProduct.image = imageUrl;
      }

      const updatedProduct = await this.supsabaseService.updateProduct({
        id: this.newProduct.id, // شرط آپدیت
        name: this.newProduct.name, // مقادیر قابل آپدیت
        description: this.newProduct.description,
        price: this.newProduct.price,
        image: this.newProduct.image,
        category: this.newProduct.category,
        availability: this.newProduct.availability,
      });
      if (!updatedProduct) {
        console.log('محصول با موفقیت ویرایش شد:', updatedProduct);
        this.fetchProducts(); 
        this.closeModal();
      } else {
        alert('ویرایش محصول خطا مواجه شد.');
      }

    } catch (error) {
      console.error('خطا در فرآیند ویرایش:', error);
      alert('ویرایش محصول با خطا مواجه شد.');
    }finally {
      this.isUploading = false; 
    }
  }


}
