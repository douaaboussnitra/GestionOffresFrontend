import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/mix/components/auth/service/auth.service';
import { Candidat } from 'src/app/models/condidat.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted: boolean = false;
  passwordMatch: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      password_conf: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {}

  passwordMatchChange(pass: string, confirmPass: string): void {
    this.passwordMatch = !(pass === confirmPass);
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.registerForm.valid) {
      const { email, password } = this.registerForm.value;

      // Register the user
      this.authService.register(this.registerForm.value).subscribe({
        next: (response) => {
          console.log('Registration successful:', response);

          // Automatically login after successful registration
          this.authService.login({ email, password }).subscribe({
            next: (loginResponse) => {
              console.log('Login successful:', loginResponse);
              this.router.navigate(['/job-offers/offers']);
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
