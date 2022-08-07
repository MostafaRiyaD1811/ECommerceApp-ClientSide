import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IBasket, IBasketItem } from '../shared/models/basket';
import { BasketService } from './basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
  basket$:Observable<IBasket>;

  constructor(private basketService:BasketService, private router : Router) { }

  ngOnInit(){
    this.basket$=this.basketService.basket$;
  }
  removeBasketItem(item:IBasketItem){
    this.basketService.removeItemFromBasket(item);
  }
  incrementItemQuantity(item:IBasketItem){
    this.basketService.incrementItemQuantity(item)
  }
  decrementItemQuantity(item:IBasketItem){
    this.basketService.decrementItemQuantity(item);
  }

  userLogin(){
    var token = localStorage.getItem('token');
    if (token == null){
this.router.navigate(['/account/login']);
    }
  }

}
