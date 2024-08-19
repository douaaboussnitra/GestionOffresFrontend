import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/mix/components/auth/service/auth.service';

@Component({
  selector: 'app-register-recruiter',
  templateUrl: './register-recruiter.component.html',
  styleUrls: ['./register-recruiter.component.css']
})
export class RegisterRecruiterComponent implements OnInit {
  registerFormrec:FormGroup;

  constructor(private fbl : FormBuilder , private authService: AuthService ,private router: Router ) {
    this.registerFormrec = this.fbl.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern("/^\d{10}$/")]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    },) ;}
      ngOnInit(): void {
      }
      onSubmit(): void
  {
    if(this.registerFormrec.valid) {
        this.authService.register_rec(this.registerFormrec.value).subscribe({next: (Response) => {
          console.log('successful', Response);
          this.router.navigate(['/layout']);
        },
      error: (error)=> {
        console.log('error' , error); }
      })
     }
    else
    {console.log('invalid form');}

  }

}
