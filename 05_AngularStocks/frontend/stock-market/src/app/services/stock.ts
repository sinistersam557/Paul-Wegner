import { Injectable } from '@angular/core';
import { Stock } from '../model/stock';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StockService {

  private stocks: Stock[];

  constructor(private http: HttpClient) {
    this.stocks = [];
  }

  getStocks(query: string) : Observable<Stock[]> {
    return this.http.get<Stock[]>(`api/stock?q=${query}`);
  }
  
  getStock(code: string): Observable<Stock> {
    return this.http.get<Stock>('/api/stock/' + code);
  }
  
  createStock(stock: Stock): Observable<any> {
    return this.http.post('api/stock', stock);
  }

  toggleFavorite(stock: Stock): Observable<Stock> {
    return this.http.patch<Stock>('api/stock/' + stock.code, {
       favorite: !stock.favorite 
    });
  }

}
