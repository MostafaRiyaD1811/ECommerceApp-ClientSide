import { Component, OnInit } from '@angular/core';
import { AccountService } from './account/account.service';
import { BasketService } from './basket/basket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit{

  title = 'Suez E-Commerce Shop';
  constructor(private basketService:BasketService, private accountService: AccountService){}
  ngOnInit(): void {
    this.loadCurrentUser();
    const basketId =localStorage.getItem(`basket_id`);
    if(basketId){
      this.basketService.getBasket(basketId).subscribe(()=>{console.log('init');},err=>console.log(err))
    }
  }

  loadCurrentUser() {
    const token = localStorage.getItem('token');
    this.accountService.loadCurrentUser(token).subscribe({
      next: () => {
      console.log('loaded user');
      },
      error: error => {
      console.log(error);
    }})
  }
}
