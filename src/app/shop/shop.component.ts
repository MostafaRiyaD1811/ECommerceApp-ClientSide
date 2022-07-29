import { compileNgModule } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
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

  products:IProduct[]=[];
  headers:any;
  categories:ICategory[]=[];
  shopParams = new ShopParams();
  sortOptions =
  [
    {name:'Alphabetical' , value:'name'},
    {name:'Price:Low to High' , value:'PriceAsc'},
    {name:'Price:High to Low' , value:'PriceDesc'}
  ]

  
  constructor(private shopService:ShopService) { }

  ngOnInit() {
    
    this.getProducts();
    this.getCategories();
    // this.getProductsSorted();

  }
  getProducts(){
  this.shopService.getProducts(this.shopParams.categoryNameSelected)
    .subscribe(response => {
      this.products=response;
      console.log(this.products);
    },error=>{console.log(error);})
  }
  getProductsSorted(){
    this.shopService.getProductsSorted(this.shopParams.sortSelected)
      .subscribe(response => {
        this.products=response;
        // console.log(response)
      },error=>{console.log(error);})
    }
  getCategories(){
    this.shopService.getCategories()
      .subscribe(response => {
        this.categories = [{categoryId:0 , categoryName :'All'}, ...response] 
        // this.headers=response.headers;
      },error=>{console.log(error);})
    }
    onCategorySelected(myName : string){
      this.shopParams.categoryNameSelected = myName ;
      this.getProducts();

    }
    onSortSelected(sort:string){
  this.shopParams.sortSelected= sort;
  this.getProductsSorted();

    }
}
