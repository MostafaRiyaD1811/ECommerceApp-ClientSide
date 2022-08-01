import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PaginationModule} from 'ngx-bootstrap/pagination';
<<<<<<< Updated upstream
import {  ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
=======
import {OderTotalsComponent} from'./Components/oder-totals/oder-totals.component';
//import { OderTotalsComponent } from ;

>>>>>>> Stashed changes


@NgModule({
  declarations: [
    OderTotalsComponent
  
  ],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    ReactiveFormsModule,
    BsDropdownModule.forRoot()

  ],
<<<<<<< Updated upstream
  exports: [
    CommonModule, 
    PaginationModule,
    ReactiveFormsModule,
    BsDropdownModule,

  ]
=======
  exports: [PaginationModule,OderTotalsComponent]

>>>>>>> Stashed changes
})
export class SharedModule { }
