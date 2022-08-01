import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BasketService } from 'src/app/basket/basket.service';
import { Basket } from 'src/app/shared/models/basket';
import { IProduct } from 'src/app/shared/models/product';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product:IProduct;
  quantity=1;
  constructor(private shopService:ShopService,private activateRoute:ActivatedRoute,private basketservice:BasketService) { }

  ngOnInit(): void {
    this.getPrdId();
  }
  addItemToBasket(){
    this.basketservice.addItemToBasket(this.product,this.quantity)
  }
  incrementQuantity(){
    this.quantity++;
  }
  decrementQuantity(){
    if(this.quantity>1){
    this.quantity--;}
    
  }
  getPrdId(){
    this.shopService.getProduct(this.activateRoute.snapshot.paramMap.get('id'))
    .subscribe(response=>{
      this.product = response
    },error=>{
      console.log(error);
    })
  }
}
