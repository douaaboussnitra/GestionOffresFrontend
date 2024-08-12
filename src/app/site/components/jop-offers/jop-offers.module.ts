import { offersComponent } from './offers/offers.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JopOffersRoutingModule } from './jop-offers-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DetailsComponent } from './details/details.component';


@NgModule({
  declarations: [
    offersComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    JopOffersRoutingModule,
    ReactiveFormsModule
  ]
})
export class JopOffersModule { }


