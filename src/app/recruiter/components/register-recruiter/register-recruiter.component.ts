import { Recruiter } from './../../../models/recruiter.model';
import { RecruiterService } from 'src/app/recruiter/recruiter.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/mix/components/auth/service/auth.service';
import { catchError, forkJoin, of, switchMap } from 'rxjs';




@Component({
  selector: 'app-register-recruiter',
  templateUrl: './register-recruiter.component.html',
  styleUrls: ['./register-recruiter.component.css']
})
export class RegisterRecruiterComponent implements OnInit {
  registerFormrec: FormGroup;
  submitted: boolean = false;
  passwordMatch: boolean = false;

  constructor(
    private fbl: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private recruiterService: RecruiterService

  ) {
    this.registerFormrec = this.fbl.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
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

    if (this .registerFormrec.valid) {
      const { name,email,phone, password,password_conf } = this.registerFormrec.value;
      forkJoin({
        userRegistration: this.authService.register({email,password,role:1,username:name,password_conf}),
        recruiterRegistration: this.recruiterService.createRecruiter({name,phone,...this.registerFormrec.value})
      })
      .pipe(
        switchMap((responses) => {
           console.log('User registration successful:', responses.userRegistration);
          console.log('recruiter registration successful:', responses.recruiterRegistration);
          // Automatically login after successful registrations
          return this.authService.login({ email, password })
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
            this.router.navigate(['/layout']); // Navigate to recruiter home page
          }
        },
        error: (loginError) => {
          console.error('Login failed:', loginError);
        }
      });
  }
        };
        }













   /*  if (this.registerFormrec.valid) {
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
    } */





/*


import { CandidateService } from 'src/app/candidate/candidate.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, forkJoin, of, switchMap } from 'rxjs';
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
    private router: Router,
    private candidateservice: CandidateService

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

    if (this .registerForm.valid) {
      const { email, password , username } = this.registerForm.value;
      forkJoin({
        userRegistration: this.authService.register({...this.registerForm.value,role:2}),
        candidatRegistration: this.candidateservice.createCandidat({name:username,...this.registerForm.value})
      })
      .pipe(
        switchMap((responses) => {
           console.log('User registration successful:', responses.userRegistration);
          console.log('Candidate registration successful:', responses.candidatRegistration);
          // Automatically login after successful registrations
          return this.authService.login({ email, password })
        }),
        catchError((error) => {
          console.error('An error occurred during registration:', error);
          return of(null);
        })
      )
      .subscribe({
        next: (loginResponse) => {
          if (loginResponse) {
            console.log('Login successful:', loginResponse);
            this.router.navigate(['/job-offers/offers']);
          }
        },
        error: (loginError) => {
          console.error('Login failed:', loginError);
        }
      }); */
