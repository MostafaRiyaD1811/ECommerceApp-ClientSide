import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasket } from 'src/app/shared/models/basket';
import { IOrder } from 'src/app/shared/models/order';
import { CheckoutService } from '../checkout.service';

@Component({
  selector: 'app-checkout-review',
  templateUrl: './checkout-review.component.html',
  styleUrls: ['./checkout-review.component.css']
})
export class CheckoutReviewComponent implements OnInit {
  @Input() check:FormGroup;
  constructor(private basketService:BasketService,private checkoutService:CheckoutService,private toast:ToastrService,private router:Router) { }

  ngOnInit(): void {
  }
  submitOrder(){
    const basket = this.basketService.getBasketValue();
    const orderToCreate = this.getOrderToCreate(basket);
    this.checkoutService.createOrder(orderToCreate)
      .subscribe((order:IOrder)=>{
        this.toast.success('Order Added Succssfully');
        this.basketService.deleteLocalBasket(basket.id)
        const navigationExtras:NavigationExtras={state:order};
        this.router.navigate(['checkout/success'],navigationExtras)
      },error=>{
        this.toast.error('An Error Occurred')
        console.log(error);
      })
  }
  private getOrderToCreate(basket:IBasket){
    return{
      basketId:basket.id,
      deliveryMethodId:+this.check.get('deliveryForm').get('deliveryMethod').value,
      shipToAddress: this.check.get('addressForm').value
    }
  }
}
