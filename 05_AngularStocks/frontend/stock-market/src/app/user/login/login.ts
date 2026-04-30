import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  public username: string = '';
  public password: string = '';

  public message: string = '';
  
  constructor(private userService: UserService, private router: Router) {}

  login() {
    this.userService.login(this.username, this.password).subscribe((resp) => {
      console.log('Successfully logged in');
      this.message = resp.msg;
      this.router.navigate(['stocks', 'list'], {
        queryParams: { page: 1 }
      });
    }, (err) => {
      console.error('Error logging in', err);
      this.message = err.error.msg;
    });
  }
}
