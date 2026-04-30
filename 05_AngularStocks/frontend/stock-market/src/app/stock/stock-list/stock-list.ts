import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Stock } from '../../model/stock';
import { StockService } from '../../services/stock';
import { StockItem } from '../stock-item/stock-item';
import { Observable, Subject, of as ObservableOf } from 'rxjs';
import { share, debounceTime, switchMap, distinctUntilChanged, startWith } from 'rxjs/operators';
import { AuthService } from '../../services/auth';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserStoreService } from '../../services/user-store';

@Component({
  selector: 'app-stock-list',
  imports: [CommonModule, StockItem, FormsModule],
  templateUrl: './stock-list.html',
  styleUrl: './stock-list.css',
})
export class StockList implements OnInit{

  public stocks$: Observable<Stock[]>;
  public searchString: string = '';
  private page = 1;

  private searchTerms: Subject<string> = new Subject();

  constructor(private stockService: StockService,
              private userStore: UserStoreService,
              private route: ActivatedRoute,
              private router: Router) {
    this.stocks$ = ObservableOf<Stock[]>([]);
  }

  ngOnInit(): void {
    console.log('Page No. : ', this.route.snapshot.queryParamMap.get('page'));
    this.route.queryParamMap.subscribe((params) => {
      console.log('Page : ', params.get('page'));
      this.stocks$ = this.searchTerms.pipe(
        startWith(this.searchString),
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((query: string) => this.stockService.getStocks(query)),
        share()
      );
    }); 
  }

  search() {
    this.searchTerms.next(this.searchString)
  }

  nextPage() {
    this.router.navigate([], {
      queryParams: { page: ++this.page }
    })
  }
}
