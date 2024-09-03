// navbar.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../components/auth/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  role: number | null = null;
  isLoggedIn = false;
  DropdownOpen = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.user$.subscribe({
      next: (user) => {
        console.log(user);
        this.isLoggedIn = !!user;
        this.role = user?.role || null;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  toggleDropdown(): void {
    this.DropdownOpen = !this.DropdownOpen;
  }

  handleLogout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
    this.role = null;
    this.router.navigate(['/home']);
  }
}
