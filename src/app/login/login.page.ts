import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { UsersService } from "../services/Users.service";

@Component({
    selector: "app-login",
    templateUrl: "./login.page.html",
    styleUrls: ["./login.page.css"],
}) //Decorator
export class LoginPage implements OnInit {

    inputUsername: string = "";

    constructor(private readonly UserService: UsersService, private fb: FormBuilder) {
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