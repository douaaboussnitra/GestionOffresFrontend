import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ChooseRoleComponent } from './choose-role/choose-role.component';
import { RegisterRecruiterComponent } from './register-recruiter/register-recruiter.component';

const routes: Routes = [
  {
    path: '',
    children:[
      { path: 'choose', component : ChooseRoleComponent},
      { path: 'login', component : LoginComponent},
      { path: 'register', component : RegisterComponent},
      { path: 'register-recruiter', component : RegisterRecruiterComponent},

      
    ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
