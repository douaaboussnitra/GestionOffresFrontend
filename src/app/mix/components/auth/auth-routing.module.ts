import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ChooseRoleComponent } from './components/choose-role/choose-role.component';
import { RegisterRecruiterComponent } from 'src/app/recruiter/components/register-recruiter/register-recruiter.component';
import { RegisterComponent } from 'src/app/candidate/components/register/register.component';
import { antiAuthGuard } from 'src/app/Guards/notauth.guard'; // Anti-auth guard for routes the user shouldn't access when logged in

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'choose', component: ChooseRoleComponent },
      { path: 'login', component: LoginComponent, canActivate: [antiAuthGuard] }, // Only accessible when not authenticated
      { path: 'register', component: RegisterComponent, canActivate: [antiAuthGuard] },
      { path: 'register-recruiter', component: RegisterRecruiterComponent, canActivate: [antiAuthGuard] },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
