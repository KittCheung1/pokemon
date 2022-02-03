import { Component } from "@angular/core";
import { User } from "../models/user.model";
import { UsersService } from "../services/Users.service";

@Component({
    selector:"app-trainers",
    templateUrl: "./trainers.page.html",
    styleUrls:["./trainers.page.css"]
})




export class TrainersPage{
    constructor(private readonly UserService: UsersService) {

    }

    ngOnInit(): void {
        this.UserService.fetchUsers();
    }
    get users():User[]{

        return this.UserService.users();
    }
};

