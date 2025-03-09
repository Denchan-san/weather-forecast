import { NgModule } from '@angular/core';
import { UserWeatherComponent } from './user-weather.component';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { BrowserModule } from '@angular/platform-browser';

const routes: Routes = [{ path: '', component: UserWeatherComponent }];

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    CommonModule,
    RouterModule.forChild(routes)],
  exports: [],
})
export class UserWeatherModule {}
