import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
;

import { AppComponent } from './app.component';
import { LoginComponent } from './login-components/login.component';
import { TrainersPage } from './trainers/trainers.page';
import { AppRoutingModule } from './app-routing.module';

@NgModule({ //Decorator
  declarations: [
    AppComponent,
    LoginComponent,
    TrainersPage,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
