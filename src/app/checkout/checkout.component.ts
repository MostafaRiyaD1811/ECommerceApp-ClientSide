import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkoutForm:FormGroup;

  constructor(private formBuildr:FormBuilder) { }

  ngOnInit(): void {
    this.createCheckoutForm();
  }
  createCheckoutForm() {
    this.checkoutForm = this.formBuildr.group({
      addressForm: this.formBuildr.group({
        firstName: [null, Validators.required],
        lastName: [null, Validators.required],
        street: [null, Validators.required],
        city: [null, Validators.required],
        state: [null, Validators.required],
        zipCode: [null, Validators.required],
      }),
      deliveryForm: this.formBuildr.group({
        deliveryMethod: [null, Validators.required]
      })
    })
  }
}
