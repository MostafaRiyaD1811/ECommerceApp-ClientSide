import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import{NavBarComponent}from'./nav-bar/nav-bar.component';
import{FooterComponent}from'./footer/footer.component';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { ServerErrComponent } from './server-err/server-err.component';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [
    NavBarComponent,
    FooterComponent,
    NotFoundComponent,
    ServerErrComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ToastrModule.forRoot(
      {
        positionClass:'toast-bottom-right',
        preventDuplicates:true
      }
    )
  ],
  exports:[
    NavBarComponent,
    FooterComponent
  ]

})
export class CoreModule { }
