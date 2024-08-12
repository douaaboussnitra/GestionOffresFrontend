import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm : FormGroup ;
  constructor(private fb :FormBuilder, private aut :AuthService) { 
    this.registerForm= this.fb.group({
      username:['',[Validators.required]],
      email:['',[Validators.required , Validators.email]],
      password:['',[Validators.required]],
      password_conf:['',[Validators.required]],
    })
    }
  ngOnInit(): void {}
   onSubmit() : void {
    if(this.registerForm.valid){
      this.aut.register(this.registerForm.value).subscribe(Response=>{
        console.log("good",Response);
        },error=>{
          console.log("error",error);    
      } )
    }
    else {
      console.log("invalid form");
    }

   }



  




}
