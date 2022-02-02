import { Component, OnInit } from "@angular/core";
import { UsersService } from "../services/Users.service";

@Component({
    selector:"app-login",
    templateUrl:"./login.component.html",
    styleUrls:["./login.component.css"],
}) //Decorator
export class LoginComponent implements OnInit{
constructor(private readonly UserService: UsersService){

}
ngOnInit(): void {
    this.UserService.fetchUsers();
}
}