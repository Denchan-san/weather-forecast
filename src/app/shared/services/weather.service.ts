 import { Injectable } from '@angular/core';
 import { HttpClient } from '@angular/common/http';
 import { Observable } from 'rxjs';
 import { map } from 'rxjs/operators';
 import { User, Weather } from '../model/user.model';

 @Injectable({
   providedIn: 'any'
 })
 export class WeatherService {
   constructor(private http: HttpClient) {}

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

  fetchWeather(user: User): Observable<{ user: User; weather: Weather }> {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${user.latitude}&longitude=${user.longitude}&hourly=temperature_2m&current_weather=true`;

    return this.http.get<any>(url).pipe(
      map(response => {
        const weather: Weather = {
          icon: response.current_weather?.weathercode,
          temperature: response.current_weather?.temperature,
          minTemperature: Math.min(...(response.hourly?.temperature_2m || [])),
          maxTemperature: Math.max(...(response.hourly?.temperature_2m || [])),
          hourly: response.hourly?.temperature_2m || [],
          forecast: response.hourly || {}
        };
        return { user, weather };
      })
    );
  }

   getWeatherIcon(weatherCode: number): string {
    const weatherIcons: { [key: number]: string } = {
      0: '/assets/sunny.png',
      1: '/assets/cloudy.png',
      2: '/assets/cloudy.png',
      3: '/assets/overcast.png',
      45: '/assets/fog.png',
      48: '/assets/fog.png',
      51: '/assets/drizzle.png',
      53: '/assets/drizzle.png',
      55: '/assets/drizzle.png',
      56: '/assets/freezingdrizzle.png',
      57: '/assets/freezingdrizzle.png',
      61: '/assets/rain.png',
      63: '/assets/rain.png',
      65: '/assets/rain.png',
      66: '/assets/freezingrain.png',
      67: '/assets/freezingrain.png',
      71: '/assets/snow.png',
      73: '/assets/snow.png',
      75: '/assets/snow.png',
      77: '/assets/snow.png',
      80: '/assets/rainshowers.png',
      81: '/assets/rainshowers.png',
      82: '/assets/rainshowers.png',
      85: '/assets/snowshowers.png',
      86: '/assets/snowshowers.png',
      95: '/assets/thunderstorm.png',
      96: '/assets/thunderstorm.png',
      99: '/assets/thunderstorm.png',
    };
    return weatherIcons[weatherCode] || 'assets/default.png';
  }
 }