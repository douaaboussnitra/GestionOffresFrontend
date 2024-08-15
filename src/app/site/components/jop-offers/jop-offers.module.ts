import { offersComponent } from './offers/offers.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JopOffersRoutingModule } from './jop-offers-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DetailsComponent } from './details/details.component';
import { FormComponent } from './form/form.component';
import { PostulerComponent } from './postuler/postuler.component';
import { ResultComponent } from './result/result.component';


@NgModule({
  declarations: [
    offersComponent,
    DetailsComponent,
    FormComponent,
    PostulerComponent,
    ResultComponent
  ],
  imports: [
    CommonModule,
    JopOffersRoutingModule,
    ReactiveFormsModule
  ]
})
export class JopOffersModule { }


