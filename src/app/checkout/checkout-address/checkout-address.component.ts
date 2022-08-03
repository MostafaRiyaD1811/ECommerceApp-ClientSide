import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/account/account.service';

@Component({
  selector: 'app-checkout-address',
  templateUrl: './checkout-address.component.html',
  styleUrls: ['./checkout-address.component.css']
})
export class CheckoutAddressComponent implements OnInit {
  @Input() check :FormGroup ;
  constructor(private accSer:AccountService,private toast:ToastrService) { }

  ngOnInit(): void {
  }
  saveUserAddress(){
    this.accSer.updateUserAddress(this.check.get('addressForm').value)
      .subscribe(()=>{
        this.toast.success('Address Saved')
      },error=>{
        // console.log(this.check.get('addressForm').value);
        this.toast.error('An Error Occured');
        console.log(error);
      }
      )
  }
}
