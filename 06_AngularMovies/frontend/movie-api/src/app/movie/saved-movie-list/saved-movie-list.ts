import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieItem } from '../movie-item/movie-item';
import { Movie } from '../../model/movie';
import { Observable } from 'rxjs/internal/Observable';
import { MovieService } from '../../services/movie';

@Component({
  selector: 'app-saved-movie-list',
  imports: [CommonModule, MovieItem],
  templateUrl: './saved-movie-list.html',
  styleUrl: './saved-movie-list.css',
})
export class SavedMovieList implements OnInit {

  public savedMovies$: Observable<Movie[]>;

  constructor(private movieService: MovieService) {
    this.savedMovies$ = this.movieService.getSavedMovies();
  }

  ngOnInit(): void {
  }

}
