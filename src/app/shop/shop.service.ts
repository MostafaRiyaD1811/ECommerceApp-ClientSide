import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map } from 'rxjs/operators';
import { ICategory } from '../shared/models/category';
import { IPagination } from '../shared/models/pagination';
import { IProduct } from '../shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl='https://localhost:5001/api/'
  constructor(private http:HttpClient) { }
  getProducts(CategoryName : string ='All' ){
    let params = new HttpParams();
    if(CategoryName){
      params = params.append('CategoryName',CategoryName.toString());
    }
    return this.http.get<any>(`${this.baseUrl}Products/category/${CategoryName}?pageNum=1&pageSize=10`,{observe:'response',params})
    .pipe (
      map(response=>{
        return response.body;
      })
    );
  }
  getProductsSorted(sort : string ){
    let params = new HttpParams();
    if(sort){
      params = params.append('sort',sort.toString());
    }
    return this.http.get<any>(`${this.baseUrl}Products/category/price/?sort=${sort}&pageNum=1&pageSize=10`,{observe:'response',params})
    .pipe (
      map(response=>{
        return response.body;
      })
    );
  }
  getCategories(){
    return this.http.get<any>(this.baseUrl+'Products/categories')
  }
}
