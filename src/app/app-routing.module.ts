import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { LoginComponent } from "./login-components/login.component"
import { Pokedex } from "./pokedex/pokedex.page";
import { TrainersPage } from "./trainers/trainers.page"

//TrainerProfile Page
//PokeDex + Catch pokemon Page

const routes: Routes = [
    {
        path:"", component:LoginComponent

    },
    { path: "trainers",component: TrainersPage},
    {path:"pokedex", component:Pokedex}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }