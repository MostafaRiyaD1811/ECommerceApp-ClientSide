import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { AccountService } from './account/account.service';
=======
import { BasketService } from './basket/basket.service';
>>>>>>> 2876b535df5dd24b11b16e11746efb422b573a9b

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
<<<<<<< HEAD
export class AppComponent{
  title = 'Client';
  constructor(private accountService: AccountService) {


  }

  ngOnInit(): void {

    this.loadCurrentUser();
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

=======
export class AppComponent implements OnInit{
>>>>>>> 2876b535df5dd24b11b16e11746efb422b573a9b

  title = 'Suez E-Commerce Shop';
  constructor(private basketService:BasketService){}
  ngOnInit(): void {
    const basketId =localStorage.getItem(`basket_id`);
    if(basketId){
      this.basketService.getBasket(basketId).subscribe(()=>{console.log('init');},err=>console.log(err))
    }
  }
}
