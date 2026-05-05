import { Routes } from '@angular/router';

import { MovieList } from './movie/movie-list/movie-list';
import { SavedMovieList } from './movie/saved-movie-list/saved-movie-list';
import { CriticForm } from './form/critic-form/critic-form';
import { ReviewList } from './movie/review-list/review-list';
import { ActorList } from './actor/actor-list/actor-list';
import { ActorDetails } from './actor/actor-details/actor-details';
import { MovieDetails } from './movie/movie-details/movie-details';

export const routes: Routes = [
    { path: '', redirectTo: '/movies', pathMatch: 'full' },
    { path: "movies", component: MovieList },
    { path: "movies/:id", component: MovieDetails},
    { path: "saved", component: SavedMovieList },
    { path: "critic", component: CriticForm },
    { path: "reviews", component: ReviewList },
    { path: "actors", component: ActorList, runGuardsAndResolvers: 'paramsOrQueryParamsChange' },
    { path: "actors/:id", component: ActorDetails },
    { path: '**', redirectTo: '/movies' }
];
