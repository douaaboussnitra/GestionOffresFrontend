import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../components/auth/service/auth.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  role: number | null = null;
  isLoggedIn = false;

  constructor(private authService: AuthService, private router: Router,
    private location : Location
  ) {}

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

  handleLogout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
    this.role = null;
    this.router.navigate(['/home']);
  }

  go_back():void{
 this.location.back()
  }

  view_goback: string[] = ['/home'];

  check_btn_goback(): boolean {
    return this.view_goback.some(route => this.router.url.includes(route));
  }


}
