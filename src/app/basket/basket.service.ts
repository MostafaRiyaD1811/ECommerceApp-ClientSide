import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Basket, IBasket, IBasketItem, IBasketTotals } from '../shared/models/basket';
import { IProduct } from '../shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  baseUrl=environment.apiurl;
  private basketSource = new BehaviorSubject<IBasket>(null);
  basket$=this.basketSource.asObservable();
  private basketTotalSource = new BehaviorSubject<IBasketTotals>(null);
  basketTotal$ = this.basketTotalSource.asObservable();
  

  constructor(private http:HttpClient) { }

  getBasket(id:string){
    return this.http.get(`${this.baseUrl}baskets?id=${id}`)
      .pipe(
        map((basket:IBasket)=>{
          this.basketSource.next(basket)
          this.calculateTotals();
        })
      );
  }

  setBasket(basket :IBasket){
    return this.http.post(`${this.baseUrl}baskets`,basket)
      .subscribe((response:IBasket)=>{
        this.basketSource.next(response);
        this.calculateTotals();
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
  incrementItemQuantity(item:IBasketItem){
    const basket=this.getBasketValue();
    const foundItemIndex=basket.items.findIndex(x=>x.id===item.id);
    basket.items[foundItemIndex].quantity++;
    this.setBasket(basket);
  }

  decrementItemQuantity(item:IBasketItem){
    const basket=this.getBasketValue();
    const foundItemIndex=basket.items.findIndex(x=>x.id===item.id);
    if(basket.items[foundItemIndex].quantity>1){
    basket.items[foundItemIndex].quantity--;}
    else{
      this.removeItemFromBasket(item)
    }
    this.setBasket(basket);
  }
  removeItemFromBasket(item: IBasketItem) {
    const basket=this.getBasketValue();
    if(basket.items.some(x=>x.id===item.id)){
      basket.items=basket.items.filter(i=>i.id !==item.id);
      if(basket.items.length>0){
        this.setBasket(basket);
      }
      else{
        this.deleteBasket(basket);
      }
    }
  }
  deleteBasket(basket: IBasket) {
    return this.http.delete(`${this.baseUrl}baskets?id=${basket.id}`).subscribe(()=>{
    this.basketSource.next(null);
    this.basketTotalSource.next(null);
    localStorage.removeItem('basket_id')},error=>{
      console.log(error)
    });}

  private calculateTotals() {
    const basket = this.getBasketValue();
    const shipping = 100;
    const subtotal = basket.items.reduce((a, b) => (b.price * b.quantity) + a, 0);
    const total = subtotal + shipping;
    this.basketTotalSource.next({shipping, total, subtotal});
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
