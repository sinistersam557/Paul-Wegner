import { Component, Input, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Stock } from '../../model/stock';
import { StockService } from '../../services/stock';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-stock-item',
  imports: [CommonModule, RouterLink],
  templateUrl: './stock-item.html',
  styleUrl: './stock-item.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StockItem {
  @Input() public stock: Stock;

  constructor(private stockService: StockService) {
    this.stock = {
      name: '',
      code: '',
      price: 0,
      previousPrice: 0,
      exchange: '',
      favorite: false
    }};

  onToggleFavorite(event: Event): void {
    this.stockService.toggleFavorite(this.stock).subscribe((stock) => {
      this.stock.favorite = !this.stock.favorite;
    });
  }

}

