import { Routes } from '@angular/router';

import { MovieList } from './movie/movie-list/movie-list';
import { SavedMovieList } from './movie/saved-movie-list/saved-movie-list';
import { CriticForm } from './form/critic-form/critic-form';
import { ReviewList } from './movie/review-list/review-list';

export const routes: Routes = [
    { path: '', redirectTo: '/movies', pathMatch: 'full' },
    { path: "movies", component: MovieList },
    { path: "saved", component: SavedMovieList },
    { path: "critic", component: CriticForm },
    { path: "reviews", component: ReviewList },
    { path: '**', redirectTo: '/movies' }
];
