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
username: any;
    constructor(private readonly UserService: UsersService, private router: Router) {
    }

    ngOnInit(): void {
        this.username = localStorage.getItem("user")

    }

    logout() {
        this.UserService.setUserLogout();
    }
};

