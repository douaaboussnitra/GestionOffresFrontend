import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecruiterMenuComponent } from './recruiter/layout/recruiter-menu/recruiter-menu.component';
import { HomeComponent } from './mix/components/home/home.component';
import { authGuard } from './Guards/auth.guard';
import { recruiterGuard } from './Guards/recruiter.guard';
const routes: Routes = [
  {
    path: 'auth',
    loadChildren : () => import ("./mix/components/auth/auth.module") .then(m=>m.AuthModule)
    },
    {
      path: 'job-offers',
      loadChildren : () => import ("./mix/components/job-offers/job-offers.module") .then(m=>m.JopOffersModule)
      },

      {
        path: 'liste-offers',
        component : RecruiterMenuComponent ,  canActivate: [authGuard, recruiterGuard],
        },

        {
          path: 'home',
          component : HomeComponent
          },

      {
        path: '**',
      redirectTo: 'home'
      },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }


