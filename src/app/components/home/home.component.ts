import { CommonModule } from '@angular/common';
import { AfterViewInit, Component,CUSTOM_ELEMENTS_SCHEMA, } from '@angular/core';
import { RouterLink } from '@angular/router';
import Swiper from 'swiper';
import AOS from 'aos';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeComponent implements AfterViewInit {

  ngOnInit(): void {
    AOS.init({
      duration: 1200, // مدت زمان انیمیشن
      once: true // انیمیشن فقط یکبار اجرا شود
    });
  }

  ngAfterViewInit() {
    new Swiper('.swiper-container', {
      loop: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }
  
}
