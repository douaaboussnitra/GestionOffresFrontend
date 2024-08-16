import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ChooseRoleComponent } from './components/choose-role/choose-role.component';
import { RegisterComponent } from 'src/app/candidate/components/register/register.component';
import { RegisterRecruiterComponent } from 'src/app/recruiter/components/register-recruiter/register-recruiter.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ChooseRoleComponent,
    RegisterRecruiterComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,

   
  ]
})
export class AuthModule { }
