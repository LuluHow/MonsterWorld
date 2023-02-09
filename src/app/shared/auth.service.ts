import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Monster } from '../interfaces/monster';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = '/api/login';
  private signupUrl = '/api/signup';
  private updateUrl = '/api/update';
  private getMonstersUrl = '/api/monsters';

  constructor(private http: HttpClient) { }

  signUp(monster: Monster): Observable<Monster> {
    return this.http.post<Monster>(this.signupUrl, monster).pipe(
      catchError((err) => {
          console.log('error caught in service')
          console.error(err);
 
          //Handle the error here
 
          return throwError(err);    //Rethrow it back to component
        })
      );
  }

  login(monster: Monster): Observable<Monster> {
    return this.http.post<Monster>(this.loginUrl, monster).pipe(
      catchError((err) => {
          console.log('error caught in service')
          console.error(err);
 
          //Handle the error here
 
          return throwError(err);    //Rethrow it back to component
        })
      );
  }

  update(monster: Monster): Observable<Monster> {
    return this.http.put<Monster>(this.updateUrl, monster).pipe(
      catchError((err) => {
          console.log('error caught in service')
          console.error(err);
 
          //Handle the error here
 
          return throwError(err);    //Rethrow it back to component
        })
      );
  }

  getMonsters(): Observable<Monster> {
    return this.http.get<Monster>(this.getMonstersUrl).pipe(
      catchError((err) => {
          console.log('error caught in service')
          console.error(err);
 
          //Handle the error here
 
          return throwError(err);    //Rethrow it back to component
        })
      );
  }
}