import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MovieItem } from '../movie-item/movie-item';
import { MovieService } from '../../services/movie';
import { Movie } from '../../model/movie';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-movie-list',
  imports: [CommonModule, MovieItem, FormsModule],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.css',
})
export class MovieList implements OnInit {

  public movies$: Observable<Movie[]>;
  public savedMovies$: Observable<Movie[]>;
  public displayMovies$: Observable<(Movie & { isSaved: boolean })[]>;
  public searchTerm: string = '';
  public currentPage: number = 1;
  public totalPages: number = 1;

  private refresh$ = new BehaviorSubject<void>(undefined);

  

  constructor(private movieService: MovieService) {
    this.movies$ = this.movieService.getMovies('avengers', 1).pipe(
      map((response: any) => response.results)
    );
    this.savedMovies$ = this.refresh$.pipe(
      switchMap(() => this.movieService.getSavedMovies())
    );
    this.displayMovies$ = combineLatest([this.movies$, this.savedMovies$]).pipe(
      map(([movies, savedMovies]) => {
        const savedMovieIds = new Set(savedMovies.map(movie => movie.id));
        return movies.map(movie => ({
          ...movie,
          isSaved: savedMovieIds.has(movie.id)
        }));
      })
    );
  }

  ngOnInit(): void {
    this.searchMovies(this.currentPage);
  }

  searchMovies(page: number): void {
    if (this.searchTerm.trim() === '') {
      this.movieService.getMovies('avengers', page).subscribe((response: any) => {
        console.log(response);
        this.totalPages = response.total_pages;
        this.currentPage = response.page;
      });
      this.movies$ = this.movieService.getMovies('avengers', page).pipe(
        map((response: any) => response.results)
      );
      this.displayMovies$ = combineLatest([this.movies$, this.savedMovies$]).pipe(
      map(([movies, savedMovies]) => {
        const savedMovieIds = new Set(savedMovies.map(movie => movie.id));
        return movies.map(movie => ({
          ...movie,
          isSaved: savedMovieIds.has(movie.id)
        }));
      })
    );
    } else {
      this.movieService.getMovies(this.searchTerm, page).subscribe((response: any) => {
        console.log(response);
        this.totalPages = response.total_pages;
        this.currentPage = response.page;
      });
      this.movies$ = this.movieService.getMovies(this.searchTerm, page).pipe(
        map((response: any) => response.results)
      );
      this.displayMovies$ = combineLatest([this.movies$, this.savedMovies$]).pipe(
      map(([movies, savedMovies]) => {
        const savedMovieIds = new Set(savedMovies.map(movie => movie.id));
        return movies.map(movie => ({
          ...movie,
          isSaved: savedMovieIds.has(movie.id)
        }));
      })
    );
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.searchMovies(this.currentPage);
    }
  }
  
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.searchMovies(this.currentPage);
    }
  }

  saveMovie(movie: Movie): void {
    this.movieService.addSavedMovie(movie).subscribe((data) => {
      console.log(data);
      this.refreshSaved();
    });
  }

  removeMovie(movie: Movie): void {
    this.movieService.removeSavedMovie(movie.id.toString()).subscribe((data) => {
      console.log(data);
      this.refreshSaved();
    });
  }

  refreshSaved() {
    this.refresh$.next();
  }

}
