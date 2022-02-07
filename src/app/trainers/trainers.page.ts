import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { async } from "@angular/core/testing";
import { Pokemon } from "../models/Pokemon";
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
        private http: HttpClient
    ) {
    }

    public updateAsh = async (user: User) => {
        const response = await fetch(`https://trivia-game-noroff-api.herokuapp.com/trainers/${user.id}`, {
            method: 'PATCH',
            headers: {
                'X-API-Key': this.key,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                pokemon: user.pokemon
            })
        })
        if (!response.ok) {
            throw new Error("could not update trainer-pokemon-list!")
        }
        const result = await response.json();
        this.user = result;
    }

    //Updates the current users pokemon list. We use the pokemon argument that gets passed to function to filter the current list. The filtered list then gets sent with 
    // the patch request. 
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
            throw new Error("could not update trainer-pokemon-list!")
        }
        const result = await response.json();
        this.user = result;
    }

    //Get the current user and sets a local field with the users pokemons in order to get them displayed on the view.
    ngOnInit(): void {

        let localUserId = localStorage.getItem("id");
        this.user = this.http.get<User>(`https://trivia-game-noroff-api.herokuapp.com/trainers/${localUserId}`)
            .subscribe((user: User) => {
                if (user.id === 1) {
                    if (user.pokemon.includes("bulbasaur" as never) && user.pokemon.includes("pikachu" as never)) {
                        let bulbasaur: any = sessionStorage.getItem("1");
                        let pikachu: any = sessionStorage.getItem("25");
                        bulbasaur = JSON.parse(bulbasaur);
                        pikachu = JSON.parse(pikachu);
                        let bulb = new Pokemon(bulbasaur.id, bulbasaur.name, bulbasaur.sprites, bulbasaur.types)
                        let pik = new Pokemon(pikachu.id, pikachu.name, pikachu.sprites, pikachu.types)
                        user.pokemon.splice(0, 2);
                        user.pokemon.push(bulb as never);
                        user.pokemon.push(pik as never);
                        this.updateAsh(user);
                    }
                }
                this.user = user;

                return user;
            });


        this.pokemons = this.user.pokemon;
    }

    logout() {
        this.UserService.setUserLogout();
    }
};

