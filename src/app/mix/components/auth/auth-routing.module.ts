import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ChooseRoleComponent } from './components/choose-role/choose-role.component';
import { RegisterRecruiterComponent } from 'src/app/recruiter/components/register-recruiter/register-recruiter.component';
import { RegisterComponent } from 'src/app/candidate/components/register/register.component';

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
