import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Review } from '../../model/review';

@Component({
  selector: 'app-review-item',
  imports: [CommonModule],
  templateUrl: './review-item.html',
  styleUrl: './review-item.css',
})
export class ReviewItem {
  @Input() review: Review;

  constructor() {
    this.review = {
      name: '',
      id: 0,
      rating: 0,
      review: '',
      title: '',
      overview: '',
      poster_path: '',
      release_date: '',
      vote_average: 0,
      vote_count: 0
    };
  }
}
