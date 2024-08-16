import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { offersComponent } from './components/offers/offers.component';
import { DetailsComponent } from './components/details/details.component';
import { FormComponent } from 'src/app/recruiter/components/job-offers/form/form.component';
import { ResultComponent } from 'src/app/candidate/components/job-offers/result/result.component';
import { ListOffersComponent } from 'src/app/recruiter/components/job-offers/list-offers/list-offers.component';
import { ApplicationsComponent } from 'src/app/recruiter/components/job-offers/applications/applications.component';
import { ApplyComponent } from 'src/app/candidate/components/job-offers/apply/apply.component';

const routes: Routes = [
    {
      path: '',
      children:[
        { path: 'offers', component : offersComponent},
        { path: 'details', component : DetailsComponent},
        { path: 'form', component : FormComponent},
        { path: 'apply', component : ApplyComponent},
        { path: 'result', component : ResultComponent},
        { path: 'liste-offers', component :ListOffersComponent },
        { path: 'applications', component :ApplicationsComponent },
        
      ]
      }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobOffersRoutingModule { }
