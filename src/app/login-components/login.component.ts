import { Component, OnInit } from "@angular/core";
import { User } from "../models/user.model";
import { UsersService } from "../services/Users.service";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"],
}) //Decorator
export class LoginComponent implements OnInit {
    constructor(private readonly UserService: UsersService) {

    }
    ngOnInit(): void {
        this.UserService.fetchUsers();
    }

// A getter to expose variables to the template
// returns an array of users
    get users():User[]{

        return this.UserService.getUsers();
    }
}