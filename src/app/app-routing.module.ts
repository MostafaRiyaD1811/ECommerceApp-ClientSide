import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { ServerErrComponent } from './core/server-err/server-err.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'server-error',component:ServerErrComponent},
  {path:'not-found',component:NotFoundComponent},
  {path:'Shop',loadChildren:()=> import('src/app/shop/shop.module').then(mod=>mod.ShopModule)},
  {path:'**',redirectTo:'',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
