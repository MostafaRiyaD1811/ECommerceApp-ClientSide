import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import { IBasket } from 'src/app/shared/models/basket';
import { IUser } from 'src/app/shared/models/user';
import { BasketService } from 'src/app/basket/basket.service';
import {ShopComponent} from 'src/app/shop/shop.component'


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  currentUser$: Observable<IUser>;
  basket$:Observable<IBasket>;
  constructor(private accountService: AccountService, private basketService: BasketService)
  {

  }
  ngOnInit(): void {
    this.basket$=this.basketService.basket$;
    this.currentUser$ = this.accountService.CurrentUser$;
  }

  logOut() {
    this.accountService.logout();
  }
}
  

