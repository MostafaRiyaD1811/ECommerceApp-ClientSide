import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { OderTotalsComponent } from './Components/oder-totals/oder-totals.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CdkStepperModule } from '@angular/cdk/stepper';
// import { StepperComponent } from './Components/'
// import { TextInputComponent } from './Components/text-input/text-input.component';



@NgModule({
  declarations: [
    OderTotalsComponent,
    // StepperComponent,
    // TextInputComponent
  ],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    CdkStepperModule
  ],
  exports: [
    PaginationModule,
    OderTotalsComponent,
    ReactiveFormsModule,
    BsDropdownModule,
    CdkStepperModule,
    // StepperComponent,
    // TextInputComponent
  ]

})
export class SharedModule { }
