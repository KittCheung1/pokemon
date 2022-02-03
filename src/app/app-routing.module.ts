import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { LoginComponent } from "./login-components/login.component"
import { PokedexPage } from "./pokedex/pokedex.page";
import { TrainersPage } from "./trainers/trainers.page"

//TrainerProfile Page
//PokeDex + Catch pokemon Page

const routes: Routes = [
    {
        path: "", 
        redirectTo: "/login",
        pathMatch: "full",
        // component: LoginComponent

    },
    { path: "login", component: LoginComponent },
    { path: "trainers", component: TrainersPage },
    { path: "pokedex", component: PokedexPage }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }