import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Monster } from '../interfaces/monster';
import { Roles } from '../interfaces/roles';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, AfterViewInit {
  monster: Monster = {} as Monster;
  roles: Array<string> = [];
  selectedRole: string = "";
  displayButton: Boolean = false;
  monsters: Array<Monster>;

  constructor(private authService: AuthService) {}

  ngAfterViewInit() {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);
  }

  ngOnInit() {
    this.roles = Object.keys(Roles);
    let currentMonster = JSON.parse(localStorage.getItem("currentMonster")  || '{}');
    this.selectedRole = currentMonster.role;
    this.monster = {
      login: currentMonster.login,
      role: currentMonster.role,
      id: currentMonster._id,
      friends: currentMonster.friends
    };
    this.getMonsters();
  }

  update() {
    this.authService
    .update({id: this.monster.id, role: this.selectedRole, friends: this.monster.friends})
    .subscribe(
      data => {
        localStorage.setItem('currentMonster', JSON.stringify(data));
        this.displayButton = false;
      }, 
      error => {
        return false;
      });
  }

  onRoleChange() {
    this.displayButton = true;
  }

  getMonsters() {
    this.authService
    .getMonsters()
    .subscribe(
      data => {
        this.monsters = data as Monster[];
        this.monsters = this.monsters.filter(m => m.login !== this.monster.login);
      }, 
      error => {
        return false;
      });
  }

  addFriend(login: string = "") {
    if(!this.monster.friends) {
      this.monster.friends = [];
    }
    this.monster.friends!.push(login);
    this.authService
    .update({id: this.monster.id, role: this.selectedRole, friends: this.monster.friends})
    .subscribe(
      data => {
        localStorage.setItem('currentMonster', JSON.stringify(data));
      }, 
      error => {
        return false;
      });
  }

  deleteFriend(login: string = "") {
    if(!this.monster.friends) {
      this.monster.friends = [];
    }

    this.monster.friends!.splice(this.monster.friends!.indexOf(login));
    this.authService
    .update({id: this.monster.id, role: this.selectedRole, friends: this.monster.friends})
    .subscribe(
      data => {
        localStorage.setItem('currentMonster', JSON.stringify(data));
      }, 
      error => {
        return false;
      });
  }

  isFriend(login: string = "") {
    if(this.monster.friends && this.monster.friends.length > 0) {
      return this.monster.friends!.indexOf(login) > -1;
    }
    return false;
  }
}
