import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecruiterMenuComponent } from './recruiter/layout/recruiter-menu/recruiter-menu.component';
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
        path: 'layout',
        component : RecruiterMenuComponent
        },

      {
        path: '**',
      redirectTo: 'job-offers/offers'
      },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }


