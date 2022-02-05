import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isLoggedIn(){

    let token = false
    if ( localStorage.getItem('status') !== null){
      token = true
    }
    return token
  }
}

