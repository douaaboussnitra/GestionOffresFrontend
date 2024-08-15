import { offersComponent } from './offers/offers.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JopOffersRoutingModule } from './jop-offers-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DetailsComponent } from './details/details.component';
import { FormComponent } from './form/form.component';
import { ResultComponent } from './result/result.component';
import { ListOffersComponent } from './list-offers/list-offers.component';
import { ApplicationsComponent } from './applications/applications.component';


@NgModule({
  declarations: [
    offersComponent,
    DetailsComponent,
    FormComponent,
    ResultComponent,
    ListOffersComponent,
    ApplicationsComponent
  ],
  imports: [
    CommonModule,
    JopOffersRoutingModule,
    ReactiveFormsModule
  ]
})
export class JopOffersModule { }


