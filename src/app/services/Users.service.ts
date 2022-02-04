import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../models/user.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})

export class UsersService {
    private _users: User[] = [];
    private _error: string = "";
    public static signedInUser: User| null= null;

    constructor(private readonly http: HttpClient) { }
    // public getUsers() {
    //     return this.http.get<User[]>("https://trivia-game-noroff-api.herokuapp.com/trainers")
    // }
    // setUser(users: User[]) {
    //     this.user = users;
    // }
    //    //can not access this outside of class. metod is created to be able to reach property
    //     private _users: User[] = [];
    //     private _error: string = "";

    //     //Dependency Injection
    //     constructor(private readonly http: HttpClient) {
    //     }

    public fetchUsers(): void {
        this.http.get<User[]>("https://trivia-game-noroff-api.herokuapp.com/trainers")
            .subscribe(users => {
                this._users = users;
            }, (error: HttpErrorResponse) => {
                this._error = error.message;
            });
    }
    // Getter for only getting the Users object and not changing the users in the services
    public getUsers(): User[] {
        return this._users;
    }

    public getError(): string {
        return this._error;
    }

} 