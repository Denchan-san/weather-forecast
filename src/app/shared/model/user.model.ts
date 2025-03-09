export interface User {
    name: string;
    gender: string;
    picture: string;
    location: string;
    email: string;
    latitude: number;
    longitude: number;
}

export interface Weather {
    icon: string;
    temperature: number;
    minTemperature: number;
    maxTemperature: number;
    hourly?: number[];
  }