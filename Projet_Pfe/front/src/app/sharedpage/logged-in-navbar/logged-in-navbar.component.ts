import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logged-in-navbar',
  templateUrl: './logged-in-navbar.component.html',
  styleUrls: ['./logged-in-navbar.component.css']
})
export class LoggedInNavbarComponent implements OnInit{
 
  selectedNotification: string = ''; 

  constructor(private router: Router) {
    this.selectedNotification = this.getRandomNotification();
   }
 


  notifications: string[] = [
    'Alerte : Niveau de pollution élevé détecté. Action recommandée.<br>Maintenance requise : Veuillez vérifier le filtre de votre appareil.<br>Nouveau rapport disponible : Consultez les dernières données sur la qualité de l\'air dans la sous-page "Suivi et survaillance proactive".',
    'Aucune alerte : La qualité de l\'air est bonne. Aucune action recommandée pour le moment.<br>Maintenance préventive : Pensez à vérifier régulièrement l\'état de votre système de ventilation.<br>Pas de nouveaux rapports disponibles : La qualité de l\'air est stable. Consultez les données précédentes pour plus d\'informations.'
  ];
  


  // Fonction pour déconnecter l'utilisateur
  logout() {
    // Code pour effectuer la déconnexion de l'utilisateur, par exemple :
    // Effacer les données de session ou de stockage local
    // Rediriger vers la page de connexion
    window.sessionStorage.clear();
    //this.router.navigate(['/login']);
    window.location.href = "/login";
  }

  ngOnInit(): void {
    const randomIndex = Math.floor(Math.random() * this.notifications.length);
    this.selectedNotification = this.notifications[randomIndex];

  }


  showNotifications: boolean = false;

  openNotifications() {
    this.showNotifications = !this.showNotifications;
  }

  getRandomNotification(): string {
    const randomIndex = Math.floor(Math.random() * this.notifications.length);
    return this.notifications[randomIndex];
  }
}
