import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TextInputComponent } from './Components/text-input/text-input.component';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { StepperComponent } from './Components/stepper/stepper.component';
import { OderTotalsComponent } from './Components/oder-totals/oder-totals.component';
import { BasketSummaryComponent } from './Components/basket-summary/basket-summary.component';
import { RouterModule } from '@angular/router';




@NgModule({
  declarations: [
    TextInputComponent,
    StepperComponent,
    OderTotalsComponent,
    BasketSummaryComponent
  ],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    CdkStepperModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    PaginationModule,
    ReactiveFormsModule,
    BsDropdownModule,
    TextInputComponent,
    CdkStepperModule,
    StepperComponent,
    OderTotalsComponent,
    FormsModule,
    BasketSummaryComponent
  ]
})
export class SharedModule { }
