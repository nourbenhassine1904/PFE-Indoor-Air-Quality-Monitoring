import { Component, OnInit } from '@angular/core';
import { SolutionsService } from './solutions.service';

@Component({
  selector: 'app-solutions',
  templateUrl: './solutions.component.html',
  styleUrls: ['./solutions.component.css']
})
export class SolutionsComponent implements OnInit {

  co2Value!: number;
  pressionValue!: number;
  humiditeValue!: number;
  o3Value!: number;
  temperatureValue!: number;
  no2Value!: number;

  // Déclarez les autres variables pour les valeurs des autres paramètres ici

  prediction: any;

  constructor(private solutionsService: SolutionsService) { }

  ngOnInit(): void {
  }

  predictAirQuality(): void {
    const data = {
      values: [
        this.co2Value,
        this.pressionValue,
        this.humiditeValue,
        this.o3Value,
        this.temperatureValue,
        this.no2Value
      ]
    };
    this.solutionsService.predict(data).subscribe(
      response => {
        this.prediction = response;
      },
      error => {
        console.log(error);
      }
    );
  }

  showDetails(): void {
    alert("Votre solution personnalisée est activée! Nous mettons tout en œuvre pour améliorer la qualité de votre air intérieur. Un membre de notre équipe vous contactera sous peu pour vous accompagner dans la mise en place de votre solution.");
  }

}
