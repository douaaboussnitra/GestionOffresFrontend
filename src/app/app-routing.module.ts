import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren : () => import ("./site/components/auth/auth.module") .then(m=>m.AuthModule)
    },
    {
      path: 'jop-offers',
      loadChildren : () => import ("./site/components/jop-offers/jop-offers.module") .then(m=>m.JopOffersModule)
      },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }


