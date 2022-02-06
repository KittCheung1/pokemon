import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsersService } from "../services/Users.service";
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor( private readonly UserService: UsersService,private auth: AuthService, private router:Router){

  }
  
// Go to login if not authenticated
  canActivate(){
      this.UserService.trySignInExistingUser();
      if (!this.auth.isLoggedIn()) {
        this.router.navigate(['/login']); 
        return false;
      }
    return true;
  }

}
