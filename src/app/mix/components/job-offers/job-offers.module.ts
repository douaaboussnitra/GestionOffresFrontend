import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobOffersRoutingModule } from './job-offers-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { offersComponent } from './components/offers/offers.component';
import { DetailsComponent } from './components/details/details.component';
import { FormComponent } from 'src/app/recruiter/components/job-offers/form/form.component';
import { ResultComponent } from 'src/app/candidate/components/job-offers/result/result.component';
import { ListOffersComponent } from 'src/app/recruiter/components/job-offers/list-offers/list-offers.component';
import { ApplicationsComponent } from 'src/app/recruiter/components/job-offers/applications/applications.component';
import { ApplyComponent } from 'src/app/candidate/components/job-offers/apply/apply.component';






@NgModule({
  declarations: [
    offersComponent,
    DetailsComponent,
    FormComponent,
    ResultComponent,
    ListOffersComponent,
    ApplicationsComponent,
    ApplyComponent

  ],
  imports: [
    CommonModule,
    JobOffersRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class JopOffersModule { }


