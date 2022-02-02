import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http"
import { User } from "../models/user.model";
@Injectable({
    providedIn: "root"
})

export class UserService {
    private users:User[] = [];
    private error:string="";
    //dependency Injection
    constructor(private readonly http: HttpClient) {

    }

    public ferchUsers(): void {
        this.http.get<User[]>("https://trivia-game-noroff-api.herokuapp.com/trainers")
            .subscribe((users: User[]) => {
                this.users = users;
            }), (error: HttpErrorResponse)=>{
                this.error= error.message;
            }

    }
}