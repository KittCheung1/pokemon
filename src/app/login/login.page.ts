import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { User } from "../models/user.model";
import { UsersService } from "../services/Users.service";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable } from "rxjs";

const apiURL = 'https://trivia-game-noroff-api.herokuapp.com/trainers'
const apiKey = "334H7SGhAEiIPqPfCg+pfA=="

@Component({
    selector: "app-login",
    templateUrl: "./login.page.html",
    styleUrls: ["./login.page.css"],
}) //Decorator
export class LoginPage implements OnInit {
    users = [];
    APIusername: any;
    username: string = "";
    fetchedData: any
    constructor(private router: Router, private http: HttpClient, private readonly UserService: UsersService, private fb: FormBuilder) {
    }
    ngOnInit() {
        // this.UserService.getUsers()
        //     .subscribe(data => {this.UserService.setUser(data);console.log(data)})

        this.UserService.fetchUsers();
        // this.http.get<any>(apiURL).subscribe(data => {
        //     this.APIusername = data[0].username
        // })
        // localStorage.setItem("SessionUser", this.user)

    }
    login() {
        this.getUser()
        this.createUser()
    }

    getUser() {
        this.UserService.getUsers()
            .subscribe(users =>
                this.fetchedData = users);
    }

    createUser() {
        this.http.post(apiURL, {
            username: this.username,
            pokemon: []
        }, {
            headers: {
                'X-API-Key': apiKey,
                'Content-Type': 'application/json'
            }
        })
            .subscribe(response => {
                console.log(response)
                if (!response) {
                    throw new Error('Could not create new Trainer')
                }
                console.log(response)
                return response
            })
    }
    // A getter to expose variables to the template
    // returns an array of users object
    // get users(): User[] {

    //     return this.UserService.users();
    // }

}