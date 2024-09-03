// register.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, forkJoin, of, switchMap } from 'rxjs';
import { AuthService } from 'src/app/mix/components/auth/service/auth.service';
import { CandidateService } from 'src/app/candidate/candidate.service';

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
    private router: Router,
    private candidateService: CandidateService
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
      const { email, password, username } = this.registerForm.value;

      forkJoin({
        userRegistration: this.authService.register({ ...this.registerForm.value, role: 2 }),
        candidatRegistration: this.candidateService.createCandidat({ fullname: username, ...this.registerForm.value })
      })
        .pipe(
          switchMap((responses) => {
            console.log('User registration successful:', responses.userRegistration);
            console.log('Candidate registration successful:', responses.candidatRegistration);

            // Automatically login after successful registrations
            return this.authService.login({ email, password });
          }),
          catchError((error) => {
            console.error('An error occurred during registration:', error);
            return of(null);
          })
        )
        .subscribe({
          next: (loginResponse) => {
            if (loginResponse) {
              this.authService.decodeToken(loginResponse.token); // Decode the token and set the user state
              console.log('Login successful:', loginResponse);
              this.router.navigate(['/job-offers/offers']); // Navigate to candidate home page
            }
          },
          error: (loginError) => {
            console.error('Login failed:', loginError);
          }
        });
    } else {
      console.log('Invalid form');
    }
  }
}
