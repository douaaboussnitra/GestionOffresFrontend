import { Component } from '@angular/core';

@Component({
  selector: 'app-recruiter-menu',
  templateUrl: './recruiter-menu.component.html',
  styleUrls: ['./recruiter-menu.component.css']
})
export class RecruiterMenuComponent {
  isSidebarOpen = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

}
