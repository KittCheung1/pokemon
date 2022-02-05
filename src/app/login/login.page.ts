import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { User } from "../models/user.model";
import { UsersService } from "../services/Users.service";
import { HttpClient, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable, UnsubscriptionError } from "rxjs";

// const apiURL = 'https://trivia-game-noroff-api.herokuapp.com/trainers'
// const apiKey = "334H7SGhAEiIPqPfCg+pfA=="

@Component({
    selector: "app-login",
    templateUrl: "./login.page.html",
    styleUrls: ["./login.page.css"],
}) //Decorator
export class LoginPage implements OnInit {

    trainer: any;
    APIusername: any;
    inputUsername: string = "";
    fetchedUsers: any;
    createdUser: User | null = null;

    constructor(private router: Router, private http: HttpClient, private readonly UserService: UsersService, private fb: FormBuilder) {
    }
    ngOnInit() {
        this.UserService.fetchUsers();
        // this.UserService.getUsers();
    }

    // setUserLoggedIn(user: User) {
    //     localStorage.setItem("user", JSON.stringify(user.username))
    //     UsersService.signedInUser = user
    //     this.router.navigate(["trainers"])
    // }

    login() {
        let user = this.UserService.findUser(this.inputUsername)
        console.log(user)
        if (!user) {
            this.UserService.createAndSignInUser(this.inputUsername)
            return
            // user = this.createdUser;
            // console.log(user)
            // let newUser = this.findUser(this.inputUsername)
            // if (newUser) {
            //     UsersService.signedInUser = newUser
            //     localStorage.setItem('user', newUser.username);
            //     this.router.navigate(["trainers"])
            // }
        }

        this.UserService.setUserLoggedIn(user)
    }

    // getUsers() {
    //     this.http.get<User[]>(apiURL)
    //         .subscribe(users => {
    //             this.fetchedUsers = users
    //             console.log(this.fetchedUsers)
    //         })
    // }

    // createUser(name: string) {
    //     // let user = this.findUser(this.inputUsername)
    //     this.http.post(apiURL, {
    //         username: name,
    //         pokemon: []
    //     }, {
    //         headers: {
    //             'X-API-Key': apiKey,
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //         .subscribe(response => {
    //             if (!response) {
    //                 throw new Error('Could not create new Trainer')
    //             }
    //             // localStorage.setItem('isLoggedIn', "true"); 
    //             // localStorage.setItem('user', name); 
    //             this.setUserLoggedIn(response as User)
    //         })
    // }

    // findUser(username: string) {
    //     return this.fetchedUsers.find((x: User) => x.username === username)
    // }
    // // A getter to expose variables to the template
    // // returns an array of users object
    // // get users(): User[] {

    // //     return this.UserService.users();
    // // }

}