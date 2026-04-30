import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { StockService } from '../services/stock';
import { Stock } from '../model/stock';
import { Observable } from 'rxjs';

export const StockLoadResolver: ResolveFn<Stock> = (route, state) => {
  const stockService = inject(StockService);
  const stockCode = route.paramMap.get('code');
  return stockService.getStock(stockCode || '');
};
