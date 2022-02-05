import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../models/user.model";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

const apiURL = 'https://trivia-game-noroff-api.herokuapp.com/trainers'
const apiKey = "334H7SGhAEiIPqPfCg+pfA=="

@Injectable({
    providedIn: "root"
})

export class UsersService {
    private static _users: User[] = [];
    private _error: string = "";
    public static signedInUser: User | null = null;

    constructor(private readonly http: HttpClient, private router: Router) { }

    public fetchUsers(): void {
        this.http.get<User[]>("https://trivia-game-noroff-api.herokuapp.com/trainers")
            .subscribe(users => {
                UsersService._users = users;
            }, (error: HttpErrorResponse) => {
                this._error = error.message;
            });
    }
    // Getter for only getting the Users object and not changing the users in the services
    public getUsers(): User[] {
        return UsersService._users;
    }

    // getUsers() {
    //     this.http.get<User[]>(apiURL)
    //         .subscribe(users => {
    //             this.fetchedUsers = users
    //             console.log(this.fetchedUsers)
    //         })
    // }
    public findUser(username: string) {
        return UsersService._users.find((x: User) => x.username === username)
    }
    // A getter to expose variables to the template
    // returns an array of users object
    // get users(): User[] {

    //     return this.UserService.users();
    // }


    public getError(): string {
        return this._error;
    }

    public createAndSignInUser(name: string) {
        // let user = this.findUser(this.inputUsername)
        this.http.post(apiURL, {
            username: name,
            pokemon: []
        }, {
            headers: {
                'X-API-Key': apiKey,
                'Content-Type': 'application/json'
            }
        })
            .subscribe(response => {
                if (!response) {
                    throw new Error('Could not create new Trainer')
                }
                // localStorage.setItem('isLoggedIn', "true"); 
                // localStorage.setItem('user', name); 
                this.setUserLoggedIn(response as User)
            })
    }

    public trySignInExistingUser() {
        if (UsersService.signedInUser != null) {
            return 
        }
        const username = localStorage.getItem("user")
        if (username == null) {
            return
        }
        let user = this.findUser(username)
        if (user) {
            this.setUserLoggedIn(user)
        }
    }

    public setUserLoggedIn(user: User) {
        localStorage.setItem("user", user.username)
        UsersService.signedInUser = user
        this.router.navigate(["trainers"])
    }

    public setUserLogout(): void {
        localStorage.removeItem('user');
        UsersService.signedInUser = null
        this.router.navigate(["login"])
    }
} 