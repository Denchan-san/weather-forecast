import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { AppRoutingModule } from "./app-routing.module";
import { UserWeatherModule } from "./pages/user-weather/user-weather.module";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from '@angular/common/http';
import { AlertModule } from 'ngx-bootstrap/alert';

@NgModule({
  declarations: [
  ],
  imports: [
    HttpClientModule,
    UserWeatherModule,
    AppRoutingModule,
    BrowserModule,
    RouterModule,
    CommonModule,
    AlertModule.forRoot()
  ],
  providers: [],
})
export class AppModule { }