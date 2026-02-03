import { Component, OnInit } from '@angular/core';

interface Parameter {
  paramName: string;
  name: string;
  value: number;
  range: [number, number];
  threshold: number;
  details: string;
  show: boolean;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  parameters: Parameter[] = [
    { paramName: 'co2', name: 'CO2 (ppm)', range: [350, 2200], value: 1000.2, threshold: 1000, details: 'Consultez les sous-pages de dashboard pour plus de details', show: true },
    { paramName: 'pression',name: 'Pression (hPa)',  range: [899, 1300],value: 993.611, threshold: 1013.25, details: 'Consultez les sous-pages de dashboard pour plus de details', show: true },
    { paramName: 'humidite', name: 'Humidité (%)', range: [40, 100],value: 41.609, threshold: 60, details: 'Consultez les sous-pages de dashboard pour plus de details', show: true },
    { paramName: 'temperature', name: 'Température (°C)', range: [18, 50],value: 20.187, threshold: 25, details: 'Consultez les sous-pages de dashboard pour plus de details', show: true },
    { paramName: 'no2', name: 'NO2 (µg/m^3)',  range: [ 0, 140], value: 40,threshold: 40, details: 'Consultez les sous-pages de dashboard pour plus de details', show: true },
    { paramName: 'o3', name: 'O3 (µg/m^3)', range: [0, 350], value: 17.726,threshold: 100, details: 'Consultez les sous-pages de dashboard pour plus de details', show: true },
  ];

  

  ngOnInit() {
    this.parameters.forEach(parameter => {
      parameter.value = this.getRandomValue(parameter.range[0], parameter.range[1]);
    });

    // You can fetch parameter data from an API or service here
    // and update the `this.parameters` array dynamically.
    let pack = JSON.parse(window.sessionStorage.getItem('user') || '{}').pack;
    if(pack){
      this.parameters.forEach((element) => {
        switch (element.paramName) {
          case 'co2':
            element.show = pack.isCo2
            break;
          case 'pression':
            element.show = pack.isPression
            break;
          case 'humidite':
            element.show = pack.isHumidity
            break;
          case 'temperature':
            element.show = pack.isTemperature
            break;
          case 'no2':
            element.show = pack.isNo2
            break;
          case 'o3':
            element.show = pack.isO3
            break;
          default:
            break;
        }
      });
    }
  }

  getRandomValue(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  getColor(value: number, threshold: number) {
    return value <= threshold ? 'green' : 'red';
  }

  getStatusMessage(value: number, threshold: number) {
    return value <= threshold ? 'Bonne' : 'Dépasse le seuil';
  }

  showDetails(index: number) {
    const parameter = this.parameters[index];
    // Implement the logic to display the small message frame here
    alert(parameter.details); // Example using alert, replace with a more appropriate solution
  }

  
}
