import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface Device {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  groupId: number;
  connectivity: string;
  // Ajoutez d'autres propriétés pertinentes
}

export interface Group {
  id: number;
  name: string;
}

@Component({
  selector: 'app-appareils',
  templateUrl: './appareils.component.html',
  styleUrls: ['./appareils.component.css']
})
export class AppareilsComponent implements OnInit {

  groups: Group[] = [
    { id: 1, name: "Capteurs et détecteurs" },
    { id: 2, name: "Purificateurs d'air" },
    { id: 3, name: "Accessoires" },
    { id: 4, name: "Autres" }
  ];

  devices: Device[] = [
    {
      id: 1,
      name: "Netatmo Smart Indoor Air Quality Monitor",
      description: "Mesure la qualité de l\'air intérieur en temps réel.Suivi du CO2, des particules fines (PM2.5), de l\'humidité et de la température.Design élégant et discret.",
      image: 'assets/imgs/6.png',
      price: 100,
      groupId: 1,
      connectivity: "WiFi",
    },
    {
      id: 2,
      name: "Wave Mini",
      description: "Moniteur d\'air intérieur simple et intelligent qui suit les COV ou indique le risque de croissance de moisissures. Pour salles de bains, buanderies et garages.",
      image: 'assets/imgs/8.png',
      price: 80,
      groupId: 1,
      connectivity: "Bluetooth",
    },
    {
      id: 7,
      name: "Eve Room : le capteur de qualité de l’air intérieur maison pour les amateurs d’HomeKit",
      description: "Eve Room est le capteur de qualité de l’air de la marque et est donc uniquement compatible avec les produits iOS. Pour assurer une remontée des informations via le net, il faudra aussi posséder un HomePod ou une Apple TV de 4e génération",
      image: 'assets/imgs/12.png',
      price: 50,
      groupId: 1,
      connectivity: "N/A"
    },
    {
      id: 8,
      name: "Airthings View Plus: le capteur de qualité de l’air extérieur pour surveiller le radon",
      description: "Il mesure la température, l’humidité, les COV, le CO2, les PM2,5 et même le radon ! À noter que l’appareil aura besoin d’une semaine pour que ses senseurs soient parfaitement calibrés et que les mesures de radon et de CO2 soient précises.",
      image: 'assets/imgs/13.png',
      price: 250,
      groupId: 1,
      connectivity: "N/A"
    },
    {
      id: 3,
      name: "Moniteur multi-polluants",
      description: "Surveille plusieurs polluants en un seul appareil",
      image: 'assets/imgs/9.png',
      price: 200,
      groupId: 1,
      connectivity: "WiFi et Bluetooth",
    },
    {
      id: 4,
      name: "Purificateur d'air intelligent de bureau Dyson Pure Cool Link",
      description: "Élimine automatiquement 99,97 % des allergènes et des polluants aussi petits que 0,3 microns de votre maison",
      image: 'assets/imgs/7.png',
      price: 300,
      groupId: 2,
      connectivity: "WiFi",
    },
    // Add data for other device groups (Accessories, Autres)
    {
      id: 5,
      name: "Purificateur d'air",
      description: "Purificateur d\'air intelligent AVERA HEPA H13 avec ALEXA, élimine 99,9 % des particules (oubliez les allergies et les mauvaises odeurs), silencieux, maison intelligente, bureau à domicile, fumeurs, PHEPA01",
      image: 'assets/imgs/10.png',
      price: 20,
      groupId: 2,
      connectivity: "N/A"
    },
    {
      id: 6,
      name: "Purificateur d'air",
      description: "Purificateur d\'air intelligent AIR4U pour la maison, avec filtre à air HEPA inclus. Purifie 99,9 % de l\'air de votre maison et de votre bureau. Fonctionne avec Alexa et Google.",
      image: 'assets/imgs/11.png',
      price: 30,
      groupId: 2,
      connectivity: "N/A"
    },
    {
      id: 16,
      name: "Station d'accueil",
      description: "Support de chargement pour certains appareils",
      image: "assets/imgs/9.png",
      price: 50,
      groupId: 3,
      connectivity: "N/A"
    },
    {
      id: 14,
      name: "Adaptateur secteur",
      description: "Alimentation pour les appareils",
      image: "assets/imgs/9.png",
      price: 20,
      groupId: 3,
      connectivity: "N/A"
    },
    {
      id: 15,
      name: "Batteries rechargeables",
      description: "Alimentation portable pour les appareils",
      image: "assets/imgs/9.png",
      price: 30,
      groupId: 3,
      connectivity: "N/A"
    },
    {
      id: 9,
      name: "Système de filtration",
      description: "LEVOIT Purificateur d\'air intelligent avec filtre HEPA H13, contrôle par Alexa, mode veille silencieux <24 dB, élimine 99,97 % des allergies aux acariens du pollen du tabac, aux odeurs et aux squames d\'animaux, Core 200S, blanc",
      image: 'assets/imgs/9.png',
      price: 150,
      groupId: 4,
      connectivity: "N/A"
    },
    {
      id: 10,
      name: "Déshumidificateur",
      description: "Réduit le taux d'humidité dans l'air",
      image: 'assets/imgs/9.png',
      price: 200,
      groupId: 4,
      connectivity: "N/A"
    },


    {
      id: 12,
      name: "Humidificateur",
      description: "Augmente le taux d'humidité dans l'air",
      image: "assets/imgs/9.png",
      price: 150,
      groupId: 4,
      connectivity: "N/A"
    },


  ];

  selectedGroup: number | null = null; // Allow null for initial state
  selectedConnectivity: string | null = null; // Allow null for initial state

  filteredDevices: Device[] = this.devices;

  ngOnInit(): void {
    this.filterDevices();
  }

  filterDevices(): void {
    this.filteredDevices = this.devices.filter(device => {
      let includeDevice = true;

      // Filter by group (handle null values gracefully)
      includeDevice = !this.selectedGroup || device.groupId === this.selectedGroup;

      // Optional filter by connectivity (if selected)
      if (this.selectedConnectivity) {
        includeDevice = includeDevice && device.connectivity === this.selectedConnectivity;
      }

      return includeDevice;
    });
  }

  selectGroup(groupId: number): void {
    this.selectedGroup = groupId;
    this.selectedConnectivity = null; // Reset connectivity filter on group change
    this.filterDevices();
  }

}
