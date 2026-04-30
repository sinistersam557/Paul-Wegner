import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Review } from '../../model/review';
import { MovieService } from '../../services/movie';
import { ReviewItem } from '../review-item/review-item';

@Component({
  selector: 'app-review-list',
  imports: [CommonModule, ReviewItem],
  templateUrl: './review-list.html',
  styleUrl: './review-list.css',
})
export class ReviewList implements OnInit {

  public reviewedMovies$: Observable<Review[]>;

  constructor(private movieService: MovieService) {
    this.reviewedMovies$ = this.movieService.getCriticReviews();
  }

  ngOnInit(): void {
  }

}
