import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {

  isSidebarOpen: boolean = false;

  ngOnInit() {
    this.updateSidebarState();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.updateSidebarState();
  }

  updateSidebarState() {
    const width = window.innerWidth;
    this.isSidebarOpen = width >= 768; // در سایز md یا بزرگتر، سایدبار باز باشد
  }
  
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

}
