import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Iweather } from '../../models/Iweather';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private http = inject(HttpClient);

  private readonly apiKey = environment.apiKey;
  private readonly apiUrl = environment.weatherApiUrl;

  weatherApiData(country: string): Observable<Iweather> {
    const url = `${this.apiUrl}/current.json?key=${this.apiKey}&q=${country}`;
    return this.http.get<Iweather>(url);
  }
}
