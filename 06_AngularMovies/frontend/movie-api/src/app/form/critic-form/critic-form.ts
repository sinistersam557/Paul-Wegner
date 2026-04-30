import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movie } from '../../model/movie';
import { MovieService } from '../../services/movie';
import { map, Observable, startWith, Subject, switchMap, tap, withLatestFrom } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { release } from 'os';

@Component({
  selector: 'app-critic-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './critic-form.html',
  styleUrl: './critic-form.css',
})
export class CriticForm implements OnInit {

  public savedMovies$: Observable<Movie[]>;
  public formValue$: Observable<any>;
  submit$ = new Subject<void>();
  criticForm: FormGroup;
  isSubmitted: boolean = false;
  isSuccess: boolean = false;


  constructor(private movieService: MovieService, private formBuilder: FormBuilder) {
    this.savedMovies$ = this.movieService.getSavedMovies();
    this.criticForm = this.formBuilder.group({
      name: ['', Validators.required],
      id: ['', Validators.required],
      rating: ['', Validators.required],
      review: ['', Validators.required]
    });
    this.formValue$ = this.criticForm.valueChanges.pipe(
      startWith(this.criticForm.value)
    );
  }

  ngOnInit(): void {
    this.submit$.pipe(
      withLatestFrom(this.savedMovies$, this.formValue$),
      map(([_, savedMovies, formValue]) => {
        const matchedItem = savedMovies.find(movie => movie.id == formValue.id);
        return {
          ...formValue,
          title: matchedItem ? matchedItem.original_title : 'Unknown Movie',
          overview: matchedItem ? matchedItem.overview : 'No overview available',
          poster_path: matchedItem ? matchedItem.poster_path : 'No poster available',
          release_date: matchedItem ? matchedItem.release_date : 'Unknown release date',
          vote_average: matchedItem ? matchedItem.vote_average : 0,
          vote_count: matchedItem ? matchedItem.vote_count : 0
        };
      }),
      switchMap(body => this.movieService.addCriticReview(body))
    ).subscribe();
  }

  onSubmit() {
    this.isSuccess = false;
    this.isSubmitted = true;
    if (this.criticForm.valid) {
      this.submit$.next();
      this.criticForm.reset();
      this.isSubmitted = false;
      this.isSuccess = true;
    }
    this.movieService.getCriticReviews().subscribe(reviews => {
      console.log("Current Reviews:", reviews);
    });
  }

}
