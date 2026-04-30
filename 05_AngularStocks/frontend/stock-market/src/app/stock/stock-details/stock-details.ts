import { Component, OnInit } from '@angular/core';
import { StockService } from '../../services/stock';
import { ActivatedRoute } from '@angular/router';
import { Stock } from '../../model/stock';

@Component({
  selector: 'app-stock-details',
  imports: [],
  templateUrl: './stock-details.html',
  styleUrl: './stock-details.css',
})
export class StockDetails implements OnInit {

  public stock: Stock;
  constructor(private stockService: StockService, private route: ActivatedRoute) {
    this.stock = {
      name: '',
      code: '',
      price: 0,
      previousPrice: 0,
      exchange: '',
      favorite: false
    }};

    ngOnInit() {
      this.route.data.subscribe(({ stock }) => {
        this.stock = stock;
      })
    }
}
