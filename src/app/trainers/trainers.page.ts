import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { filter } from "rxjs";
import { Pokemon } from "../models/pokemon.model";
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
    key = "334H7SGhAEiIPqPfCg+pfA=="
    constructor(
        private readonly UserService: UsersService,
        private router: Router,
        private http: HttpClient
    ) {
    }

    public releasePokemon = async (user: User, pokemonInput: Pokemon) => {

        const response = await fetch(`https://trivia-game-noroff-api.herokuapp.com/trainers/${user.id}`, {
            method: 'PATCH',
            headers: {
                'X-API-Key': this.key,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                pokemon: user.pokemon.filter(pokemon => {
                    return pokemon !== pokemonInput;
                })
            })
        })
        if (!response.ok) {
            throw new Error("could not update trainer")
        }
        const result = await response.json();
       this.user = result;
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

