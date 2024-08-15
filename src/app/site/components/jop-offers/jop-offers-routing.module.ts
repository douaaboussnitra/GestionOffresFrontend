import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { offersComponent } from './offers/offers.component';
import { DetailsComponent } from './details/details.component';
import { FormComponent } from './form/form.component';
import { ApplyComponent } from './apply/apply.component';
import { ResultComponent } from './result/result.component';

const routes: Routes = [
    {
      path: '',
      children:[
        { path: 'offers', component : offersComponent},
        { path: 'details', component : DetailsComponent},
        { path: 'form', component : FormComponent},
        { path: 'apply', component : ApplyComponent},
        { path: 'result', component : ResultComponent},

      ]
      }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JopOffersRoutingModule { }
