import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ICategory } from '../shared/models/category';
import { IProduct } from '../shared/models/product';
import { ShopParams } from '../shared/models/ShopParams';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  @ViewChild('search', { static: true }) searchTerm: ElementRef;
  products: IProduct[];
  product:IProduct;
  categories: ICategory[];
  shopParams = new ShopParams();
  sortOptions = [
      { name: 'Alphabetical', value: 'name' },
      { name: 'Price:Low to High', value: 'PriceAsc' },
      { name: 'Price:High to Low', value: 'PriceDesc' }
    ]
  constructor(private shopService: ShopService) {}
  ngOnInit() {
    this.getProducts();
    this.getCategories();
  }
  getProducts() {
    this.shopService.getProducts(this.shopParams)
      .subscribe(response => {
        this.products = response.productsReturn;
        this.shopParams.pageNum = response.pageNum;
        this.shopParams.size = response.pageSize;
        this.shopParams.totalCount = response.totalItemCount;
      }, error => { console.log(error); })
  }
  getCategories() {
    this.shopService.getCategories()
      .subscribe(response => {
        this.categories = [{categoryName: 'All' }, ...response]
      }, error => { console.log(error); })
  }
  onCatSelected(categoryName:string){
    this.shopParams.catName=categoryName;
    this.getProducts();
  }
  onSortSelected(sort:string){
    this.shopParams.sort=sort;
    this.getProducts();
  }
  onPageChanged(event: any) {
    this.shopParams.pageNum = event.page;
    this.getProducts();
  }
  onSearch() {
    this.shopParams.searchQuery = this.searchTerm.nativeElement.value;
    this.getProducts();
  }
  onReset() {
    this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.getProducts();
  }

}
