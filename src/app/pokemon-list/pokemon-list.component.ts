import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

  pokemons: any[] = []
  pokemonFromSession = this.pokemonService.getPokemonsFromSessionStorage(0,152);

  constructor(
    private pokemonService: PokemonService
  ) { }

 
  ngOnInit(): void {
  //console.log(this.pokemonFromSession[0].types[0);
  //console.log(this.pokemonFromSession)
    if (sessionStorage.length < 1) {
      this.pokemonService.getPokemonsFromApi()
        .subscribe((response: any) => {
          response.results.forEach((result: { name: string; }) => {
            this.pokemonService.getMorePokemonsFromApi(result.name)
              .subscribe((pokemon: any) => {
                this.pokemons.push(pokemon);
                console.log(this.pokemons);

                  sessionStorage.setItem(pokemon.id, 
                    JSON.stringify({ id: pokemon.id, name: pokemon.name, sprites: pokemon.sprites.front_default, types: pokemon.types }));
              })
          });
        })
    }
  }
}
