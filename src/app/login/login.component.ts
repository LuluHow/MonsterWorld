import { Component } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Monster } from '../interfaces/monster';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  login: string = "";
  password: string = "";
  monster: Monster = {} as Monster;

  constructor(private authService: AuthService, private router: Router) {}

  loginFn() {
    this.authService
    .login({login: this.login, password: this.password})
    .subscribe(
      data => {
        localStorage.setItem('currentMonster', JSON.stringify(data));
        this.router.navigateByUrl('/profile')
      }, 
      error => {
        return false;
      });
  }
}
