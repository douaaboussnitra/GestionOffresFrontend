import { Component, OnInit } from '@angular/core';

import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/mix/components/auth/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted: boolean = false; // Flag to track form submission

  constructor(private fb: FormBuilder, private aut: AuthService) {
    this.registerForm = this.fb.group(
      {
        username: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        password_conf: ['', [Validators.required]],
      },
      {
        validators: this.passwordMatchValidator
      }
    );
  }

  // Custom validator to check that password and password_conf match
  passwordMatchValidator(control: AbstractControl): any {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('password_conf')?.value;

    if (password !== confirmPassword && confirmPassword.length > 0) {
      control.get('password_conf')?.setErrors({ passwordMismatch: true });
    } else {
      return null;
    }
  }

  ngOnInit(): void {}

  onSubmit(): void {
    this.submitted = true; // Set the flag to true on form submission

    if (this.registerForm.valid) {
      this.aut.register(this.registerForm.value).subscribe(
        response => {
          console.log("good", response);
        },
        error => {
          console.log("error", error);
        }
      );
    } else {
      console.log("invalid form");
    }
  }
}