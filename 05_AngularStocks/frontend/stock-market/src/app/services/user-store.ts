import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserStoreService {

  private _token: string = '';

  constructor() {}

  get token(): string {
    return this._token;
  }

  set token(token: string) {
    this._token = token;
  }

  isLoggedIn(): boolean {
    return this._token !== '';
  }

}
