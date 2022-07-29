import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map } from 'rxjs/operators';
import { ICategory } from '../shared/models/category';
import { IPagination } from '../shared/models/pagination';
import { IProduct } from '../shared/models/product';
import { ShopParams } from '../shared/models/ShopParams';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = 'https://localhost:5001/api/'

  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get<any>(this.baseUrl + 'Products/categories')
  }

  getProducts(shopParams:ShopParams) {
    let params = new HttpParams();
    if (shopParams.catName) {
      params = params.append('CategoryName', shopParams.catName.toString());
    }
    if (shopParams.sort) {
      params = params.append('sort', shopParams.sort.toString());
    }
    if (shopParams.searchQuery) {
      params = params.append('searchQuery', shopParams.searchQuery.toString());
    }
    params = params.append('sort',shopParams.sort);
    params = params.append('pageNum',shopParams.pageNum.toString());
    params = params.append('size',shopParams.size.toString());
    return this.http.get<any>(`${this.baseUrl}Products/multi`, { observe: 'response', params })
      .pipe(
        map(response => {
          return response.body;
        })
      );
  }

  getProduct(id:string){
    return this.http.get<IProduct>(`${this.baseUrl}products/category/${id}`)
  }



  onCategorySelected(CategoryName: string = 'All') {
    let params = new HttpParams();
    return this.http.get<any>(`${this.baseUrl}Products/multi?catName=${CategoryName}`, { observe: 'response', params })
      .pipe(
        map(response => {
          return response.body;
        })
      );
  }
  onSortSelected(sort: string = 'name') {
    let params = new HttpParams();
    return this.http.get<any>(`${this.baseUrl}Products/multi?sort=${sort}`, { observe: 'response', params })
      .pipe(
        map(response => {
          return response.body;
        })
      );
}
  onSearch(search: string = '') {
  let params = new HttpParams();
  return this.http.get<any>(`${this.baseUrl}Products/multi?searchQuery=${search}`, { observe: 'response', params })
    .pipe(
      map(response => {
        return response.body;
      })
    );
}

}
