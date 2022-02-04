import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { User } from "../models/user.model";
import { UsersService } from "../services/Users.service";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable, UnsubscriptionError } from "rxjs";

const apiURL = 'https://trivia-game-noroff-api.herokuapp.com/trainers'
const apiKey = "334H7SGhAEiIPqPfCg+pfA=="

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

    constructor(private router: Router, private http: HttpClient, private readonly UserService: UsersService, private fb: FormBuilder) {
    }
    ngOnInit() {
        this.UserService.fetchUsers();
        this.getUsers();


    }
    login() {
        let user = this.findUser(this.inputUsername)
        if (!user )
        user = this.createUser(this.inputUsername)
        
        UsersService.signedInUser = user
        this.router.navigate(["trainers"])
        console.log(this.inputUsername)
    }

    getUsers() {
        this.http.get<User[]>(apiURL)
            .subscribe(users => {
                this.fetchedUsers = users
                console.log(this.fetchedUsers)
            })
    }

    createUser(name: string) {
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
                return response
            })
    }

    findUser(username: string) {
        return this.fetchedUsers.find((x: User) => x.username === username)
    }
    // A getter to expose variables to the template
    // returns an array of users object
    // get users(): User[] {

    //     return this.UserService.users();
    // }

}