import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {

  private expressAPI = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getMovies(query: string, page: number = 1): Observable<any[]> {
    const headers = new HttpHeaders({
      'accept': "application.json",
      'Authorization': "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMWExMTA3MjIyNDU4MDEwM2RkNDY3YzM1ZWIxNGMyMiIsIm5iZiI6MTc1OTI2MzQzOS4xNiwic3ViIjoiNjhkYzNhY2YzMmZlMTQ3ZWU3ZTFkM2ZlIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.rzGdN9SE52hH-agnbxXXdgzY5hBQBTxyJCZ0spDwawA"
    })
    return this.http.get<any[]>(`https://api.themoviedb.org/3/search/movie?query=${query}&page=${page}`, { headers });
  }

  getSavedMovies(): Observable<any[]> {
    return this.http.get<any[]>(`${this.expressAPI}/saved-movies`);
  }

  addSavedMovie(movie: any) {
    return this.http.post(`${this.expressAPI}/saved-movies`, movie);
  }

  removeSavedMovie(id: string) {
    return this.http.delete(`${this.expressAPI}/saved-movies/${id}`);
  }

  addCriticReview(review: any) {
    return this.http.post(`${this.expressAPI}/reviewed-movies`, review);
  }

  getCriticReviews(): Observable<any[]> {
    return this.http.get<any[]>(`${this.expressAPI}/reviewed-movies`);
  }

  removeCriticReview(id: string) {
    return this.http.delete(`${this.expressAPI}/reviewed-movies/${id}`);
  }
  
}
