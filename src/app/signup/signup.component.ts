import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Monster } from '../interfaces/monster';
import { Roles } from '../interfaces/roles';
import {Router} from '@angular/router';
import * as M from 'materialize-css';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit, AfterViewInit {
  monster: Monster = {} as Monster;
  login: string = "";
  password: string = "";
  selectedRole: string = "";
  roles: Array<string> = [];
  errorLogin: Boolean = false;
  errorPassword: Boolean = false;
  errorRole: Boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngAfterViewInit() {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);
  }

  ngOnInit() {
    this.roles = Object.keys(Roles);
  }


  signup() {
    this.errorLogin = false;
    this.errorPassword = false;
    this.errorRole = false;

    if(!this.login) {
      this.errorLogin = true;
      return;
    }
    if(!this.password) {
      this.errorPassword = true;
      return;
    }
    if(!this.selectedRole) {
      this.errorRole = true;
      return;
    }

    this.authService
      .signUp({login: this.login, password: this.password, role: this.selectedRole})
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
