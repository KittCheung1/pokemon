import { HttpClient } from "@angular/common/http";
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

    user: any;
    pokemons: any;

    constructor(
        private readonly UserService: UsersService,
        private router: Router,
        private http: HttpClient
    ) {
    }

    ngOnInit(): void {
        let localUserId = localStorage.getItem("id");
        this.user = this.http.get<User>(`https://trivia-game-noroff-api.herokuapp.com/trainers/${localUserId}`)
            .subscribe((user: User) => {
                this.user = user;
                console.log(user);
                return user;
            });

            this.pokemons = this.user.pokemon;

        console.log(this.user)
    }

    logout() {
        this.UserService.setUserLogout();
    }
};

