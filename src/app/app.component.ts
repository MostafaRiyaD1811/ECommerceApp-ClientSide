import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from './account/account.service';
import { BasketService } from './basket/basket.service';
import { BnNgIdleService } from 'bn-ng-idle';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {

  title = 'Suez E-Commerce Shop';
  constructor(private toastr:ToastrService, private bnIdle: BnNgIdleService, private basketService: BasketService, private accountService: AccountService, private router: Router) {
    this.bnIdle.startWatching(15).subscribe( (res) => {
      var token = localStorage.getItem('token');
        if (res && token !=null) {
          sessionStorage.removeItem('token');
          localStorage.removeItem('token');
          this.accountService.logout();
          this.router.navigate(['/account/login']);
          this.toastr.error('Your session has been ended due to inactive, please try to login again')
          bnIdle.resetTimer();
        }

        console.log("session expired");
      }

    );
  }
  ngOnInit(): void {
    this.loadCurrentUser();
    const basketId = localStorage.getItem(`basket_id`);
    if (basketId) {
      this.basketService.getBasket(basketId).subscribe(() => { console.log('init'); }, err => console.log(err))
    }
  }


  loadCurrentUser() {
    const localToken = localStorage.getItem('token');
    var rememberMe = localStorage.getItem('rem');
    if (localToken != null && rememberMe == 'true') {
      this.accountService.loadCurrentUser(localToken).subscribe({
        next: () => {
          // this.router.navigate(['/shop'])
        },
        error: error => {
          console.log(error);
        }
      })
    }
    var sessionToken = sessionStorage.getItem('token');
    if (sessionToken != null) {
      this.accountService.loadCurrentUser(localToken).subscribe({
        next: () => {
          // this.router.navigate(['/shop'])
        },
        error: error => {
          console.log(error);
        }
      })
    }
  }


}
