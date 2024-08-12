import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ChooseRoleComponent } from './choose-role/choose-role.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ChooseRoleComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,

   
  ]
})
export class AuthModule { }
