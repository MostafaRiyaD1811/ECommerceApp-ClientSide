import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BasketService } from 'src/app/basket/basket.service';
import { IDeliveryMethod } from 'src/app/shared/models/deliveryMethod';
import { CheckoutService } from '../checkout.service';

@Component({
  selector: 'app-checkout-delivery',
  templateUrl: './checkout-delivery.component.html',
  styleUrls: ['./checkout-delivery.component.css']
})
export class CheckoutDeliveryComponent implements OnInit {
  @Input() check:FormGroup
  deliveryMethods:IDeliveryMethod[];
  constructor(private checkoutService:CheckoutService,private basket:BasketService) { }

  ngOnInit(): void {
    this.checkoutService.getDeliverMethods().subscribe((delivery:IDeliveryMethod[])=>{
      this.deliveryMethods=delivery
    },err => console.log(err))
  }
  setShipping(delivery:IDeliveryMethod){
    this.basket.setShipping(delivery)
  }
}
