// login.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted: boolean = false;

  constructor(private fbl: FormBuilder, private aus: AuthService, private router: Router) {
    this.loginForm = this.fbl.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    this.submitted = true;

    if (this.loginForm.valid) {
      this.aus.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log('Login successful', response);
          this.aus.decodeToken(response.token); // Decode and store the token

          const decodedToken = this.aus.getDecodedToken(); // Fetch the decoded token from the service
          const role = decodedToken?.role; // Get the role

          if (role === 1) {
            this.router.navigate(['/layout']); // Admin role
          } else if (role === 2) {
            this.router.navigate(['/job-offers/offers']); // Candidat role
          } else {
            this.router.navigate(['/home']); // Default route if role is not recognized
          }
        },
        error: (error) => {
          console.log('Login error', error);
        }
      });
    } else {
      console.log('Invalid form');
    }
  }
}
