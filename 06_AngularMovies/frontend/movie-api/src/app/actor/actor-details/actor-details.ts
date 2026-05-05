import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { ActorService } from '../../services/actor';
import { map, Observable } from 'rxjs';
import { Actor } from '../../model/actor';
import { Movie } from '../../model/movie';

@Component({
  selector: 'app-actor-details',
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './actor-details.html',
  styleUrl: './actor-details.css',
})
export class ActorDetails implements OnInit {

  public id: number;
  public actorDetails$: Observable<Actor>;
  public actorMovies$: Observable<Movie[]>;

  constructor(private route: ActivatedRoute, private actorService: ActorService) {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.actorDetails$ = this.actorService.getActorDetails(this.id.toString());
    this.actorMovies$ = this.actorService.getActorMovies(this.id.toString()).pipe(
      map((response: any) => response.cast)
    );
  }

  ngOnInit(): void {
    console.log(`Actor ID: ${this.id}`);
    this.actorDetails$.subscribe(details => {
      console.log('Actor Details:', details);
    });
    this.actorMovies$.subscribe(movies => {
      console.log('Actor Movies:', movies);
    });
  }
  
}
