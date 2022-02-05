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



    public getError(): string {
        return this._error;
    }
    
    //Creates a user if user cant be found in API
    public createAndSignInUser(name: string) {
        this.http.post(apiURL, {
            username: name,
            pokemon: []
        }, {
            headers: {
                'X-API-Key': apiKey,
                'Content-Type': 'application/json'
            }
        })
            .subscribe((response) => {
                if (!response) {
                    throw new Error('Could not create new Trainer')
                }
                this.setUserLoggedIn(response as User)
            })
    }
    // Try to sign in  a user based on the localstorage user
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

    // Sets user to localstorage as a loggedIn state and navigates the user to the next page
    public setUserLoggedIn(user: User) {
        localStorage.setItem("user", user.username)
        UsersService.signedInUser = user
        console.log(user)
        localStorage.setItem("status", "loggedIn")
        this.router.navigate(["trainers"])
    }
    // Removes user from Localstorage + navigate to login page
    public setUserLogout(): void {
        localStorage.removeItem('user');
        localStorage.removeItem('status');
        UsersService.signedInUser = null
        this.router.navigate(["login"])
    }
} 