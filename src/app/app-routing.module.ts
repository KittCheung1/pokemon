import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { AuthGuard } from "./guard/auth.guard";
import { LoginPage } from "./login/login.page"
import { PokemonListPage } from "./pokemon-list/pokemon-list.page";
import { TrainersPage } from "./trainers/trainers.page"

//TrainerProfile Page
//PokeDex + Catch pokemon Page

const routes: Routes = [
    { path: "", redirectTo: "login", pathMatch: "full" },
    { path: "login", component: LoginPage },
    { path: "trainers", component: TrainersPage, canActivate: [AuthGuard] },
    { path: "pokedex", component: PokemonListPage, canActivate: [AuthGuard] }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }