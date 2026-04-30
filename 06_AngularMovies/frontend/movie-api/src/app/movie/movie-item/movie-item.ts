import { Component, Input } from '@angular/core';
import { Movie } from '../../model/movie';

@Component({
  selector: 'app-movie-item',
  imports: [],
  templateUrl: './movie-item.html',
  styleUrl: './movie-item.css',
})
export class MovieItem {
  @Input() public movie: Movie;

  constructor() {
    this.movie = {
      id: 0,
      original_title: '',
      overview: '',
      release_date: '',
      poster_path: '',
      vote_average: 0,
      vote_count: 0
    };
  }
}
