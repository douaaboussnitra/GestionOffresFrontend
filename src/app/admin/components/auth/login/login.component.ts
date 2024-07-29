import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] })
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  
  constructor(private fbl : FormBuilder, private aus : AuthService ) {
    this.loginForm = this.fbl.group({
      email:['',[Validators.required , Validators.email]] ,
      password:['',[Validators.required]]
      }) ;}
  ngOnInit(): void {}
  onSubmit(): void
  {
    if(this.loginForm.valid) {  
        this.aus.login(this.loginForm.value).subscribe(Response=>{
          console.log('successful', Response); },
        error=>{
          console.log('error' , error); } ) }   
    else
    {console.log('invalid form');} }}
  

