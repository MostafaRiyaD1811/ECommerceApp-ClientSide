import { Component, OnInit } from '@angular/core';
import { BasketService } from './basket/basket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'Suez E-Commerce Shop';
  constructor(private basketService:BasketService){}
  ngOnInit(): void {
    const basketId =localStorage.getItem(`basket_id`);
    if(basketId){
      this.basketService.getBasket(basketId).subscribe(()=>{console.log('init');},err=>console.log(err))
    }
  }
}
