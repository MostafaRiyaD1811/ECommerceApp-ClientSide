import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ICategory } from '../shared/models/category';
import { IPagination } from '../shared/models/pagination';
import { IProduct } from '../shared/models/product';
import { ShopParams } from '../shared/models/ShopParams';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = environment.apiurl;

  constructor(private http: HttpClient) { }

  getCategories() { return this.http.get<ICategory[]>(this.baseUrl + 'Products/categories') }

  getProduct(id: string) { return this.http.get<IProduct>(`${this.baseUrl}products/category/${id}`) }

  getProducts(shopParams?: ShopParams) {
    // Start Of Parameters :- this part of code adds paramters to the query string for the api request\\
    let params = new HttpParams();
    (shopParams.catName) ? params = params.append('catName', shopParams.catName) : null;//Filtering 
    (shopParams.searchQuery) ? params = params.append('searchQuery', shopParams.searchQuery) : null;//Searching
    params = params.append('sort', shopParams.sort);//Sorting
    params = params.append('pageNum', shopParams.pageNum.toString());//Paging
    params = params.append('size', shopParams.size.toString());//Paging
    // End Of Parameters\\
    return this.http.get<IPagination>
      (`${this.baseUrl}Products/multi`, { observe: 'response', params }).pipe(map(response => { return response.body; }));
  }
}
