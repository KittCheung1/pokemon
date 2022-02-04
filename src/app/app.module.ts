import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginPage } from './login/login.page';
import { TrainersPage } from './trainers/trainers.page';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokedexPage } from './pokedex/pokedex.page';

@NgModule({ //Decorator
  declarations: [
    AppComponent,
    LoginPage,
    TrainersPage,
    PokemonListComponent,
    PokedexPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
