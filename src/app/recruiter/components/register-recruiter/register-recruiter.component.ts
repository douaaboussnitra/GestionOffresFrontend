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
  passwordMatch: boolean = false;
  isSubmit:boolean=false;

  constructor(
    private fbl: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private recruiterService: RecruiterService

  ) {
    this.registerFormrec = this.fbl.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email , Validators.pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/)]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      password: ['', [Validators.required,Validators.minLength(8)]],
      password_conf: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {}

  passwordMatchChange(pass: string, confirmPass: string): void {
    this.passwordMatch = !(pass === confirmPass);
  }

  onSubmit(): void {
    this.isSubmit=true;
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
            this.authService.decodeToken(loginResponse.token,true); // Decode the token and set the user state
          }
        },
        error: (loginError) => {
          console.error('Login failed:', loginError);
        }
      });
  }
        };
        }
