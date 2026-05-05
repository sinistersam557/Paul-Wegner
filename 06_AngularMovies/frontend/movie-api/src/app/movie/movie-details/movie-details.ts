import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movie } from '../../model/movie';
import { Observable } from 'rxjs/internal/Observable';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie';

@Component({
  selector: 'app-movie-details',
  imports: [CommonModule],
  templateUrl: './movie-details.html',
  styleUrl: './movie-details.css',
})
export class MovieDetails implements OnInit {

  public id: number;
  public movieDetails$: Observable<Movie>;

  constructor(private route: ActivatedRoute, private movieService: MovieService) {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.movieDetails$ = this.movieService.getMovieDetails(this.id);
  }

  ngOnInit(): void {
  }
}
