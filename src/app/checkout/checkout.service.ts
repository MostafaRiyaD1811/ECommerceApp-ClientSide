import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IDeliveryMethod } from '../shared/models/deliveryMethod';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  baseUrl=environment.apiurl;
  constructor(private http:HttpClient) { }

  getDeliverMethods(){
    return this.http.get(`${this.baseUrl}orders/deliveryMethods`).pipe(
      map((delivery:IDeliveryMethod[])=>{
        return delivery.sort((a,b)=>b.price-a.price);
      })
    )
  }
}
