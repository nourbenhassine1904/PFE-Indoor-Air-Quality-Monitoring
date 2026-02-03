import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Abonnement {
  type: string;
  prix: number;
  avantages: string[];
  parametres: string[];
}

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit{

  isLoggedIn = false;

  abonnements: Abonnement[] = [
    {
      type: 'Pack Standard',
      prix: 1999.9,
      avantages: [
        'Accès complet à toutes les fonctionnalités',
        'Support client 24/7'
        
      ],
      parametres: ['CO2', 'Humidité', 'Température']
    },
    {
      type: 'Pack Premium',
      prix: 2999.9,
      avantages: [
        'Accès complet à toutes les fonctionnalités',
        'Support client 24/7',
        'Analyse avancée des données'
      ],
      parametres: ['CO2', 'Humidité', 'Température', 'Pression']
    },
    {
      type: 'Pack Entreprise',
      prix: 4999.9,
      avantages: [
        'Accès complet à toutes les fonctionnalités',
        'Support client 24/7',
        'Analyse avancée des données'
      ],
      parametres: ['CO2', 'Humidité', 'Température', 'Pression', 'NO2', 'O3']
    }
  ];
  
  

  constructor(private router: Router) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  goToSignUp() {

    this.isLoggedIn = true;
    // Rediriger vers la page de sign up
    this.router.navigate(['/signup']);
  }

  choisirAbonnement(abonnement: Abonnement) {
    // Logique pour choisir l'abonnement
    console.log('Abonnement choisi :', abonnement);
  }
  showDetails(): void {
    
    alert("Nous avons bien reçu votre demande d'abonnement! Un membre de notre équipe vous contactera sous peu pour finaliser votre abonnement."); 
  }
}
