import { Component, OnInit, ChangeDetectorRef, Inject, OnDestroy } from '@angular/core';
import { User, Weather } from '../../shared/model/user.model';
import { HttpClient } from '@angular/common/http';
import { WeatherService } from '../../shared/services/weather.service';
import { interval, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-weather',
  templateUrl: './user-weather.component.html',
  styleUrls: ['./user-weather.component.css'],
  imports: [CommonModule]
})
export class UserWeatherComponent implements OnInit, OnDestroy {
  users: { user: User; weather: Weather }[] = [];
  private weatherSubscription!: Subscription;

  constructor(
    private http: HttpClient,
    private cdRef: ChangeDetectorRef,
    private weatherService: WeatherService
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

  fetchUsers() {
    this.http
      .get<any>('https://randomuser.me/api/?results=5')
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
        this.users = [...this.users, data];
        this.cdRef.detectChanges();
      },
      (error) => {
        console.error('Error fetching weather data:', error);
      }
    );
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