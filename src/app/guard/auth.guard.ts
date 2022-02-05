import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from "../services/Users.service";
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor( private readonly UserService: UsersService,private auth: AuthService, private router:Router){

  }

  canActivate(){
      this.UserService.trySignInExistingUser();
      if (!this.auth.isLoggedIn()) {
        this.router.navigate(['/login']); // go to login if not authenticated
        return false;
      }
    return true;
  }




      // if (UsersService.signedInUser != null) {
  //   return true
  // }
  // this.router.navigate(["login"]);
  //     return false 
  // }
}
