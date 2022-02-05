import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../guard/auth.service";
import { User } from "../models/user.model";
import { UsersService } from "../services/Users.service";

@Component({
    selector:"app-trainers",
    templateUrl: "./trainers.page.html",
    styleUrls:["./trainers.page.css"]
})

export class TrainersPage{
    constructor(private readonly UserService: UsersService,private router: Router, private auth: AuthService) {
    }
    
    ngOnInit(): void {

        console.log(UsersService.signedInUser)
        // console.log(localStorage.getItem("userKey"))
        // this.UserService.fetchUsers();
    }
    
    logout() {  
        console.log('logout');  
        this.auth.logout();  
        this.router.navigate(['/login']);  
      } 
};

