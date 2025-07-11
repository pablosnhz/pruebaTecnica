import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal, Signal } from '@angular/core';
import { Iweather } from 'src/app/core/models/Iweather';
import { WeatherService } from 'src/app/core/services/weather/weather.service';
import { TasksComponent } from '../tasks/tasks.component';
import { UsersComponent } from '../users/users.component';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
  standalone: true,
  imports: [CommonModule, TasksComponent],
})
export class WeatherComponent implements OnInit {
  private weatherService = inject(WeatherService);

  weatherData!: Iweather;
  loading: boolean = true;
  seleccionado: boolean = false;
  $loading: Signal<boolean> = signal(false);

  ngOnInit(): void {
    this.onSelectCountry(this.selectedCountry);
    // this.getClima('Buenos Aires');
  }

  selectedCountry: string = 'Argentina';
  selectedCity: string = 'Buenos Aires';
  cities: string[] = ['Buenos Aires', 'Cordoba', 'Mendoza'];
  ciudadSeleccionada: { [key: string]: string[] } = {
    Argentina: ['Buenos Aires', 'Cordoba', 'Mendoza'],
    México: ['Ciudad de México', 'Tijuana', 'Monterrey'],
    España: ['Madrid', 'Barcelona', 'Bilbao'],
    China: ['Pekin', 'Hainan', 'Yunnan'],
  };

  onSelectCity(city: string): void {
    this.selectedCity = city;
    this.getClima(city);
  }

  onSelectCountry(country: string): void {
    this.selectedCountry = country;
    this.cities = this.ciudadSeleccionada[country];
    this.seleccionado = true;
    this.selectedCity = this.cities[0];
    this.getClima(this.selectedCity);
  }

  getClima(country: string): void {
    this.weatherService.weatherApiData(country).subscribe({
      next: (data) => {
        this.weatherData = data;
        // console.log(data);
        this.loading = false;
      },
      error: (error) => {
        console.error('error clima', error);
      },
    });
  }
}
