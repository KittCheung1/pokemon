import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {User} from "../models/user.model";

@Injectable({
providedIn:"root"
})

export class UsersService{
    private users: User[]= [];
    private error:string = "";
    
    constructor(private readonly http:HttpClient){
    }

    public fetchUsers():void {
        this.http.get<User[]>("https://trivia-game-noroff-api.herokuapp.com/trainers")
        .subscribe((users : User[])=> {
            this.users=users;
        },(error:HttpErrorResponse)=>{
            this.error= error.message;
        })
    }
}