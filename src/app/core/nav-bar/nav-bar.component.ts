import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
<<<<<<< HEAD
import { AccountService } from 'src/app/account/account.service';
import { IBasket } from 'src/app/shared/models/basket';
import { IUser } from 'src/app/shared/models/user';
=======
import { BasketService } from 'src/app/basket/basket.service';
import { IBasket } from 'src/app/shared/models/basket';
>>>>>>> 2876b535df5dd24b11b16e11746efb422b573a9b
import {ShopComponent} from 'src/app/shop/shop.component'

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  currentUser$: Observable<IUser>;
  constructor(private accountService: AccountService) {

  basket$:Observable<IBasket>;
  constructor(private basketService:BasketService) { }

  ngOnInit(): void {
    this.basket$=this.basketService.basket$;
  }

  ngOnInit(): void {
   this.currentUser$ = this.accountService.CurrentUser$;
  }

  logOut() {
    this.accountService.logout();
  }
}  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

