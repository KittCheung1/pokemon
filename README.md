# Pokemon

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Installation

1. Clone the repo to the folder you want with git bash - run the command: git clone "remote-repo-url" 
2. In git bash run: cd pokemon  (repository root folder)
3. In git bash run: npm install

## Collaborators
 Gabriel Andersson Kitt Cheung


## Usage

In your terminal of choice - when you want to start the application - run: ng serve 

User will be saved in localstorage and will only be removed from localstorage when clicking on the Logout button.


## Description
Application starts at the Login page. Enter username to login. 
User will be redirected to the Catalogue page on our case, the Pokedex Page with a list of Pokemon. Clicking on user can catch pokemon by clicking on the "catch (pokemon)" button. The user can then see the caught pokemon in the Trainers page.
At the Trainers page, the user can release the caught pokemon.

## Assumptions

We make the assumption that removing a pokemon for the trainer/user in this case means a permanent 
delete, we do not store deleted records. 

We only fetch the first generation of pokemons in our pokedex/catalog-page. 
This is partly because we have chosen not to use pagination. 
It's also because we're favorably inclined towards the first gen pokemons.
