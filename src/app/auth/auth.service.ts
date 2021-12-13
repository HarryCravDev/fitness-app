import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthData } from './models/auth-data.model';
import { User } from './models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authChange = new Subject<boolean>();
  private user: User | null = null;

  constructor(private router: Router) { }

  registerUser(authData: AuthData){
    console.log("REGISTER SERVICE");
    this.user = {
      email: authData.email,
      userId: Math.floor(Math.random() * 100000).toString()
    }
    this.authSuccessfully();
  }

  login(authData: AuthData){
    console.log("LOGIN SERVICE");
    this.user = {
      email: authData.email,
      userId: Math.floor(Math.random() * 100000).toString()
    }
    this.authSuccessfully();
  }

  logout(){
    console.log("LOGOUT SERVICE");
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(["/login"]);
  }
  
  getUser(){
    console.log("GET USER SERVICE");
    return { ...this.user };
  }

  isAuth(){
    return this.user != null;
  }

  authSuccessfully() {
    this.authChange.next(true);
    this.router.navigate(["/training"]);
  }
}
