import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';
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
  pictureUrl = "../../assets/testpoke2.gif";
  pokemons: any[] = []
  pokemonFromSession = this.pokemonService.getPokemonsFromSessionStorage(0, 151);
  key = "334H7SGhAEiIPqPfCg+pfA=="
  constructor(
    private pokemonService: PokemonService,
    private userService: UsersService,
    private http: HttpClient,
    private router:Router

  ) {

  }
  public goToTrainer(){
       this.router.navigate(['/trainers']); 
  }

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
    console.log(result);
    this.user = result; // here i add the updatedUser to the user field on component
  }



  ngOnInit(): void {
    let localUserId = localStorage.getItem("id");
    this.user = this.http.get<User>(`https://trivia-game-noroff-api.herokuapp.com/trainers/${localUserId}`)
      .subscribe((user: User) => {
        this.user = user;
        console.log(user);
        return user;
      });

    console.log(this.user);

    if (sessionStorage.length < 151) {

      this.pokemonService.getPokemonsFromApi()
        .subscribe((response: any) => {
          response.results.forEach((result: { name: string; }) => {
            this.pokemonService.getMorePokemonsFromApi(result.name)
              .subscribe((pokemon: any) => {
                this.pokemons.push(pokemon);
                sessionStorage.setItem(pokemon.id,
                  JSON.stringify({ id: pokemon.id, name: pokemon.name, sprites: pokemon.sprites.front_default, types: pokemon.types }));
              })
          });
          location.reload();
        })
    }
    console.log(this.user);
  }
}