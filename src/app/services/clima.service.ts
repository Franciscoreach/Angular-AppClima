import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClimaService {
  url = 'https://api.openweathermap.org/data/2.5/weather?&appid='
  key = '3d36e04403982cb7ca6fc1804b53e282'


  constructor(private http: HttpClient) { }

  getClima(ciudad: string): Observable<any>{
    const URL = this.url + this.key + '&q='+ ciudad;
    return this.http.get(URL)
  }
}
