import { Component, OnInit } from '@angular/core';

import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/mix/components/auth/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted: boolean = false; // Flag to track form submission
  passwordMatch: boolean = false;

  constructor(private fb: FormBuilder, private aut: AuthService, private route: Router) {
    this.registerForm = this.fb.group(
      {
        username: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        password_conf: ['', [Validators.required]],
      }
    );
  }

  passwordMatchChange(pass: string, confirmPass: string): void {
    this.passwordMatch = !(pass === confirmPass);
  }

  ngOnInit(): void {}

  onSubmit(): void {
    this.submitted = true; // Set the flag to true on form submission
    // copy the syntax from register rec for subscribe
    if (this.registerForm.valid) {
      this.aut.register(this.registerForm.value).subscribe({
        next: (response)=> {
          console.log(response);
          this.aut.login({email: this.registerForm.value.email, password: this.registerForm.value.password}).subscribe(res => {
            this.route.navigate(['/job-offers/offers']);
          })

        },
        error: (error)=> {
          console.log("error", error);
        }
      }

      );
    } else {
      console.log("invalid form");
    }
  }
}
