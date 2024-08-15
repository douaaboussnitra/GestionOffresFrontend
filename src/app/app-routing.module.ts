import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecruiterMenuComponent } from './site/layout/recruiter-menu/recruiter-menu.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren : () => import ("./site/components/auth/auth.module") .then(m=>m.AuthModule)
    },
    {
      path: 'jop-offers',
      loadChildren : () => import ("./site/components/jop-offers/jop-offers.module") .then(m=>m.JopOffersModule)
      },

      {
        path: 'layout',
        component : RecruiterMenuComponent
        },

      {
        path: '**',
      redirectTo: 'jop-offers/offers'
      },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }


