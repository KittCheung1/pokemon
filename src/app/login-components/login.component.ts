import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { User } from "../models/user.model";
import { UsersService } from "../services/Users.service";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"],
}) //Decorator
export class LoginComponent implements OnInit {

    user=""
    constructor(private readonly UserService: UsersService, private fb: FormBuilder) {

    }
    ngOnInit():void {
        this.UserService.fetchUsers();

        // localStorage.setItem("SessionUser", this.user)

    }

    loginForm = this.fb.group({
        username: [""]
    })

    // A getter to expose variables to the template
    // returns an array of users object
    get users(): User[] {

        return this.UserService.getUsers();
    }

}