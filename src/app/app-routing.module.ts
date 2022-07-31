import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { ServerErrComponent } from './core/server-err/server-err.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'server-error',component:ServerErrComponent},
  {path:'not-found',component:NotFoundComponent},
<<<<<<< HEAD
  {path:'shop',loadChildren:()=> import('src/app/shop/shop.module').then(mod=>mod.ShopModule)},
  {path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule)},
  { path: '**', redirectTo: '', pathMatch: 'full' }
=======
  {path:'Shop',loadChildren:()=> import('src/app/shop/shop.module').then(mod=>mod.ShopModule)},
  {path:'basket',loadChildren:()=> import('src/app/basket/basket.module').then(mod=>mod.BasketModule)},
  {path:'**',redirectTo:'',pathMatch:'full'}
>>>>>>> 2876b535df5dd24b11b16e11746efb422b573a9b
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
