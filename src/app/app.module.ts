import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AlertModule } from 'ngx-bootstrap/alert';
import { AppRoutingModule } from './app-routing.module';
import { UserWeatherModule } from './pages/user-weather/user-weather.module';
import { SavedUsersModule } from './pages/saved-users/saved-users.module';
import { NavBarModule } from './pages/nav-bar/nav-bar.module';
import { ForeCastDialogModule } from './pages/forecast-dialog/forecast-dialog.module';

@NgModule({
  declarations: [
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    UserWeatherModule,
    SavedUsersModule,
    NavBarModule,
    ForeCastDialogModule,
    AppRoutingModule,
    AlertModule.forRoot()
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }