import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account/account.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkoutForm:FormGroup;

  constructor(private formBuildr:FormBuilder,private accService:AccountService) { }

  ngOnInit(): void {
    this.createCheckoutForm();
    this.getAddress();
  }
  createCheckoutForm() {
    this.checkoutForm = this.formBuildr.group({
      addressForm: this.formBuildr.group({
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
  getAddress(){
    this.accService.getUserAddress().subscribe(address=>{
      if(address){
        this.checkoutForm.get('addressForm').patchValue(address);
      }
    }, error=> console.log(error))
  }
}
