import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import {OderTotalsComponent} from'./Components/oder-totals/oder-totals.component';


@NgModule({
  declarations: [
    OderTotalsComponent
  ],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
  ],
  exports: [PaginationModule,OderTotalsComponent]

})
export class SharedModule { }
