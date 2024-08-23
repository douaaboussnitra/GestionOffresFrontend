import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/mix/components/auth/service/auth.service';

@Component({
  selector: 'app-register-recruiter',
  templateUrl: './register-recruiter.component.html',
  styleUrls: ['./register-recruiter.component.css']
})
export class RegisterRecruiterComponent implements OnInit {
  registerFormrec: FormGroup;

  constructor(
    private fbl: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerFormrec = this.fbl.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]], // Corrected the phone number pattern regex
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.registerFormrec.valid) {
      const { email, password } = this.registerFormrec.value;

      // Register the recruiter
      this.authService.register_rec(this.registerFormrec.value).subscribe({
        next: (response) => {
          console.log('Registration successful:', response);

          // Automatically login after successful registration
          this.authService.login({ email, password }).subscribe({
            next: (loginResponse) => {
              console.log('Login successful:', loginResponse);
              this.router.navigate(['/layout']);
            },
            error: (loginError) => {
              console.error('Login failed:', loginError);
            }
          });
        },
        error: (error) => {
          console.error('Registration failed:', error);
        }
      });
    } else {
      console.log('Invalid form');
    }
  }
}
