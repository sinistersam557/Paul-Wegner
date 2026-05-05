import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { map, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Actor } from '../../model/actor';
import { ActorService } from '../../services/actor';
import { ActorItem } from '../actor-item/actor-item';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-actor-list',
  imports: [CommonModule, ActorItem, FormsModule],
  templateUrl: './actor-list.html',
  styleUrl: './actor-list.css',
})
export class ActorList implements OnInit {
  
  public actors$: Observable<Actor[]>;
  public searchTerm: string = '';
  public currentPage: number = 1;
  public totalPages: number = 1;
  
  constructor(private actorService: ActorService, private router: Router, private route: ActivatedRoute) {
    this.actors$ = this.route.queryParamMap.pipe(
      switchMap(params => {
        this.searchTerm = params.get('q') || 'brad pitt';
        this.currentPage = Number(params.get('pg') || 1);
        return this.actorService.getActors(this.searchTerm, this.currentPage);
      }),
      map((response: any) => {
        this.totalPages = response.total_pages;
        return response.results;
      })
    );
  }
  
  ngOnInit(): void {
  }

  searchActors(page: number): void {
    this.router.navigate(['/actors'], {
      queryParams: { q: this.searchTerm, pg: page },
      queryParamsHandling: 'merge'
    });
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.searchActors(this.currentPage + 1);
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.searchActors(this.currentPage - 1);
    }
  } 
}
