import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from '../models/pokemon.model';
@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(
    private http: HttpClient
  ) { }


  getPokemonsFromSessionStorage(numOne: number, numTwo: number) {
    let result: Pokemon[] = [];
    for (let index = numOne; index < numTwo; index++) {

        let temp = sessionStorage.getItem(index.toString());
       
        if (temp === null) {
            continue;
        }
        else if(temp){
         
            result.push(JSON.parse(temp));
        }
    }
  
    return result;
}
  getPokemonsFromApi() {
    return this.http.get("https://pokeapi.co/api/v2/pokemon?limit=1100");
  }

  getMorePokemonsFromApi(name: string) {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
  }
}

