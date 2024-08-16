import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] })
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
submitted: boolean = false;
  
  constructor(private fbl : FormBuilder, private aus : AuthService , private router: Router ) {
    this.loginForm = this.fbl.group({
      email:['12345@gamil.com',[Validators.required , Validators.email]] ,
      password:['123456',[Validators.required]]
      }) ;}
  ngOnInit(): void {}
  onSubmit(): void
  {
    this.submitted = true;
    if(this.loginForm.valid) {  
        this.aus.login(this.loginForm.value).subscribe(Response=>{
          console.log('successful', Response); 
          this.router.navigate(['/jop-offers/details']);
        },
        error=>{
          console.log('error' , error); } ) }   
    else
    {console.log('invalid form');} }}
  

