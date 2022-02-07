
import { IPokemon } from "../models/pokemon.model";

export class Pokemon implements IPokemon  {
    
constructor(id:number, name: string, sprites: string, types: any[]){
    this.id = id,
    this.name = name,
    this.sprites = sprites,
    this.types = types
}
    id: number
    name: string
    sprites: string
    types: any[]
}