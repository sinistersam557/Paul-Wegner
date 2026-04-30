import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  public username: string = '';
  public password: string = '';

  public message: string = '';

  constructor(private userService: UserService, private router: Router) {}

  register() {
    this.userService.register(this.username, this.password).subscribe((resp) => {
      console.log('Successfully registered');
      this.message = resp.msg;
      this.router.navigate(['login']);
    }, (err) => {
      console.error('Error registering', err);
      this.message = err.error.msg;
    });
  }
  
}