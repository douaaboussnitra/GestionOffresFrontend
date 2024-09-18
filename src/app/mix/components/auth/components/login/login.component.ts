import { Router } from '@angular/router';
// login.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted: boolean = false;
  error: string = '';
  spinner:boolean = false;

  constructor(private fbl: FormBuilder, private aus: AuthService,
    private router: Router,




   ) {
    this.loginForm = this.fbl.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.loginForm.valid) {
      this.spinner = true;
      this.error=null
      this.aus.login(this.loginForm.value).subscribe({ // appel fonction login
        next: (response) => {
          this.spinner = false;

          console.log('Login successful', response);
          this.aus.decodeToken(response.token,true); // Decode and store the token and navigate

        },
        error: (error) => {
          console.log('Login error', error);
          this.error = 'Invalid email or password';
          this.spinner = false;

        }
      });
    } else {
      console.log('Invalid form');
      this.error = 'password do not match!';


    }
  }
}
