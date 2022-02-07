import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../models/Pokemon';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { PokemonService } from '../services/pokemon.service';
import { UsersService } from '../services/Users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.page.html',
  styleUrls: ['./pokemon-list.page.css']
})


export class PokemonListPage implements OnInit {

  user: any;
  pokemons: any[] = []
  pokemonFromSession = this.pokemonService.getPokemonsFromSessionStorage(0, 151);
  key = "334H7SGhAEiIPqPfCg+pfA=="
  constructor(
    private pokemonService: PokemonService,
    private UserService: UsersService,
    private http: HttpClient,
    private router: Router

  ){}

  public goToTrainer() {
    this.router.navigate(['/trainers']);
  }

  //Here we update the current users pokemon list and send a patch request. 
  public catchAPokemon = async (user: User, pokemon: Pokemon) => {

    const response = await fetch(`https://trivia-game-noroff-api.herokuapp.com/trainers/${user.id}`, {
      method: 'PATCH',
      headers: {
        'X-API-Key': this.key,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        pokemon: [...user.pokemon, { id: pokemon.id, name: pokemon.name, sprites: pokemon.sprites, types: pokemon.types }]
      })
    })
    if (!response.ok) {
      throw new Error("could not update trainer")
    }
    const result = await response.json();

    alert(`Congratulations, you have captured ${pokemon.name}!`)
    this.user = result;
  }

  //On initialization we fetch the current user from the api via the localstorage id. 
  // Then we check if the session storage is filled with the first generation of pokemons. If that is not the case we fetch the pokemons directly from the api and
  // add them to the session storage so that they load from there the next time.
  ngOnInit(): void {
    let localUserId = localStorage.getItem("id");
    this.user = this.http.get<User>(`https://trivia-game-noroff-api.herokuapp.com/trainers/${localUserId}`)
      .subscribe((user: User) => {
        this.user = user;

        return user;
      });

      if(sessionStorage.length < 151) {

      this.pokemonService.getPokemonsFromApi()
        .subscribe((response: any) => {
          response.results.forEach((result: { name: string; }) => {
            this.pokemonService.getMorePokemonsFromApi(result.name)
              .subscribe((pokemon: any) => {
                this.pokemons.push(pokemon);
                sessionStorage.setItem(pokemon.id,
                  JSON.stringify({ id: pokemon.id, name: pokemon.name, sprites: pokemon.sprites.front_default, types: pokemon.types }));
                  if(sessionStorage.length > 151) location.reload();
                })
          });
        })
    }
  }
  logout() {
    this.UserService.setUserLogout();
  }
}