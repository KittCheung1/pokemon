import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from '../models/Pokemon';
@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(
    private http: HttpClient
  ) { }

 // Get pokemons from the sessionStorage
  getPokemonsFromSessionStorage(numOne: number, numTwo: number) {
    let result: Pokemon[] = [];
    for (let index = numOne; index <= numTwo; index++) {

      let temp = sessionStorage.getItem(index.toString());

      if (temp === null) {
        continue;
      }
      else if (temp) {
        result.push(JSON.parse(temp));
      }
    }
    return result;
  }

  // Get first generation of pokemons from API
  getPokemonsFromApi() {
    return this.http.get("https://pokeapi.co/api/v2/pokemon?limit=152");
  }
  getMorePokemonsFromApi(name: string) {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
  }
}