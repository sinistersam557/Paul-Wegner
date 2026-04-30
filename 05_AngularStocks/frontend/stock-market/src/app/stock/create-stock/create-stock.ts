import { Component } from '@angular/core';
import { Stock } from '../../model/stock';
import { StockService } from '../../services/stock';
import { MessageService } from '../../services/message';
import { FormsModule, NgForm } from '@angular/forms';
import { JsonPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-stock',
  imports: [FormsModule, JsonPipe, CommonModule],
  templateUrl: './create-stock.html',
  styleUrl: './create-stock.css',
  providers: [MessageService]
})
export class CreateStock {

  public stock: Stock;
  public confirmed = false;
  public exchanges = ['NASDAQ', 'NYSE', 'AMEX'];
  
  constructor(private stockService: StockService,
              public messageService: MessageService) {
    this.stock = {
      name: '',
      code: '',
      price: 0,
      previousPrice: 0,
      exchange: 'NASDAQ',
      favorite: false
    }
  }
  
  initializeStock() {
    this.stock = {
      name: '',
      code: '',
      price: 0,
      previousPrice: 0,
      exchange: 'NASDAQ',
      favorite: false
    }
  }

  setStockPrice(price: number) {
    this.stock.price = price;
    this.stock.previousPrice = price;
  }

  createStock(stockForm: NgForm) {
    if (stockForm.valid) {
      this.stockService.createStock(this.stock).subscribe((result: any) => {
        this.messageService.message = result.msg;
        this.initializeStock();
      }, (err) => {
        this.messageService.message = err.message;
      });
    } else {
      console.error('Form is invalid. Please fill in all required fields correctly.');
    }
  }
}
