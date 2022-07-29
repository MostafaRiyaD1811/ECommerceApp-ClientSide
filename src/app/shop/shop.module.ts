import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
<<<<<<< HEAD
import { ProductItemComponent } from './product-item/product-item.component';
import { SharedModule } from '../shared/shared.module';
=======
import { ProductDetailsComponent } from './product-details/product-details.component';

>>>>>>> 5bd8461d3ad9c7659b58be49a8a9d24b9988d511


@NgModule({
  declarations: [
<<<<<<< HEAD
    ShopComponent, ProductItemComponent
=======
    ShopComponent,
    ProductDetailsComponent
>>>>>>> 5bd8461d3ad9c7659b58be49a8a9d24b9988d511
  ],
  imports: [
    CommonModule,
    SharedModule 
  ],
  exports:[
    ShopComponent
  ]
})
export class ShopModule { }
