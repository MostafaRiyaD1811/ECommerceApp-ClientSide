import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Basket, IBasket, IBasketItem } from '../shared/models/basket';
import { IProduct } from '../shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  baseUrl=environment.apiurl;
  private basketSource = new BehaviorSubject<IBasket>(null);
  basket$=this.basketSource.asObservable();

  constructor(private http:HttpClient) { }

  getBasket(id:string){
    return this.http.get(`${this.baseUrl}baskets?id=${id}`)
      .pipe(
        map((basket:IBasket)=>{
          this.basketSource.next(basket)
          console.log(basket);
        })
      );
  }

  setBasket(basket :IBasket){
    return this.http.post(`${this.baseUrl}baskets`,basket)
      .subscribe((response:IBasket)=>{
        this.basketSource.next(response);
        console.log(response);
      },error=>console.log(error))
  }

  getBasketValue(){
    return this.basketSource.value;
  }

  private mapper(item: IProduct, quantity: number): IBasketItem {
    return {
      id:item.id,
      productName: item.name,
      price: item.price,
      quantity,
      pictureUrl: item.pictureUrl,
      manufacturer: item.manufacturer,
      category: null
    }
  }
  addItemToBasket(item:IProduct,quantity=1){
    const itemToAdd:IBasketItem=this.mapper(item,quantity);
    const basket =this.getBasketValue()??this.createBasket();
    basket.items = this.addOrUpdateItem(basket.items,itemToAdd,quantity);
    this.setBasket(basket);
  }
  private addOrUpdateItem(items: IBasketItem[], itemToAdd: IBasketItem, quantity: number): 
  IBasketItem[] {
      const index = items.findIndex(i=> i.id===itemToAdd.id);
      if (index === -1){
        itemToAdd.quantity=quantity;
        items.push(itemToAdd)
      }else{
        items[index].quantity+=quantity;
      }
      return items;
    }
  
  private createBasket(): IBasket {
    const basket = new Basket();
    localStorage.setItem(`basket_id`,basket.id);
    return basket;
  }

}
