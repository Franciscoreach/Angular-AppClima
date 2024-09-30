import { Component } from '@angular/core';
import { ClimaService } from 'src/app/services/clima.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  urlImage = 'https://cdn-icons-png.flaticon.com/512/2383/2383684.png'
  ciudad = ''; 
  temperatura = 0;
  humedad = 0;
  clima = '';
  query = false;
  loading = false;
  mostrarError = false;

  traducciones = {
    "Clouds": "Nublado",
    "Clear": "Despejado",
    "Rain": "Lluvia",
    "Snow": "Nieve",
    // Agrega más traducciones según sea necesario
  };

  constructor(private _climaService: ClimaService){

  }

  obtenerClima() {
    this.query = false;
    this.loading = true;
    //console.log(this.ciudad)

    this._climaService.getClima(this.ciudad).subscribe(data =>{

      const traducciones: { [key: string]: string } = {
        "Clouds": "Nublado",
        "Clear": "Despejado",
        "Rain": "Lluvia",
        "Snow": "Nieve",
      };

      const weatherMain = data.weather[0].main;
      console.log(data)
      this.loading = false;
      this.query = true;
      this.temperatura = data.main.temp -273;
      this.humedad = data.main.humidity;
      this.clima = weatherMain in traducciones ? traducciones[weatherMain] : weatherMain;
    }, error => {
      console.log(error)
      this.loading = false;
      this.error();
    })
  }

  error(){
    this.mostrarError = true;
    setTimeout(() => {
      this.mostrarError = false;
      this.ciudad = ''
    }, 3000);
  }

}
