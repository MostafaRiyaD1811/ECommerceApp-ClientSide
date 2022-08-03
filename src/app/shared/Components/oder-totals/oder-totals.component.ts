import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasketTotals } from '../../models/basket';

@Component({
  selector: 'app-oder-totals',
  templateUrl: './oder-totals.component.html',
  styleUrls: ['./oder-totals.component.css']
})
export class OderTotalsComponent implements OnInit {
  basketTotal$:Observable<IBasketTotals>

  constructor( private basketService:BasketService) { }

  ngOnInit() {
    this.basketTotal$=this.basketService.basketTotal$;
  }

}
