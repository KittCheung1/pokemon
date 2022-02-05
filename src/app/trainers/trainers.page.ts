import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "../models/user.model";
import { UsersService } from "../services/Users.service";

@Component({
    selector: "app-trainers",
    templateUrl: "./trainers.page.html",
    styleUrls: ["./trainers.page.css"]
})

export class TrainersPage {
    constructor(private readonly UserService: UsersService, private router: Router) {
    }

    ngOnInit(): void {

        console.log(UsersService.signedInUser)
        // console.log(localStorage.getItem("userKey"))
        // this.UserService.fetchUsers();
    }

    logout() {
        this.UserService.setUserLogout();
    }
};

