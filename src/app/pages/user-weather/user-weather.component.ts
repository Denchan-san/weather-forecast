import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { User } from '../../shared/model/user.model';
import { HttpClient } from '@angular/common/http';
import { WeatherService } from '../../shared/services/weather.service';
import { interval, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { icon, latLng, marker, tileLayer, Marker } from 'leaflet';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MatDialog } from '@angular/material/dialog';
import { ForecastDialogComponent } from '../forecast-dialog/forecast-dialog.component';

@Component({
  selector: 'app-user-weather',
  templateUrl: './user-weather.component.html',
  styleUrls: ['./user-weather.component.css'],
  imports: [CommonModule, LeafletModule]
})
export class UserWeatherComponent implements OnInit, OnDestroy {
  users: { user: User; weather: any }[] = [];
  private weatherSubscription!: Subscription;
  markers: Marker[] = [];
  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      })
    ],
    zoom: 2,
    center: latLng(0, 0)
  };
  layers: any[] = []; 

  constructor(
    private http: HttpClient,
    private cdRef: ChangeDetectorRef,
    private weatherService: WeatherService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.fetchUsers();

    this.weatherSubscription = interval(300000).subscribe(() => {
      this.users.forEach(userWeather => this.fetchWeather(userWeather.user));
      this.users = [];
    });
  }

  ngOnDestroy() {
    if (this.weatherSubscription) {
      this.weatherSubscription.unsubscribe();
    }
  }

  onOpenForecastDialog(userWeather: any): void {
    if (userWeather.weather && userWeather.weather.forecast && userWeather.weather.forecast.time) {
      const forecast = userWeather.weather.forecast.time.map((time: string, index: number) => ({
        time,
        temperature: userWeather.weather.forecast.temperature_2m[index]
      }));
    
  
      this.dialog.open(ForecastDialogComponent, {
        width: '400px',
        data: { userName: userWeather.user.name, forecast }
      });
    } else {
      alert('Hourly weather data is not available');
    }
  }

  fetchUsers() {
    this.http
      .get<any>('https://randomuser.me/api/?results=3')
      .subscribe((response) => {
        const users = response.results.map((user: any) => ({
          name: `${user.name.first} ${user.name.last}`,
          gender: user.gender,
          picture: user.picture.large,
          location: `${user.location.city}, ${user.location.country}`,
          email: user.email,
          latitude: parseFloat(user.location.coordinates.latitude),
          longitude: parseFloat(user.location.coordinates.longitude),
        }));

        users.forEach((user: User) => this.fetchWeather(user));
      });
  }

  fetchWeather(user: User): void {
    this.weatherService.fetchWeather(user).subscribe(
      (data) => {
        const index = this.users.findIndex(u => u.user.email === data.user.email);
        if (index !== -1) {
          this.users[index] = data;
        } else {
          this.users.push(data);
        }
        this.cdRef.detectChanges();
        this.updateMap(data.user);
      },
      (error) => {
        console.error('Error fetching weather data:', error);
      }
    );
  }

  updateMap(user: User) {
    const userMarker = marker([user.latitude, user.longitude], {
      icon: icon({
        iconUrl: user.picture,
        iconSize: [50, 50],
        iconAnchor: [25, 25],
        popupAnchor: [0, -25]
      })
    }).bindPopup(`<b>${user.name}</b><br>${user.location}`);

    this.layers.push(userMarker);
  }

  onSaveToLocalStorage(user: User) {
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
  }

  getWeatherIcon(weatherCode: number): string {
    return this.weatherService.getWeatherIcon(weatherCode);
  }
}
