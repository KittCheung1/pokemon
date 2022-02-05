import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from "../services/Users.service";

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor( private readonly UserService: UsersService, private router:Router){

  }



  canActivate(
      
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.UserService.trySignInExistingUser();
  if (UsersService.signedInUser != null) {
    return true
  }
  this.router.navigate(["login"]);
      return false 
  }
  
  // public isLoggedIn(): boolean {      
  //   let status = false;      
  //   if (localStorage.getItem('isLoggedIn') == "true") {      
  //      status = true;      
  //   }
  //     else {      
  //      status = false;      
  //      }      
  //   return status;      
  //   }    


}
