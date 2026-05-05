import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ActorService {

  private expressAPI = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getActors(query: string, page: number = 1): Observable<any[]> {
    const headers = new HttpHeaders({
      'accept': "application.json",
      'Authorization': "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMWExMTA3MjIyNDU4MDEwM2RkNDY3YzM1ZWIxNGMyMiIsIm5iZiI6MTc1OTI2MzQzOS4xNiwic3ViIjoiNjhkYzNhY2YzMmZlMTQ3ZWU3ZTFkM2ZlIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.rzGdN9SE52hH-agnbxXXdgzY5hBQBTxyJCZ0spDwawA"
    })
    return this.http.get<any[]>(`https://api.themoviedb.org/3/search/person?query=${query}&page=${page}`, { headers });
  }

  getActorDetails(id: string): Observable<any> {
    const headers = new HttpHeaders({
      'accept': "application.json",
      'Authorization': "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMWExMTA3MjIyNDU4MDEwM2RkNDY3YzM1ZWIxNGMyMiIsIm5iZiI6MTc1OTI2MzQzOS4xNiwic3ViIjoiNjhkYzNhY2YzMmZlMTQ3ZWU3ZTFkM2ZlIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.rzGdN9SE52hH-agnbxXXdgzY5hBQBTxyJCZ0spDwawA"
    })
    return this.http.get<any>(`https://api.themoviedb.org/3/person/${id}`, { headers });
  }

  getActorMovies(id: string): Observable<any[]> {
    const headers = new HttpHeaders({
      'accept': "application.json",
      'Authorization': "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMWExMTA3MjIyNDU4MDEwM2RkNDY3YzM1ZWIxNGMyMiIsIm5iZiI6MTc1OTI2MzQzOS4xNiwic3ViIjoiNjhkYzNhY2YzMmZlMTQ3ZWU3ZTFkM2ZlIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.rzGdN9SE52hH-agnbxXXdgzY5hBQBTxyJCZ0spDwawA"
    })
    return this.http.get<any[]>(`https://api.themoviedb.org/3/person/${id}/movie_credits`, { headers });
  }
}
