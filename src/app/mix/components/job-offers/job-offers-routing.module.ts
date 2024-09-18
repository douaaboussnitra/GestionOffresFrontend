import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { offersComponent } from './components/offers/offers.component';
import { DetailsComponent } from './components/details/details.component';
import { FormComponent } from 'src/app/recruiter/components/job-offers/form/form.component';
import { ResultComponent } from 'src/app/candidate/components/job-offers/result/result.component';
import { ListOffersComponent } from 'src/app/recruiter/components/job-offers/list-offers/list-offers.component';
import { ApplicationsComponent } from 'src/app/recruiter/components/job-offers/applications/applications.component';
import { ApplyComponent } from 'src/app/candidate/components/job-offers/apply/apply.component';
import { authGuard } from 'src/app/Guards/auth.guard';
import { candidateGuard } from 'src/app/Guards/candidate.guard';
import { recruiterGuard } from 'src/app/Guards/recruiter.guard';

const routes: Routes = [
    {
      path: '',
      children:[
      { path: 'offers', component: offersComponent , canActivate: [authGuard, candidateGuard],},
      { path: 'details/:id', component: DetailsComponent , canActivate: [authGuard] },
      { path: 'form', component: FormComponent ,  canActivate: [authGuard, recruiterGuard], },
      { path: 'form/:id', component: FormComponent ,  canActivate: [authGuard, recruiterGuard],},
      { path: 'apply/:id', component: ApplyComponent , canActivate: [authGuard, candidateGuard], },
      { path: 'apply/:id/:idapp', component: ApplyComponent , canActivate: [authGuard, candidateGuard], },
      { path: 'result/:id', component: ResultComponent , canActivate: [authGuard],},
      { path: 'liste-offers', component: ListOffersComponent,  canActivate: [authGuard, recruiterGuard], },
      { path: 'applications/:id', component: ApplicationsComponent ,  canActivate: [authGuard, recruiterGuard], }
      ]
      }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobOffersRoutingModule { }
