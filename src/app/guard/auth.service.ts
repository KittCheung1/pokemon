import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  // sets a token to Localstorage to check if user is logged in
  isLoggedIn(){
    let token = false
    if ( localStorage.getItem('status') !== null){
      token = true
    }
    return token
  }
}

