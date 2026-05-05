import { Component, Input } from '@angular/core';
import { Actor } from '../../model/actor';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-actor-item',
  imports: [RouterLink],
  templateUrl: './actor-item.html',
  styleUrl: './actor-item.css',
})
export class ActorItem {
  @Input() public actor: Actor;

  constructor() {
    this.actor = {
      id: 0,
      name: '',
      popularity: 0,
      profile_path: ''
    };
  }
}
