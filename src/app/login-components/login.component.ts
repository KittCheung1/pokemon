import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { User } from "../models/user.model";
import { UsersService } from "../services/Users.service";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"],
}) //Decorator
export class LoginComponent implements OnInit {
    APIusername: any;
    username:string="";

    constructor(private router:Router, private http: HttpClient, private readonly UserService: UsersService, private fb: FormBuilder) {
    }
    ngOnInit(): void {
        // this.UserService.fetchUsers();
        this.http.get<any>('https://trivia-game-noroff-api.herokuapp.com/trainers').subscribe(data => {
            this.APIusername = data[0].username
        })
        // localStorage.setItem("SessionUser", this.user)

    }
    login() {
        if (this.username == this.APIusername) {
            console.log("Same User")
            this.router.navigate(["/trainers"])
        }
    }


    // A getter to expose variables to the template
    // returns an array of users object
    get users(): User[] {

        return this.UserService.users();
    }

}