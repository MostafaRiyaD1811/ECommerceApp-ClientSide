import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import {  ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    ReactiveFormsModule,
    BsDropdownModule.forRoot()

  ],
  exports: [
    CommonModule, 
    PaginationModule,
    ReactiveFormsModule,
    BsDropdownModule,

  ]
})
export class SharedModule { }
