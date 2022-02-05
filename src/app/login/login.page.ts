import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { User } from "../models/user.model";
import { UsersService } from "../services/Users.service";
import { HttpClient, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Router } from "@angular/router";

// const apiURL = 'https://trivia-game-noroff-api.herokuapp.com/trainers'
// const apiKey = "334H7SGhAEiIPqPfCg+pfA=="

@Component({
    selector: "app-login",
    templateUrl: "./login.page.html",
    styleUrls: ["./login.page.css"],
}) //Decorator
export class LoginPage implements OnInit {

    trainer: any;
    APIusername: any;
    inputUsername: string = "";
    fetchedUsers: any;
    createdUser: User | null = null;

    constructor(private router: Router, private http: HttpClient, private readonly UserService: UsersService, private fb: FormBuilder) {
    }
    ngOnInit() {
        this.UserService.fetchUsers();
    }

    // login the user by first checking if user exist in API.
    // If not, create the user and sign in the user.
    // Then sets the user as Logged in
    login() {
        let user = this.UserService.findUser(this.inputUsername)
        if (!user) {
            this.UserService.createAndSignInUser(this.inputUsername)
            return
        }
        this.UserService.setUserLoggedIn(user)
    }
}